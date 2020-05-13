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
import { TextInput, Button,Dropdown } from '../../components';
import { Colors } from 'react-native-paper';

const FORM_STATES = {
  LOGIN: 0,
  REGISTER: 1,
};

export default class AuthScreen extends React.Component {
  state = {
    anim: new Animated.Value(0),
    currentStep:1,

    // Current visible form
    formState: FORM_STATES.LOGIN,
    isKeyboardVisible: false,
  };
  nextStep() {
    console.log("Next")
    let currentStep = this.state.currentStep
    currentStep = currentStep >= 2? 3 : currentStep+1;
    this.setState({currentStep})
  }
  prevStep() {
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 2? 1 : currentStep-1;
    this.setState({currentStep})
  }
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
            {this.state.currentStep ==1?<TextInput
              
              placeholder={
                this.state.formState === FORM_STATES.LOGIN
                  ? 'Request ID'
                  : 'Full Name'
              }
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor={colors.primary}
              
            />:null}
            {this.state.formState === FORM_STATES.REGISTER && (
              <>
                
              {this.state.currentStep ==2? <TextInput
                currentStep={1}
                placeholderTextColor={colors.primary}
                placeholder="Email"
                style={styles.textInput}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />:null}
             { this.state.currentStep ==1? <TextInput
                currentStep={1}
                placeholderTextColor={colors.primary}
                placeholder="User ID"
                secureTextEntry
                style={styles.textInput}
              />:null}
              {this.state.currentStep ==1? <Dropdown
                style={[styles.textInput,{width:"82%",alignSelf:'center'}]}
                placeholder="Select Plateform"
                onSelect={() => {}}
                items={['Liyeplimal', 'Limarket']}
              />:null}
                {this.state.currentStep ==2? <Dropdown
                style={[styles.textInput,{width:"82%",alignSelf:'center'}]}
                placeholder="Select Country"
                onSelect={() => {}}
                items={['Cameroon', 'Others']}
              />:<></>}
             { this.state.currentStep ==2? <TextInput
                currentStep={3}
                placeholderTextColor={colors.primary}
                placeholder="Phone Number"
                secureTextEntry
                style={styles.textInput}
              />:<></>}
              {this.state.currentStep ==3? <Dropdown
                style={[styles.textInput,{width:"82%",alignSelf:'center'}]}
                placeholder="Select Issue"
                onSelect={() => {}}
                items={['Account verify', 'Commission issue']}
              />:null}
              {this.state.currentStep ==3? <TextInput
              
              placeholder="Issue description"
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor={colors.primary}
              />:null}
            </>
            )}
           
            
            <Animated.View
              style={[styles.section, styles.bottom, this.fadeIn(700, -20)]}
            >
              <Button
                bgColor="#FFA000"
                textColor={colors.white}
                secondary
                rounded
                style={{ alignSelf: 'stretch', marginBottom: 10}}
                caption={
                  this.state.formState === FORM_STATES.LOGIN
                    ? 'Check'
                    : this.state.currentStep == 3 ?'Submit':'Next'
                }
                onPress={() => this.nextStep()}
              />
              {this.state.currentStep>1? <Button
                bgColor="blue"
                textColor={colors.white}
                secondary
                rounded
                style={{ alignSelf: 'stretch', marginBottom: 10}}
                caption='Previous'
                onPress={() => this.prevStep()}
              />:null}


              
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
    marginTop:-10,
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
