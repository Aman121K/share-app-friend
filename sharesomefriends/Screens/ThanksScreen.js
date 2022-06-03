import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, Platform, Pressable, Alert, FlatList, BackHandler, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ColorCode from '../Constant/colorCode';
import Modal from "react-native-modal";
import  HeaderComponent  from '../Components/HeaderComponent';

const DATA = [
    {
        id: 1,
        title: 'Facebook',
        src: require('../assets/facebook.png')
    },
    {
        id: 2,
        title: 'Twitter',
        src: require('../assets/twitter3.png')
    },
    {
        id: 3,
        title: 'Message',
        src: require('../assets/message2.png')
    },
   
]

const ThanksScreen = ({ navigation, route, props }) => {
    const { b_name, c_name, Message, URL, user_name, friendList, campaignId, phone, type } = route.params
    const[button, buttonPress] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false);

    useEffect( (props) => {   
         
        setModalVisible(true);
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {return true} );
      
          return () => backHandler.remove();
    }, [])


    const toggleModal = () => {
       
         setModalVisible(true);
         buttonPress(!button)
        navigation.navigate('ContactScreen', {
            b_name: b_name, c_name: c_name, Message: Message, URL: URL, user_name: user_name, friendList: friendList, campaignId: campaignId, phone: phone, type: type 
           })
           
    };

    const okButton =()=>{
        setModalVisible(!isModalVisible);
    }


    const renderItem = ({ item }) => {
        return (
            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', padding: 6}}>
                <TouchableOpacity>
                    <Image
                        source={item.src}
                       // style={styles.renderImg}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView>
            <ImageBackground source={require('../assets/signup_bg.png')} style={styles.bgImageStyle}>
            <HeaderComponent navigation={navigation} drawer={true} />
           {/* <TouchableOpacity onPress={()=>navigation.openDrawer()}>
           <View style={{ marginTop: hp(2), marginLeft: wp(6)}}>
                <Image source={require('../assets/menu.png')} style={{width:30, height: 30}}></Image>
            </View>
           </TouchableOpacity> */}
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp(15), }}>
                    <Text style={{ fontSize: 20, color: ColorCode.blueColor, fontWeight: 'bold' }}>Thanks for Sharing</Text>
                    <Text style={{ fontSize: 20, color: ColorCode.blueColor, fontWeight: 'bold' }}>Some Friends with {b_name}!</Text>
                </View>

                <TouchableOpacity style={{ marginLeft: wp(6), marginRight: wp(6), marginTop: hp(6)}} onPress={() => toggleModal()}>
                    <ImageBackground source={require('../assets/light_blue.png')} style={styles.textInputViewStyle}>
                        <Text style={{ color: ColorCode.white_color, fontSize: 18,  }}>SHARE MORE FRIENDS</Text>
                    </ImageBackground>
                </TouchableOpacity>

             <Modal
                        animationType={'slide'}
                        transparent={true}
                        onBackdropPress={() => toggleModal()}
                        onRequestClose={() => toggleModal()}
                        isVisible={isModalVisible}
                        // onRequestClose={() => {
                        //     setModalVisible(!modalVisible);
                        //     console.log('Modal has been closed.');
                        // }}
                        >
                        <View style={styles.modalStyle}>
                            <View style={{
                                backgroundColor: '#06385b', justifyContent: 'center', alignItems: 'center', padding:6,
                            }}>
                                <Text style={[styles.textStyle, { color: '#e5e5f0' }]}>Share Some Friends</Text>
                            </View>
                            <View style={styles.modalTextView}>
                                <Text style={[styles.modalText, { color: '#424242' }]}>Message Sent</Text>
                                {/* <Text style={[styles.modalText, { color: '#424242' }]}>or ID.</Text> */}
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
                                            <Text style={[styles.modalText, { color: '#212121', padding: 6 }]}>OK</Text>
                                        </View>

                                    )}
                                </Pressable>
                               
                            </View>
                        </View>
                    </Modal>

                <TouchableOpacity style={{ marginLeft: wp(6), marginRight: wp(6), marginTop: hp(2) }} onPress={()=>navigation.navigate('ShareMoreFriendsScreen', {
                        b_name: b_name, c_name: c_name, Message: Message, URL: URL, user_name: user_name, friendList: friendList, campaignId: campaignId, phone: phone, type: type 
                       })}>
                    <ImageBackground source={require('../assets/btn_blue.png')} style={styles.textInputViewStyle}>
                        <Text style={{ color: ColorCode.white_color, fontSize: 18,  }}>VIEW LIST OF SHARED FRIENDS</Text>
                    </ImageBackground>
                </TouchableOpacity>

                <View style={{justifyContent: 'center', alignItems: 'center', marginTop:'5%'}}>
                <FlatList
                            data={DATA}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            numColumns={3}
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
        fontSize: 18,
        color: ColorCode.text_color,
        //fontWeight: 'bold'
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
    },
    modalStyle: {
        backgroundColor: 'white',
        marginHorizontal: '5%',
        borderWidth: 1
    },
    modalText: {
        fontSize: Platform == 'ios' ? 21 : 19,
    },
    modalTextView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '2%',
      //  borderBottomWidth: 1,
        padding: 8
    },
    OKStyle: {
        // backgroundColor: '#d2d2d2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    }
})
export default ThanksScreen;