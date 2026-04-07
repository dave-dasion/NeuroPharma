import { StyleSheet } from "react-native";

import { Colors, Layout } from "style";

const styles = StyleSheet.create({
  container: {
    ...Layout.containerWithPadding,
    top:50,
    // paddingBottom:150

  },
  info: {
    paddingTop: 20,
    paddingBottom: 16,
  },
  separator: {
    height: 90,
  },
  rowView: {
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: "center",
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'white',
    // bottom: 60,
    // top: -20,
    // right:10
    height:50,
    // backgroundColor:'red'
  },
  appLogoStyle: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    tintColor: Colors.black
  },
  appBannerStyle: {
    height: 130,
    width: 130,
    resizeMode: 'contain',
    tintColor:  Colors.black,
    marginLeft: '5%'
  },
});

export default styles;
