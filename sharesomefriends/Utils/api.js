import { Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSystemName, getSystemVersion, getIpAddress } from 'react-native-device-info';
import { setReferralCode, setPhone, setName } from '../ReduxUtils/action';
import RNFetchBlob from 'rn-fetch-blob';
import md5 from 'md5';

const baseUrl = "http://198.211.103.194/sharesomefriend/API-JSON_new/";
const getReferralCodeInfoNew = "getReferralCodeInfoNew.php";
const sendReferralCodeNew = "sendReferralCodeNew.php";
const getUserCampaigns = "getUserCampaigns.php";
const getNotification = 'getNotification.php';
const getNotificationCount = "getNotificationCount.php";


export const randomNumber = () => Math.floor(Math.random() * 10000000) + 1;

export async function getReferralCode_Api(final_key, campaignId, countryName, userName, userPhone, prefix,) {
  console.log(final_key, campaignId, userName, userPhone, countryName, prefix, 'params----')

  return new Promise((resolve, reject) => {
    try {
      fetch(baseUrl + getReferralCodeInfoNew, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refercode: campaignId, key: final_key, phone: userPhone, name: userName, country: countryName, prefix: prefix })
      }).then(
        res => res.json()
      ).then(responsejson => {
        // console.log("getReferralCode_Api response---->", responsejson)
        resolve(responsejson);
      }).catch(error => {
        console.log("getReferralCode_Api error---->", error)

        reject('error')
      })
    }
    catch (err) {
      console.log("error is", err)
      reject("error");
    }
  })
}

export async function sendReferralCodeNew_Api(final_key, campaignId, userPhone,  friends, friendName, friendsemail, Message, type ) {
console.log('parameters->', final_key, campaignId, userPhone,  friends, friendName, friendsemail, Message, type)

  return new Promise((resolve, reject) => {
    try {
      fetch(baseUrl +  sendReferralCodeNew, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        
        body: JSON.stringify({ key: final_key, refercode: campaignId, phone: userPhone, friends: friends, friendsname: friendName, friendsemail:friendsemail, message:Message, type: type })
        
      }).then(
        res => res.json()
      ).then(responsejson => {
        console.log("getReferralCode_Api response---->", responsejson)
        resolve(responsejson);

      }).catch(error => {
        console.log("getReferralCode_Api error---->", error)

        reject('error')
      })
    }
    catch (err) {
      console.log("error is", err)
      reject("error");
    }
  })
}


export async function getUserCampaigns_Api(final_key, campaignId, userPhone, userName ) {

  // console.log('abcd------>>>>', final_key, campaignId, userPhone, userName, device_token )
  return new Promise((resolve, reject) => {
    try {
      fetch(baseUrl + getUserCampaigns, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        
        body: JSON.stringify({ key: final_key, refercode: campaignId, phone: userPhone, name: userName,  })
        
      }).then(
        res => res.json()
      ).then(responsejson => {
        console.log("getReferralCode_Api response---->", responsejson)
        resolve(responsejson);

      }).catch(error => {
        console.log("getReferralCode_Api error---->", error)

        reject('error')
      })
    }
    catch (err) {
      console.log("error is", err)
      reject("error");
    }
  })
}

export async function getNotification_Api(final_key, campaignId, userPhone,  ) {

  console.log('abcd------>>>>', final_key, campaignId, userPhone )
  return new Promise((resolve, reject) => {
    try {
      fetch(baseUrl + getNotification, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        
        body: JSON.stringify({ key: final_key,  phone: userPhone, refercode: campaignId, })
        
      }).then(
        res => res.json()
      ).then(responsejson => {
        console.log("getNotification_Api response---->", responsejson)
        resolve(responsejson);

      }).catch(error => {
        console.log("getNotification_Api error---->", error)

        reject('error')
      })
    }
    catch (err) {
      console.log("error is", err)
      reject("error");
    }
  })
}

export async function getNotificationCount_Api(final_key, userPhone ) {

  // console.log('abcd------>>>>', final_key, userPhone )
  return new Promise((resolve, reject) => {
    try {
      fetch(baseUrl + getNotificationCount, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        
        body: JSON.stringify({ key: final_key, phone: userPhone })
        
      }).then(
        res => res.json()
      ).then(responsejson => {
        console.log("getReferralCode_Api response---->", responsejson)
        resolve(responsejson);

      }).catch(error => {
        console.log("getReferralCode_Api error---->", error)

        reject('error')
      })
    }
    catch (err) {
      console.log("error is", err)
      reject("error");
    }
  })
}