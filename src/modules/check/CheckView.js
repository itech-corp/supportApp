import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Keyboard,
  Platform,
  LayoutAnimation,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import { fonts, colors } from '../../styles';
import { TextInput, Button } from '../../components';
import { Colors } from 'react-native-paper';

const FORM_STATES = {
  LOGIN: 0,
  REGISTER: 1,
};

export default class AuthScreen extends React.Component {
  state = {
    anim: new Animated.Value(0),

    // Current visible form
    formState: FORM_STATES.LOGIN,
    isKeyboardVisible: false,
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      Platform.select({ android: 'keyboardDidShow', ios: 'keyboardWillShow' }),
      this._keyboardDidShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      Platform.select({ android: 'keyboardDidHide', ios: 'keyboardWillHide' }),
      this._keyboardDidHide.bind(this),
    );

    Animated.timing(this.state.anim, { toValue: 3000, duration: 3000 }).start();
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isKeyboardVisible: true });
  }

  _keyboardDidHide() {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isKeyboardVisible: false });
  }

  fadeIn(delay, from = 0) {
    const { anim } = this.state;
    return {
      opacity: anim.interpolate({
        inputRange: [delay, Math.min(delay + 500, 3000)],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      transform: [
        {
          translateY: anim.interpolate({
            inputRange: [delay, Math.min(delay + 500, 3000)],
            outputRange: [from, 0],
            extrapolate: 'clamp',
          }),
        },
      ],
    };
  }

  render() {
    const isRegister = this.state.formState === FORM_STATES.REGISTER;

    return (
      <View
        
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <View style={[styles.section, { paddingTop: 30 }]}>
            <Animated.Image
              resizeMode="contain"
              style={[
                styles.logo,
                this.state.isKeyboardVisible && { height: 90 },
                this.fadeIn(0),
              ]}
              source={require('../../../assets/images/support.png')}
            />
          </View>

          <Animated.View
            style={[styles.section, styles.middle, this.fadeIn(700, -20)]}
          >
            <TextInput
              placeholder={
                this.state.formState === FORM_STATES.LOGIN
                  ? 'Request ID'
                  : 'Username'
              }
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor={colors.primary}
              
            />

            {this.state.formState === FORM_STATES.REGISTER && (
              <TextInput
                placeholderTextColor={colors.primary}
                placeholder="Email"
                style={styles.textInput}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />
            )}
            {this.state.formState === FORM_STATES.REGISTER && (
             <TextInput
              placeholderTextColor={colors.primary}
              placeholder="Password"
              secureTextEntry
              style={styles.textInput}
            />
            )}
            <Animated.View
              style={[styles.section, styles.bottom, this.fadeIn(700, -20)]}
            >
              <Button
                bgColor="#FFA000"
                textColor={colors.white}
                secondary
                rounded
                style={{ alignSelf: 'stretch', marginBottom: 10 }}
                caption={
                  this.state.formState === FORM_STATES.LOGIN
                    ? 'Check'
                    : 'Submit'
                }
                onPress={() => this.props.navigation.goBack()}
              />

              
              {!this.state.isKeyboardVisible && (
                <TouchableOpacity
                  onPress={() => {
                    LayoutAnimation.spring();
                    this.setState({
                      formState: isRegister
                        ? FORM_STATES.LOGIN
                        : FORM_STATES.REGISTER,
                    });
                  }}
                  style={{ paddingTop: 30, flexDirection: 'row' }}
                >
                  <Text
                    style={{
                      color: colors.primary,
                      fontFamily: fonts.primaryRegular,
                    }}
                  >
                    {isRegister
                      ? 'Want to Check request ?'
                      : "Want to make new request ?"}
                  </Text>
                  <Text
                    style={{
                      color: colors.primary,
                      fontFamily: fonts.primaryBold,
                      marginLeft: 5,
                    }}
                  >
                    {isRegister ? 'Check ' : 'Click Here'}
                  </Text>
                </TouchableOpacity>
              )}
            </Animated.View>
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 30,
  },
  backgroundImage: {
    flex: 1,
    
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middle: {
    flex: 2,
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  bottom: {
    flex: 1,
    alignSelf: 'stretch',
    paddingBottom: Platform.OS === 'android' ? 30 : 0,
  },
  last: {
    justifyContent: 'flex-end',
  },
  textInput: {
    alignSelf: 'stretch',
    marginTop: 20,
    
  },
  logo: {
    height: 150,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: 15,
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 1,
  },
  socialButtonCenter: {
    marginLeft: 10,
    marginRight: 10,
  },
});
