import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Pressable, Platform, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { HeaderComponent } from '../Components';
import Modal from "react-native-modal";
import ColorCode from '../Constant/colorCode';
import Loading from 'react-native-whc-loading';
import { getNotification_Api , randomNumber } from '../Utils/api';
import { useSelector, useDispatch } from 'react-redux';
import md5 from 'md5';
const DATA = [
    {
        id: 1,
        From: "From::",
        Subject: 'Subject:',
        msg: '',
        date: '',
       
    },
    {
        id: 2,
        From: "From::",
        Subject: 'Subject:',
        title: '',
        date: '',
    },
    {
        id: 3,
        From: "From::",
        Subject: 'Subject:',
        title: '',
        date: '',
    },
]

const Notification = ({ navigation, route }) => {
    const { business_name, refercode, date, msg, subject, type, rname } = route.params
    
    const [isModalVisible, setModalVisible] = useState(false);
    const [isLoading, setLoading] = useState(false);
    useEffect((props) => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setModalVisible(true);
            
        }, 1000)
       
    }, [])




    const toggleModal = () => {

        setModalVisible(!isModalVisible);
        

    };
       const okButton =()=>{
        setModalVisible(!isModalVisible);
    }

    const renderItem = ({ item, }) => {

        return (
        
            
                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', borderBottomWidth: 1, borderBottomColor: ColorCode.grayColor, padding: 4, marginLeft: '4%', marginRight:'4%' }}>
                    <Text style={{fontWeight: '500', fontSize: 12, color: ColorCode.black_color}}>{item.From + " " + business_name}</Text>
                    <Text style={{fontWeight: '500', fontSize: 12, color: ColorCode.black_color}}>{item.Subject+ " " + subject}</Text>
                    <Text style={{fontWeight: '500', fontSize: 12, color: ColorCode.black_color}} >{msg}</Text>
                    <Text style={{ fontSize: 12}}>{date}</Text>
                </View>
         
        )
    }

    return (
        <SafeAreaView>
            <ImageBackground source={require('../assets/signup_bg.png')} style={styles.bgImageStyle}>
            <View style={styles.containerStyle}>
                <HeaderComponent props='Notifications' navigation={navigation} drawer={true} />
                 
                 <View style={{marginTop: '2%'}}>
                 <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                 </View>



                
                <Modal
               // coverScreen={true}
                    // animationType={'slide'}
                    transparent={true}
                    onBackdropPress={() => toggleModal()}
                    onRequestClose={() => toggleModal()}
                    isVisible={isModalVisible}
                >
                    <View style={styles.modalStyle}>
                        <View style={{
                            backgroundColor: '#06385b', justifyContent: 'center', alignItems: 'center', padding: 6,
                        }}>
                            <Text style={[styles.textStyle, { color: '#e5e5f0' }]}>Share Some Friends</Text>
                        </View>
                        <View style={styles.modalTextView}>
                            <Text style={[styles.modalText, { color: '#424242' }]}>You have no notifications at presents.</Text>

                        </View>
                        <View style={{ padding: 14 }}>
                            <TouchableOpacity onPress={() => okButton()} style={styles.OKStyle}>
                                <View>
                                    <Text style={[styles.modalText, { color: '#212121', padding: 6 }]}>OK</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>
                <Loading loading={isLoading} />
            </View>
            </ImageBackground>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    containerStyle: {
        height: '100%',
        width: '100%',
    },
    modalStyle: {
        backgroundColor: 'white',
        marginHorizontal: '5%',
        borderWidth: 1
    },
    modalText: {
        fontSize: Platform == 'ios' ? 21 : 16,
    },
    modalTextView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '2%',
        //  borderBottomWidth: 1,
        padding: 10
    },
    OKStyle: {
        backgroundColor: '#d2d2d2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    textStyle: {
        //  marginTop: hp(0.5),
        fontSize: 18,
        color: ColorCode.text_color,
        //fontWeight: 'bold'
    },
});

export default Notification;