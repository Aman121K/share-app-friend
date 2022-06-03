import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ColorCode from "../Constant/colorCode";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getReferralCode_Api, randomNumber, getUserCampaigns_Api } from '../Utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { setReferralCode, setPhone, setSelectedContact, setUserDetails } from '../ReduxUtils/action';
import md5 from "md5";

const HeaderComponent = ({ navigation, props, drawer, backbutton }) => {
    const { details: { refercode = '', name = '', phone = '' } = {} } = useSelector(store => store)
    console.log('---refercode---', refercode)
    const [campaignId, setCampaignID] = useState(refercode);
    const [userName, setUserName] = useState(name);
    const [userPhone, setUserPhone] = useState(phone);
    const dispatch = useDispatch();

    const openDrawerApi = () => {
        console.log('campainId--->', campaignId, userName, userPhone)

        dispatch(setUserDetails({ name: userName, phone: userPhone, refercode: campaignId,}))


        const api_key = "ahdkajsd52376152ghwfeq653762";

        const randomNumberStr = randomNumber()
        console.log("randomNumberStr -> ", randomNumberStr)
        const fisrtmd5 = md5(api_key + randomNumberStr)
        console.log('fisrtmd5--->', fisrtmd5)
        const secondmd5 = md5(userName + userPhone + userName + api_key)
        console.log('secondmd5--->', secondmd5, '---id--->', campaignId)
        const Key_Value = md5(fisrtmd5 + secondmd5 + randomNumberStr)
        console.log('Key_value-->>', Key_Value)
        const final_key = Key_Value + randomNumberStr;
        console.log('final_Key--->>>', final_key)
        navigation.openDrawer()
        getUserCampaigns_Api(final_key, campaignId, userPhone, userName).
            then((res) => {
                console.log('res--->>', res)
                console.log('res111--->>', res.ResponseCode, res.ResponseText)
                navigation.openDrawer()
                

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

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp(3), }}>
            {drawer == true ?
                // <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ paddingHorizontal: 15 }}>
                <TouchableOpacity onPress={() => openDrawerApi()} style={{ paddingHorizontal: 15 }}>
                    <Image source={require('../assets/menu.png')} style={styles.imageStyle}></Image>
                </TouchableOpacity> : 
                <TouchableOpacity onPress={() => openDrawerApi()} style={{ paddingHorizontal: 15 }}>
                      <Image source={require('../assets/menu_white.png')} style={styles.imageStyle} ></Image>
                </TouchableOpacity>}

            {backbutton == true ?
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 15 }}>
                    <Image source={require('../assets/back_arrow_right.png')} style={{ width: 25, height: 25, transform: [{ rotate: '180deg' }], }}></Image>
                </TouchableOpacity> : null}
            <View style={{ marginLeft: '14%' }}>
                <Text style={styles.textstyle}>{props}</Text>
            </View>
        </View>


    )
}
const styles = StyleSheet.create({
    imageStyle: {
        width: 25, height: 25
    },
    textstyle: {
        fontSize: 20, 
        color: ColorCode.black_color,
        fontWeight: '500'
    },
});
export default HeaderComponent;