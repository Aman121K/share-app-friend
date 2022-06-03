import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, ImageBackground, StyleSheet, PermissionsAndroid, Image, TextInput, TouchableOpacity, Platform, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ColorCode from '../Constant/colorCode';

import Contacts from 'react-native-contacts';
import ListItem from '../Components/ListItem';

const DATA = [
    {
        id: 1,
        name: 'Tim Roberts',
        status: 'Delivered',

    },
    {
        id: 2,
        name: 'Kelly Barnet',
        status: 'Delivered',

    },
    {
        id: 3,
        name: 'Bianca Samuels',
        status: 'Delivered',

    },

]

const ShareMoreFriendsScreen = ({ navigation }) => {
    const [radioCheckbox, setRadioCheckbox] =useState(false);
    let [contacts, setContacts] = useState([]);
    const [hideSearch, setHideSearch] =useState(false);
    

    useEffect(() => {
        if (Platform.OS === 'android') {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
                title: 'Contacts',
                message: 'This app would like to view your contacts.',
            }).then(() => {
                loadContacts();
            }
            );
        } else {
            loadContacts();
        }
    }, []);

    const loadContacts = () => {
        Contacts.getAll()
            .then(contacts => {
                contacts.sort(
                    (a, b) =>
                        a.givenName.toLowerCase() > b.givenName.toLowerCase(),
                );
                setContacts(contacts);
            })
            .catch(e => {
                alert('Permission to access contacts was denied');
                console.warn('Permission to access contacts was denied');
            });
    };

    const search = (text) => {
        const phoneNumberRegex =
            /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
        if (text === '' || text === null) {
            loadContacts();
        } else if (phoneNumberRegex.test(text)) {
            Contacts.getContactsByPhoneNumber(text).then(contacts => {
                contacts.sort(
                    (a, b) =>
                        a.givenName.toLowerCase() > b.givenName.toLowerCase(),
                );
                setContacts(contacts);
                console.log('contacts', contacts);
            });
        } else {
            Contacts.getContactsMatchingString(text).then(contacts => {
                contacts.sort(
                    (a, b) =>
                        a.givenName.toLowerCase() > b.givenName.toLowerCase(),
                );
                setContacts(contacts);
                console.log('contacts', contacts);
            });
        }
    };

    const openContact = (contact) => {
        console.log('connntttttt---->>>>',contact);
        Contacts.openExistingContact(contact);
    };

    const toggleRadioButton =()=>{
        setRadioCheckbox(!radioCheckbox)
    }

    const searchBar=()=>{
        setHideSearch(!hideSearch)
    }

    const renderItem = ({ item }) => {
        return (
            <View style={{ alignItems: 'center', flexDirection: 'row', marginLeft: wp(6), marginRight: wp(6), paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',  width: '60%' }}>
                    <TouchableOpacity onPress={()=>toggleRadioButton()}>
                      { !radioCheckbox ?
                       <Image
                            source={require('../assets/radio_uncheck.png')}
                            style={{ height: 30, width: 30,  }}
                        />:
                          <Image
                            source={require('../assets/radio_doublecheck.png')}
                            style={{ height: 30, width: 30,  }}
                        />
                        }
                    </TouchableOpacity>
                    <View style={{ marginLeft: wp(3) }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>{item.name}</Text>
                    </View>
                </View>
                <View style={{marginLeft:'17%',}}>
                    <Text style={{ fontSize: 18, color: 'black' }}>{item.status}</Text>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView>
            <View style={styles.bgImageStyle}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', margin: '4%' }}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Image source={require('../assets/back_arrow_right.png')} style={{ width: 30, height: 30, transform: [{ rotate: '180deg' }], }}></Image>
                    </TouchableOpacity>
                    { !hideSearch ? 
                  <TouchableOpacity onPress={()=>searchBar()}>
                  <View>
                        <Image source={require('../assets/search.png')}  ></Image>
                    </View>
                  </TouchableOpacity>:
               
                 <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute',  right: 0 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: ColorCode.white_color, paddingHorizontal: 6, borderRadius: 5, borderWidth: 2, borderColor: ColorCode.orangeColor}}>
                            <Image source={require('../assets/search.png')}  ></Image>
                            <TextInput
                                onChangeText={search}
                                placeholder="Search"
                                style={styles.searchBar}
                            />
                        </View>

                        <TouchableOpacity onPress={()=>searchBar()}>
                            <Text style={{ fontSize: 14, color: ColorCode.text_color, fontWeight: 'bold', marginLeft: hp(1) }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>}
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '2%' }}>
                    <Text style={styles.textStyle}>Sharing friends with: AnyData.com / Tell Your Friends!</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: '5%' }}>
                    <TouchableOpacity>
                        <View>
                            <Text style={styles.placeholderStyle}>All shared friends</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ borderWidth: .5, height: hp(4), borderColor: ColorCode.gray_Color, }} />
                    <TouchableOpacity>
                        <View>
                            <Text style={styles.placeholderStyle}>Friends who took action</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ borderWidth: 1, borderColor: ColorCode.gray_Color, marginTop: '2%' }} />
                <View style={{ marginTop: '5%' }}>

                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        numColumns={1}
                    />
                </View>

       {    !radioCheckbox ?
            <TouchableOpacity style={{ marginLeft: wp(5), marginRight: wp(5), marginTop: Platform.OS == 'ios' ? hp(37) : hp(40)  }} onPress={()=>navigation.navigate('ThanksScreen')} >
                    <View style={styles.textInputViewStyle}>
                        <Text style={{ color: ColorCode.white_color, fontSize: 18, }}>RE-SEND MESSAGE TO SELECTED</Text>
                    </View>
                </TouchableOpacity>:

                <TouchableOpacity style={{ marginLeft: wp(5), marginRight: wp(5), marginTop: hp(40) }} onPress={()=>navigation.navigate('ThanksScreen')} >
                <ImageBackground source={require('../assets/light_blue.png')} style={styles.textInputViewStyle}>
                        <Text style={{ color: ColorCode.white_color, fontSize: 18, }}>RE-SEND MESSAGE TO SELECTED</Text>
                    </ImageBackground>
                </TouchableOpacity>}

                {radioCheckbox ?
                    <TouchableOpacity onPress={()=>navigation.navigate('ContactScreen')} style={{ marginLeft: wp(5), marginRight: wp(5), marginTop: hp(2) }}>
                <View style={styles.textInputViewStyle}>
                        <Text style={{ color: ColorCode.white_color, fontSize: 18, }}>SHARE MORE FRIENDS</Text>
                    </View>
                </TouchableOpacity>:

                <TouchableOpacity onPress={()=>navigation.navigate('ContactScreen')} style={{ marginLeft: wp(5), marginRight: wp(5), marginTop: hp(2) }}>
                    <ImageBackground source={require('../assets/btn_blue.png')} style={styles.textInputViewStyle}>
                        <Text style={{ color: ColorCode.white_color, fontSize: 18, }}>SHARE MORE FRIENDS</Text>
                    </ImageBackground>
                </TouchableOpacity>}
            </View>
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
        backgroundColor: ColorCode.brown_color,
        height: hp(8),
        // marginTop: hp(2),
        borderRadius: 3,
        //borderColor: ColorCode.text_color,
    },
    placeholderStyle: {
        color: ColorCode.text_color,
        fontSize: 18,
        fontWeight: '500'
    },
    searchBar: {
        //backgroundColor: ColorCode.white_color,
        width: wp(60),
        height: hp(6),
        marginLeft: wp(1),
        // padding: 10,
        //  paddingVertical: Platform.OS === 'android' ? undefined : 15,
    },
})
export default ShareMoreFriendsScreen;