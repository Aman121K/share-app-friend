import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, Platform, PermissionsAndroid, FlatList, Linking, AppState, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ColorCode from '../Constant/colorCode';
import Contacts from 'react-native-contacts';
import ListItem from '../Components/ListItem';
import { useSelector, useDispatch } from 'react-redux';
import Loading from 'react-native-whc-loading';


const ContactScreen = ({ navigation, route, props }) => {

    const { details: { name = '', phone = '' } } = useSelector(state => state);
    const dispatch = useDispatch();
    const { b_name, c_name, refercode, Message, URL, type } = route.params
    console.log(b_name, 'params------***', c_name, refercode, Message, URL, type)
    const [contacts, setContacts] = useState([]);
    const [hideSearch, setHideSearch] = useState(false);
    const [radioCheckbox, setRadioCheckbox] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [filterContact, setFilterContact] = useState([])
    const [isLoading, setLoading] = useState(false);
    const [thanks, setThanks] = useState(AppState.currentState)


    useEffect(() => {

    setLoading(false)
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
            setLoading(true)
            loadContacts();
            
        }

            AppState.addEventListener('change', handleAppStateChange);
            return () => {
                AppState.removeEventListener('change', handleAppStateChange);
            };
 
    }, [thanks]);


    const handleAppStateChange = (nextAppState) => {
        console.log('App State:---- ' + nextAppState);
        setLoading(false)
        if (thanks != nextAppState ) {
            if (nextAppState === 'active' && contacts.find(item => item.isSelected)) {
                setLoading(true)

                console.log('App has come to the foreground!');
                navigation.navigate('ThanksScreen', { b_name: b_name, c_name: c_name, campaignId: refercode, Message: Message, URL: URL, Type: type, })

            }
            setLoading(true)

            setThanks(nextAppState);
        }
    };


    const loadContacts = () => {
setLoading(false)
        Contacts.getAll()
            .then(contacts => {

                const c = contacts.map((item) => ({ ...item, isSelected: false, }))

                c.sort(
                    (a, b) =>
                        a.givenName.toLowerCase() > b.givenName.toLowerCase(),
                );

                setContacts(c);

            })
            .catch(e => {
                alert('Permission to access contacts was denied');
                console.warn('Permission to access contacts was denied');
            });
    };

    const search = (searchString) => {
        setSearchString(searchString)
    };


    const searchBar = () => {
        setContacts(contacts)
        setHideSearch(!hideSearch)
        setSearchString('')
    }

    const renderItemOfContact = ({ item: contact, index }) => {
        {
            console.log("index-->>", index);
            console.log('contact -> ', contact);
        }

        return (
            <TouchableOpacity
                style={styles.leftElementContainer}
                onPress={() => {
                    setContacts((prev_contacts) => {
                        const indexOfContact = contacts.findIndex(item => item.recordID === contact.recordID)
                        console.log("contactIndex---->", indexOfContact)
                        console.log("previous-->", prev_contacts[indexOfContact])
                        prev_contacts[indexOfContact].isSelected = !prev_contacts[indexOfContact].isSelected;
                        return [...prev_contacts]
                    })
                }}>

                {contact.isSelected ?
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                        <Image
                            source={require('../assets/radio_check.png')}
                            style={{ height: 30, width: 30, }}
                        />
                        <ListItem
                            key={contact.recordID}
                            item={contact}

                        />
                    </View>
                    :
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('../assets/radio_uncheck.png')}
                            style={{ height: 30, width: 30, }}
                        />
                        <ListItem
                            key={contact.recordID}
                            item={contact}

                        />
                    </View>

                }

            </TouchableOpacity>
        );
    }


    return (
        <SafeAreaView>
            <View style={styles.bgImageStyle}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: hp(2), margin: '4%', }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View>
                            <Image source={require('../assets/back_arrow_right.png')} style={{ width: 25, height: 25, transform: [{ rotate: '180deg' }], }}></Image>
                        </View>
                    </TouchableOpacity>
                    {!hideSearch ?
                        <TouchableOpacity onPress={() => searchBar()}>
                            <View>
                                <Image source={require('../assets/search.png')}  ></Image>
                            </View>
                        </TouchableOpacity> :

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 0 }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: ColorCode.white_color, paddingHorizontal: 6, borderRadius: 5, borderWidth: 2, borderColor: ColorCode.orangeColor }}>
                                <Image source={require('../assets/search.png')}  ></Image>
                                <TextInput
                                    onChangeText={search}
                                    value={searchString}
                                    placeholder="Search"
                                    style={styles.searchBar}
                                />
                            </View>

                            <TouchableOpacity onPress={() => searchBar()}>
                                <Text style={{ fontSize: 14, color: ColorCode.text_color, fontWeight: 'bold', marginLeft: hp(1) }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>}
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '2%' }}>
                    <Text style={styles.textStyle}>Sharing friends with: {b_name + " / " + c_name}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '3%' }}>
                    <Text style={{ fontSize: 12, color: ColorCode.text_color, }}>Select Friends and tap next</Text>
                </View>


                <FlatList
                    data={!searchString ? contacts : contacts.filter(searchContact => searchContact.displayName.includes(searchString))}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={renderItemOfContact}
                />

                {!contacts.find(item => item.isSelected) ?
                    <TouchableOpacity style={{ marginLeft: wp(6), marginRight: wp(6), backgroundColor: ColorCode.brown_color }}
                        onPress={() => {


                            const value = contacts.filter(c => c.isSelected === true).map(item => ({
                                friend_name: item.displayName,
                                number: item.phoneNumbers.find((item => item.label === 'mobile')),
                                email: '',
                            }))

                            console.log(value.map((item) => item.number.number), 'url-->', URL)
                            if (type === "0") {
                                (name && phone) ?
                                    Linking.openURL(`sms:${value.map((item) => item.number.number)}?body=${Message + `\n` + "" + `\n` + name}`, { b_name: b_name, c_name: c_name, campaignId: refercode, friendList: value, Message: Message, URL: URL, Type: type, } )
                                    : navigation.navigate('ReferredScreen', { b_name: b_name, c_name: c_name, campaignId: refercode, friendList: value, Message: Message, URL: URL, Type: type, } )
                            } else {
                                navigation.navigate((name && phone) ?
                                    'SendMessageScreen'
                                    : 'ReferredScreen', { b_name: b_name, c_name: c_name, campaignId: refercode, friendList: value, Message: Message, URL: URL, Type: type, })
                            }
                        }}>
                        <View style={styles.textInputViewStyle2}>
                            <Text style={{ color: ColorCode.white_color, fontSize: 20, }}>NEXT</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={{ marginLeft: wp(6), marginRight: wp(6), }}
                        onPress={() => {
                            const value = contacts.filter(c => c.isSelected === true).map(item => ({
                                friend_name: item.displayName,
                                number: item.phoneNumbers.find((item => item.label === 'mobile')),
                                email: '',
                            }))

                            console.log(value.map((item) => item.number.number), 'url-->', URL)
                            if (type === "0") {
                                (name && phone) ?
                                    Linking.openURL(`sms:${value.map((item) => item.number.number)}?body=${Message + `\n` + "" + `\n` + name}`, { b_name: b_name, c_name: c_name, campaignId: refercode, friendList: value, Message: Message, URL: URL, Type: type, })
                                    : navigation.navigate('ReferredScreen', { b_name: b_name, c_name: c_name, campaignId: refercode, friendList: value, Message: Message, URL: URL, Type: type, }
                                    )
                            } else {
                                navigation.navigate((name && phone) ?
                                    'SendMessageScreen'
                                    : 'ReferredScreen', { b_name: b_name, c_name: c_name, campaignId: refercode, friendList: value, Message: Message, URL: URL, Type: type, })
                            }
                        }}>
                        <ImageBackground source={require('../assets/btn_blue.png')} style={styles.textInputViewStyle2}>
                            <Text style={{ color: ColorCode.white_color, fontSize: 20, }}>NEXT</Text>
                        </ImageBackground>
                    </TouchableOpacity>}
                <Loading loading={isLoading} />
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
        fontSize: 12,
        color: ColorCode.text_color,
        fontWeight: '500'
    },
    textInputViewStyle: {
        backgroundColor: ColorCode.white_color,
        height: hp(8),
        marginTop: hp(4),
        borderRadius: 6,
    },
    textInputViewStyle2: {
        width: '100%',
        height: hp(8),
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderStyle: {
        color: ColorCode.text_color,
        fontSize: Platform.OS == "ios" ? 20 : 18
    },
    searchBar: {
        width: wp(60),
        height: hp(6),
        marginLeft: wp(1),

    },
    leftElementContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 13,
    },
})
export default ContactScreen;