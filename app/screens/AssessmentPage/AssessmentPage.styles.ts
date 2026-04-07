import { StyleSheet, Dimensions } from "react-native";

import { Colors, Font } from "style";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isTablet ? "#f5f7fa" : "#ffffff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: isTablet ? 24 : 20,
    fontFamily: Font.FontWeight.Bold,
    marginLeft: 15,
    color: "#2c3e50",
  },
  heading: {
    backgroundColor: "#ffffff",
    marginTop: isTablet ? 20 : 15,
    marginHorizontal: isTablet ? 20 : 0,
    paddingVertical: isTablet ? 20 : 10,
    borderRadius: isTablet ? 16 : 0,
    shadowColor: isTablet ? "#000" : "transparent",
    shadowOffset: isTablet ? { width: 0, height: 2 } : { width: 0, height: 0 },
    shadowOpacity: isTablet ? 0.08 : 0,
    shadowRadius: isTablet ? 8 : 0,
    elevation: isTablet ? 4 : 0,
  },
  innerSteps: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: isTablet ? 18 : 15,
    paddingHorizontal: isTablet ? 20 : 15,
    minHeight: isTablet ? 70 : 50,
  },
  titleText: {
    fontSize: isTablet ? 15 : 14,
    fontFamily: Font.FontWeight.Regular,
    color: "#2c3e50",
    flex: 1,
    marginRight: 10,
  },
  view: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
});