import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, SafeAreaView, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, Platform, Alert, Linking, AppState } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ColorCode from '../Constant/colorCode';
import PhoneInput from "react-native-phone-number-input";
import md5 from 'md5';
import { getReferralCode_Api, randomNumber } from '../Utils/api';
import {  setUserDetails } from '../ReduxUtils/action';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationAction } from '@react-navigation/native';
import Loading from 'react-native-whc-loading';

const ReferredScreen = ({ navigation, route, props }) => {
  
    const { details: { refercode = '', name = '', phone = '' } = {} } = useSelector(store => store)
    const { b_name, c_name, campaignId, Message, friendList, URL, Type } = route.params
    console.log("data--------->>>",  b_name, c_name, campaignId, Message, friendList, URL, Type )
    const dispatch = useDispatch();
    const [formattedValue, setFormattedValue] = useState("");
    const [userName, setUserName] = useState(name);
    const [userPhone, setUserPhone] = useState(phone);
    const [countryName, setCountryName] = useState('');
    const [prefix, setPrefix] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [appState, setAppState] = useState(AppState.currentState);

    useEffect(() => {
        AppState.addEventListener('change', handleAppStateChange);
        return () => {
          AppState.removeEventListener('change', handleAppStateChange);
        };
      }, [appState]);
    
      const handleAppStateChange = (nextAppState) => {
        console.log('App State: ' + nextAppState);
        if (appState != nextAppState) {
          if ( nextAppState === 'background') {
            console.log('App State--->');
            navigation.navigate('ContactScreen', { b_name: b_name, c_name: c_name, campaignId: refercode, Message: Message, URL: URL, Type: Type, })
          }
         //alert('App State: ' + nextAppState);
        //navigation.addEventListener('focus', () => {"ContactScreen"})
          setAppState(nextAppState);
        }
      };

    const contactNumberApi = () => {

        if (userName == '' || userPhone == '') {
            return Alert.alert("Field can't be left blank")
        }

        dispatch(setUserDetails({ name: userName, phone: userPhone, refercode: campaignId, countryName: countryName, prefix: prefix, business_name:b_name, CampaignName:c_name }))


        const api_key = "ahdkajsd52376152ghwfeq653762";
        console.log('friendList111--->>', friendList)
        const randomNumberStr = randomNumber()
        console.log("randomNumberStr -> ", randomNumberStr)
        const fisrtmd5 = md5(api_key + randomNumberStr)
        console.log('fisrt--->', fisrtmd5)
        const secondmd5 = md5(campaignId + userPhone + userName + api_key)
        console.log('second--->', secondmd5)
        const Key_Value = md5(fisrtmd5 + secondmd5 + randomNumberStr)
        console.log('Keyvalue-->>', Key_Value)
        const final_key = Key_Value + randomNumberStr;
        console.log('finalKey--->>>', final_key)
        console.log('data---->', final_key, campaignId, countryName, userName, userPhone, prefix,)
        setLoading(true)
        console.log('loading--->',  setLoading(true))

        getReferralCode_Api(final_key, campaignId, countryName, userName, userPhone, prefix,).
            then((res) => {
                setLoading(false)
                if (res.ResponseCode === "1") {
                
                    console.log("ResponseCode1--->", Type)

                    if (Type === "0") {
                        Linking.openURL(`sms:${friendList.map((item) => item.number.number)}?body=${Message + `\n` + "" + `\n` + userName}`, { b_name: b_name, c_name: c_name, campaignId: refercode, friendList: friendList, Message: Message, URL: URL, Type: Type, }) 
                    
                    } else {
                    
                        console.log('friendList11122222--->>', friendList)
                      setLoading(false)
                        navigation.navigate("SendMessageScreen", {
                            user_name: userName,
                            b_name: b_name,
                            c_name: c_name,
                            Message: Message,
                            URL: URL,
                            type: Type,
                            campaignId: campaignId,
                            phone: userPhone,
                            friendList: friendList

                        })
                        
                    }
                } else {
                  
                    console.log("getReferralCode_Apierror---->", error)
                    setLoading(true)
                    navigation.navigate('ThanksScreen')
                }

            }).catch((err) => {
                Alert.alert(
                    err.toString(),
                    '',
                    [{ text: 'ok' },],
                    { cancelable: false }
                )
            })

    }

    return (
        <SafeAreaView>
            <ImageBackground source={require('../assets/signup_bg.png')} style={styles.bgImageStyle}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '8%' }}>
                    <Text style={styles.textStyle}>Sharing friends with: {b_name + " / " + c_name}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp(12), }}>
                    <Text style={{ fontSize: 20, color: ColorCode.blueColor, fontWeight: 'bold' }}>Drop in your</Text>
                    <Text style={{ fontSize: 20, color: ColorCode.blueColor, fontWeight: 'bold' }}>name & number so friends</Text>
                    <Text style={{ fontSize: 20, color: ColorCode.blueColor, fontWeight: 'bold' }}>know you referred them.</Text>
                </View>
                <View style={[styles.textInputViewStyle, { marginLeft: wp(6), marginRight: wp(6), }]}>
                    <TextInput value={userName} placeholder='Enter Your Name' textAlign="center" style={styles.placeholderStyle} onChangeText={(userName) => setUserName(userName)}></TextInput>
                </View>
                <View style={{ marginLeft: wp(6), marginRight: wp(6), }}>
                    <PhoneInput
                        // ref={phoneInput}
                        value={userPhone}
                        defaultValue={userPhone}
                        disableArrowIcon='false'
                        defaultCode="IN"
                        layout="second"
                        onChangeText={(userPhone) => {
                            
                            setUserPhone(userPhone);
                        }}
                        onChangeCountry={(country) => {
                            console.log(country.callingCode[0], 'countryyuiii-->', country.name, countryName)
                            setCountryName(country.name)
                            setPrefix(country.callingCode[0])
                        }}

                        onChangeFormattedText={(text) => {
                            setFormattedValue(text);
                        }}
                        keyboardType="phone-pad"
                        containerStyle={{ borderRadius: 6, backgroundColor: ColorCode.white_color, height: hp(8), marginTop: hp(4), width: wp(88), justifyContent: 'center', alignItems: 'center' }}
                        textContainerStyle={{ backgroundColor: ColorCode.white_color, borderRadius: 6, borderLeftColor: '#cdcdcd', borderLeftWidth: 1, height: hp(8), justifyContent: 'center', alignItems: 'center', color: ColorCode.text_color }}
                        placeholder="Enter Phone Number"
                        phoneInputContainer={true}
                        textInputProps={{ placeholderTextColor: ColorCode.text_color, fontSize: Platform.OS == "ios" ? 20 : 18, marginTop: Platform.OS == 'ios' ? 0 : hp(0.3), height: hp(8), width: '100%', }}
                    
                    />
                </View>
                <TouchableOpacity style={{ marginLeft: wp(6), marginRight: wp(6), }} onPress={() => contactNumberApi()}>
                    <ImageBackground source={require('../assets/btn_blue.png')} style={styles.textInputViewStyle}>
                        <Text style={{ color: ColorCode.white_color, fontSize: 20, fontWeight: 'bold' }}>NEXT</Text>
                    </ImageBackground>
                </TouchableOpacity>
                <Loading loading={isLoading} />
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    bgImageStyle: {
        height: '100%',
        width: '100%',
    },
    imageViewStyle: {
        marginTop: Platform.OS == "ios" ? hp(16) : hp(18),
        alignItems: "center",
        justifyContent: 'center',
    },
    imageStyle: {
        height: Platform.OS == "ios" ? hp(12) : hp(13),
        width: Platform.OS == "ios" ? wp(58) : wp(56)
    },
    textStyle: {
        //  marginTop: hp(0.5),
        fontSize: 12,
        color: ColorCode.text_color,
        fontWeight: '500'
    },
    textInputViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColorCode.white_color,

        height: hp(8),
        marginTop: hp(4),
        borderRadius: 6,
        //borderColor: ColorCode.text_color,
    },
    placeholderStyle: {
        color: ColorCode.text_color,
        fontSize: Platform.OS == "ios" ? 20 : 18
    }
})
export default ReferredScreen;