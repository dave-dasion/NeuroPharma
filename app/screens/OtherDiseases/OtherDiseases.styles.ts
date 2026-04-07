import { Dimensions, StyleSheet } from "react-native";
import { Colors, Font, Layout } from "style";
const Height = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    ...Layout.containerWithPadding,
  },
});
