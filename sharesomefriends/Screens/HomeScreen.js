import React, { useState, useRef } from 'react';
import { View, Text, SafeAreaView, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, Platform, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ColorCode from '../Constant/colorCode';
import  HeaderComponent  from '../Components/HeaderComponent';
import { useSelector, useDispatch } from 'react-redux';
import { setReferralCode, setPhone, setSelectedContact, setUserDetails, setNotification } from '../ReduxUtils/action';
import { getNotification_Api , randomNumber } from '../Utils/api';
import md5 from 'md5';

const DATA = [
    {
        id: 1,
        title1: 'View All Shared',
        title2: 'Friends',
        src: require('../assets/users.png'),
        bgColor: '#238c00',
        nav_key: 'ShareMoreFriendsScreen',
        nav_props: { selectedIndex: 0 }
    },
    {
        id: 2,
        title1: 'View Status of',
        title2: 'Shared Friends',
        src: require('../assets/status3.png'),
        bgColor: '#5b35ac',
        nav_key: 'ViewStatusofSharedFriends',
        nav_props: { selectedIndex: 1 }
    },
    {
        id: 3,
        title1: 'Notification',
        title2: '',
        src: require('../assets/notification2.png'),
        bgColor: '#33a8b2',
        nav_key: 'Notification',
        nav_props: { selectedIndex: 3 }
    },
    {
        id: 4,
        title1: 'Add Another',
        title2: 'Account Name or ID#',
        src: require('../assets/plus.png'),
        bgColor: '#b41941',
        nav_key: 'ShareAccountScreen',
        nav_props: { selectedIndex: 4 }
    },
]

const HomeScreen = ({ navigation }) => {
    const { details: { refercode = '', name = '', phone = '',  business_name='', CampaignName=''  } = {} } = useSelector(store => store)
    console.log('========', refercode, name, phone, business_name, CampaignName)
    const dispatch = useDispatch();
    const [campaignId, setCampaignID] = useState(refercode);
    const [userName, setUserName] = useState(name);
    const [userPhone, setUserPhone] = useState(phone);
    const notificationApi =()=>{
        const api_key = "ahdkajsd52376152ghwfeq653762";
    
            const randomNumberStr = randomNumber()
            console.log("randomNumberStr1234 -> ", randomNumberStr)
            const fisrtmd5 = md5(api_key + randomNumberStr)
            console.log('fisrtmd5--->', fisrtmd5)
            const secondmd5 = md5(userPhone + userPhone +  api_key)
            console.log('secondmd5--->', secondmd5, '---id--->')
            const Key_Value = md5(fisrtmd5 + secondmd5 + randomNumberStr)
            console.log('Key_value-->>', Key_Value)
            const final_key = Key_Value + randomNumberStr;
            console.log('final_Key--->>>', final_key, userPhone, campaignId)
            dispatch(setUserDetails({ name: userName, phone: userPhone, refercode: campaignId,  }))
          
            getNotification_Api(final_key, campaignId, "917973070600").
            then((res) => {
                console.log('res--->>123', res)
            console.log('res11122--->>', res.ResponseCode, res.ResponseText)
                // if (res.ResponseCode === "1") {
                //     console.log("ResponseCode1--->",  res.data[0].business_name,)

                //     navigation.navigate('Notification', {
                //         b_name: res.data[0].business_name,
                //         msg: res.data[0].message,
                //         date: res.data[0].date,
                //         type: res.data[0].Type,
                //         subject: res.data[0].subject,
                //         rname: res.date[0].name
                //     })
                // } else {
                //     console.log("else--->")
               
                // }

               navigation.navigate('Notification')
            }).catch((err) => {
                Alert.alert(
                    err.toString(),
                    '',
                    [{ text: 'ok' },],
                    { cancelable: false }
                )
            })
    
    
    
    }

    const renderItem = ({ item, }) => {
        const { nav_key, nav_props } = item
        return (
         <View style={{ backgroundColor: item.bgColor, flex: 1,  padding: 15 , marginTop: hp(1.5), marginHorizontal: wp(1.5),  }}>
                <TouchableOpacity onPress={()=>navigation.navigate(nav_key, nav_props)} >
                <View style={{ justifyContent: 'center', alignItems: 'center',  height: Platform.OS == 'ios'? hp(15) : hp(18)}}>
                    <Image source={item.src} />
                    <Text style={{ color: ColorCode.textColor, marginTop: '3%' }}>{item.title1}</Text>
                    <Text style={{ color: ColorCode.textColor }}>{item.title2}</Text>
                </View>
            </TouchableOpacity>
         </View>
        )
    }

    const FlatList_Header = () => {
        return (
        <View>
                <HeaderComponent navigation={navigation} drawer={false} />
                 {/* <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{ width: 30, height: 28,marginTop: hp(0.5), marginLeft: wp(4) ,}}>
                        <Image source={require('../assets/menu_white.png')} style={{ width: 30, height: 30,}} ></Image>
                </TouchableOpacity> */}
                <View style={styles.imageViewStyle}>
                    <Image source={require('../assets/main_logo.png')} style={styles.imageStyle}></Image>
                </View>
                <TouchableOpacity onPress={()=> navigation.navigate('ContactScreen')}>
                    <View style={{ backgroundColor: ColorCode.AddUserBGColor, justifyContent: 'center', alignItems: 'center', padding: 15, marginTop: '5%', marginLeft: wp(2), marginRight: wp(2), height: hp(22) }}>
                        <Image source={require('../assets/plususer.png')} style={{ height: hp(9), width: wp(20) }}></Image>
                        <Text style={{ color: ColorCode.textColor, fontSize: 20, }}>Share More Friends</Text>
                    </View>
                </TouchableOpacity>
        </View>
        );
      }
    return (
        <SafeAreaView>
            <ImageBackground source={require('../assets/screen_bg.png')} style={styles.bgImageStyle}>

                <View style={{flex:1, margin: 5}}>
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        numColumns={2}
                        ListHeaderComponent={FlatList_Header}
                    />
                </View>
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
        marginTop: hp(4),
        alignItems: "center",
        justifyContent: 'center',
    },
    imageStyle: {
        height: hp(15),
        width: Platform.OS == "ios" ? wp(57) : wp(53)
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
        // marginTop: hp(2),
        borderRadius: 6,
        //borderColor: ColorCode.text_color,
    },
    placeholderStyle: {
        color: ColorCode.text_color,
        fontSize: Platform.OS == "ios" ? 20 : 18
    }
})
export default HomeScreen;