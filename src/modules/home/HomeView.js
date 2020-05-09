import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
 Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';

import { Button, RadioGroup, Dropdown } from '../../components';

export default function HomeScreen({ isExtended, setIsExtended,navigation }) {
  // const rnsUrl = 'https://reactnativestarter.com';
  // const handleClick = () => {
  //   Linking.canOpenURL(rnsUrl).then(supported => {
  //     if (supported) {
  //       Linking.openURL(rnsUrl);
  //     } else {
  //       console.log(`Don't know how to open URI: ${rnsUrl}`);
  //     }
  //   });
  // };

  return (
    <View style={styles.container}>
      
    
        <View style={[styles.section,{flexDirection:'row',fontStyle:'Bold'}]}>
          <Text bold size={30} style={{color:'#04166C'}} >
            <Icon name="headset" size={30} /> GIT 
          </Text>
          <Text bold size={30} style={{color:'orange',marginLeft:5}}>
             support
          </Text>
        </View>
        <View>

        </View>
        <View style={styles.section}>
          
          <Text size={30} bold  style={[styles.title,{color:'#04166C'}]}>
           Vos requettes au bout du doigt
          </Text>
        </View>
        <View style={{marginTop:-90}}>
          <Button
            style={[{marginBottom:20}]}
            
            rounded
            caption="Check a Request  "
            onPress={() => navigation.navigate('Check')}
          >
            <Text>
              <Icon name="check" size={20} color="white" />
            </Text>
          </Button>
          <Button
            textColor="white"
            rounded
            bgColor='#FFA000'
            caption="Pending Request  "
            onPress={() => navigation.navigate('Check')}
          >
            <Text>
              <Icon name="list" size={20} color="white" />
            </Text>
          </Button>
        </View>
        <View style={[styles.section, styles.sectionLarge]}>
          <Text color="black" hCenter size={15} style={styles.description}>
            {' '}
            Cette Application a pour but de faciliter et d'accelere vos processecus de requettes
          </Text>
        </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  itemOneImageContainer: {
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
    alignContent:'center'
    
  },
  itemOneImage: {
    
    width: Dimensions.get('window').width / 2 +0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },
  section: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionLarge: {
    flex: 2,
    justifyContent: 'space-around',
  },
  sectionHeader: {
    marginBottom: 8,
  },
  priceContainer: {
    alignItems: 'center',
  },
  description: {
    padding: 15,
    lineHeight: 25,
  },
  titleDescription: {
    color: '#19e7f7',
    textAlign: 'center',
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  title: {
    marginTop: -190,
    
  },
  price: {
    marginBottom: 5,
  },
  priceLink: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
});
