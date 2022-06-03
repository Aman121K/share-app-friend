// export const SET_USER_NAME = 'SET_USER_NAME';
// export const SET_USER_PHONE = 'SET_USER_PHONE';
// export const SET_REFERRALCODE = 'SET_REFERRALCODE';
// export const SET_SELECTED_CONTACT = 'SET_SELECTED_CONTACT';
// export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const SET_USER_DETAILS ='SET_USER_DETAILS';
//  const details = [userName,userPhone,refercode, friendContact, home]

export const setUserDetails = details  => {
    return {
         type: SET_USER_DETAILS ,
         payload: details
     }
 };


// export const setNotification = notifications  => {
//    return {
//         type: SET_NOTIFICATION ,
//         payload: notifications,
//     }
// };

// export const setUserPhone = userPhone  => {
//     return {
//          type: SET_USER_PHONE ,
//          payload: userPhone,
//      }
//  };

//  export const setReferralCode = refercode  => {
//     return {
//          type: SET_REFERRALCODE ,
//          payload: refercode,
//      }
//  };
 
//  export const setSelectedContact = friendContact  => {
//     return {
//          type: SET_SELECTED_CONTACT ,
//          payload: friendContact,
//      }
//  };

//  export const setHomeScreen = home  =>{
//     return {
//          type: SET_USER_HOME,
//          payload: home,
//      }
//  };
