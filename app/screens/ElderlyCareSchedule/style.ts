import { Platform, StyleSheet } from "react-native";
import { Colors } from "style";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop:Platform.OS == 'ios' ? 20:10
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 10,
  },
  micContainer: {
    alignItems: "center",
    justifyContent: "center",
    // padding: 30,
    borderRadius: 20,
    marginBottom: 20,
  },
  micIcon: {
    // marginBottom: 10,
  },
  micText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "500",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    // marginBottom: 20,
  },
  button: {
    backgroundColor: "#ffe5d0",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  aiSchedulingContainer: {
    marginBottom: 20,
  },
  aiSchedulingTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  scheduleCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  scheduleName: {
    fontSize: 16,
    fontWeight: "600",
  },
  scheduleTime: {
    fontSize: 12,
    color: "#555",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  micViewStyle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ff7e5f",
    alignItems: "center",
    justifyContent:"center"
  },
  rightArrowViewStyle:{
    flexDirection:"row",
    alignItems:"center",
  },
  microphoneIcon: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
    tintColor:Colors.white
  },
  rowView:{
    flexDirection:'row'
  },
  playIcon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    tintColor: Colors.black,


  }
});

export default styles;
