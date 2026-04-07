import { Platform, StyleSheet } from "react-native";
import { Colors } from "style";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
}, 
  heading:{
      flexDirection: 'column',
      // alignItems: 'center',
      },
      innerSteps:{
        flexDirection: 'row',
        alignItems: 'center',
        width:'100%',
        // backgroundColor:'purple'
        },
      view: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        height:'20%',
        width:'100%',
        borderRadius:10,
        borderColor:Colors.AppColor,
        borderWidth:2
      },
      titleText: {
        fontSize: 15,
        // fontWeight:700,
        // margin:20,
        flexDirection: "row",
        // justifyContent: "space-between",
        // alignItems: "center",
        paddingVertical: 5,
        marginLeft:15,
        width:'90%',
        // backgroundColor:'yellow',
        // flex: 1,
    
      },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        // marginBottom: 20,
        
        width: '80%',
        height:50,
        backgroundColor:'white',
        marginTop: Platform.OS == 'ios' ? '15%' : 10,
    
        // position: 'absolute', top: '5%'
      },
      headerTitle: {
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: 10,
      },
      buttonWrapper: {
        shadowColor: "#000",
        marginTop:10,
        alignSelf:'center',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 6, // For Android shadow
      },
      button: {
        width: 290,
        height: 60,
        borderRadius: 30, // Rounded corners
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden", // Needed for the highlight effect
      },
      highlight: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        // height: "50%", // Top half highlight
        backgroundColor: "rgba(255, 255, 255, 0.3)", // Light glossy effect
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      },
      buttonText: {
        color: "white",
        fontSize: 20,
        textAlign:'center',
        fontWeight: "bold",
        // padding:10,s
        zIndex: 2, // Ensures text is above the highlight
      },
    
});