import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  welcomeCard: {
    backgroundColor: "#ff8c00",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    height: 140,
    paddingHorizontal: 25,
    // alignSelf:"center"
  },
  addButton: {
    backgroundColor: "rgb(215 166 122)",
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  welcomeTextContainer: {
    flex: 1,
    marginLeft: 15,
    marginTop: 30,
  },
  welcomeText: {
    fontSize: 22,
    color: "#fdf7f0",
    fontWeight: "bold",
    bottom:5
  },
  subText: {
    fontSize: 15,
    color: "#fdf7f0",
    top:5
  },
  settingsIcon: {
    // marginLeft: 10,
    marginTop: 30,
  },
  scrollContainer: {
    flexGrow: 1,
    marginLeft: "5%",
    marginRight: "5%",
  },
  card: {
    backgroundColor: "#ff8c00",
    // padding: 15,
    borderRadius: 10,
    // marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical:15
  },
  cardLight: {
    backgroundColor: "#ffffff",
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 10,
    // marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width:"98%",
    alignSelf:"center"
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fdf7f0",
  },
  cardTitle2: {
    fontSize: 19,
    fontWeight: "bold",
    // marginBottom: 10,
    color: "gray",
  },
  featuresList: {
    marginTop: 10,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  checkIcon: {
    marginRight: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  featureText: {
    fontSize: 14,
    color: "#fdf7f0",
  },
  featureText2: {
    fontSize: 14,
    color: "gray",
  },
  tutorialImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
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
  profileViewStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default styles;
