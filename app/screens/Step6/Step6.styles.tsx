
import { StyleSheet } from "react-native";
import { Colors } from "style";

export const styles = StyleSheet.create({
    StepText:{
        fontSize:18,
        color:Colors.AppColorSecondory,
        fontWeight:'bold',
        marginTop:'5%'
      },
      symptomsContainer: {
        marginRight: 10,
        marginTop: 10,
      },
      symptomText: {
        // marginTop:'-10',
        fontSize: 13,
        width: "70%",
        height: "auto",
        padding: 5,
      },
      symptomText1: {
        // marginTop:'-10',
        fontSize: 13,
        width: "65%",
        height: "auto",
        padding: 5,
        color:'#313195',
        fontWeight:'700'
      },
      text: {
        textAlign: "center",
      },
      HeaderText:{
        fontSize: 13,
        height: "auto",
        padding: 5,
        color:'#313195',
        fontWeight:'bold'
      },
      HeaderText1:{
        fontSize: 20,
        height: "auto",
        padding: 10,
        color:'#313195',
        fontWeight:'bold'
      },
});