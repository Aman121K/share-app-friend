import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Notification from '../Screens/Notification';
import ViewStatusofSharedFriends from '../Screens/ViewStatusofSharedFriends';
import MainStack from '../Navigation/StackNavigation';
import DrawerBg from '../Components/DrawerBg';
import { useSelector } from 'react-redux';

const Drawer = createDrawerNavigator();


const DrawerNavigator = () => {
    return (
        <Drawer.Navigator screenOptions={{headerShown:false, drawerType: 'front', }} drawerContent={DrawerBg} initialRouteName="MainStack" >
            <Drawer.Screen name='MainStack' component={MainStack} />
            <Drawer.Screen name='ViewStatusofSharedFriends' component={ViewStatusofSharedFriends} />
            <Drawer.Screen name='Notification' component={Notification} />
        </Drawer.Navigator>
    )
}
export default DrawerNavigator;