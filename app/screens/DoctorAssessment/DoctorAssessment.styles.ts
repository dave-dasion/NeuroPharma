import { Dimensions, StyleSheet } from "react-native";

import { Colors, Font, Layout } from "style";

const Height = Dimensions.get("window").height;
const Width = Dimensions.get("window").width;

const isTablet = Width >= 768;

export default StyleSheet.create({
  // Original styles - preserved
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.white,
  },
  
  container1: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.white,
  },
  
  headingStyle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#000"
  },
  
  descriptionTextStyle: {
    fontSize: 13,
    fontWeight: "500",
    color: "gray",
  },

  // New Enhanced Styles
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  
  scrollContentTablet: {
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 40,
    maxWidth: 1200,
    alignSelf: "center",
    width: "100%",
  },

  // Header Styles
  headerContainer: {
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  
  headerContainerTablet: {
    marginBottom: 36,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 6,
  },
  
  headerTitleTablet: {
    fontSize: 36,
    marginBottom: 8,
  },

  headerSubtitle: {
    fontSize: 15,
    color: "gray",
    fontWeight: "500",
    lineHeight: 22,
  },
  
  headerSubtitleTablet: {
    fontSize: 17,
    lineHeight: 24,
  },

  // Cards Wrapper
  cardsWrapper: {
    flex: 1,
  },
  
  cardsWrapperTablet: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -10,
  },

  cardFullWidth: {
    width: "100%",
  },
  
  cardGridItem: {
    width: "50%",
    paddingHorizontal: 10,
  },

  // Card Container
  cardContainer: {
    backgroundColor: Colors.white,
    height: isTablet ? 300 : 200,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    position: "relative",
    minHeight: 140,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  
  cardContainerTablet: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    minHeight: 180,
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },

  // Icon Container
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: "#f0f1ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  
  iconContainerTablet: {
    width: 64,
    height: 64,
    borderRadius: 16,
    marginBottom: 16,
  },

  // Content Container
  contentContainer: {
    flex: 1,
    paddingRight: 40,
  },

  // Card Title
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 0,
    letterSpacing: -0.3,
  },
  
  cardTitleTablet: {
    fontSize: 22,
    letterSpacing: -0.5,
  },

  // Card Description
  cardDescription: {
    fontSize: 14,
    color: "gray",
    fontWeight: "500",
    lineHeight: 20,
  },
  
  cardDescriptionTablet: {
    fontSize: 15,
    lineHeight: 22,
  },
});