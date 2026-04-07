import { StyleSheet, Platform } from "react-native";

import { Colors, Layout } from "style";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F7", // Subtle background color
  },
  scrollContent: {
    paddingBottom: 30,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headingStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 12,
  },
  topicWrapper: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "flex-start",
  },
  bullet: {
    fontSize: 16,
    color: Colors.primary || "#3B82F6",
    marginRight: 8,
    lineHeight: 20,
  },
  descriptionTextStyle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4B5563",
    lineHeight: 20,
    flex: 1,
  },
});