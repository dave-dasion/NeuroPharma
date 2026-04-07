import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  withDelay,
  FadeInDown,
  FadeInUp,
  FadeInRight,
  FadeInLeft,
  SlideInUp,
} from "react-native-reanimated";

import { Colors, Font } from "style";
import { navigate } from "navigation";
import { NavStatelessComponent } from "interfaces";
import { emilyUrl } from "constant/urls";

import navigationOptions from "./CareScreen.navigationOptions";
import { styles } from "./CareScreen.styles";

const { width, height } = Dimensions.get("window");
const isTablet = width >= 768;

const CareScreen: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const [isAdmin, setIsAdmin] = useState<string | null>(null);

  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);
  const headerScale = useSharedValue(0.8);
  const headerOpacity = useSharedValue(0);

  // Check role without changing business logic
  useEffect(() => {
    const getRole = async () => {
      const role = await AsyncStorage.getItem("isAdmin");
      setIsAdmin(role);
    };
    getRole();
  }, []);

  const data = [
    {
      id: "1",
      imageUrl: require("../../../assets/memoryboost/Game1.png"),
      header: "Yesterday's Story",
      subHeaderText: "Reinforce recent memory recall",
      emilyURL:"https://dasion-guider.com/eldercare?email=wayne@dasion.ai&conversationname=yesterdays_story",
      icon: "time-outline",
      gradient: ["#667eea", "#764ba2"],
      points: [
        { text: "The voice agent starts by asking, What did you do yesterday?" },
        { text: "The user describes a memory (e.g., I had coffee and walked in the garden)." },
        { text: "After some time (e.g., 10 minutes or later in the day), the agent asks:" },
        { text: "Can you tell me again what you did yesterday?" },
        {
          text:
            "If the user struggles, the agent gives gentle hints based on what was previously said.",
        },
      ],
      agent: [
        { text: "Provides hints like 'Did you drink something warm?'" },
        {
          text:
            "Tracks memory retention over time and adjusts difficulty (e.g., asking about events fromtwo days ago).",
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
      emilyURL:"https://dasion-guider.com/eldercare?email=wayne@dasion.ai&conversationname=music_memory_game",
      icon: "musical-notes-outline",
      gradient: ["#f093fb", "#f5576c"],
      points: [
        {
          text:
            "The AI plays a short clip of an old song (e.g., Can't Help Falling in Love by ElvisPresley).",
        },
        { text: "The user tries to name the song or singer." },
        {
          text:
            "If they recognize it, the agent asks: Do you have any memories associated with thissong?",
        },
        {
          text:
            "The user shares their memory, strengthening past recollection and storytelling skills.",
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
      emilyURL:"https://dasion-guider.com/eldercare?email=wayne@dasion.ai&conversationname=who_is_in_the_family",
      icon: "people-outline",
      gradient: ["#4facfe", "#00f2fe"],
      points: [
        {
          text:
            "The AI asks about family members:Can you tell me about your children/grandchildren?",
        },
        {
          text:
            "If the user struggles, the agent provides hints:Your grandson who loves soccer, do you remember his name?",
        },
        {
          text:
            "The AI can also show family photos (if integrated with a smart device) and ask:Who is this person?",
        },
      ],
      agent: [
        {
          text:
            "Reinforces relationships: Yes, that's your daughter Emma! She visited last weekend.",
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
      emilyURL:"https://dasion-guider.com/eldercare?email=wayne@dasion.ai&conversationname=daily_routine_quiz",
      icon: "calendar-outline",
      gradient: ["#43e97b", "#38f9d7"],
      points: [
        {
          text: "The agent asks about daily tasks:Did you have breakfast today? What did you eat?",
        },
        { text: "It later follows up:Can you tell me again what you had for breakfast?" },
        {
          text:
            "The AI can remind users of routines if they forget:It looks like you haven't mentioned taking your morning medicine yet. Would you like to do that now?",
        },
      ],
      agent: [
        { text: "Provides gentle reminders without overwhelming the user." },
        { text: "Keeps a routine log to track memory performance." },
        {
          text:
            "Encourages storytelling (e.g., Your coffee sounds great! How did you first learn to makecoffee?)",
        },
      ],
    },
    {
      id: "5",
      imageUrl: require("../../../assets/memoryboost/Game5.png"),
      header: "Memory Lane (Photo Recall Game)",
      subHeaderText: "Strengthen visual memory recall and personal history engagement",
      emilyURL:"https://dasion-guider.com/eldercare?email=wayne@dasion.ai&conversationname=memory_lane_photo_recall_game",
      icon: "images-outline",
      gradient: ["#fa709a", "#fee140"],
      points: [
        {
          text:
            "The AI presents a photo from their past (e.g., a vacation, wedding, or childhoodmemory).",
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
      emilyURL:"https://dasion-guider.com/eldercare?email=wayne@dasion.ai&conversationname=shopping_list_recall",
      icon: "cart-outline",
      gradient: ["#30cfd0", "#330867"],
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
      emilyURL:"https://dasion-guider.com/eldercare?email=wayne@dasion.ai&conversationname=home_objects_memory_game",
      icon: "home-outline",
      gradient: ["#a8edea", "#fed6e3"],
      points: [
        {
          text:
            "The AI describes where things are:Your keys are on the dining table next to the lamp.",
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
      emilyURL:"https://dasion-guider.com/eldercare?email=wayne@dasion.ai&conversationname=finish_the_proverb",
      icon: "chatbox-ellipses-outline",
      gradient: ["#ff9a9e", "#fecfef"],
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
      emilyURL:"https://dasion-guider.com/eldercare?email=wayne@dasion.ai&conversationname=number_recall_challenge",
      icon: "calculator-outline",
      gradient: ["#ffecd2", "#fcb69f"],
      points: [
        { text: "The AI reads a short series of numbers (e.g., )" },
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
      emilyURL:"https://dasion-guider.com/eldercare?email=wayne@dasion.ai&conversationname=conversation_starters",
      icon: "mic-outline",
      gradient: ["#ff6e7f", "#bfe9ff"],
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

  useEffect(() => {
    // Original animation logic preserved
    scale.value = 1;
    opacity.value = 0;
    headerScale.value = 0.8;
    headerOpacity.value = 0;

    scale.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    opacity.value = withDelay(200, withTiming(1, { duration: 600, easing: Easing.ease }));

    headerOpacity.value = withTiming(1, { duration: 500, easing: Easing.ease });
    headerScale.value = withSpring(1, {
      damping: 8,
      stiffness: 100,
    });
  }, []);

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const animatedHeaderStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
      transform: [{ scale: headerScale.value }],
    };
  });

  const renderMobileCard = (rowData: any, rowIndex: number) => (
    <Animated.View
      key={rowData.id}
      entering={FadeInDown.delay(rowIndex * 100)
        .duration(500)
        .springify()
        .damping(12)}
    >
      <TouchableOpacity
        style={[
          {
            backgroundColor: "#fff",
            borderRadius: 16,
            marginVertical: 8,
            padding: 16,
            width:"100%",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: Platform.OS === "android" ? 0 : 5, // Android shadow removed
          },
        ]}
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate("ImageDetails", { data: rowData });
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <LinearGradient
            colors={rowData.gradient}
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 16,
            }}
          >
            <Ionicons name={rowData.icon} size={28} color="#fff" />
          </LinearGradient>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: Font.FontWeight.Bold,
                color: Colors.black,
                marginBottom: 4,
              }}
            >
              Game {rowIndex + 1}: {rowData.header}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: Colors.black50,
                fontFamily: Font.FontWeight.Regular,
              }}
            >
              {rowData.subHeaderText}
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={24} color={Colors.black50} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderTabletCard = (rowData: any, rowIndex: number) => (
    <Animated.View
      key={rowData.id}
      entering={FadeInUp.delay(rowIndex * 80)
        .duration(500)
        .springify()
        .damping(12)}
      style={{
        width: "48%",
        marginBottom: 24,
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "#fff",
          borderRadius: 24,
          padding: 24,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.12,
          shadowRadius: 16,
          elevation: Platform.OS === "android" ? 0 : 8, // Android shadow removed
          minHeight: 220,
        }}
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate("ImageDetails", { data: rowData });
        }}
      >
        <LinearGradient
          colors={rowData.gradient}
          style={{
            width: 84,
            height: 84,
            borderRadius: 42,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
            alignSelf: "center",
          }}
        >
          <Ionicons name={rowData.icon} size={42} color="#fff" />
        </LinearGradient>

        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 22,
              fontFamily: Font.FontWeight.Bold,
              color: Colors.black,
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            {isAdmin === "2" ? "Activity" : "Game"} {rowIndex + 1}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontFamily: Font.FontWeight.SemiBold,
              color: Colors.black,
              marginBottom: 12,
              textAlign: "center",
            }}
          >
            {rowData.header}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: Colors.black50,
              fontFamily: Font.FontWeight.Regular,
              textAlign: "center",
              lineHeight: 22,
            }}
          >
            {rowData.subHeaderText}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: "#f8f9fa" }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View style={[animatedHeaderStyle]}>
          <View
            style={{
              paddingHorizontal: isTablet ? 60 : 20,
              paddingTop: isTablet ? 60 : 20,
              paddingBottom: 20,
            }}
          >
            <Animated.Text
              style={{
                fontSize: isTablet ? 42 : 24,
                fontFamily: Font.FontWeight.Bold,
                color: Colors.black,
                marginBottom: 16,
                textAlign: isTablet ? "center" : "left",
              }}
            >
              {isAdmin === "2" ? "My Life Journey" : "Auto Life Story"}
            </Animated.Text>

            <Animated.Text
              style={[
                animatedTextStyle,
                {
                  color: Colors.black50,
                  fontSize: isTablet ? 20 : 14,
                  textAlign: isTablet ? "center" : "left",
                  marginBottom: 32,
                  fontFamily: Font.FontWeight.Regular,
                },
              ]}
            >
              {isAdmin === "2" 
                ? "Tap below to share your memories and build your story together." 
                : "Click here to generate and narrate your story automatically."}
            </Animated.Text>

            <Animated.View
              style={[
                animatedButtonStyle,
                { alignItems: "center", justifyContent: "center" },
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("CreateStory");
                }}
                activeOpacity={0.8}
                style={{
                  width: isTablet ? "70%" : "100%",
                  alignSelf: "center",
                }}
              >
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={["#e52d27", "#b31217", "#c7170b"]}
                  style={{
                    borderRadius: 24,
                    paddingVertical: isTablet ? 40 : 24,
                    paddingHorizontal: 32,
                    alignItems: "center",
                    justifyContent: "center",
                    shadowColor: "#e52d27",
                    shadowOffset: { width: 0, height: 12 },
                    shadowOpacity: 0.4,
                    shadowRadius: 20,
                    elevation: Platform.OS === "android" ? 0 : 12, // Android shadow removed
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons name="mic" size={isTablet ? 48 : 28} color="#fff" />
                    <View style={{ marginLeft: 20 }}>
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: isTablet ? 28 : 18,
                          fontFamily: Font.FontWeight.Bold,
                          textAlign: "center",
                        }}
                      >
                        {isAdmin === "2" ? "Share Your Memories" : "Tell your Story"}
                      </Text>
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: isTablet ? 18 : 14,
                          fontFamily: Font.FontWeight.Regular,
                          textAlign: "center",
                          marginTop: 6,
                        }}
                      >
                        {isAdmin === "2" ? "Building your personal book" : "We're Writing Your Book!"}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>

        <View
          style={{
            paddingHorizontal: isTablet ? 60 : 20,
            paddingTop: isTablet ? 60 : 30,
            paddingBottom: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("ImagesScreen")}
            activeOpacity={0.7}
          >
            <Animated.View
              entering={SlideInUp.delay(300).duration(500).springify().damping(12)}
              style={{
                flexDirection: isTablet ? "row" : "column",
                alignItems: isTablet ? "center" : "flex-start",
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  fontSize: isTablet ? 40 : 25,
                  fontFamily: Font.FontWeight.Bold,
                  color: Colors.black,
                }}
              >
                {isAdmin === "2" ? "Mind & Memory Activities" : "Daily Memory Boost"}
              </Text>
              {isTablet && (
                <View
                  style={{
                    backgroundColor: "#e52d27",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 25,
                    marginLeft: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 16,
                      fontFamily: Font.FontWeight.SemiBold,
                    }}
                  >
                    {data.length} {isAdmin === "2" ? "Tasks" : "Games"}
                  </Text>
                </View>
              )}
            </Animated.View>

            <Animated.Text
              entering={FadeInLeft.delay(400).duration(500)}
              style={{
                fontSize: isTablet ? 18 : 13,
                color: Colors.black50,
                marginBottom: isTablet ? 40 : 20,
                fontFamily: Font.FontWeight.Regular,
              }}
            >
              {isAdmin === "2" ? "Choose an activity to stay sharp" : "Tap to see overview of all games"}
            </Animated.Text>
          </TouchableOpacity>

          {isTablet ? (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {data.map((rowData, rowIndex) => renderTabletCard(rowData, rowIndex))}
            </View>
          ) : (
            <View>{data.map((rowData, rowIndex) => renderMobileCard(rowData, rowIndex))}</View>
          )}
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
};

CareScreen.navigationOptions = navigationOptions;

export default CareScreen;