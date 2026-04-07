import { StyleSheet } from "react-native";

import { Layout } from "style";

export default StyleSheet.create({
  container: Layout.containerWithPadding,
  title: {
    paddingTop: 14,
    paddingBottom: 4,
  },
  cardStyle: {
    backgroundColor: '#efefef',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  cardField: {
    height: 50,
    marginVertical: 30,
  },
  appLogoStyle: {
    height: 300,
    width: "100%",
    resizeMode: 'contain',
  },
  paragraph: {
    paddingVertical: 20,
    
  },
  separator: {
    height: 30,
  },
  boldText: {
    fontWeight: 'bold',
  },
  mediumText: {
    fontWeight: '500', // Medium weight
  },
  input: {
    // flex:1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
    paddingLeft: 30,
    borderRadius:5,
    fontSize:15,
    fontWeight:'500'
  },
  passwordContainer: {
    position: "relative",
},
dollarSign: {
  position: "absolute",
  left: 10,
  top: 10,
},
});
