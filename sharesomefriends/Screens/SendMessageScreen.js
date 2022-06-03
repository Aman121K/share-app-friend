
import React, { useState, useRef } from 'react';
import { View, Text, SafeAreaView, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ColorCode from '../Constant/colorCode';
import md5 from 'md5';
import { randomNumber, sendReferralCodeNew_Api } from '../Utils/api';
import { useSelector, useDispatch } from 'react-redux';
import Loading from 'react-native-whc-loading';

const SendMessageScreen = ({ navigation, route }) => {
    
    const { details: { name = '', phone = '' } } = useSelector(state => state);
    const { b_name, c_name, Message, URL,  friendList, campaignId,  type } = route.params
    console.log('refer--->', b_name, c_name, Message, URL,  friendList, campaignId,  type)
    const [isLoading, setLoading] = useState(false);

    const messageSent = () => {
        const friends = friendList.map((item) => item.number.number).toString()
        const friendsemail = friendList[0].email === "" ?  'noemail' :  friendList.map((item) => item.email).toString()
        const friendName = friendList.map((item) => item.friend_name).toString()
        console.log(friendsemail, 'friendNumber--->', friends, friendName)
        const api_key = "ahdkajsd52376152ghwfeq653762";
        console.log('friendList--->>', friendList)
        const refercode = campaignId;
        console.log('referalcode----->>>', refercode, phone)
        const randomNumberStr = randomNumber()
        console.log("randomNumberStr -> ", randomNumberStr)
        const fisrtmd5 = md5(api_key + randomNumberStr)
        console.log('fisrt--->', fisrtmd5)
        const secondmd5 = md5(refercode + phone + api_key)
        console.log('second--->', secondmd5)
        const Key_Value = md5(fisrtmd5 + secondmd5 + randomNumberStr)
        console.log('Keyvalue-->>', Key_Value)
        const final_key = Key_Value + randomNumberStr;
        console.log('finalKey--->>>', final_key)

        setLoading(true)
        sendReferralCodeNew_Api(final_key, refercode, phone, friends, friendName,friendsemail, Message, type ).
         then((res) => {

            setLoading(false)
             if(res.ResponseCode === "1"){
                     navigation.navigate('ThanksScreen', {
                        
                        b_name: b_name, 
                        c_name: c_name,
                        Message: Message,
                        URL: URL,
                        type: type,
                        campaignId: campaignId,
                        phone: phone,
                        friendList: friendList
                        // friendNumber: friendNumber,
                        // friendEmail: friendEmail
                    })
            } else {
                console.log("else--->")
               
              setLoading(false)
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
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={{ marginTop: hp(1), marginLeft: wp(4) }}>
                        <Image source={require('../assets/back_arrow_right.png')} style={{ width: 25, height: 25, transform: [{ rotate: '180deg' }], }}></Image>
                    </View>
                </TouchableOpacity>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '4%' }}>
                    <Text style={styles.textStyle}>Sharing friends with: {b_name + " / " + c_name}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: ColorCode.text_color, }}>{friendList.map((item) => item.friend_name).length + " " + "Friends selected"}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '5%', flexDirection: 'row' }}>
                    <Text style={{ fontSize: 14, color: ColorCode.blueColor, fontWeight: 'bold' }}>{friendList.map((item) => item.friend_name).toString().replace(/,/g, ':')}</Text>
                    {/* <Text style={{ fontSize: 14, color: ColorCode.blueColor, fontWeight: 'bold' }}> {friend_name} :</Text>
                    <Text style={{ fontSize: 14, color: ColorCode.blueColor, fontWeight: 'bold' }}> {friend_name}</Text> */}

                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '6%' }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: ColorCode.text_color, }}>Tap send message, or edit & then send.</Text>
                </View>
                <View style={[styles.textInputViewStyle, { marginLeft: wp(6), marginRight: wp(6), height: hp(35) }]}>
                    <TextInput placeholder='Enter Your Name' multiline={true} style={styles.placeholderStyle}>{Message + `\n` + "" + `\n` + name} </TextInput>
                </View>


                <TouchableOpacity style={{ marginLeft: wp(6), marginRight: wp(6), }} onPress={() => messageSent()}>
                    <ImageBackground source={require('../assets/btn_blue.png')} style={styles.textInputViewStyle2}>
                        <Text style={{ color: ColorCode.white_color, fontSize: 20, }}>SEND MESSAGE</Text>
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

        backgroundColor: ColorCode.white_color,

        height: hp(8),
        marginTop: hp(4),
        borderRadius: 6,
        //borderColor: ColorCode.text_color,
    },
    textInputViewStyle2: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColorCode.white_color,

        height: hp(8),
        marginTop: hp(1.5),
        borderRadius: 6,
        //borderColor: ColorCode.text_color,
    },
    placeholderStyle: {
        color: ColorCode.text_color,
        fontSize: Platform.OS == "ios" ? 20 : 18,
        padding: 10
    }
})
export default SendMessageScreen;