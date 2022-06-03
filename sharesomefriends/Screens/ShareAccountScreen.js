import React, { useState, useRef,  } from 'react';
import { View, Text, SafeAreaView, LogBox, ImageBackground, KeyboardAvoidingView, StyleSheet, Image, TextInput, TouchableOpacity, Platform, Pressable, Alert, Linking, ActivityIndicator } from 'react-native';
LogBox.ignoreAllLogs();

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ColorCode from '../Constant/colorCode';
import Loading from 'react-native-whc-loading';
import md5 from 'md5';
import Modal from "react-native-modal";
import { useSelector, useDispatch } from 'react-redux';
import { setUserDetails } from '../ReduxUtils/action';
import Toast from 'react-native-simple-toast';
import { getReferralCode_Api, randomNumber } from '../Utils/api';

const ShareAccountScreen = ({ navigation }) => {
    const { details: { refercode = '', checked = '', } = {} } = useSelector(store => store)
    console.log('---refercode---', refercode)
    const [campaignId, setCampaignID] = useState(refercode);
    const [button, buttonPress] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [checkbox, setCheckbox] = useState(checked);
    const [isLoading, setLoading] = useState(false);
    // const { loading } = useRef()
    const dispatch = useDispatch();

    const refercodeApi = () => {
        console.log('campainId--->', campaignId)

        if (campaignId == '') {

            return okButton();
        } else if (checkbox == false) {
            return Toast.show(`Please check Terms`, Toast.SHORT);
        }
        dispatch(setUserDetails({ checked: checkbox }))

        const api_key = "ahdkajsd52376152ghwfeq653762";

        const randomNumberStr = randomNumber()
        console.log("randomNumberStr -> ", randomNumberStr)
        const fisrtmd5 = md5(api_key + randomNumberStr)
        console.log('fisrtmd5--->', fisrtmd5)
        const secondmd5 = md5(campaignId + "" + "" + api_key)
        console.log('secondmd5--->', secondmd5, '---id--->', campaignId)
        const Key_Value = md5(fisrtmd5 + secondmd5 + randomNumberStr)
        console.log('Key_value-->>', Key_Value)
        const final_key = Key_Value + randomNumberStr;
        console.log('final_Key--->>>', final_key)

        setLoading(true)
        getReferralCode_Api(final_key, campaignId).
            then((res) => {
                console.log('res--->>', res)
                console.log('res111--->>', res.ResponseCode, res.ResponseText)
                setLoading(false)
                if (res.ResponseCode === "1") {
                    console.log("ResponseCode1--->", res.data[0].URL, res.data[0].CampaignName, res.data[0].business_name,)

                    navigation.navigate('ContactScreen', {
                        b_name: res.data[0].business_name,
                        c_name: res.data[0].CampaignName,
                        refercode: campaignId,
                        Message: res.data[0].Message + `\n` + "" + `\n` + res.data[0].URL,
                        URL: res.data[0].URL,
                        type: res.data[0].Type
                    })
                } else {
                    console.log("else--->")
                   setLoading(false)
                    okButton()
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

    const toggleModal = () => {
        if (campaignId == '') {
            setModalVisible(!isModalVisible);
            buttonPress(!button)
        }
    };

    const okButton = () => {
        setModalVisible(!isModalVisible);
    }

    const toggleCheckbox = () => {
        setCheckbox(!checkbox)
    }
    return (
        <SafeAreaView>
            <KeyboardAvoidingView>
                <ImageBackground source={require('../assets/signup_bg.png')} style={styles.bgImageStyle}>
                    <View style={styles.imageViewStyle}>
                        <Image source={require('../assets/signup_logo.png')} style={styles.imageStyle}></Image>
                        <Text style={styles.textStyle}>The quick and easy way to refer friends</Text>
                    </View>
                    <View style={[styles.textInputViewStyle, { marginLeft: wp(6), marginRight: wp(6), }]}>
                        <TextInput value={campaignId} autoCapitalize='none'
                            placeholder='Enter Account Name or Campaign ID' textAlign="center" style={styles.placeholderStyle} onChangeText={(campaignId) => setCampaignID(campaignId)}></TextInput>
                    </View>
                    {/* <View style={{justifyContent:'center', alignItems:'center', marginTop: hp(5), flexDirection:'row'}}>
                    <Text style={{fontSize: 13, color: ColorCode.text_blueColor, }}>Don't know the account name/ID ?</Text>
                   <TouchableOpacity>
                   <Text style={{fontSize: 13, color: ColorCode.text_blueColor, }}> Click here</Text>
                   </TouchableOpacity>
                </View> */}
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '5%', flexDirection: 'row', }}>
                        <TouchableOpacity onPress={() => toggleCheckbox()}>
                            {!checkbox ?
                                <Image source={require('../assets/uncheck.png')} style={{ height: 20, width: 20 }}></Image> :
                                <Image source={require('../assets/check.png')} style={{ height: 20, width: 20 }}></Image>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: '3%' }} onPress={() => navigation.navigate('TermsScreen')}>
                            <Text style={{ fontSize: 20, color: ColorCode.text_blueColor, fontWeight: 'bold', }}>Terms of use</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ marginLeft: wp(6), marginRight: wp(6), marginTop: '5%', }} onPress={() => refercodeApi()}>
                        <ImageBackground source={require('../assets/btn_blue.png')} style={{ padding: Platform.OS == 'ios' ? 22 : 15, justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ color: ColorCode.white_color, fontSize: 20, fontWeight: '500' }}>SHARE FRIENDS NOW</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    <Modal
                        animationType={'slide'}
                        transparent={true}
                        onBackdropPress={() => toggleModal()}
                        onRequestClose={() => toggleModal()}
                        isVisible={isModalVisible} >
                        <View style={styles.modalStyle}>
                            <View style={{
                                backgroundColor: '#06385b', justifyContent: 'center', alignItems: 'center', padding: 15,
                            }}>
                                <Text style={{ color: '#e5e5f0', fontSize: 20 }}>Share Some Friends</Text>
                            </View>
                            
                            <View style={styles.modalTextView}>
                                <Text style={{ color: '#424242', fontSize: Platform.OS == 'ios' ? 19 : 17, }}>Please enter a valid account name </Text>
                                <Text style={{ color: '#424242', fontSize: Platform.OS == 'ios' ? 19 : 17, }}>or ID.</Text>
                            </View>

                            <View style={{ padding: 14 }}>
                                <Pressable
                                    onPress={() => okButton()}
                                    style={({ pressed }) => [
                                        {
                                            backgroundColor: pressed
                                                ? '#fba715'
                                                : '#d2d2d2'
                                        },
                                        styles.OKStyle
                                    ]}>

                                    {({ pressed }) => (
                                        <View>
                                            <Text style={{ color: '#212121', padding: 14, fontSize: Platform.OS == 'ios' ? 19 : 17 }}>OK</Text>
                                        </View>

                                    )}
                                </Pressable>

                            </View>
                        </View>
                    </Modal>
                    {/* {
                        isLoading &&
                        <ActivityIndicator
                            color='white'
                            size='large'
                           // style={styles.ActivityIndicatorStyle}
                        />
                    } */}
                    <Loading loading={isLoading} />
                </ImageBackground>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    bgImageStyle: {
        height: '100%',
        width: '100%',
    },
    imageViewStyle: {
        marginTop: '18%',
        // marginTop: Platform.OS == "ios" ? hp(16) : hp(18),
        alignItems: "center",
        justifyContent: 'center',
    },
    imageStyle: {
        height: '35%',
        width: '53%',
        // height: Platform.OS == "ios" ? hp(12) : hp(13),
        // width: Platform.OS == "ios" ? wp(58) : wp(56)
    },
    textStyle: {
        marginTop: hp(0.5),
        fontSize: Platform.OS == 'ios' ? 15 : 13,
        color: ColorCode.text_color,
    },
    textInputViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColorCode.white_color,

        height: hp(8),
        marginTop: hp(-7),
        borderRadius: 6,
        //borderColor: ColorCode.text_color,
    },
    placeholderStyle: {
        color: ColorCode.text_color,
        fontSize: Platform.OS == "ios" ? 20 : 18,
        // alignItems:'center',
        // justifyContent:'center'
    },
    modalStyle: {
        backgroundColor: 'white',
        marginHorizontal: '5%',
        borderWidth: 1
    },

    modalTextView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '2%',
        borderBottomWidth: 1,
        padding: 6
    },
    OKStyle: {
        // backgroundColor: '#d2d2d2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    }
})
export default ShareAccountScreen;