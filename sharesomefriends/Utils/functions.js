//Api_Call.js
import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventRegister } from 'react-native-event-listeners'
import { setReferralCode, setPhone, setName } from '../ReduxUtils/action';
import Toast from 'react-native-root-toast';

export function Show_Toast(Message) {
    let toast = Toast.show(Message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        onShow: () => {
            // calls on toast\`s appear animation start
        },
        onShown: () => {
            // calls on toast\`s appear animation end.
        },
        onHide: () => {
            // calls on toast\`s hide animation start.
        },
        onHidden: () => {
            // calls on toast\`s hide animation end.
        }
    });

    // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
    setTimeout(function () {
        Toast.hide(toast);
    }, 3000);
}

export async function checkInternetConnection() {
    return new Promise((resolve, reject) => {
        if (Platform.OS === "android") {
            NetInfo.fetch().then(state => {
                resolve(state.isInternetReachable)
            });
        } else {
            NetInfo.fetch().then(state => {
                resolve(state.isConnected)
            });
        }
    })
}

export function timeout(ms, promise) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject(new Error("timeout"))
        }, ms)
        promise.then(resolve, reject)
    })
}


export const randomNumber =()=>{
    const randomNumber = Math.floor(Math.random() * 10000000) + 1;
    console.log('randomNumber--->>', randomNumber, )
}