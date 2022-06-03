import React, {useState} from 'react';
import { View, StyleSheet, SafeAreaView, } from 'react-native';
import { WebView } from 'react-native-webview';
import { HeaderComponent } from '../Components';
import ColorCode from '../Constant/colorCode';
import Loading from 'react-native-whc-loading';

const TermsScreen = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    return (
        <SafeAreaView>
            <View style={styles.containerStyle}>
                <HeaderComponent  props='Terms & Conditions' drawer={false}  backbutton={true} navigation={navigation} />
                <WebView 
                onLoad={()=>setLoading(false)}
                    source={{
                        uri: 'https://sharesomefriends.com/terms-of-use-privacy-policy/'
                    }}
                    style={{ marginTop: 10, backgroundColor: ColorCode.white_color }}
                />
                <Loading loading={isLoading} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        height: '100%',
        width: '100%',
        backgroundColor: ColorCode.white_color
    }
})

export default TermsScreen;