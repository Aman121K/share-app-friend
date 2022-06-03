import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import LoginScreen from '../Screens/LoginScreen';
import ContactScreen from '../Screens/ContactScreen';
import ForgetPasswordScreen from '../Screens/ForgetPasswordScreen';
import HomeScreen from '../Screens/HomeScreen';
import SignupScreen from '../Screens/SignupScreen';
import ReferredScreen from '../Screens/ReferredScreen';
import ShareMoreFriendsScreen from '../Screens/ShareMoreFriendsScreen';
import SendMessageScreen from '../Screens/SendMessageScreen';
import ThanksScreen from '../Screens/ThanksScreen';
import ShareAccountScreen from '../Screens/ShareAccountScreen';
import DrawerBg from '../Navigation/DrawerNavigation';
import TermsScreen from '../Screens/TermsScreen';
import { useSelector } from 'react-redux';

const MainStack = () => {
     const { details } = useSelector(store => store)
console.log(  'homescreen--->>', details)
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName= { details ? 'HomeScreen' : "ShareAccountScreen"}>
            <Stack.Screen name="ShareAccountScreen" component={ShareAccountScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ContactScreen" component={ContactScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen} options={{ headerShown: false }} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ReferredScreen" component={ReferredScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ShareMoreFriendsScreen" component={ShareMoreFriendsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SendMessageScreen" component={SendMessageScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ThanksScreen" component={ThanksScreen} options={{ headerShown: false }} />
            <Stack.Screen name="DrawerBg" component={DrawerBg} options={{ headerShown: false }} />
            <Stack.Screen name="TermsScreen" component={TermsScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
    );
}
export default MainStack;