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
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

const CATEGORIES = [
  { id: 1, name: "Drug Design", icon: "flask", color: "#6C5CE7", count: 12 },
  { id: 2, name: "Clinical AI", icon: "hospital-box", color: "#00B894", count: 8 },
  { id: 3, name: "Molecular Bio", icon: "dna", color: "#E17055", count: 15 },
  { id: 4, name: "Quantum Chem", icon: "atom", color: "#0984E3", count: 6 },
];

const COURSES = [
  {
    id: 1,
    title: "Intro to Drug Discovery with AI",
    progress: 75,
    lessons: 12,
    duration: "6h 30m",
    color: "#6C5CE7",
    icon: "flask",
    instructor: "Dr. Sarah Chen",
    description: "Learn the fundamentals of using AI for high-throughput screening and molecule generation.",
  },
  {
    id: 2,
    title: "Molecular Biology Fundamentals",
    progress: 40,
    lessons: 18,
    duration: "9h 15m",
    color: "#00B894",
    icon: "leaf",
    instructor: "Prof. James Wilson",
    description: "Deals with the molecular basis of biological activity in and between cells.",
  },
  {
    id: 3,
    title: "Clinical Trial Design",
    progress: 90,
    lessons: 8,
    duration: "4h 45m",
    color: "#E17055",
    icon: "medical",
    instructor: "Dr. Emily Brown",
    description: "Best practices for designing randomized controlled trials and managing patient data.",
  },
  {
    id: 4,
    title: "Quantum Chemistry Basics",
    progress: 20,
    lessons: 15,
    duration: "8h 00m",
    color: "#0984E3",
    icon: "nuclear",
    instructor: "Dr. Alan Turing Jr.",
    description: "Application of quantum mechanics to chemical systems at the molecular level.",
  },
];

const LearningHubScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const courseSheetRef = useRef<any>(null);
  const infoSheetRef = useRef<any>(null);

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  const handleCoursePress = (course: any) => {
    setSelectedCourse(course);
    courseSheetRef.current?.open();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient colors={["#0a0e27", "#1a1f4e"]} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => (navigation as any).openDrawer()} style={styles.menuBtn}>
            <Ionicons name="menu" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>📘 Learning Hub</Text>
          <TouchableOpacity onPress={() => infoSheetRef.current?.open()} style={styles.infoBtn}>
            <Ionicons name="information-circle-outline" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSub}>Master the future of pharmaceuticals</Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Overall Stats */}
        <Animated.View style={[styles.statsRow, { opacity: fadeAnim }]}>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>12</Text>
            <Text style={styles.statLab}>Completed</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statVal}>45</Text>
            <Text style={styles.statLab}>Hours Learned</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statVal}>8</Text>
            <Text style={styles.statLab}>Badges</Text>
          </View>
        </Animated.View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.catCard, { backgroundColor: cat.color + "15" }]}>
              <MaterialCommunityIcons name={cat.icon as any} size={24} color={cat.color} />
              <Text style={[styles.catName, { color: cat.color }]}>{cat.name}</Text>
              <Text style={styles.catCount}>{cat.count} Courses</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Course List */}
        <View style={styles.courseHeader}>
          <Text style={styles.sectionTitle}>Active Courses</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {COURSES.map((course) => (
          <TouchableOpacity 
            key={course.id} 
            style={styles.courseCard} 
            activeOpacity={0.8}
            onPress={() => handleCoursePress(course)}
          >
            <View style={[styles.courseIcon, { backgroundColor: course.color + "20" }]}>
              <Ionicons name={course.icon as any} size={28} color={course.color} />
            </View>
            <View style={styles.courseInfo}>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.courseMeta}>by {course.instructor}</Text>
              <View style={styles.progressContainer}>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: `${course.progress}%`, backgroundColor: course.color }]} />
                </View>
                <Text style={styles.coursePercent}>{course.progress}%</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Course Detail Bottom Sheet */}
      <RBSheet
        ref={courseSheetRef}
        height={500}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 20
          }
        }}
      >
        {selectedCourse && (
          <View style={styles.sheetContent}>
            <View style={styles.sheetHandle} />
            <View style={styles.sheetHeader}>
              <View style={[styles.sheetIcon, { backgroundColor: selectedCourse.color + "20" }]}>
                <Ionicons name={selectedCourse.icon as any} size={32} color={selectedCourse.color} />
              </View>
              <View style={styles.sheetHeaderInfo}>
                <Text style={styles.sheetTitle}>{selectedCourse.title}</Text>
                <Text style={styles.sheetInstructor}>{selectedCourse.instructor}</Text>
              </View>
            </View>
            
            <View style={styles.sheetStats}>
               <View style={styles.sheetStatItem}>
                  <Ionicons name="time-outline" size={20} color="#7f8c8d" />
                  <Text style={styles.sheetStatText}>{selectedCourse.duration}</Text>
               </View>
               <View style={styles.sheetStatItem}>
                  <Ionicons name="play-outline" size={20} color="#7f8c8d" />
                  <Text style={styles.sheetStatText}>{selectedCourse.lessons} Lessons</Text>
               </View>
            </View>

            <Text style={styles.sheetDescTitle}>Description</Text>
            <Text style={styles.sheetDesc}>{selectedCourse.description}</Text>

            <TouchableOpacity style={[styles.sheetAction, { backgroundColor: selectedCourse.color }]}>
              <Text style={styles.sheetActionText}>Continue Learning</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </RBSheet>

      {/* Info Bottom Sheet */}
      <RBSheet
        ref={infoSheetRef}
        height={300}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 24
          }
        }}
      >
        <View style={styles.sheetHandle} />
        <Text style={styles.infoSheetTitle}>About Learning Hub</Text>
        <Text style={styles.infoSheetDesc}>
          Our Learning Hub is designed to help clinical professionals and researchers keep up with the latest advancements in AI-driven medicine and chemical science.
        </Text>
        <TouchableOpacity style={styles.infoCloseBtn} onPress={() => infoSheetRef.current?.close()}>
          <Text style={styles.infoCloseText}>Got it!</Text>
        </TouchableOpacity>
      </RBSheet>
    </View>
  );
};

LearningHubScreen.navigationOptions = () => ({ headerShown: false });

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f6fa" },
  header: {
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 24, paddingHorizontal: 20,
    borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
  },
  headerTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  menuBtn: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center", alignItems: "center",
  },
  headerTitle: { color: "#fff", fontSize: isTablet ? 28 : 22, fontWeight: "800" },
  headerSub: { color: "rgba(255,255,255,0.6)", fontSize: 13, marginTop: 4, textAlign: 'center' },
  infoBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { padding: 18 },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginTop: -40,
    shadowColor: "#000", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1, shadowRadius: 10, elevation: 5,
  },
  statBox: { flex: 1, alignItems: 'center' },
  statVal: { fontSize: 20, fontWeight: '800', color: '#0a0e27' },
  statLab: { fontSize: 11, color: '#7f8c8d' },
  statDivider: { width: 1, height: '100%', backgroundColor: '#eee' },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#0a0e27", marginBottom: 14, marginTop: 24 },
  catScroll: { marginHorizontal: -18, paddingLeft: 18 },
  catCard: {
    width: 140, padding: 16, borderRadius: 16, marginRight: 12,
    alignItems: 'center', justifyContent: 'center'
  },
  catName: { fontSize: 13, fontWeight: '700', marginTop: 8 },
  catCount: { fontSize: 11, color: '#7f8c8d', marginTop: 2 },
  courseHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  seeAll: { color: '#6C5CE7', fontWeight: '700', fontSize: 13 },
  courseCard: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#fff", borderRadius: 16, padding: 16,
    marginBottom: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
  },
  courseIcon: {
    width: 56, height: 56, borderRadius: 14,
    justifyContent: "center", alignItems: "center", marginRight: 16,
  },
  courseInfo: { flex: 1 },
  courseTitle: { fontSize: 15, fontWeight: "700", color: "#0a0e27" },
  courseMeta: { fontSize: 12, color: "#7f8c8d", marginTop: 2 },
  progressContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  progressBarBg: { flex: 1, height: 6, backgroundColor: "#e8e8e8", borderRadius: 3, overflow: "hidden", marginRight: 10 },
  progressBarFill: { height: 6, borderRadius: 3 },
  coursePercent: { fontSize: 12, fontWeight: "700", color: '#0a0e27' },
  // Bottom Sheet Styles
  sheetHandle: { width: 40, height: 5, borderRadius: 3, backgroundColor: '#eee', alignSelf: 'center', marginBottom: 20 },
  sheetHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  sheetIcon: { width: 64, height: 64, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  sheetHeaderInfo: { flex: 1 },
  sheetTitle: { fontSize: 18, fontWeight: '800', color: '#0a0e27' },
  sheetInstructor: { fontSize: 14, color: '#7f8c8d', marginTop: 2 },
  sheetStats: { flexDirection: 'row', marginBottom: 24 },
  sheetStatItem: { flexDirection: 'row', alignItems: 'center', marginRight: 20 },
  sheetStatText: { marginLeft: 6, color: '#7f8c8d', fontSize: 13, fontWeight: '500' },
  sheetDescTitle: { fontSize: 15, fontWeight: '700', color: '#0a0e27', marginBottom: 8 },
  sheetDesc: { fontSize: 14, color: '#595D58', lineHeight: 22, marginBottom: 30 },
  sheetAction: { 
    height: 56, borderRadius: 16, flexDirection: 'row', 
    alignItems: 'center', justifyContent: 'center', gap: 10 
  },
  sheetActionText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  infoSheetTitle: { fontSize: 20, fontWeight: '800', color: '#0a0e27', marginBottom: 12 },
  infoSheetDesc: { fontSize: 15, color: '#595D58', lineHeight: 24, marginBottom: 25 },
  infoCloseBtn: { 
    height: 50, borderRadius: 14, backgroundColor: '#0a0e27', 
    justifyContent: 'center', alignItems: 'center' 
  },
  infoCloseText: { color: '#fff', fontSize: 15, fontWeight: '700' }
});

export default LearningHubScreen;
