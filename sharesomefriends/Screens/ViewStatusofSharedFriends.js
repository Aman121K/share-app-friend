import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, ImageBackground, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { HeaderComponent } from '../Components';
import ColorCode from '../Constant/colorCode';
const ViewStatusofSharedFriends = ({ navigation }) => {
    return (

        <SafeAreaView>
            <View style={styles.containerStyle}>
                <HeaderComponent props='Status of Shared friends' navigation={navigation} drawer={true}  />
                <TouchableOpacity onPress={()=>navigation.navigate("ContactScreen")} style={{ marginLeft: wp(5), marginRight: wp(5), marginTop: Platform.OS =='ios'?hp(77): hp(85) }}>
                    <ImageBackground source={require('../assets/btn_blue.png')} style={styles.textInputViewStyle}>
                        <Text style={{ color: ColorCode.white_color, fontSize: 18, }}>SHARE MORE FRIENDS</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    containerStyle: {
        height: '100%',
        width: '100%',

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
});

export default ViewStatusofSharedFriends;