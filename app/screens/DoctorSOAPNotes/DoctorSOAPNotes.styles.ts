import { Dimensions, StyleSheet } from "react-native";
import { Colors, Font, Layout } from "style";
const Height = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    // ...Layout.containerWithPadding,
    flex: 1,
    padding:10,
    backgroundColor:Colors.white,
  },
  container1: {
    // ...Layout.containerWithPadding,
    flex: 1,
    padding:10,
    backgroundColor:Colors.white,
  },
  headingStyle:{
    fontSize:19,
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
