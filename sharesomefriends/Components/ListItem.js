import React, {memo, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ColorCode from '../Constant/colorCode';

// const getAvatarInitials = (textString) => {
  
//   if (!textString) return '';
//   const text = textString.trim();
//   const textSplit = text.split(' ');
//   if (textSplit.length <= 1) return text.charAt(0);
//   const initials =
//     textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);
//   return initials;
// };

const ListItem = (props) => {
  // const [radioCheckbox, setRadioCheckbox] =useState(false);

  // const toggleRadioButton =()=>{
  //     setRadioCheckbox(!radioCheckbox)
  // }
  // const shouldComponentUpdate = () => {
  //   return false;
  // };
  const {item, onPress} = props;
  return (
    <View>
        <View style={styles.itemContainer}>
         
          <View style={styles.leftElementContainer}>
          {/* <TouchableOpacity onPress={()=>toggleRadioButton()}>
                      { !radioCheckbox ?
                       <Image
                            source={require('../assets/radio_uncheck.png')}
                            style={{ height: 30, width: 30,  }}
                        />:
                          <Image
                            source={require('../assets/radio_check.png')}
                            style={{ height: 30, width: 30,  }}
                        />
                        }
                    </TouchableOpacity> */}
          <Image source={require('../assets/user.png')} style={{height: 30, width: 30, marginLeft:wp(2)}}></Image>
            {/* <Avatar
              img={
                item.hasThumbnail ?
                  {uri: item.thumbnailPath} : undefined
              }
              placeholder={getAvatarInitials(
                `${item.givenName} ${item.familyName}`,
              )}
              width={40}
              height={40}
            /> */}
          </View>
          <View style={styles.rightSectionContainer}>
            <View style={styles.mainTitleContainer}>
              <Text
                style={
                  styles.titleStyle
                }>{`${item.givenName} ${item.familyName}`}</Text>
                  {item.phoneNumbers.map( ({number}) => <Text>{number}</Text>)}
                {/* <Text
                style={
                  styles.titleStyle
                }>{`${item.phoneNumbers['number']}`}</Text> */}
            </View>
          </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
  flexDirection: 'row',
    minHeight: 44,
    height: 63,
  },
  leftElementContainer: {
   // flexDirection:'row',
  justifyContent: 'center',
    alignItems: 'center',
   // flex: 2,
   // paddingLeft: 10,
    // margin: '3%'
  },
  rightSectionContainer: {
    marginLeft: 12,
    alignItems: 'center',
    justifyContent:'center'
    // flexDirection: 'row',
    // flex: 20,
   // borderBottomWidth: StyleSheet.hairlineWidth,
   // borderColor: '#515151',
  },
  mainTitleContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
   // flex: 1,
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: '500',
    color: ColorCode.black_color
  },
});

export default memo(ListItem);

ListItem.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
};