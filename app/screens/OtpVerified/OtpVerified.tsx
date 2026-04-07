import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert, Image } from 'react-native';
import OTPInputView from 'react-native-otp-textinput';
import { useNavigation, useRoute } from '@react-navigation/native';
import { navigate } from 'navigation';
import { ImagesAssets } from 'constant';
import { Colors } from 'style';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { cognitoPool } from "screens/cognito-pool";

const OtpScreen = () => {

  const [otp, setOtp] = useState('');
  const route = useRoute<any>();
  const navigation = useNavigation();

  const {
    email
  } = route.params || {};
  console.log(email, "aaaa^^")

  const confirmSignUp = (email, confirmationCode) => {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username: email, Pool: cognitoPool });
  
      user.confirmRegistration(confirmationCode, true, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  const confirmSignUp1 = async () => {
    console.log(otp, '@@2222', email)
    try {
      // const { isSignUpComplete, nextStep } = await confirmSignUp({
      //   username: email,
      //   confirmationCode: otp
      // }
      // );
      await confirmSignUp(email, otp);

      // console.log('User confirmed successfully!', isSignUpComplete);
      // if (isSignUpComplete) {
        navigation.navigate('LoginScreen')
      // }
    } catch (err) {
      // setError(err.message);
      console.log(err.message)
      Alert.alert('Error', err.message);
    }
  };

  return (
    <>

      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={{ height: 25, width: 25 }} source={require('../../../assets/images/back.png')} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>ElderCare OTP</Text>
        </View>
        <Image style={styles.logo} resizeMode="contain" source={ImagesAssets.logos.nmf} />

        <View style={styles.header}>
          <Text style={styles.title}>Enter OTP</Text>
          <Text style={styles.subtitle}>We’ve sent you an OTP over email to verify your identity</Text>
        </View>

        <OTPInputView
          // style={styles.otpInputView}

          inputCount={6}  // Define the number of OTP inputs you want
          defaultValue={otp}
          handleTextChange={setOtp}  // Update OTP state as user types
          autoFocusOnLoad
          codeInputFieldStyle={styles.otpInput} // Style for each OTP input box
          codeInputHighlightStyle={styles.otpInputFocused}  // Highlight style when input is focused
          keyboardType="number-pad"
        />

        <TouchableOpacity onPress={confirmSignUp1} style={styles.submitButton}>
          <Text style={styles.submitText}>Verify OTP</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 8,
    textAlign:'center'
  },
  otpInputView: {
    // width: '80%',55
    height: 50,
    alignSelf: 'center',
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpInput: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: 'red',
    borderWidth: 5,
    borderColor: 'red',
    textAlign: 'center',
    fontSize: 20,
    // shadowColor: Platform.OS === 'ios' ? '#000' : 'transparent',
    // shadowOpacity: Platform.OS === 'ios' ? 0.2 : 0,
    // shadowRadius: Platform.OS === 'ios' ? 4 : 0,
    // shadowOffset: { width: 0, height: 2 },
    // elevation: Platform.OS === 'android' ? 5 : 0,  // Only apply elevation for Android
  },
  otpInputFocused: {
    borderColor: 'black', // Highlight the border when focused
  },
  submitButton: {
    backgroundColor: Colors.AppColor,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: '20%'
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '76%',
    marginTop: Platform.OS == 'ios' ? 20 : 10,
    position: 'absolute', top: '5%',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 10,
  },
  logo: {
    width: "80%",
    height: 90,
    // backgroundColor:'red',
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 10,
    marginTop: '40%',
},
});

export default OtpScreen;
