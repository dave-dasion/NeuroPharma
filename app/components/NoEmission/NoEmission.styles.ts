import { StyleSheet } from "react-native";

import { Layout } from "style";

export default StyleSheet.create({
  container: {
    ...Layout.containerWithPadding,
  },
  textView: {
    alignItems: "center",
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    // height:499,
    // backgroundColor:'red'
  },
  paragraph: {
    textAlign: "center",
    paddingVertical: 4,
    bottom:20
  },
  header: {
    paddingVertical: 14,
    bottom:20
  },
  button: {
    marginVertical: 0,
  },
});
