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

const SCENARIOS = [
  { id: 1, title: "Patient Data Briefing", role: "Clinician", focus: "Empathy & Clarity", duration: "5 min", level: "Beginner", color: "#6C5CE7" },
  { id: 2, title: "Inter-departmental Review", role: "Researcher", focus: "Technical Precision", duration: "10 min", level: "Advanced", color: "#00B894" },
  { id: 3, title: "FDA Submission Meeting", role: "Regulatory Lead", focus: "Strategic Comms", duration: "15 min", level: "Expert", color: "#E17055" },
  { id: 4, title: "Research Funding Pitch", role: "Principal Investigator", focus: "Persuasion", duration: "8 min", level: "Intermediate", color: "#0984E3" },
];

const CommTrainingScreen = () => {
  const navigation = useNavigation();
  const [selectedScenario, setSelectedScenario] = useState<any>(null);
  const scenarioSheetRef = useRef<any>(null);
  const infoSheetRef = useRef<any>(null);

  const handleScenarioPress = (item: any) => {
    setSelectedScenario(item);
    scenarioSheetRef.current?.open();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient colors={["#0a0e27", "#1a1f4e"]} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => (navigation as any).openDrawer()} style={styles.menuBtn}>
            <Ionicons name="menu" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>🗣️ Comm Training</Text>
          <TouchableOpacity onPress={() => infoSheetRef.current?.open()} style={styles.infoBtn}>
            <Ionicons name="mic-circle-outline" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSub}>Practice communication for clinical success</Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Weekly Progress */}
        <View style={styles.weeklyCard}>
           <Text style={styles.weekTitle}>Weekly Performance</Text>
           <View style={styles.weekRow}>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <View key={i} style={styles.dayCol}>
                   <View style={[styles.dayBar, { height: i === 2 || i === 4 ? 40 : 20, backgroundColor: i === 2 || i === 4 ? '#6C5CE7' : '#f0f0f0' }]} />
                   <Text style={styles.dayText}>{d}</Text>
                </View>
              ))}
           </View>
           <Text style={styles.weekMeta}>You've improved clarity by 15% this week!</Text>
        </View>

        <Text style={styles.sectionTitle}>Training Scenarios</Text>
        {SCENARIOS.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.card} 
            activeOpacity={0.8}
            onPress={() => handleScenarioPress(item)}
          >
            <View style={styles.cardRow}>
               <View style={[styles.typeIcon, { backgroundColor: item.color + "15" }]}>
                  <Ionicons name={item.id % 2 === 0 ? "people-outline" : "person-outline"} size={26} color={item.color} />
               </View>
               <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardMeta}>{item.role} · {item.duration}</Text>
                  
                  <View style={styles.tagRow}>
                     <View style={styles.tag}><Text style={styles.tagText}>{item.focus}</Text></View>
                     <View style={[styles.levelBadge, { backgroundColor: item.color + "10" }]}>
                        <Text style={[styles.levelText, { color: item.color }]}>{item.level}</Text>
                     </View>
                  </View>
               </View>
               <Ionicons name="play-circle" size={32} color={item.color} />
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Scenario Review Bottom Sheet */}
      <RBSheet
        ref={scenarioSheetRef}
        height={480}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 24, padding: 24
          }
        }}
      >
        {selectedScenario && (
          <View style={styles.sheetContent}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>{selectedScenario.title}</Text>
            <Text style={styles.sheetSubTitle}>Target Role: {selectedScenario.role}</Text>

            <View style={styles.detailGrid}>
               <View style={styles.detailBox}>
                  <Text style={styles.dLab}>Learning Focus</Text>
                  <Text style={styles.dVal}>{selectedScenario.focus}</Text>
               </View>
               <View style={styles.detailBox}>
                  <Text style={styles.dLab}>Complexity</Text>
                  <Text style={styles.dVal}>{selectedScenario.level}</Text>
               </View>
            </View>

            <Text style={styles.sheetSecTitle}>Context</Text>
            <Text style={styles.sheetDesc}>You are placed in a high-stakes meeting where you must present complex pharmacological data to non-expert stakeholders. Focus on simplifying terminology without losing technical accuracy.</Text>

            <View style={styles.bonusList}>
               <Text style={styles.bonusTitle}>Potential Rewards:</Text>
               <View style={styles.bonusItem}>
                  <Ionicons name="star" size={16} color="#FDCB6E" />
                  <Text style={styles.bonusText}>+50 Communication Points</Text>
               </View>
            </View>

            <TouchableOpacity style={[styles.startBtn, { backgroundColor: selectedScenario.color }]}>
               <Text style={styles.startBtnText}>Start Practice</Text>
               <Ionicons name="mic" size={20} color="#fff" />
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
        <Text style={styles.infoTitle}>Comm Training Info</Text>
        <Text style={styles.infoDesc}>NeuroPharma's Communication Training uses voice analysis to help you refine your clinical briefing skills. Record sessions and receive instant feedback on clarity, pace, and empathy.</Text>
        <TouchableOpacity style={styles.infoClose} onPress={() => infoSheetRef.current?.close()}>
          <Text style={styles.infoCloseText}>I'm Ready</Text>
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
  weeklyCard: { 
    backgroundColor: '#fff', borderRadius: 20, padding: 20, marginTop: -20,
    shadowColor: "#000", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1, shadowRadius: 10, elevation: 5,
  },
  weekTitle: { fontSize: 15, fontWeight: '700', color: '#0a0e27', marginBottom: 15 },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 60, marginBottom: 15 },
  dayCol: { alignItems: 'center', gap: 6 },
  dayBar: { width: 10, borderRadius: 5 },
  dayText: { fontSize: 10, color: '#95a5a6' },
  weekMeta: { fontSize: 12, color: '#00B894', fontWeight: '600', textAlign: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#0a0e27", marginBottom: 15, marginTop: 24 },
  card: {
    backgroundColor: "#fff", borderRadius: 20, padding: 18,
    marginBottom: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 6, elevation: 1,
    borderWidth: 1, borderColor: '#f5f6fa'
  },
  cardRow: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  typeIcon: { width: 52, height: 52, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: '800', color: '#0a0e27' },
  cardMeta: { fontSize: 12, color: '#95a5a6', marginTop: 2 },
  tagRow: { flexDirection: 'row', gap: 8, marginTop: 8, alignItems: 'center' },
  tag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, backgroundColor: '#f5f6fa' },
  tagText: { fontSize: 10, color: '#7f8c8d', fontWeight: '600' },
  levelBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  levelText: { fontSize: 10, fontWeight: '800' },
  // Sheet
  sheetHandle: { width: 40, height: 5, borderRadius: 3, backgroundColor: '#eee', alignSelf: 'center', marginBottom: 20 },
  sheetTitle: { fontSize: 18, fontWeight: '800', color: '#0a0e27', textAlign: 'center' },
  sheetSubTitle: { fontSize: 12, color: '#bdc3c7', textAlign: 'center', marginTop: 4, marginBottom: 20 },
  detailGrid: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  detailBox: { flex: 1, padding: 14, backgroundColor: '#f9f9fb', borderRadius: 16 },
  dLab: { fontSize: 11, color: '#7f8c8d' },
  dVal: { fontSize: 14, fontWeight: '700', color: '#0a0e27', marginTop: 2 },
  sheetSecTitle: { fontSize: 15, fontWeight: '800', color: '#0a0e27', marginBottom: 12 },
  sheetDesc: { fontSize: 14, color: '#7f8c8d', lineHeight: 22, marginBottom: 24 },
  bonusTitle: { fontSize: 13, fontWeight: '700', color: '#0a0e27', marginBottom: 8 },
  bonusList: { marginBottom: 30 },
  bonusItem: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  bonusText: { fontSize: 12, color: '#595D58', fontWeight: '600' },
  startBtn: { height: 56, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  startBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  infoTitle: { fontSize: 20, fontWeight: '800', color: '#0a0e27', marginBottom: 12 },
  infoDesc: { fontSize: 15, color: '#7f8c8d', lineHeight: 24, marginBottom: 24 },
  infoClose: { height: 50, borderRadius: 14, backgroundColor: '#0a0e27', justifyContent: 'center', alignItems: 'center' },
  infoCloseText: { color: '#fff', fontSize: 15, fontWeight: '700' }
});

export default CommTrainingScreen;
