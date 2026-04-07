import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Animated,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

const STATS = [
  { label: "Active Projects", value: "12", icon: "flask", color: "#6C5CE7", change: "+3", percentage: 75 },
  { label: "AI Models", value: "8", icon: "hardware-chip", color: "#00B894", change: "+2", percentage: 85 },
  { label: "Experiments", value: "47", icon: "beaker", color: "#E17055", change: "+12", percentage: 65 },
  { label: "Publications", value: "5", icon: "document-text", color: "#0984E3", change: "+1", percentage: 90 },
];

const QUICK_ACCESS = [
  {
    title: "Drug Discovery",
    subtitle: "3 active pipelines",
    icon: "medkit",
    color: "#6C5CE7",
    screen: "DrugDiscovery",
    badge: "3",
  },
  {
    title: "AI Copilot",
    subtitle: "Ready to assist",
    icon: "sparkles",
    color: "#00B894",
    screen: "AICopilot",
    badge: "New",
  },
  {
    title: "Clinical Cases",
    subtitle: "2 pending reviews",
    icon: "medical",
    color: "#E17055",
    screen: "ClinicalSimulator",
    badge: "2",
  },
  {
    title: "Research Notes",
    subtitle: "Last edited 2h ago",
    icon: "journal",
    color: "#0984E3",
    screen: "ResearchNotebook",
  },
];

const RECENT_ACTIVITY = [
  {
    title: "Molecular docking simulation completed",
    time: "2 hours ago",
    icon: "checkmark-circle",
    color: "#00B894",
    description: "Compound XYZ-123 analysis finished",
  },
  {
    title: "New annotation feedback received",
    time: "5 hours ago",
    icon: "chatbubble-ellipses",
    color: "#6C5CE7",
    description: "3 team members provided input",
  },
  {
    title: "Quantum optimization run started",
    time: "1 day ago",
    icon: "rocket",
    color: "#E17055",
    description: "Est. completion in 6 hours",
  },
  {
    title: "Clinical case review submitted",
    time: "2 days ago",
    icon: "document-attach",
    color: "#0984E3",
    description: "Awaiting peer review",
  },
];

const INSIGHTS = [
  {
    title: "Model Performance",
    value: "94.2%",
    trend: "up",
    change: "+2.3%",
    icon: "trending-up",
    color: "#00B894",
  },
  {
    title: "Processing Speed",
    value: "1.2s",
    trend: "down",
    change: "-0.3s",
    icon: "speedometer",
    color: "#0984E3",
  },
  {
    title: "Success Rate",
    value: "87.5%",
    trend: "up",
    change: "+5.1%",
    icon: "analytics",
    color: "#6C5CE7",
  },
];

const NOTIFICATIONS = [
  { id: 1, title: "New experiment results available", time: "5 min ago", unread: true },
  { id: 2, title: "Team member commented on your research", time: "1 hour ago", unread: true },
  { id: 3, title: "Weekly report is ready", time: "3 hours ago", unread: false },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const StatCard = ({
  stat,
  fadeAnim,
}: {
  stat: (typeof STATS)[0];
  fadeAnim: Animated.Value;
}) => {
  const cardScale = useRef(new Animated.Value(1)).current;

  const onPressIn = () =>
    Animated.spring(cardScale, { toValue: 0.95, useNativeDriver: true }).start();

  const onPressOut = () =>
    Animated.spring(cardScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View
        style={[
          styles.statCard,
          isTablet && styles.statCardTablet,
          { transform: [{ scale: cardScale }], opacity: fadeAnim },
        ]}
      >
        <View style={styles.statHeader}>
          <View style={[styles.statIconWrap, { backgroundColor: stat.color + "20" }]}>
            <Ionicons name={stat.icon as any} size={isTablet ? 28 : 22} color={stat.color} />
          </View>
          <View style={[styles.changeBadge, { backgroundColor: stat.color + "15" }]}>
            <Text style={[styles.changeText, { color: stat.color }]}>{stat.change}</Text>
          </View>
        </View>
        <Text style={[styles.statValue, isTablet && styles.statValueTablet]}>{stat.value}</Text>
        <Text style={[styles.statLabel, isTablet && styles.statLabelTablet]}>{stat.label}</Text>
        <View style={[styles.statProgressBg, { backgroundColor: stat.color + "10" }]}>
          <View
            style={[
              styles.statProgressBar,
              { backgroundColor: stat.color, width: `${stat.percentage}%` as any },
            ]}
          />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const QuickAccessCard = ({ item }: { item: (typeof QUICK_ACCESS)[0] }) => {
  const navigation = useNavigation();
  const cardScale = useRef(new Animated.Value(1)).current;

  const onPressIn = () =>
    Animated.spring(cardScale, { toValue: 0.96, useNativeDriver: true }).start();

  const onPressOut = () =>
    Animated.spring(cardScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={() => (navigation as any).navigate(item.screen)}
    >
      <Animated.View
        style={[
          styles.quickCard,
          isTablet && styles.quickCardTablet,
          { transform: [{ scale: cardScale }] },
        ]}
      >
        <LinearGradient
          colors={[item.color + "15", item.color + "08"]}
          style={styles.quickGradient}
        >
          <View style={styles.quickHeader}>
            <View style={[styles.quickIconWrap, { backgroundColor: item.color + "25" }]}>
              <Ionicons name={item.icon as any} size={isTablet ? 28 : 24} color={item.color} />
            </View>
            {item.badge && (
              <View style={[styles.badge, { backgroundColor: item.color }]}>
                <Text style={styles.badgeText}>{item.badge}</Text>
              </View>
            )}
          </View>
          <Text style={[styles.quickTitle, isTablet && styles.quickTitleTablet]}>{item.title}</Text>
          <Text style={[styles.quickSubtitle, isTablet && styles.quickSubtitleTablet]}>
            {item.subtitle}
          </Text>
          <View style={styles.quickFooter}>
            <Ionicons name="arrow-forward" size={isTablet ? 20 : 16} color={item.color} />
          </View>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

const ActivityItem = ({
  item,
  fadeAnim,
  onPress,
}: {
  item: (typeof RECENT_ACTIVITY)[0];
  fadeAnim: Animated.Value;
  onPress: () => void;
}) => (
  <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
    <Animated.View
      style={[
        styles.activityRow,
        isTablet && styles.activityRowTablet,
        { opacity: fadeAnim },
      ]}
    >
      <View style={[styles.activityIcon, { backgroundColor: item.color + "20" }]}>
        <Ionicons name={item.icon as any} size={isTablet ? 24 : 20} color={item.color} />
      </View>
      <View style={styles.activityText}>
        <Text style={[styles.activityTitle, isTablet && styles.activityTitleTablet]}>
          {item.title}
        </Text>
        <Text style={[styles.activityDescription, isTablet && styles.activityDescriptionTablet]}>
          {item.description}
        </Text>
        <Text style={[styles.activityTime, isTablet && styles.activityTimeTablet]}>
          {item.time}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={isTablet ? 24 : 20} color="#95a5a6" />
    </Animated.View>
  </TouchableOpacity>
);

const InsightCard = ({ insight }: { insight: (typeof INSIGHTS)[0] }) => (
  <View style={[styles.insightCard, isTablet && styles.insightCardTablet]}>
    <View style={[styles.insightIconWrap, { backgroundColor: insight.color + "15" }]}>
      <Ionicons name={insight.icon as any} size={isTablet ? 28 : 24} color={insight.color} />
    </View>
    <View style={styles.insightContent}>
      <Text style={[styles.insightTitle, isTablet && styles.insightTitleTablet]}>
        {insight.title}
      </Text>
      <View style={styles.insightMetrics}>
        <Text style={[styles.insightValue, isTablet && styles.insightValueTablet]}>
          {insight.value}
        </Text>
        <View
          style={[
            styles.insightChange,
            { backgroundColor: insight.trend === "up" ? "#00B89415" : "#E1705515" },
          ]}
        >
          <Ionicons
            name={insight.trend === "up" ? "trending-up" : "trending-down"}
            size={isTablet ? 16 : 14}
            color={insight.trend === "up" ? "#00B894" : "#E17055"}
          />
          <Text
            style={[
              styles.insightChangeText,
              isTablet && styles.insightChangeTextTablet,
              { color: insight.trend === "up" ? "#00B894" : "#E17055" },
            ]}
          >
            {insight.change}
          </Text>
        </View>
      </View>
    </View>
  </View>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────

const DashboardScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedActivity, setSelectedActivity] = useState<
    (typeof RECENT_ACTIVITY)[0] | null
  >(null);

  // Bottom Sheet refs
  const notificationSheetRef = useRef<any>(null);
  const settingsSheetRef = useRef<any>(null);
  const filterSheetRef = useRef<any>(null);
  const activityDetailsSheetRef = useRef<any>(null);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 50, friction: 7, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleActivityPress = (item: (typeof RECENT_ACTIVITY)[0]) => {
    setSelectedActivity(item);
    activityDetailsSheetRef.current?.open();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Header ── */}
        <LinearGradient
          colors={["#0a0e27", "#1a1f4e", "#2d3580"]}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            {/* Menu button */}
            <TouchableOpacity
              onPress={() => (navigation as any).openDrawer()}
              style={styles.menuBtn}
              activeOpacity={0.7}
            >
              <Ionicons name="menu" size={isTablet ? 32 : 28} color="#fff" />
            </TouchableOpacity>

            <View style={styles.headerTextContainer}>
              <Text style={[styles.greeting, isTablet && styles.greetingTablet]}>
                Welcome back 👋
              </Text>
              <Text style={[styles.headerTitle, isTablet && styles.headerTitleTablet]}>
                NeuroPharma Lab1
              </Text>
              <Text style={[styles.headerSubtitle, isTablet && styles.headerSubtitleTablet]}>
                AI-Powered Drug Discovery & Clinical Intelligence
              </Text>
            </View>

            {/* Notification button */}
            <TouchableOpacity
              style={styles.notifBtn}
              activeOpacity={0.7}
              onPress={() => notificationSheetRef.current?.open()}
            >
              <Ionicons name="notifications-outline" size={isTablet ? 28 : 24} color="#fff" />
              <View style={styles.notifDot} />
            </TouchableOpacity>
          </View>

          {/* Tab selector */}
          <View style={[styles.tabContainer, isTablet && styles.tabContainerTablet]}>
            {["overview", "analytics", "reports"].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, selectedTab === tab && styles.tabActive]}
                onPress={() => setSelectedTab(tab)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.tabText,
                    isTablet && styles.tabTextTablet,
                    selectedTab === tab && styles.tabTextActive,
                  ]}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </LinearGradient>

        {/* ── Stats Cards ── */}
        <Animated.View
          style={[
            styles.statsContainer,
            isTablet && styles.statsContainerTablet,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          {STATS.map((stat, idx) => (
            <StatCard key={idx} stat={stat} fadeAnim={fadeAnim} />
          ))}
        </Animated.View>

        {/* ── Performance Insights ── */}
        <View style={[styles.section, isTablet && styles.sectionTablet]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, isTablet && styles.sectionTitleTablet]}>
              Performance Insights
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => filterSheetRef.current?.open()}
            >
              <Ionicons name="filter" size={isTablet ? 24 : 20} color="#0a0e27" />
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.insightsScroll}
          >
            {INSIGHTS.map((insight, idx) => (
              <InsightCard key={idx} insight={insight} />
            ))}
          </ScrollView>
        </View>

        {/* ── Quick Access ── */}
        <View style={[styles.section, isTablet && styles.sectionTablet]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, isTablet && styles.sectionTitleTablet]}>
              Quick Access
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => settingsSheetRef.current?.open()}
            >
              <Ionicons name="grid-outline" size={isTablet ? 24 : 20} color="#0a0e27" />
            </TouchableOpacity>
          </View>
          <View style={[styles.quickGrid, isTablet && styles.quickGridTablet]}>
            {QUICK_ACCESS.map((item, idx) => (
              <QuickAccessCard key={idx} item={item} />
            ))}
          </View>
        </View>

        {/* ── Recent Activity ── */}
        <View style={[styles.section, isTablet && styles.sectionTablet]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, isTablet && styles.sectionTitleTablet]}>
              Recent Activity
            </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={[styles.seeAll, isTablet && styles.seeAllTablet]}>View All</Text>
            </TouchableOpacity>
          </View>
          {RECENT_ACTIVITY.map((item, idx) => (
            <ActivityItem
              key={idx}
              item={item}
              fadeAnim={fadeAnim}
              onPress={() => handleActivityPress(item)}
            />
          ))}
        </View>

        {/* ── Action Buttons ── */}
        <View style={[styles.actionContainer, isTablet && styles.actionContainerTablet]}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.8}
            onPress={() => (navigation as any).navigate("NewExperiment")}
          >
            <LinearGradient
              colors={["#6C5CE7", "#5F4FD1"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.buttonGradient, isTablet && styles.buttonGradientTablet]}
            >
              <Ionicons name="add-circle" size={isTablet ? 26 : 22} color="#fff" />
              <Text style={[styles.buttonText, isTablet && styles.buttonTextTablet]}>
                Start New Experiment
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.secondaryButtons}>
            <TouchableOpacity
              style={[styles.secondaryButton, isTablet && styles.secondaryButtonTablet]}
              activeOpacity={0.7}
            >
              <Ionicons name="download-outline" size={isTablet ? 24 : 20} color="#6C5CE7" />
              <Text style={[styles.secondaryButtonText, isTablet && styles.secondaryButtonTextTablet]}>
                Export
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.secondaryButton, isTablet && styles.secondaryButtonTablet]}
              activeOpacity={0.7}
            >
              <Ionicons name="share-social-outline" size={isTablet ? 24 : 20} color="#6C5CE7" />
              <Text style={[styles.secondaryButtonText, isTablet && styles.secondaryButtonTextTablet]}>
                Share
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* ══ Notifications Bottom Sheet ══ */}
      <RBSheet
        ref={notificationSheetRef}
        height={isTablet ? 500 : 400}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 10,
          },
        }}
      >
        <View style={styles.sheetHandle} />
        <View style={styles.sheetHeader}>
          <Text style={[styles.sheetTitle, isTablet && styles.sheetTitleTablet]}>
            Notifications
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => notificationSheetRef.current?.close()}
          >
            <Ionicons name="close-circle" size={isTablet ? 32 : 28} color="#666" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          {NOTIFICATIONS.map((notif) => (
            <TouchableOpacity
              key={notif.id}
              style={[styles.notifItem, isTablet && styles.notifItemTablet]}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.notifIcon,
                  { backgroundColor: notif.unread ? "#6C5CE720" : "#f5f5f5" },
                ]}
              >
                <Ionicons
                  name={notif.unread ? "notifications" : "notifications-outline"}
                  size={isTablet ? 28 : 24}
                  color={notif.unread ? "#6C5CE7" : "#95a5a6"}
                />
              </View>
              <View style={styles.notifContent}>
                <Text
                  style={[
                    styles.notifTitle,
                    isTablet && styles.notifTitleTablet,
                    { fontWeight: notif.unread ? "700" : "500" },
                  ]}
                >
                  {notif.title}
                </Text>
                <Text style={[styles.notifTime, isTablet && styles.notifTimeTablet]}>
                  {notif.time}
                </Text>
              </View>
              {notif.unread && <View style={styles.unreadDot} />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </RBSheet>

      {/* ══ Customize Dashboard Bottom Sheet ══ */}
      <RBSheet
        ref={settingsSheetRef}
        height={isTablet ? 400 : 320}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 10,
          },
        }}
      >
        <View style={styles.sheetHandle} />
        <View style={styles.sheetHeader}>
          <Text style={[styles.sheetTitle, isTablet && styles.sheetTitleTablet]}>
            Customize Dashboard
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => settingsSheetRef.current?.close()}
          >
            <Ionicons name="close-circle" size={isTablet ? 32 : 28} color="#666" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          {["Show Stats", "Show Insights", "Show Quick Access", "Show Activity"].map(
            (option, idx) => (
              <TouchableOpacity
                key={idx}
                style={[styles.settingItem, isTablet && styles.settingItemTablet]}
                activeOpacity={0.7}
              >
                <Text style={[styles.settingText, isTablet && styles.settingTextTablet]}>
                  {option}
                </Text>
                <Ionicons name="checkmark-circle" size={isTablet ? 28 : 24} color="#00B894" />
              </TouchableOpacity>
            )
          )}
        </ScrollView>
      </RBSheet>

      {/* ══ Filter Insights Bottom Sheet ══ */}
      <RBSheet
        ref={filterSheetRef}
        height={isTablet ? 400 : 350}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 10,
          },
        }}
      >
        <View style={styles.sheetHandle} />
        <View style={styles.sheetHeader}>
          <Text style={[styles.sheetTitle, isTablet && styles.sheetTitleTablet]}>
            Filter Insights
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => filterSheetRef.current?.close()}
          >
            <Ionicons name="close-circle" size={isTablet ? 32 : 28} color="#666" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          {["Last 7 Days", "Last 30 Days", "Last 3 Months", "Last Year", "All Time"].map(
            (filter, idx) => (
              <TouchableOpacity
                key={idx}
                style={[styles.filterItem, isTablet && styles.filterItemTablet]}
                activeOpacity={0.7}
              >
                <Ionicons name="calendar-outline" size={isTablet ? 28 : 24} color="#6C5CE7" />
                <Text style={[styles.filterText, isTablet && styles.filterTextTablet]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>
      </RBSheet>

      {/* ══ Activity Details Bottom Sheet ══ */}
      <RBSheet
        ref={activityDetailsSheetRef}
        height={isTablet ? 450 : 380}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 10,
          },
        }}
      >
        <View style={styles.sheetHandle} />
        {selectedActivity && (
          <>
            <View style={styles.sheetHeader}>
              <Text style={[styles.sheetTitle, isTablet && styles.sheetTitleTablet]}>
                Activity Details
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => activityDetailsSheetRef.current?.close()}
              >
                <Ionicons name="close-circle" size={isTablet ? 32 : 28} color="#666" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.activityDetailsContent}>
              <View
                style={[
                  styles.activityDetailIcon,
                  { backgroundColor: selectedActivity.color + "20" },
                ]}
              >
                <Ionicons
                  name={selectedActivity.icon as any}
                  size={isTablet ? 40 : 32}
                  color={selectedActivity.color}
                />
              </View>
              <Text
                style={[
                  styles.activityDetailTitle,
                  isTablet && styles.activityDetailTitleTablet,
                ]}
              >
                {selectedActivity.title}
              </Text>
              <Text
                style={[
                  styles.activityDetailDesc,
                  isTablet && styles.activityDetailDescTablet,
                ]}
              >
                {selectedActivity.description}
              </Text>
              <Text
                style={[
                  styles.activityDetailTime,
                  isTablet && styles.activityDetailTimeTablet,
                ]}
              >
                {selectedActivity.time}
              </Text>

              <View style={styles.activityActions}>
                <TouchableOpacity
                  style={[
                    styles.activityActionBtn,
                    styles.activityActionPrimary,
                    isTablet && styles.activityActionBtnTablet,
                  ]}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.activityActionTextPrimary,
                      isTablet && styles.activityActionTextTablet,
                    ]}
                  >
                    View Details
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.activityActionBtn,
                    styles.activityActionSecondary,
                    isTablet && styles.activityActionBtnTablet,
                  ]}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.activityActionTextSecondary,
                      isTablet && styles.activityActionTextTablet,
                    ]}
                  >
                    Mark as Read
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </>
        )}
      </RBSheet>
    </View>
  );
};

DashboardScreen.navigationOptions = () => ({ headerShown: false });

export default DashboardScreen;

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // Header
  header: {
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: Platform.OS === "android" ? 0 : 8,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  menuBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  headerTextContainer: { flex: 1 },
  greeting: { color: "rgba(255,255,255,0.7)", fontSize: 14, marginBottom: 4 },
  greetingTablet: { fontSize: 18 },
  headerTitle: { color: "#fff", fontSize: 22, fontWeight: "800", letterSpacing: 0.5 },
  headerTitleTablet: { fontSize: 32 },
  headerSubtitle: { color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 4, lineHeight: 18 },
  headerSubtitleTablet: { fontSize: 16, lineHeight: 24 },
  notifBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  notifDot: {
    position: "absolute",
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E17055",
    borderWidth: 2,
    borderColor: "#1a1f4e",
  },

  // Tabs
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 4,
  },
  tabContainerTablet: { borderRadius: 16, padding: 6 },
  tab: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 10 },
  tabActive: { backgroundColor: "rgba(255,255,255,0.2)" },
  tabText: { color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: "600" },
  tabTextTablet: { fontSize: 16 },
  tabTextActive: { color: "#fff" },

  // Stats
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    marginTop: -30,
  },
  statsContainerTablet: { paddingHorizontal: 20, marginTop: -40 },
  statCard: {
    width: (width - 48) / 2,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    margin: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: Platform.OS === "android" ? 0 : 3,
  },
  statCardTablet: {
    width: (width - 88) / 2,
    padding: 24,
    margin: 10,
    borderRadius: 20,
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  statIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  changeBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  changeText: { fontSize: 11, fontWeight: "700" },
  statValue: { fontSize: 24, fontWeight: "800", color: "#0a0e27", marginBottom: 4 },
  statValueTablet: { fontSize: 36 },
  statLabel: { fontSize: 12, color: "#7f8c8d", marginBottom: 10 },
  statLabelTablet: { fontSize: 16 },
  statProgressBg: { height: 4, borderRadius: 2, overflow: "hidden" },
  statProgressBar: { height: "100%", borderRadius: 2 },

  // Insights
  insightsScroll: { paddingRight: 12 },
  insightCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginRight: 12,
    minWidth: width * 0.65,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: Platform.OS === "android" ? 0 : 2,
  },
  insightCardTablet: { minWidth: width * 0.4, padding: 20, borderRadius: 18 },
  insightIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  insightContent: { flex: 1 },
  insightTitle: { fontSize: 13, color: "#7f8c8d", marginBottom: 6 },
  insightTitleTablet: { fontSize: 16 },
  insightMetrics: { flexDirection: "row", alignItems: "center" },
  insightValue: { fontSize: 22, fontWeight: "800", color: "#0a0e27", marginRight: 10 },
  insightValueTablet: { fontSize: 30 },
  insightChange: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  insightChangeText: { fontSize: 12, fontWeight: "700", marginLeft: 4 },
  insightChangeTextTablet: { fontSize: 16 },

  // Sections
  section: { paddingHorizontal: 18, marginTop: 24 },
  sectionTablet: { paddingHorizontal: 30, marginTop: 35 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#0a0e27" },
  sectionTitleTablet: { fontSize: 26 },
  seeAll: { fontSize: 14, color: "#6C5CE7", fontWeight: "600" },
  seeAllTablet: { fontSize: 18 },

  // Quick Access
  quickGrid: { flexDirection: "row", flexWrap: "wrap", marginHorizontal: -6 },
  quickGridTablet: { marginHorizontal: -10 },
  quickCard: { width: (width - 48) / 2, margin: 6, borderRadius: 16, overflow: "hidden" },
  quickCardTablet: { width: (width - 100) / 2, margin: 10, borderRadius: 20 },
  quickGradient: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },
  quickHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  quickIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "700" },
  quickTitle: { fontSize: 14, fontWeight: "700", color: "#0a0e27", marginBottom: 4 },
  quickTitleTablet: { fontSize: 18 },
  quickSubtitle: { fontSize: 11, color: "#7f8c8d", marginBottom: 10 },
  quickSubtitleTablet: { fontSize: 14 },
  quickFooter: { alignItems: "flex-end" },

  // Activity
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: Platform.OS === "android" ? 0 : 2,
  },
  activityRowTablet: { padding: 20, borderRadius: 18, marginBottom: 15 },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  activityText: { flex: 1 },
  activityTitle: { fontSize: 13, fontWeight: "600", color: "#0a0e27", marginBottom: 4 },
  activityTitleTablet: { fontSize: 17 },
  activityDescription: { fontSize: 12, color: "#95a5a6", marginBottom: 4 },
  activityDescriptionTablet: { fontSize: 15 },
  activityTime: { fontSize: 11, color: "#bdc3c7" },
  activityTimeTablet: { fontSize: 14 },

  // Action Buttons
  actionContainer: { paddingHorizontal: 18, marginTop: 24 },
  actionContainerTablet: { paddingHorizontal: 30, marginTop: 35 },
  primaryButton: {
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 12,
    shadowColor: "#6C5CE7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: Platform.OS === "android" ? 0 : 6,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonGradientTablet: { paddingVertical: 22, paddingHorizontal: 35 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700", marginLeft: 10 },
  buttonTextTablet: { fontSize: 20 },
  secondaryButtons: { flexDirection: "row", justifyContent: "space-between" },
  secondaryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 14,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: "#6C5CE720",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: Platform.OS === "android" ? 0 : 2,
  },
  secondaryButtonTablet: { paddingVertical: 20, borderRadius: 18 },
  secondaryButtonText: { color: "#6C5CE7", fontSize: 13, fontWeight: "600", marginLeft: 8 },
  secondaryButtonTextTablet: { fontSize: 17 },

  // Bottom Sheet shared
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#e0e0e0",
    alignSelf: "center",
    marginBottom: 8,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sheetTitle: { fontSize: 18, fontWeight: "700", color: "#333" },
  sheetTitleTablet: { fontSize: 26 },

  // Notifications sheet
  notifItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  notifItemTablet: { paddingHorizontal: 30, paddingVertical: 20 },
  notifIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  notifContent: { flex: 1 },
  notifTitle: { fontSize: 14, color: "#333", marginBottom: 4 },
  notifTitleTablet: { fontSize: 18 },
  notifTime: { fontSize: 12, color: "#95a5a6" },
  notifTimeTablet: { fontSize: 15 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#6C5CE7" },

  // Settings sheet
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  settingItemTablet: { paddingHorizontal: 30, paddingVertical: 20 },
  settingText: { fontSize: 15, color: "#333", fontWeight: "500" },
  settingTextTablet: { fontSize: 19 },

  // Filter sheet
  filterItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  filterItemTablet: { paddingHorizontal: 30, paddingVertical: 20 },
  filterText: { fontSize: 15, color: "#333", fontWeight: "500", marginLeft: 14 },
  filterTextTablet: { fontSize: 19 },

  // Activity details sheet
  activityDetailsContent: { paddingHorizontal: 20, paddingTop: 20 },
  activityDetailIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  activityDetailTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0a0e27",
    textAlign: "center",
    marginBottom: 10,
  },
  activityDetailTitleTablet: { fontSize: 24 },
  activityDetailDesc: { fontSize: 14, color: "#7f8c8d", textAlign: "center", marginBottom: 8 },
  activityDetailDescTablet: { fontSize: 18 },
  activityDetailTime: { fontSize: 12, color: "#bdc3c7", textAlign: "center", marginBottom: 24 },
  activityDetailTimeTablet: { fontSize: 16 },
  activityActions: { gap: 12 },
  activityActionBtn: { paddingVertical: 14, borderRadius: 12, alignItems: "center" },
  activityActionBtnTablet: { paddingVertical: 18, borderRadius: 16 },
  activityActionPrimary: { backgroundColor: "#6C5CE7" },
  activityActionSecondary: { backgroundColor: "#f5f5f5" },
  activityActionTextPrimary: { color: "#fff", fontSize: 15, fontWeight: "700" },
  activityActionTextSecondary: { color: "#333", fontSize: 15, fontWeight: "600" },
  activityActionTextTablet: { fontSize: 19 },
});