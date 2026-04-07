import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  SafeAreaView,
  StatusBar,
  Alert,
  Animated,
  PanResponder,
} from "react-native";
import Svg, { Circle, Path, Line, Rect, Defs, LinearGradient, Stop } from "react-native-svg";
import navigationOptions from "./TeamScreen.navigationOptions";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const COLORS = {
  bg: "#F8FAFC",
  card: "#FFFFFF",
  primary: "#059669",
  secondary: "#0284C7",
  accent: "#8B5CF6",
  warning: "#F59E0B",
  danger: "#EF4444",
  success: "#10B981",
  textMain: "#0F172A",
  textSub: "#64748B",
  border: "#E2E8F0",
  lightPrimary: "rgba(5, 150, 105, 0.1)",
  lightSecondary: "rgba(2, 132, 199, 0.1)",
  darkBg: "#0F172A",
};

// Mini Line Chart Component
const MiniLineChart = ({ data, color, width = 120, height = 40 }) => {
  const maxVal = Math.max(...data);
  const minVal = Math.min(...data);
  const range = maxVal - minVal || 1;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - minVal) / range) * (height - 10) - 5;
    return `${x},${y}`;
  }).join(' ');

  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={color} stopOpacity="0.3" />
          <Stop offset="1" stopColor={color} stopOpacity="0" />
        </LinearGradient>
      </Defs>
      <Path
        d={`M0,${height} L${points} L${width},${height} Z`}
        fill={`url(#grad-${color})`}
      />
      <Path
        d={`M${points}`}
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {data.map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((val - minVal) / range) * (height - 10) - 5;
        return i === data.length - 1 ? (
          <Circle key={i} cx={x} cy={y} r="4" fill={color} />
        ) : null;
      })}
    </Svg>
  );
};

// Progress Ring Component
const ProgressRing = ({ progress, size = 80, strokeWidth = 8, color }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <Svg width={size} height={size}>
      <Circle
        stroke={COLORS.border}
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
      />
      <Circle
        stroke={color}
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </Svg>
  );
};

// Bar Chart Component
const BarChart = ({ data, color, width = SCREEN_WIDTH - 80, height = 120 }) => {
  const maxVal = Math.max(...data.map(d => d.value));
  const barWidth = (width - (data.length - 1) * 8) / data.length;

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height - 20}>
        {data.map((item, i) => {
          const barHeight = (item.value / maxVal) * (height - 40);
          const x = i * (barWidth + 8);
          const y = height - 40 - barHeight;
          return (
            <React.Fragment key={i}>
              <Rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={6}
                fill={i === data.length - 1 ? color : color + "40"}
              />
            </React.Fragment>
          );
        })}
      </Svg>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 4 }}>
        {data.map((item, i) => (
          <Text key={i} style={{ fontSize: 10, color: COLORS.textSub, width: barWidth, textAlign: 'center' }}>
            {item.label}
          </Text>
        ))}
      </View>
    </View>
  );
};

// Enhanced Bottom Sheet Modal
const DetailBottomSheet = ({ visible, onClose, item }) => {
  const [activeTab, setActiveTab] = useState(0);
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 65,
          friction: 11,
        }),
        Animated.timing(overlayAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          slideAnim.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100 || gestureState.vy > 0.5) {
          onClose();
        } else {
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
            tension: 65,
            friction: 11,
          }).start();
        }
      },
    })
  ).current;

  if (!item) return null;

  const tabs = ["Overview", "Trends", "History", "Actions"];

  const historyData = [
    { date: "Today", value: item.value || "72", status: "Normal", time: "10:30 AM" },
    { date: "Yesterday", value: "74", status: "Normal", time: "09:15 AM" },
    { date: "Mar 10", value: "71", status: "Normal", time: "11:00 AM" },
    { date: "Mar 09", value: "76", status: "Elevated", time: "08:45 AM" },
    { date: "Mar 08", value: "70", status: "Normal", time: "10:20 AM" },
  ];

  const weeklyData = [
    { label: "Mon", value: 72 },
    { label: "Tue", value: 74 },
    { label: "Wed", value: 71 },
    { label: "Thu", value: 76 },
    { label: "Fri", value: 73 },
    { label: "Sat", value: 70 },
    { label: "Sun", value: 72 },
  ];

  const trendData = [72, 74, 71, 76, 73, 70, 72];

  const renderOverviewTab = () => (
    <View style={styles.tabContent}>
      {/* Current Reading Card */}
      <View style={styles.currentReadingCard}>
        <View style={styles.readingLeft}>
          <Text style={styles.readingLabel}>Current Reading</Text>
          <View style={styles.readingValueRow}>
            <Text style={styles.readingValue}>{item.value || "72"}</Text>
            <Text style={styles.readingUnit}>{item.unit || "bpm"}</Text>
          </View>
          <View style={[styles.statusPill, { backgroundColor: (item.color || COLORS.primary) + "20" }]}>
            <View style={[styles.statusDot, { backgroundColor: item.color || COLORS.primary }]} />
            <Text style={[styles.statusPillText, { color: item.color || COLORS.primary }]}>
              {item.badge || "Normal"}
            </Text>
          </View>
        </View>
        <View style={styles.readingRight}>
          <ProgressRing progress={75} color={item.color || COLORS.primary} size={90} strokeWidth={10} />
          <Text style={styles.ringLabel}>75% Optimal</Text>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.quickStatsRow}>
        <View style={styles.quickStatBox}>
          <Text style={styles.quickStatLabel}>Average (7d)</Text>
          <Text style={styles.quickStatValue}>73 {item.unit || "bpm"}</Text>
        </View>
        <View style={styles.quickStatBox}>
          <Text style={styles.quickStatLabel}>Min</Text>
          <Text style={styles.quickStatValue}>68</Text>
        </View>
        <View style={styles.quickStatBox}>
          <Text style={styles.quickStatLabel}>Max</Text>
          <Text style={styles.quickStatValue}>82</Text>
        </View>
      </View>

      {/* AI Analysis */}
      <View style={styles.aiAnalysisCard}>
        <View style={styles.aiHeader}>
          <Text style={styles.aiIcon}>🤖</Text>
          <Text style={styles.aiTitle}>AI Health Insight</Text>
          <View style={styles.aiBadge}>
            <Text style={styles.aiBadgeText}>NEW</Text>
          </View>
        </View>
        <Text style={styles.aiText}>
          Your {item.label || "vital signs"} have been stable over the past week.
          Current reading is within the healthy range for your age group (25-34).
          Keep maintaining your current lifestyle habits.
        </Text>
        <View style={styles.aiRecommendations}>
          <Text style={styles.aiRecommendTitle}>Recommendations:</Text>
          <View style={styles.recommendItem}>
            <Text style={styles.recommendIcon}>💧</Text>
            <Text style={styles.recommendText}>Stay hydrated - aim for 8 glasses of water daily</Text>
          </View>
          <View style={styles.recommendItem}>
            <Text style={styles.recommendIcon}>🏃</Text>
            <Text style={styles.recommendText}>30 minutes of moderate exercise recommended</Text>
          </View>
        </View>
      </View>

      {/* Normal Range Info */}
      <View style={styles.rangeInfoCard}>
        <Text style={styles.rangeTitle}>Normal Range Reference</Text>
        <View style={styles.rangeBar}>
          <View style={[styles.rangeSegment, { flex: 1, backgroundColor: COLORS.success + "40" }]} />
          <View style={[styles.rangeSegment, { flex: 2, backgroundColor: COLORS.success }]} />
          <View style={[styles.rangeSegment, { flex: 1, backgroundColor: COLORS.warning }]} />
          <View style={[styles.rangeSegment, { flex: 1, backgroundColor: COLORS.danger }]} />
        </View>
        <View style={styles.rangeLabels}>
          <Text style={styles.rangeLabel}>Low</Text>
          <Text style={styles.rangeLabel}>Normal</Text>
          <Text style={styles.rangeLabel}>High</Text>
          <Text style={styles.rangeLabel}>Critical</Text>
        </View>
        <View style={styles.rangeMarker}>
          <Text style={styles.rangeMarkerText}>You are here: Normal</Text>
        </View>
      </View>
    </View>
  );

  const renderTrendsTab = () => (
    <View style={styles.tabContent}>
      {/* Weekly Trend Chart */}
      <View style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Weekly Trend</Text>
          <TouchableOpacity style={styles.chartPeriodBtn}>
            <Text style={styles.chartPeriodText}>7 Days ▼</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.chartContainer}>
          <BarChart data={weeklyData} color={item.color || COLORS.primary} />
        </View>
      </View>

      {/* Comparison Cards */}
      <View style={styles.comparisonRow}>
        <View style={styles.comparisonCard}>
          <Text style={styles.comparisonLabel}>vs Last Week</Text>
          <View style={styles.comparisonValueRow}>
            <Text style={[styles.comparisonValue, { color: COLORS.success }]}>↓ 3%</Text>
          </View>
          <MiniLineChart data={[76, 75, 74, 73, 72, 72, 72]} color={COLORS.success} width={100} height={30} />
        </View>
        <View style={styles.comparisonCard}>
          <Text style={styles.comparisonLabel}>vs Last Month</Text>
          <View style={styles.comparisonValueRow}>
            <Text style={[styles.comparisonValue, { color: COLORS.danger }]}>↑ 2%</Text>
          </View>
          <MiniLineChart data={[70, 71, 70, 72, 73, 72, 72]} color={COLORS.danger} width={100} height={30} />
        </View>
      </View>

      {/* Pattern Analysis */}
      <View style={styles.patternCard}>
        <Text style={styles.patternTitle}>📊 Pattern Analysis</Text>
        <View style={styles.patternItem}>
          <View style={styles.patternIconBox}>
            <Text>🌅</Text>
          </View>
          <View style={styles.patternInfo}>
            <Text style={styles.patternLabel}>Morning Readings</Text>
            <Text style={styles.patternDesc}>Tend to be 5-8% lower</Text>
          </View>
          <Text style={styles.patternValue}>68 avg</Text>
        </View>
        <View style={styles.patternItem}>
          <View style={styles.patternIconBox}>
            <Text>🌙</Text>
          </View>
          <View style={styles.patternInfo}>
            <Text style={styles.patternLabel}>Evening Readings</Text>
            <Text style={styles.patternDesc}>Peak activity time</Text>
          </View>
          <Text style={styles.patternValue}>76 avg</Text>
        </View>
        <View style={styles.patternItem}>
          <View style={styles.patternIconBox}>
            <Text>🏃</Text>
          </View>
          <View style={styles.patternInfo}>
            <Text style={styles.patternLabel}>Post-Exercise</Text>
            <Text style={styles.patternDesc}>Elevated for 30 min</Text>
          </View>
          <Text style={styles.patternValue}>95 avg</Text>
        </View>
      </View>
    </View>
  );

  const renderHistoryTab = () => (
    <View style={styles.tabContent}>
      {/* Filter Pills */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        {["All", "Normal", "Elevated", "Low"].map((filter, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.filterPill, idx === 0 && styles.filterPillActive]}
          >
            <Text style={[styles.filterPillText, idx === 0 && styles.filterPillTextActive]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* History List */}
      <View style={styles.historyList}>
        {historyData.map((entry, idx) => (
          <TouchableOpacity key={idx} style={styles.historyItem}>
            <View style={styles.historyLeft}>
              <View style={[styles.historyDot, {
                backgroundColor: entry.status === "Normal" ? COLORS.success : COLORS.warning
              }]} />
              <View>
                <Text style={styles.historyDate}>{entry.date}</Text>
                <Text style={styles.historyTime}>{entry.time}</Text>
              </View>
            </View>
            <View style={styles.historyRight}>
              <Text style={styles.historyValue}>{entry.value} {item.unit || "bpm"}</Text>
              <View style={[styles.historyStatus, {
                backgroundColor: entry.status === "Normal" ? COLORS.success + "20" : COLORS.warning + "20"
              }]}>
                <Text style={[styles.historyStatusText, {
                  color: entry.status === "Normal" ? COLORS.success : COLORS.warning
                }]}>
                  {entry.status}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Load More */}
      <TouchableOpacity style={styles.loadMoreBtn}>
        <Text style={styles.loadMoreText}>Load More History</Text>
      </TouchableOpacity>

      {/* Export Option */}
      <View style={styles.exportCard}>
        <Text style={styles.exportIcon}>📑</Text>
        <View style={styles.exportInfo}>
          <Text style={styles.exportTitle}>Export History</Text>
          <Text style={styles.exportDesc}>Download all readings as CSV or PDF</Text>
        </View>
        <TouchableOpacity style={styles.exportBtn}>
          <Text style={styles.exportBtnText}>Export</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderActionsTab = () => (
    <View style={styles.tabContent}>
      {/* Quick Actions */}
      <Text style={styles.actionsTitle}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        <TouchableOpacity style={styles.actionCard} onPress={() => Alert.alert("Measure", "Starting new measurement...")}>
          <View style={[styles.actionIconBox, { backgroundColor: COLORS.primary + "20" }]}>
            <Text style={styles.actionIcon}>📏</Text>
          </View>
          <Text style={styles.actionCardTitle}>Take Reading</Text>
          <Text style={styles.actionCardDesc}>Record new measurement</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard} onPress={() => Alert.alert("Reminder", "Setting up reminder...")}>
          <View style={[styles.actionIconBox, { backgroundColor: COLORS.secondary + "20" }]}>
            <Text style={styles.actionIcon}>⏰</Text>
          </View>
          <Text style={styles.actionCardTitle}>Set Reminder</Text>
          <Text style={styles.actionCardDesc}>Daily check reminders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard} onPress={() => Alert.alert("Share", "Preparing share options...")}>
          <View style={[styles.actionIconBox, { backgroundColor: COLORS.accent + "20" }]}>
            <Text style={styles.actionIcon}>📤</Text>
          </View>
          <Text style={styles.actionCardTitle}>Share Report</Text>
          <Text style={styles.actionCardDesc}>Send to doctor</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard} onPress={() => Alert.alert("Alert", "Configuring alerts...")}>
          <View style={[styles.actionIconBox, { backgroundColor: COLORS.warning + "20" }]}>
            <Text style={styles.actionIcon}>🔔</Text>
          </View>
          <Text style={styles.actionCardTitle}>Set Alert</Text>
          <Text style={styles.actionCardDesc}>Abnormal value alerts</Text>
        </TouchableOpacity>
      </View>

      {/* Connected Devices */}
      <Text style={styles.actionsTitle}>Connected Devices</Text>
      <View style={styles.deviceCard}>
        <View style={styles.deviceIcon}>
          <Text style={{ fontSize: 24 }}>⌚</Text>
        </View>
        <View style={styles.deviceInfo}>
          <Text style={styles.deviceName}>Smart Watch Pro</Text>
          <Text style={styles.deviceStatus}>Connected • Last sync 2 min ago</Text>
        </View>
        <View style={[styles.deviceStatusDot, { backgroundColor: COLORS.success }]} />
      </View>
      <View style={styles.deviceCard}>
        <View style={styles.deviceIcon}>
          <Text style={{ fontSize: 24 }}>💓</Text>
        </View>
        <View style={styles.deviceInfo}>
          <Text style={styles.deviceName}>Heart Monitor X1</Text>
          <Text style={styles.deviceStatus}>Not connected</Text>
        </View>
        <View style={[styles.deviceStatusDot, { backgroundColor: COLORS.textSub }]} />
      </View>

      {/* Emergency Contact */}
      <TouchableOpacity style={styles.emergencyCard}>
        <View style={styles.emergencyIcon}>
          <Text style={{ fontSize: 20 }}>🚨</Text>
        </View>
        <View style={styles.emergencyInfo}>
          <Text style={styles.emergencyTitle}>Emergency Contact</Text>
          <Text style={styles.emergencyDesc}>Alert your doctor if values are critical</Text>
        </View>
        <Text style={styles.emergencyChevron}>›</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal transparent visible={visible} onRequestClose={onClose} statusBarTranslucent>
      <Animated.View style={[styles.sheetOverlay, { opacity: overlayAnim }]}>
        <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />
      </Animated.View>
      <Animated.View
        style={[
          styles.sheetContainer,
          { transform: [{ translateY: slideAnim }] },
        ]}
        {...panResponder.panHandlers}
      >
        {/* Handle Bar */}
        <View style={styles.handleBar}>
          <View style={styles.handle} />
        </View>

        {/* Header */}
        <View style={styles.sheetHeader}>
          <View style={[styles.sheetIconBox, { backgroundColor: (item.color || COLORS.primary) + "20" }]}>
            <Text style={styles.sheetIconText}>{item.icon || "❤️"}</Text>
          </View>
          <View style={styles.sheetTitleContainer}>
            <Text style={styles.sheetSubtitle}>Health Metric</Text>
            <Text style={styles.sheetTitle}>{item.label || item.title || "Vital Sign"}</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.sheetCloseBtn}>
            <Text style={styles.sheetCloseBtnText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {tabs.map((tab, idx) => (
              <TouchableOpacity
                key={idx}
                style={[styles.tab, activeTab === idx && styles.tabActive]}
                onPress={() => setActiveTab(idx)}
              >
                <Text style={[styles.tabText, activeTab === idx && styles.tabTextActive]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Tab Content */}
        <ScrollView
          style={styles.sheetContent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {activeTab === 0 && renderOverviewTab()}
          {activeTab === 1 && renderTrendsTab()}
          {activeTab === 2 && renderHistoryTab()}
          {activeTab === 3 && renderActionsTab()}
        </ScrollView>
      </Animated.View>
    </Modal>
  );
};

const HealthApp = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const triggerModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleAvatarPress = () => {
    Alert.alert("Profile", "Your health profile and settings will appear here.", [{ text: "OK" }]);
  };

  const handleViewFullStats = () => {
    Alert.alert(
      "Weekly Statistics",
      "Your activity level is up by 12% compared to last week. Detailed charts are coming soon.",
      [{ text: "Awesome" }]
    );
  };

  const vitals = [
    { label: "Heart Rate", value: "72", unit: "bpm", badge: "Normal", color: COLORS.primary, icon: "❤️" },
    { label: "SpO2", value: "98", unit: "%", badge: "Good", color: COLORS.secondary, icon: "🫁" },
    { label: "Blood Pressure", value: "120/80", unit: "mmHg", badge: "Optimal", color: COLORS.accent, icon: "🩺" },
    { label: "Glucose", value: "110", unit: "mg/dL", badge: "Check", color: COLORS.warning, icon: "🍭" },
  ];

  const quickActions = [
    { icon: "🏥", label: "Book Appointment", color: COLORS.primary },
    { icon: "💊", label: "Medications", color: COLORS.secondary },
    { icon: "🧪", label: "Lab Results", color: COLORS.accent },
    { icon: "📞", label: "Consult Doctor", color: COLORS.warning },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>

        {/* User Greeting */}
        <View style={styles.userHeader}>
          <View>
            <Text style={styles.dateText}>Monday, 12 March</Text>
            <Text style={styles.welcomeText}>Hello, Aryan 👋</Text>
          </View>
          <TouchableOpacity onPress={handleAvatarPress} activeOpacity={0.7}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>A</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Health Score Card */}
        <View style={styles.healthScoreCard}>
          <View style={styles.healthScoreLeft}>
            <Text style={styles.healthScoreTitle}>Your Health Score</Text>
            <Text style={styles.healthScoreValue}>86<Text style={styles.healthScoreMax}>/100</Text></Text>
            <Text style={styles.healthScoreStatus}>Excellent condition</Text>
            <View style={styles.healthScoreBar}>
              <View style={[styles.healthScoreFill, { width: "86%" }]} />
            </View>
          </View>
          <View style={styles.healthScoreRight}>
            <ProgressRing progress={86} size={80} color="#FFF" strokeWidth={8} />
          </View>
        </View>

        {/* Quick Actions */}
        {/* <View style={styles.quickActionsRow}>
          {quickActions.map((action, idx) => (
            <TouchableOpacity key={idx} style={styles.quickActionBtn}>
              <View style={[styles.quickActionIcon, { backgroundColor: action.color + "15" }]}>
                <Text style={{ fontSize: 20 }}>{action.icon}</Text>
              </View>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View> */}

        {/* Vital Cards */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Current Vitals</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.vitalScroll}>
          {vitals.map((item, index) => (
            <TouchableOpacity key={index} style={styles.vitalCard} onPress={() => triggerModal(item)}>
              <View style={[styles.miniIcon, { backgroundColor: item.color + "20" }]}>
                <Text style={{ fontSize: 18 }}>{item.icon}</Text>
              </View>
              <Text style={styles.vitalName}>{item.label}</Text>
              <Text style={styles.vitalValText}>
                {item.value} <Text style={styles.unitText}>{item.unit}</Text>
              </Text>
              <View style={[styles.statusBadge, { backgroundColor: item.color + "15" }]}>
                <Text style={[styles.statusText, { color: item.color }]}>{item.badge}</Text>
              </View>
              <View style={styles.vitalChartContainer}>
                <MiniLineChart
                  data={[65, 70, 68, 72, 70, 71, parseInt(item.value) || 72]}
                  color={item.color}
                  width={108}
                  height={35}
                />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Medical Reports */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Medical Reports</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        {[
          { title: "Full Blood Count", date: "Mar 10, 2026", color: COLORS.primary, icon: "🩸", status: "Completed" },
          { title: "Cardiology Review", date: "Mar 05, 2026", color: COLORS.secondary, icon: "🫀", status: "Pending" },
          { title: "Annual Checkup", date: "Mar 01, 2026", color: COLORS.accent, icon: "📋", status: "Scheduled" },
        ].map((report, idx) => (
          <TouchableOpacity key={idx} style={styles.reportRow} onPress={() => triggerModal(report)}>
            <View style={[styles.reportThumb, { backgroundColor: report.color + "15" }]}>
              <Text>{report.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.reportTitle}>{report.title}</Text>
              <Text style={styles.reportDate}>{report.date}</Text>
            </View>
            <View style={[styles.reportStatus, {
              backgroundColor: report.status === "Completed" ? COLORS.success + "15" :
                report.status === "Pending" ? COLORS.warning + "15" : COLORS.secondary + "15"
            }]}>
              <Text style={[styles.reportStatusText, {
                color: report.status === "Completed" ? COLORS.success :
                  report.status === "Pending" ? COLORS.warning : COLORS.secondary
              }]}>
                {report.status}
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}

        {/* Upcoming Appointments */}
        <View style={styles.appointmentCard}>
          <View style={styles.appointmentHeader}>
            <Text style={styles.appointmentIcon}>📅</Text>
            <Text style={styles.appointmentLabel}>Upcoming Appointment</Text>
          </View>
          <View style={styles.appointmentContent}>
            <View style={styles.doctorAvatar}>
              <Text style={{ fontSize: 24 }}>👨‍⚕️</Text>
            </View>
            <View style={styles.appointmentInfo}>
              <Text style={styles.doctorName}>Dr. Sarah Johnson</Text>
              <Text style={styles.doctorSpecialty}>Cardiologist</Text>
              <View style={styles.appointmentTime}>
                <Text style={styles.appointmentTimeText}>📍 City Hospital • Mar 15, 10:00 AM</Text>
              </View>
            </View>
          </View>
          <View style={styles.appointmentActions}>
            <TouchableOpacity style={styles.rescheduleBtn}>
              <Text style={styles.rescheduleBtnText}>Reschedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmBtn}>
              <Text style={styles.confirmBtnText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Weekly Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Weekly Wellness</Text>
          <Text style={styles.summaryDesc}>Your activity level is up by 12% compared to last week.</Text>
          <View style={styles.summaryStats}>
            <View style={styles.summaryStatItem}>
              <Text style={styles.summaryStatValue}>8,450</Text>
              <Text style={styles.summaryStatLabel}>Steps Avg</Text>
            </View>
            <View style={styles.summaryStatDivider} />
            <View style={styles.summaryStatItem}>
              <Text style={styles.summaryStatValue}>7.2 hrs</Text>
              <Text style={styles.summaryStatLabel}>Sleep Avg</Text>
            </View>
            <View style={styles.summaryStatDivider} />
            <View style={styles.summaryStatItem}>
              <Text style={styles.summaryStatValue}>2,100</Text>
              <Text style={styles.summaryStatLabel}>Calories</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.summaryBtn} onPress={handleViewFullStats}>
            <Text style={styles.summaryBtnText}>View Full Statistics</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      <DetailBottomSheet
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        item={selectedItem}
      />
    </SafeAreaView>
  );
};

HealthApp.navigationOptions = navigationOptions();

export default HealthApp;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },

  // Header Styles
  userHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  dateText: { color: COLORS.textSub, fontSize: 12, fontWeight: "600", textTransform: "uppercase", letterSpacing: 0.5 },
  welcomeText: { color: COLORS.textMain, fontSize: 26, fontWeight: "800", marginTop: 4 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.primary, justifyContent: "center", alignItems: "center" },
  avatarText: { color: "#FFF", fontWeight: "bold", fontSize: 18 },

  // Health Score Card
  healthScoreCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  healthScoreLeft: { flex: 1 },
  healthScoreTitle: { color: "rgba(255,255,255,0.8)", fontSize: 14, fontWeight: "600" },
  healthScoreValue: { color: "#FFF", fontSize: 42, fontWeight: "800", marginTop: 4 },
  healthScoreMax: { fontSize: 20, fontWeight: "600", opacity: 0.7 },
  healthScoreStatus: { color: "rgba(255,255,255,0.8)", fontSize: 14, marginTop: 4 },
  healthScoreBar: { height: 6, backgroundColor: "rgba(255,255,255,0.3)", borderRadius: 3, marginTop: 12 },
  healthScoreFill: { height: "100%", backgroundColor: "#FFF", borderRadius: 3 },
  healthScoreRight: { marginLeft: 20 },

  // Quick Actions
  quickActionsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 25 },
  quickActionBtn: { alignItems: "center", width: (SCREEN_WIDTH - 60) / 4 },
  quickActionIcon: { width: 50, height: 50, borderRadius: 16, justifyContent: "center", alignItems: "center", marginBottom: 8 },
  quickActionLabel: { fontSize: 11, color: COLORS.textSub, fontWeight: "600", textAlign: "center" },

  // Section Header
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15, marginTop: 5 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: COLORS.textMain },
  seeAllText: { fontSize: 14, color: COLORS.primary, fontWeight: "600" },

  // Vital Cards
  vitalScroll: { marginHorizontal: -20, paddingLeft: 20, marginBottom: 25 },
  vitalCard: {
    width: 150,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 16,
    marginRight: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  miniIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: "center", alignItems: "center", marginBottom: 12 },
  vitalName: { color: COLORS.textSub, fontSize: 12, fontWeight: "600" },
  vitalValText: { fontSize: 22, fontWeight: "800", color: COLORS.textMain, marginVertical: 4 },
  unitText: { fontSize: 12, color: COLORS.textSub, fontWeight: "400" },
  statusBadge: { alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginTop: 4 },
  statusText: { fontSize: 10, fontWeight: "700" },
  vitalChartContainer: { marginTop: 12 },

  // Report Row
  reportRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  reportThumb: { width: 44, height: 44, borderRadius: 12, justifyContent: "center", alignItems: "center", marginRight: 14 },
  reportTitle: { fontSize: 15, fontWeight: "700", color: COLORS.textMain },
  reportDate: { fontSize: 12, color: COLORS.textSub, marginTop: 2 },
  reportStatus: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, marginRight: 10 },
  reportStatusText: { fontSize: 11, fontWeight: "600" },
  chevron: { fontSize: 22, color: COLORS.textSub, fontWeight: "300" },

  // Appointment Card
  appointmentCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 16,
    marginTop: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  appointmentHeader: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  appointmentIcon: { fontSize: 16, marginRight: 8 },
  appointmentLabel: { fontSize: 14, color: COLORS.textSub, fontWeight: "600" },
  appointmentContent: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  doctorAvatar: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: COLORS.lightSecondary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  appointmentInfo: { flex: 1 },
  doctorName: { fontSize: 16, fontWeight: "700", color: COLORS.textMain },
  doctorSpecialty: { fontSize: 13, color: COLORS.textSub, marginTop: 2 },
  appointmentTime: { marginTop: 6 },
  appointmentTimeText: { fontSize: 12, color: COLORS.textSub },
  appointmentActions: { flexDirection: "row", gap: 10 },
  rescheduleBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  rescheduleBtnText: { fontSize: 14, fontWeight: "600", color: COLORS.textMain },
  confirmBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  confirmBtnText: { fontSize: 14, fontWeight: "600", color: "#FFF" },

  // Summary Card
  summaryCard: { backgroundColor: COLORS.darkBg, borderRadius: 24, padding: 24, marginTop: 10, marginBottom: 20 },
  summaryTitle: { color: "#FFF", fontSize: 18, fontWeight: "700" },
  summaryDesc: { color: "#94A3B8", fontSize: 14, marginTop: 8, lineHeight: 20 },
  summaryStats: { flexDirection: "row", marginTop: 20, paddingTop: 20, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.1)" },
  summaryStatItem: { flex: 1, alignItems: "center" },
  summaryStatValue: { color: "#FFF", fontSize: 18, fontWeight: "700" },
  summaryStatLabel: { color: "#94A3B8", fontSize: 12, marginTop: 4 },
  summaryStatDivider: { width: 1, backgroundColor: "rgba(255,255,255,0.1)" },
  summaryBtn: { backgroundColor: COLORS.primary, borderRadius: 12, paddingVertical: 14, alignItems: "center", marginTop: 20 },
  summaryBtnText: { color: "#FFF", fontWeight: "700", fontSize: 15 },

  // Bottom Sheet Styles
  sheetOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.5)",
  },
  sheetContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: SCREEN_HEIGHT * 0.9,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 20,
  },
  handleBar: { alignItems: "center", paddingTop: 12, paddingBottom: 8 },
  handle: { width: 40, height: 4, backgroundColor: COLORS.border, borderRadius: 2 },

  sheetHeader: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 15 },
  sheetIconBox: { width: 50, height: 50, borderRadius: 16, justifyContent: "center", alignItems: "center" },
  sheetIconText: { fontSize: 24 },
  sheetTitleContainer: { flex: 1, marginLeft: 14 },
  sheetSubtitle: { fontSize: 12, color: COLORS.textSub, fontWeight: "500" },
  sheetTitle: { fontSize: 20, fontWeight: "800", color: COLORS.textMain, marginTop: 2 },
  sheetCloseBtn: {
    width: 36,
    height: 36,
    backgroundColor: COLORS.bg,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  sheetCloseBtnText: { fontSize: 16, fontWeight: "600", color: COLORS.textSub },

  // Tabs
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 20,
  },
  tab: { paddingVertical: 14, paddingHorizontal: 16, marginRight: 8 },
  tabActive: { borderBottomWidth: 2, borderBottomColor: COLORS.primary },
  tabText: { fontSize: 14, fontWeight: "600", color: COLORS.textSub },
  tabTextActive: { color: COLORS.primary },

  sheetContent: { flex: 1 },
  tabContent: { padding: 20 },

  // Overview Tab
  currentReadingCard: {
    flexDirection: "row",
    backgroundColor: COLORS.bg,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  readingLeft: { flex: 1 },
  readingLabel: { fontSize: 13, color: COLORS.textSub, fontWeight: "500" },
  readingValueRow: { flexDirection: "row", alignItems: "baseline", marginTop: 8 },
  readingValue: { fontSize: 48, fontWeight: "800", color: COLORS.textMain },
  readingUnit: { fontSize: 18, color: COLORS.textSub, fontWeight: "500", marginLeft: 4 },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
  },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  statusPillText: { fontSize: 13, fontWeight: "600" },
  readingRight: { alignItems: "center", justifyContent: "center" },
  ringLabel: { fontSize: 12, color: COLORS.textSub, marginTop: 8, fontWeight: "500" },

  quickStatsRow: { flexDirection: "row", gap: 10, marginBottom: 16 },
  quickStatBox: {
    flex: 1,
    backgroundColor: COLORS.bg,
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
  },
  quickStatLabel: { fontSize: 11, color: COLORS.textSub, fontWeight: "500" },
  quickStatValue: { fontSize: 16, fontWeight: "700", color: COLORS.textMain, marginTop: 4 },

  aiAnalysisCard: {
    backgroundColor: COLORS.bg,
    borderRadius: 20,
    padding: 18,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    marginBottom: 16,
  },
  aiHeader: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  aiIcon: { fontSize: 18, marginRight: 8 },
  aiTitle: { fontSize: 15, fontWeight: "700", color: COLORS.textMain },
  aiBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginLeft: 10,
  },
  aiBadgeText: { fontSize: 10, color: "#FFF", fontWeight: "700" },
  aiText: { fontSize: 14, color: COLORS.textSub, lineHeight: 21 },
  aiRecommendations: { marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: COLORS.border },
  aiRecommendTitle: { fontSize: 13, fontWeight: "700", color: COLORS.textMain, marginBottom: 10 },
  recommendItem: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  recommendIcon: { fontSize: 16, marginRight: 10 },
  recommendText: { fontSize: 13, color: COLORS.textSub, flex: 1 },

  rangeInfoCard: { backgroundColor: COLORS.bg, borderRadius: 16, padding: 16 },
  rangeTitle: { fontSize: 14, fontWeight: "600", color: COLORS.textMain, marginBottom: 12 },
  rangeBar: { flexDirection: "row", height: 10, borderRadius: 5, overflow: "hidden" },
  rangeSegment: { height: "100%" },
  rangeLabels: { flexDirection: "row", marginTop: 8 },
  rangeLabel: { flex: 1, fontSize: 10, color: COLORS.textSub, textAlign: "center" },
  rangeMarker: { marginTop: 10, alignItems: "center" },
  rangeMarkerText: { fontSize: 12, color: COLORS.success, fontWeight: "600" },

  // Trends Tab
  chartCard: { backgroundColor: COLORS.bg, borderRadius: 20, padding: 20, marginBottom: 16 },
  chartHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  chartTitle: { fontSize: 16, fontWeight: "700", color: COLORS.textMain },
  chartPeriodBtn: {
    backgroundColor: COLORS.card,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chartPeriodText: { fontSize: 12, color: COLORS.textSub, fontWeight: "500" },
  chartContainer: { alignItems: "center" },

  comparisonRow: { flexDirection: "row", gap: 12, marginBottom: 16 },
  comparisonCard: {
    flex: 1,
    backgroundColor: COLORS.bg,
    borderRadius: 16,
    padding: 14,
  },
  comparisonLabel: { fontSize: 12, color: COLORS.textSub, fontWeight: "500" },
  comparisonValueRow: { marginVertical: 6 },
  comparisonValue: { fontSize: 18, fontWeight: "700" },

  patternCard: { backgroundColor: COLORS.bg, borderRadius: 16, padding: 16 },
  patternTitle: { fontSize: 15, fontWeight: "700", color: COLORS.textMain, marginBottom: 14 },
  patternItem: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
  patternIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.card,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  patternInfo: { flex: 1 },
  patternLabel: { fontSize: 14, fontWeight: "600", color: COLORS.textMain },
  patternDesc: { fontSize: 12, color: COLORS.textSub, marginTop: 2 },
  patternValue: { fontSize: 14, fontWeight: "700", color: COLORS.textMain },

  // History Tab
  filterScroll: { marginBottom: 16, marginHorizontal: -20, paddingHorizontal: 20 },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.bg,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterPillActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  filterPillText: { fontSize: 13, fontWeight: "600", color: COLORS.textSub },
  filterPillTextActive: { color: "#FFF" },

  historyList: { marginBottom: 16 },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.bg,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  historyLeft: { flexDirection: "row", alignItems: "center" },
  historyDot: { width: 10, height: 10, borderRadius: 5, marginRight: 12 },
  historyDate: { fontSize: 14, fontWeight: "600", color: COLORS.textMain },
  historyTime: { fontSize: 12, color: COLORS.textSub, marginTop: 2 },
  historyRight: { alignItems: "flex-end" },
  historyValue: { fontSize: 16, fontWeight: "700", color: COLORS.textMain },
  historyStatus: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, marginTop: 4 },
  historyStatusText: { fontSize: 10, fontWeight: "600" },

  loadMoreBtn: {
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: COLORS.bg,
    marginBottom: 16,
  },
  loadMoreText: { fontSize: 14, fontWeight: "600", color: COLORS.primary },

  exportCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.bg,
    borderRadius: 16,
    padding: 16,
  },
  exportIcon: { fontSize: 24, marginRight: 14 },
  exportInfo: { flex: 1 },
  exportTitle: { fontSize: 14, fontWeight: "600", color: COLORS.textMain },
  exportDesc: { fontSize: 12, color: COLORS.textSub, marginTop: 2 },
  exportBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  exportBtnText: { fontSize: 13, fontWeight: "600", color: "#FFF" },

  // Actions Tab
  actionsTitle: { fontSize: 16, fontWeight: "700", color: COLORS.textMain, marginBottom: 14 },
  actionsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 24 },
  actionCard: {
    width: (SCREEN_WIDTH - 72) / 2,
    backgroundColor: COLORS.bg,
    borderRadius: 16,
    padding: 16,
  },
  actionIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  actionIcon: { fontSize: 20 },
  actionCardTitle: { fontSize: 14, fontWeight: "700", color: COLORS.textMain },
  actionCardDesc: { fontSize: 12, color: COLORS.textSub, marginTop: 4 },

  deviceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.bg,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  deviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.card,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  deviceInfo: { flex: 1 },
  deviceName: { fontSize: 14, fontWeight: "600", color: COLORS.textMain },
  deviceStatus: { fontSize: 12, color: COLORS.textSub, marginTop: 2 },
  deviceStatusDot: { width: 10, height: 10, borderRadius: 5 },

  emergencyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.danger + "10",
    borderRadius: 16,
    padding: 16,
    marginTop: 14,
    borderWidth: 1,
    borderColor: COLORS.danger + "30",
  },
  emergencyIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.danger + "20",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  emergencyInfo: { flex: 1 },
  emergencyTitle: { fontSize: 14, fontWeight: "700", color: COLORS.danger },
  emergencyDesc: { fontSize: 12, color: COLORS.textSub, marginTop: 2 },
  emergencyChevron: { fontSize: 22, color: COLORS.danger },
});