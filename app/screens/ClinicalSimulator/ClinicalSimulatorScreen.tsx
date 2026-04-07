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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";

const { width } = Dimensions.get("window");

const CASES = [
  { id: 1, title: "Acute Hypertension Crisis", specialty: "Cardiology", difficulty: "Hard", duration: "15 min", color: "#E17055", score: "89%", status: "Open" },
  { id: 2, title: "Metabolic Pathway Disorder", specialty: "Genetics", difficulty: "Medium", duration: "25 min", color: "#6C5CE7", score: "N/A", status: "Locked" },
  { id: 3, title: "Viral Replication Cycle", specialty: "Virology", difficulty: "Easy", duration: "10 min", color: "#00B894", score: "96%", status: "Open" },
  { id: 4, title: "Neuro-degenerative Progression", specialty: "Neurology", difficulty: "Hard", duration: "30 min", color: "#0984E3", score: "N/A", status: "Open" },
];

const ClinicalSimulatorScreen = () => {
  const navigation = useNavigation();
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const caseSheetRef = useRef<any>(null);
  const infoSheetRef = useRef<any>(null);

  const handleCasePress = (item: any) => {
    setSelectedCase(item);
    caseSheetRef.current?.open();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient colors={["#0a0e27", "#1a1f4e"]} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => (navigation as any).openDrawer()} style={styles.menuBtn}>
            <Ionicons name="menu" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>🏥 Clinical Case Simulator</Text>
          <TouchableOpacity onPress={() => infoSheetRef.current?.open()} style={styles.infoBtn}>
            <Ionicons name="medal-outline" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSub}>Test your clinical logic in real scenarios</Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Progress Stats */}
        <View style={styles.progressBanner}>
           <View style={styles.progInfo}>
              <Text style={styles.progVal}>1,240</Text>
              <Text style={styles.progLab}>Exp Points</Text>
           </View>
           <View style={styles.progDivider} />
           <View style={styles.progInfo}>
              <Text style={styles.progVal}>12 / 50</Text>
              <Text style={styles.progLab}>Cases Won</Text>
           </View>
           <View style={styles.progDivider} />
           <View style={styles.progInfo}>
              <Text style={[styles.progVal, { color: '#00B894' }]}>Master</Text>
              <Text style={styles.progLab}>Clinical Rank</Text>
           </View>
        </View>

        <View style={styles.sectionHeader}>
           <Text style={styles.sectionTitle}>Medical Scenarios</Text>
           <TouchableOpacity><Text style={styles.seeAll}>Leaderboard</Text></TouchableOpacity>
        </View>

        {CASES.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.card} 
            activeOpacity={0.8}
            onPress={() => handleCasePress(item)}
            disabled={item.status === 'Locked'}
          >
            <View style={styles.cardRow}>
               <View style={[styles.caseIcon, { backgroundColor: item.color + "15" }]}>
                  <MaterialCommunityIcons name="hospital-marker" size={28} color={item.color} />
               </View>
               <View style={styles.caseInfo}>
                  <View style={styles.titleRow}>
                     <Text style={styles.caseTitle}>{item.title}</Text>
                     {item.status === 'Locked' && <Ionicons name="lock-closed" size={16} color="#bdc3c7" />}
                  </View>
                  <Text style={styles.caseMeta}>{item.specialty} · {item.duration}</Text>
                  
                  <View style={styles.badgeRow}>
                     <View style={[styles.diffBadge, { backgroundColor: item.difficulty === 'Hard' ? '#E1705515' : '#00B89415' }]}>
                        <Text style={[styles.diffText, { color: item.difficulty === 'Hard' ? '#E17055' : '#00B894' }]}>{item.difficulty}</Text>
                     </View>
                     {item.score !== 'N/A' && (
                       <View style={styles.scoreBadge}>
                          <Text style={styles.scoreText}>Prev Score: {item.score}</Text>
                       </View>
                     )}
                  </View>
               </View>
               <Ionicons name="chevron-forward" size={20} color="#eee" />
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Case Details Bottom Sheet */}
      <RBSheet
        ref={caseSheetRef}
        height={480}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 24, padding: 24
          }
        }}
      >
        {selectedCase && (
          <View style={styles.sheetContent}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>{selectedCase.title}</Text>
            <Text style={styles.sheetSubTitle}>Clinical Mission ID: #C-{selectedCase.id}01</Text>

            <View style={styles.sheetOverview}>
               <View style={styles.overviewBox}>
                  <Text style={styles.oLabel}>Specialty</Text>
                  <Text style={styles.oVal}>{selectedCase.specialty}</Text>
               </View>
               <View style={styles.overviewBox}>
                  <Text style={styles.oLabel}>Target Time</Text>
                  <Text style={styles.oVal}>{selectedCase.duration}</Text>
               </View>
            </View>

            <Text style={styles.sheetSecTitle}>Learning Objectives</Text>
            <View style={styles.objList}>
               {['Identify critical pathology signs', 'Prescribe optimal medication dosage', 'Analyze emergency biometrics'].map((obj, idx) => (
                 <View key={idx} style={styles.objItem}>
                    <Ionicons name="radio-button-on" size={14} color={selectedCase.color} />
                    <Text style={styles.objText}>{obj}</Text>
                 </View>
               ))}
            </View>

            <TouchableOpacity style={[styles.startBtn, { backgroundColor: selectedCase.color }]}>
               <Text style={styles.startBtnText}>Initialize Simulation</Text>
               <Ionicons name="play" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </RBSheet>

      <RBSheet
        ref={infoSheetRef}
        height={300}
        openDuration={250}
        customStyles={{
          container: { borderTopLeftRadius: 24, padding: 24 }
        }}
      >
        <View style={styles.sheetHandle} />
        <Text style={styles.infoTitle}>Clinical Rank & Score</Text>
        <Text style={styles.infoDesc}>Practice clinical logic across 50+ medical scenarios. Maintain high accuracy to level up your rank and unlock specialized trauma cases.</Text>
        <TouchableOpacity style={styles.infoClose} onPress={() => infoSheetRef.current?.close()}>
          <Text style={styles.infoCloseText}>Got it!</Text>
        </TouchableOpacity>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f6fa" },
  header: {
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 20, paddingHorizontal: 20,
    borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
  },
  headerTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  menuBtn: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center", alignItems: "center",
  },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "800" },
  headerSub: { color: "rgba(255,255,255,0.6)", fontSize: 13, marginTop: 4, textAlign: 'center' },
  infoBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { padding: 18 },
  progressBanner: { 
    flexDirection: 'row', backgroundColor: '#fff', borderRadius: 18, 
    padding: 20, marginTop: -20, alignItems: 'center',
    shadowColor: "#000", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1, shadowRadius: 10, elevation: 5,
  },
  progInfo: { flex: 1, alignItems: 'center' },
  progLabel: { fontSize: 11, color: '#7f8c8d' },
  progVal: { fontSize: 16, fontWeight: '800', color: '#0a0e27', marginBottom: 2 },
  progDivider: { width: 1, height: '60%', backgroundColor: '#eee' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#0a0e27" },
  seeAll: { color: '#6C5CE7', fontWeight: '700', fontSize: 13 },
  card: {
    backgroundColor: "#fff", borderRadius: 20, padding: 18,
    marginBottom: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 6, elevation: 1,
    borderWidth: 1, borderColor: '#f5f6fa'
  },
  cardRow: { flexDirection: 'row', gap: 15, alignItems: 'center' },
  caseIcon: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  caseInfo: { flex: 1 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  caseTitle: { fontSize: 15, fontWeight: '800', color: '#0a0e27' },
  caseMeta: { fontSize: 12, color: '#95a5a6', marginTop: 3 },
  badgeRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
  diffBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  diffText: { fontSize: 10, fontWeight: '800' },
  scoreBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, backgroundColor: '#f5f6fa' },
  scoreText: { fontSize: 10, color: '#333', fontWeight: '700' },
  // Sheet
  sheetHandle: { width: 40, height: 5, borderRadius: 3, backgroundColor: '#eee', alignSelf: 'center', marginBottom: 20 },
  sheetTitle: { fontSize: 18, fontWeight: '800', color: '#0a0e27', textAlign: 'center' },
  sheetSubTitle: { fontSize: 12, color: '#bdc3c7', textAlign: 'center', marginTop: 4, marginBottom: 20 },
  sheetOverview: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  overviewBox: { flex: 1, padding: 14, backgroundColor: '#f9f9fb', borderRadius: 16 },
  oLabel: { fontSize: 11, color: '#7f8c8d' },
  oVal: { fontSize: 14, fontWeight: '700', color: '#0a0e27', marginTop: 2 },
  sheetSecTitle: { fontSize: 15, fontWeight: '800', color: '#0a0e27', marginBottom: 12 },
  objList: { gap: 12, marginBottom: 30 },
  objItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  objText: { fontSize: 14, color: '#595D58', fontWeight: '500' },
  startBtn: { height: 56, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  startBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  infoTitle: { fontSize: 20, fontWeight: '800', color: '#0a0e27', marginBottom: 12 },
  infoDesc: { fontSize: 15, color: '#7f8c8d', lineHeight: 24, marginBottom: 24 },
  infoClose: { height: 50, borderRadius: 14, backgroundColor: '#0a0e27', justifyContent: 'center', alignItems: 'center' },
  infoCloseText: { color: '#fff', fontSize: 15, fontWeight: '700' }
});

export default ClinicalSimulatorScreen;
