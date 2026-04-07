import { Dimensions, StyleSheet } from "react-native";
import { Colors, Font, Layout } from "style";
const Height = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    ...Layout.containerWithPadding,
  },
  headingStyle:{
    fontSize:16,
    fontWeight:'bold',
    color:'#000'
  },
  descriptionTextStyle:{
    fontSize:13,
    fontWeight:'500',
    color:'gray',
    // left:10
  }
});
