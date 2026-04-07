/**
 * Checkbox
 */
import React, {useState} from 'react';
import {TouchableOpacity, Text, Image, View} from 'react-native';
import styles from './style';

const CheckBoxSec = (props: any) => {
  const {
    value,
    title,
    checkOnpress,
    PrivacyOnpress,
    TermsOnpress,
    isshowText,
    viewContainer,
    Checkdisabled,
    ImgViewStyle,
  } = props || {};

  return (
    <TouchableOpacity
      disabled={Checkdisabled}
      style={[styles.viewContainer, viewContainer]}
      onPress={checkOnpress}>
      {value ? (
        <Image
          source={require('../../../assets/images/checkedBox.png')}
          style={[styles.ImgViewStyle, ImgViewStyle]}
        />
      ) : (
        <Image
          source={require('../../../assets/images/UncheckedBox.png')}
          style={[styles.ImgViewStyle, ImgViewStyle]}
        />
      )}
    </TouchableOpacity>
  );
};

export default CheckBoxSec;
