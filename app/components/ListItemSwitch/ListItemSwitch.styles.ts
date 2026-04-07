import { StyleSheet, Dimensions } from "react-native";

import { Colors } from "style";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    // Add extra horizontal padding for tablet containers if needed
    paddingHorizontal: isTablet ? 20 : 0,
  },
  text: {
    paddingVertical: isTablet ? 28 : 18, // Increased padding for tablet
    fontSize: isTablet ? 20 : 16,        // Increased font size for tablet
  },
  topLine: {
    borderTopColor: Colors.grey10,
    borderTopWidth: isTablet ? 2 : 1.6,  // Slightly thicker line for tablet
  },
  bottomLine: {
    borderBottomColor: Colors.grey10,
    borderBottomWidth: isTablet ? 2 : 1.6, // Slightly thicker line for tablet
  },
});