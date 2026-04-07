import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Platform,
} from "react-native";

import { NavStatelessComponent } from "interfaces";
import { Colors } from "style";

import navigationOptions from "./ImagesScreen.navigationOptions";

const data = [
  {
    id: "1",
    imageUrl: require("../../../assets/memoryboost/Game1.png"),
    header: "Yesterday's Story",
    subHeaderText: "Reinforce recent memory recall",
    emilyURL: "https://dasion-guider.com/eldercare?email=wayne@dasion.ai&conversationname=yesterdays_story",
    points: [
      { text: "The voice agent starts by asking, What did you do yesterday?" },
      { text: "The user describes a memory (e.g., I had coffee and walked in the garden)." },
      { text: "After some time (e.g., 10 minutes or later in the day), the agent asks:" },
      { text: "Can you tell me again what you did yesterday?" },
      {
        text: "If the user struggles, the agent gives gentle hints based on what was previously said.",
      },
    ],
    agent: [
      { text: "Provides hints like 'Did you drink something warm?'" },
      {
        text: "Tracks memory retention over time and adjusts difficulty (e.g., asking about events fromtwo days ago).",
      },
      {
        text: "Uses positive reinforcement: Great job remembering your morning walk! Keep it up!",
      },
    ],
  },
  {
    id: "2",
    imageUrl: require("../../../assets/images/image1.png"),
    header: "Music Memory Game",
    subHeaderText: "Trigger long-term memories using music",
    emilyURL: "https://dasion-guider.com/eldercare?email=wayne@dasion.ai&conversationname=music_memory_game",
    points: [
      {
        text: "The AI plays a short clip of an old song (e.g., Can't Help Falling in Love by ElvisPresley).",
      },
      { text: "The user tries to name the song or singer." },
      {
        text: "If they recognize it, the agent asks: Do you have any memories associated with thissong?",
      },
      {
        text: "The user shares their memory, strengthening past recollection and storytelling skills.",
      },
    ],
    agent: [
      { text: "Provides hints (e.g., This song was popular in the 1960s)." },
      { text: "If a user struggles, the AI offers multiple-choice answers" },
      {
        text: "Can create a personalized playlist of their favorite songs based on their responses",
      },
    ],
  },
  {
    id: "3",
    imageUrl: require("../../../assets/memoryboost/Game3.jpeg"),
    header: "Who's in the Family?",
    subHeaderText: "Strengthen name-face association and personal memory recall",
    emilyURL: "https://dasion-guider.com/eldercare?email=wayne@dasion.ai&conversationname=who_is_in_the_family",
    points: [
      {
        text: "The AI asks about family members:Can you tell me about your children/grandchildren?",
      },
      {
        text: "If the user struggles, the agent provides hints:Your grandson who loves soccer, do you remember his name?",
      },
      {
        text: "The AI can also show family photos (if integrated with a smart device) and ask:Who is this person?",
      },
    ],
    agent: [
      {
        text: "Reinforces relationships: Yes, that's your daughter Emma! She visited last weekend.",
      },
      { text: "Allows caregivers to upload family details so the AI can provide custom hints." },
      { text: "Uses gentle encouragement to prevent frustration." },
    ],
  },
  {
    id: "4",
    imageUrl: require("../../../assets/memoryboost/Game4.jpeg"),
    header: "Daily Routine Quiz",
    subHeaderText: "Reinforce habit formation and time-based memory",
    emilyURL: "https://dasion-guider.com/eldercare?email=wayne@dasion.ai&conversationname=daily_routine_qui",
    points: [
      {
        text: "The agent asks about daily tasks:Did you have breakfast today? What did you eat?",
      },
      { text: "It later follows up:Can you tell me again what you had for breakfast?" },
      {
        text: "The AI can remind users of routines if they forget:It looks like you haven't mentioned taking your morning medicine yet. Would you like to do that now?",
      },
    ],
    agent: [
      { text: "Provides gentle reminders without overwhelming the user." },
      { text: "Keeps a routine log to track memory performance." },
      {
        text: "Encourages storytelling (e.g., Your coffee sounds great! How did you first learn to makecoffee?",
      },
    ],
  },
  {
    id: "5",
    imageUrl: require("../../../assets/memoryboost/Game5.png"),
    header: "Memory Lane (Photo Recall Game)",
    subHeaderText: "Strengthen visual memory recall and personal history engagement",
    emilyURL: "https://dasion-guider.com/eldercare?email=wayne@dasion.ai&conversationname=memory_lane_photo_recall_game",
    points: [
      {
        text: "The AI presents a photo from their past (e.g., a vacation, wedding, or childhoodmemory).",
      },
      { text: "The user describes what they remember" },
      { text: "If they struggle, the agent asks: Was this taken at the beach or a park?" },
      {
        text: "The AI encourages deeper reflection:Tell me what you were feeling in this moment.",
      },
    ],
    agent: [
      { text: "Uses gentle prompts to trigger memories." },
      { text: "Adjusts difficulty (e.g., first showing recent photos, then older ones)." },
      { text: "Keeps family engaged by allowing caregivers to upload new images." },
    ],
  },
  {
    id: "6",
    imageUrl: require("../../../assets/memoryboost/Game6.jpeg"),
    header: "Shopping List Recall",
    subHeaderText: "Train short-term memory in a practical way",
    emilyURL: "https://dasion-guider.com/eldercare?email=wayne@dasion.ai&conversationname=shopping_list_recall",
    points: [
      { text: "The AI reads a simple shopping list (e.g., Milk, bread, eggs, apples)." },
      { text: "After a pause, the user repeats as many as they remember." },
      { text: "The AI gradually increases the list size" },
    ],
    agent: [
      { text: "Offers hints (e.g., One of the items is a fruit)" },
      { text: "Adjusts difficulty based on performance trends" },
      { text: "Can be expanded to include daily tasks or medication lists." },
    ],
  },
  {
    id: "7",
    imageUrl: require("../../../assets/memoryboost/Game7.png"),
    header: "Home Objects Memory Game",
    subHeaderText: "Strengthen spatial memory",
    emilyURL: "https://dasion-guider.com/eldercare?email=wayne@dasion.ai&conversationname=home_objects_memory_game",
    points: [
      {
        text: "The AI describes where things are:Your keys are on the dining table next to the lamp.",
      },
      { text: "Later, the AI asks:Where did we say your keys were?" },
      { text: "Can expand to multiple household objects." },
    ],
    agent: [
      { text: "Helps users locate frequently misplaced objects." },
      { text: "Provides reminders based on personalized data." },
    ],
  },
  {
    id: "8",
    imageUrl: require("../../../assets/memoryboost/Game8.png"),
    header: "Finish the Proverb",
    subHeaderText: "Strengthen semantic memory using familiar phrases",
    emilyURL: "https://dasion-guider.com/eldercare?email=wayne@dasion.ai&conversationname=finish_the_proverb",
    points: [
      { text: "The AI starts a well-known proverb, and the user finishes it:" },
      { text: "A penny for your … (thoughts)." },
      { text: "A rolling stone gathers … (no moss)." },
      { text: "If they struggle, the AI provides hints." },
      { text: "Can include personalized phrases based on the user's past sayings." },
    ],
    agent: [
      { text: "Keeps the game engaging by adding humor." },
      { text: "Tracks which proverbs are easier or harder for the user." },
    ],
  },
  {
    id: "9",
    imageUrl: require("../../../assets/memoryboost/Game9.png"),
    header: "Number Recall Challenge",
    subHeaderText: "Improve numeric memory",
    emilyURL: "https://dasion-guider.com/eldercare?email=wayne@dasion.ai&conversationname=number_recall_challeng",
    points: [
      { text: "The AI reads a short series of numbers (e.g., 4-2-8-9)" },
      { text: "The user must recite them back in order" },
      { text: "The sequence gets longer as they improve" },
    ],
    agent: [
      { text: "Provides mnemonic tips for numbers (e.g., Think of birthdays)." },
      { text: "Adjusts difficulty based on user performance." },
    ],
  },
  {
    id: "10",
    imageUrl: require("../../../assets/memoryboost/Game10.jpeg"),
    header: "Conversation Starters",
    subHeaderText: "Encourage verbal engagement and recall",
    emilyURL: "https://dasion-guider.com/eldercare?email=wayne@dasion.ai&conversationname=conversation_starters",
    points: [
      { text: "The AI asks an open-ended question:" },
      { text: "What was your first job like?" },
      { text: "Tell me about a time you felt really proud." },
      { text: "The user shares a memory, strengthening verbal skills." },
    ],
    agent: [
      { text: "Follows up with related questions." },
      { text: "Tracks common themes and encourages repetition for reinforcement." },
    ],
  },
];

// Animated Card Component
const AnimatedCard = ({ item, index, isTablet, itemWidth }) => {
  const navigation = useNavigation();
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Staggered animation for each card
    const delay = index * 150;

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay: delay,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        delay: delay,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay: delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    opacity: fadeAnim,
    transform: [
      { scale: scaleAnim },
      { translateY: slideAnim },
    ],
  };

  return (
    <Animated.View
      style={[
        isTablet ? styles.tabletItemContainer : styles.mobileItemContainer,
        { width: itemWidth },
        animatedStyle,
      ]}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => navigation.navigate("ImageDetails", { data: item })}
      >
        <View style={isTablet ? styles.tabletCard : styles.mobileCard}>
          {/* Image Container with Gradient Overlay */}
          <View style={styles.imageContainer}>
            <Image 
              source={item.imageUrl} 
              style={isTablet ? styles.tabletImage : styles.mobileImage} 
            />
            {isTablet && (
              <View style={styles.gradientOverlay}>
                <View style={styles.playIconContainer}>
                  <Text style={styles.playIcon}>▶</Text>
                </View>
              </View>
            )}
          </View>

          {/* Content Container */}
          <View style={isTablet ? styles.tabletContent : styles.mobileContent}>
            <Text 
              style={isTablet ? styles.tabletHeader : styles.mobileHeader}
              numberOfLines={isTablet ? 2 : 1}
            >
              {item.header}
            </Text>
            {isTablet && (
              <Text 
                style={styles.tabletSubHeader}
                numberOfLines={2}
              >
                {item.subHeaderText}
              </Text>
            )}
          </View>

          {/* Decorative Element for Tablet */}
          {isTablet && (
            <View style={styles.decorativeCorner} />
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const ImagesScreen: NavStatelessComponent = () => {
  const { width } = Dimensions.get("window");
  const isTablet = width >= 768;

  // Different column counts for mobile and tablet
  const numColumns = isTablet ? 3 : 2;
  const itemWidth = isTablet 
    ? (width - 60) / numColumns // More padding for tablet
    : (width - 30) / numColumns; // Less padding for mobile

  const renderItem = ({ item, index }) => (
    <AnimatedCard 
      item={item} 
      index={index} 
      isTablet={isTablet} 
      itemWidth={itemWidth}
    />
  );

  return (
    <View style={styles.container}>
      {/* Header with animation would go here if needed */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        key={numColumns} // Force re-render when columns change
        columnWrapperStyle={isTablet ? styles.tabletRow : styles.mobileRow}
        contentContainerStyle={isTablet ? styles.tabletContainer : styles.mobileContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
  },
  
  // Mobile Styles
  mobileRow: {
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  mobileContainer: {
    paddingTop: 16,
    paddingBottom: 20,
  },
  mobileItemContainer: {
    marginBottom: 4,
  },
  mobileCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  mobileImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  mobileContent: {
    padding: 12,
    minHeight: 50,
  },
  mobileHeader: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A1A2E",
    letterSpacing: -0.3,
  },

  // Tablet Styles
  tabletRow: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  tabletContainer: {
    paddingTop: 24,
    paddingBottom: 32,
  },
  tabletItemContainer: {
    marginBottom: 8,
  },
  tabletCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    position: "relative",
  },
  tabletImage: {
    width: "100%",
    height: 240,
    resizeMode: "cover",
  },
  tabletContent: {
    padding: 20,
    minHeight: 120,
  },
  tabletHeader: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1A1A2E",
    marginBottom: 8,
    letterSpacing: -0.5,
    lineHeight: 26,
  },
  tabletSubHeader: {
    fontSize: 14,
    fontWeight: "400",
    color: "#6B7280",
    lineHeight: 20,
    marginTop: 4,
  },

  // Shared Image Styles
  imageContainer: {
    position: "relative",
    overflow: "hidden",
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  playIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  playIcon: {
    fontSize: 24,
    color: "#4F46E5",
    marginLeft: 4,
  },

  // Decorative Elements
  decorativeCorner: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderTopRightRadius: 20,
    borderWidth: 3,
    borderColor: "#4F46E5",
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    opacity: 0.3,
  },
});

ImagesScreen.navigationOptions = navigationOptions();

export default ImagesScreen;