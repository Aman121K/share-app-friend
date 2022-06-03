import React, { useState } from 'react'
import { View, Text, ImageBackground, Image, Platform, SectionList, StyleSheet, Alert, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ColorCode from '../Constant/colorCode';
import { useSelector, useDispatch } from 'react-redux';
import { setReferralCode, setPhone, setSelectedContact, setUserDetails, setNotification } from '../ReduxUtils/action';
import { getNotification_Api , randomNumber } from '../Utils/api';
import md5 from 'md5';

const DATAFlatlist = [

    {
        id: 1,
        title: 'Notifications',
        src: require('../assets/small_notification1.png'),
        nav_key: 'Notification',
        nav_props: { selectedIndex: 1 },
        src2: require('../assets/badge.png')
    },
    {
        id: 2,
        title: 'View status of shared friends',
        src: require('../assets/viewStatus.png'),
        nav_key: 'ViewStatusofSharedFriends',
        nav_props: { selectedIndex: 2 },
        // src2: require(''),
    },
    {
        id: 3,
        title: 'Add another account name or ID#',
        src: require('../assets/small_add.png'),
        nav_key: 'ShareAccountScreen',
        nav_props: { selectedIndex: 3 },
        // src2: require(''),
    },
]




const DrawerBg = ({ navigation }) => {
    const { details: { refercode = '', name = '', phone = '',  } = {} } = useSelector(store => store)
console.log('========', refercode, name, phone)
    const dispatch = useDispatch();
    const [hideList, setHideList] = useState(false);
    const [arrow, setArrow] = useState(false)
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
          
            getNotification_Api(final_key, campaignId, userPhone).
            then((res) => {
                console.log('res--->>123', res)
            console.log('res11122--->>', res.ResponseCode, res.ResponseText)
                if (res.ResponseCode === "1") {
                    console.log("ResponseCode1--->",  res.data[0].business_name,)

                    navigation.navigate('Notification', {
                        b_name: res.data[0].business_name,
                        msg: res.data[0].message,
                        refercode: campaignId,
                        date: res.data[0].date,
                        type: res.data[0].Type,
                        subject: res.data[0].subject,
                        rname: res.date[0].name
                    })
                } else {
                    console.log("else--->")
                //    setLoading(false)
                //     okButton()
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
    const DATA = [
        {
            title: 'Tell Your Friends!',
            data: ["campaign1", 'campaign2']
            // title: dispatch(setUserDetails(businessName)),
            // data:[ dispatch(setUserDetails(campaignName))],
    
        },
    ];

    const openList = () => {
        console.log("arrow--->", arrow)
        setHideList(!hideList)
        setArrow(!arrow)
        // Alert.alert('hide List')
    }

    const renderItemFlatlist = ({ item,  }) => {
        const { nav_key, nav_props } = item
        return (
            <TouchableOpacity onPress={() => {nav_key== 'Notification'  ? notificationApi() : navigation.navigate(nav_key, nav_props )}} style={{ flexDirection: 'row',  alignItems: 'center', justifyContent: 'flex-start', margin: '5%' }}>
                <Image source={item.src}></Image>
                <Text style={{ color: ColorCode.white_color, fontSize: 14, padding: 12 }}>{item.title}</Text>
                <Image source={item.src2} style={{height: 30, width: 30, marginLeft: '25%'}}></Image>
            </TouchableOpacity>
        )
    }

    const Item = ({ title, }) => (
        <View>
            {/* <Text style={styles.title}>{title}</Text> */}
            <TouchableOpacity style={{ marginLeft: '20%' }} >
                <Text style={{ color: ColorCode.white_color, fontSize: 14, padding: 12 }}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
    return (
        <View style={{ height: '100%', width: '100%' }}>
            <ImageBackground source={require('../assets/screen_bg.png')} style={{ height: '100%', width: '100%', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <Text style={{ color: ColorCode.white_color, fontSize: 18, fontWeight: 'bold', marginTop: Platform.OS == 'ios' ? hp(5) : 0, padding: 10, margin: '5%' }}>Share Some Friends with:</Text>
                <TouchableOpacity onPress={() => openList()} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: '5%' }} >

                    <Text style={{ color: ColorCode.white_color, fontSize: 14, padding: 12 }}>Tell Your Friends!</Text>
                   { !arrow  ?
                    <Image source={require('../assets/right_arrow2.png')} style={{ height: 14, width: 14, marginLeft: Platform.OS == "ios" ? wp(20) : wp(25) }}></Image>:
                    <Image source={require('../assets/right_arrow2.png')} style={{ transform: [{ rotate: '90deg' }],  height: 14, width: 14,marginLeft: Platform.OS == "ios" ? wp(20) : wp(25) }}></Image>
                    }
                </TouchableOpacity>


                {hideList &&
                    <SectionList
                        sections={DATA}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item }) => 
                        
                            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                <Item title={item} />
                                <Image source={require('../assets/right_tick.png')} style={{height: 15, width: 15, marginLeft: '30%'}}></Image>
                            </View>
                        
                    }
                    // renderSectionHeader={({ section: { title } }) => (
                    //     <TouchableOpacity 
                    //      onPress={() => console.log('list not show')}
                    //      style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: '5%' }} >
                    //     <Text style={{ color: ColorCode.white_color, fontSize: 14, padding: 12 }}>{ title }</Text>
                    //     <Image source={require('../assets/right_arrow2.png')} style={{ height: 14, width: 14, marginLeft: wp(15) }}></Image>
                    // </TouchableOpacity>
                    // )}
                    />}
                <FlatList
                    data={DATAFlatlist}
                    renderItem={renderItemFlatlist}
                    keyExtractor={item => item.id}
                />
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24
    }
})
export default DrawerBg;