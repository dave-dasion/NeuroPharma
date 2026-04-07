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
const isTablet = width >= 768;

const PIPELINES = [
  { id: 1, name: "SARS-CoV-2 Protease Inhibitor", phase: "Lead Optimization", status: "Active", progress: 65, color: "#6C5CE7", compounds: 120, target: "3CLpro" },
  { id: 2, name: "Alzheimer's Tau Aggregation", phase: "Hit Identification", status: "Active", progress: 30, color: "#00B894", compounds: 450, target: "Tau-Protein" },
  { id: 3, name: "Cancer Kinase Inhibitor DK-47", phase: "Preclinical", status: "Review", progress: 85, color: "#E17055", compounds: 15, target: "EGFRvIII" },
  { id: 4, name: "Antibiotic Resistance R-102", phase: "Target Validation", status: "Active", progress: 45, color: "#0984E3", compounds: 25, target: "NDM-1" },
];

const ANALYTICS = [
  { label: "High Affinity hits", val: "24", icon: "magnet", color: "#FDCB6E" },
  { label: "Toxic Alert Molecules", val: "03", icon: "alert-decagram", color: "#E17055" },
  { label: "Optimal ADMET", val: "18", icon: "shield-check", color: "#00B894" },
];

const DrugDiscoveryScreen = () => {
  const navigation = useNavigation();
  const [selectedPipe, setSelectedPipe] = useState<any>(null);
  const pipeSheetRef = useRef<any>(null);
  const filterSheetRef = useRef<any>(null);

  const handlePipePress = (pipe: any) => {
    setSelectedPipe(pipe);
    pipeSheetRef.current?.open();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient colors={["#0a0e27", "#1a1f4e"]} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => (navigation as any).openDrawer()} style={styles.menuBtn}>
            <Ionicons name="menu" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>💊 Discovery Lab</Text>
          <TouchableOpacity onPress={() => filterSheetRef.current?.open()} style={styles.filterBtn}>
            <Ionicons name="options-outline" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSub}>Manage active drug design projects</Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Statistics Banner */}
        <View style={styles.statsBanner}>
          {ANALYTICS.map((item, idx) => (
            <View key={idx} style={styles.statItem}>
              <MaterialCommunityIcons name={item.icon as any} size={24} color={item.color} />
              <View>
                <Text style={styles.statVal}>{item.val}</Text>
                <Text style={styles.statLab}>{item.label}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Pipelines</Text>
          <TouchableOpacity activeOpacity={0.7} style={styles.addBtn}>
            <Ionicons name="add" size={18} color="#fff" />
            <Text style={styles.addBtnText}>New</Text>
          </TouchableOpacity>
        </View>

        {PIPELINES.map((pipe) => (
          <TouchableOpacity 
            key={pipe.id} 
            style={styles.card} 
            activeOpacity={0.8}
            onPress={() => handlePipePress(pipe)}
          >
            <View style={styles.cardTop}>
              <View style={[styles.statusTag, { backgroundColor: pipe.status === "Active" ? "#00B89420" : "#FDCB6E20" }]}>
                <Text style={[styles.statusText, { color: pipe.status === 'Active' ? '#00B894' : '#FDCB6E' }]}>{pipe.status}</Text>
              </View>
              <Text style={styles.cardPhase}>{pipe.phase}</Text>
            </View>
            
            <Text style={styles.cardName}>{pipe.name}</Text>
            <View style={styles.targetRow}>
              <Ionicons name="medical-outline" size={14} color="#7f8c8d" />
              <Text style={styles.targetLabel}>Target: {pipe.target}</Text>
            </View>

            <View style={styles.progressContainer}>
               <View style={styles.progressHeader}>
                  <Text style={styles.progressLab}>Pipeline Progress</Text>
                  <Text style={[styles.progressVal, { color: pipe.color }]}>{pipe.progress}%</Text>
               </View>
               <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: `${pipe.progress}%`, backgroundColor: pipe.color }]} />
               </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Project Details Bottom Sheet */}
      <RBSheet
        ref={pipeSheetRef}
        height={550}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 24
          }
        }}
      >
        {selectedPipe && (
          <View style={styles.sheetContent}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>{selectedPipe.name}</Text>
            <Text style={styles.sheetSubTitle}>ID: PHARMA-{selectedPipe.id}X902</Text>

            <View style={styles.sheetGrid}>
               <View style={styles.sheetInfoBox}>
                  <Text style={styles.infoLabel}>Phase</Text>
                  <Text style={styles.infoVal}>{selectedPipe.phase}</Text>
               </View>
               <View style={styles.sheetInfoBox}>
                  <Text style={styles.infoLabel}>Compounds</Text>
                  <Text style={styles.infoVal}>{selectedPipe.compounds}</Text>
               </View>
               <View style={styles.sheetInfoBox}>
                  <Text style={styles.infoLabel}>Biological Target</Text>
                  <Text style={[styles.infoVal, { color: '#6C5CE7' }]}>{selectedPipe.target}</Text>
               </View>
               <View style={styles.sheetInfoBox}>
                  <Text style={styles.infoLabel}>Confidence</Text>
                  <Text style={styles.infoVal}>High (89%)</Text>
               </View>
            </View>

            <Text style={styles.sheetSecTitle}>Recent Findings</Text>
            <View style={styles.findingCard}>
               <Ionicons name="sparkles" size={20} color="#FDCB6E" />
               <Text style={styles.findingText}>Initial molecule docking shows optimal binding energy ΔG = -9.2 kcal/mol.</Text>
            </View>

            <View style={styles.actionRow}>
               <TouchableOpacity style={styles.secondaryBtn} onPress={() => pipeSheetRef.current?.close()}>
                  <Text style={styles.secondaryBtnText}>Close</Text>
               </TouchableOpacity>
               <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: selectedPipe.color }]}>
                  <Text style={styles.primaryBtnText}>View Lab Data</Text>
               </TouchableOpacity>
            </View>
          </View>
        )}
      </RBSheet>

      {/* Filter Options Bottom Sheet */}
      <RBSheet
        ref={filterSheetRef}
        height={350}
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
        <Text style={styles.filterTitle}>Filter Pipelines</Text>
        <View style={styles.filterList}>
           {['All Phases', 'Preclinical', 'Lead Optimization', 'Completed'].map((item, idx) => (
             <TouchableOpacity key={idx} style={styles.filterItem}>
                <Text style={styles.filterText}>{item}</Text>
                {idx === 0 && <Ionicons name="checkmark-circle" size={22} color="#00B894" />}
             </TouchableOpacity>
           ))}
        </View>
      </RBSheet>
    </View>
  );
};

DrugDiscoveryScreen.navigationOptions = () => ({ headerShown: false });

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
  headerTitle: { color: "#fff", fontSize: 22, fontWeight: "800" },
  headerSub: { color: "rgba(255,255,255,0.6)", fontSize: 13, marginTop: 4, textAlign: 'center' },
  filterBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { padding: 18 },
  statsBanner: { 
    flexDirection: 'row', justifyContent: 'space-between', 
    marginBottom: 24, alignItems: 'center', gap: 10 
  },
  statItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statVal: { fontSize: 18, fontWeight: '800', color: '#0a0e27' },
  statLab: { fontSize: 9, color: '#7f8c8d' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#0a0e27" },
  addBtn: { 
    flexDirection: 'row', alignItems: 'center', 
    backgroundColor: '#0a0e27', paddingHorizontal: 12, 
    paddingVertical: 6, borderRadius: 10, gap: 4 
  },
  addBtnText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  card: {
    backgroundColor: "#fff", borderRadius: 20, padding: 20,
    marginBottom: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05, shadowRadius: 8, elevation: 3,
    borderWidth: 1, borderColor: '#f0f0f0'
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  statusTag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: '700' },
  cardPhase: { fontSize: 12, color: '#bdc3c7', fontWeight: '500' },
  cardName: { fontSize: 16, fontWeight: '800', color: '#0a0e27', marginBottom: 4 },
  targetRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 20 },
  targetLabel: { fontSize: 13, color: '#7f8c8d' },
  progressContainer: {},
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLab: { fontSize: 12, color: '#bdc3c7' },
  progressVal: { fontSize: 14, fontWeight: '800' },
  progressBarBg: { height: 8, backgroundColor: '#f5f6fa', borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 4 },
  // Sheets
  sheetHandle: { width: 40, height: 5, borderRadius: 3, backgroundColor: '#eee', alignSelf: 'center', marginBottom: 20 },
  sheetTitle: { fontSize: 18, fontWeight: '800', color: '#0a0e27', textAlign: 'center' },
  sheetSubTitle: { fontSize: 12, color: '#bdc3c7', textAlign: 'center', marginTop: 4, marginBottom: 20 },
  sheetGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 25 },
  sheetInfoBox: { width: (width-72)/2, backgroundColor: '#f9f9fb', padding: 16, borderRadius: 16 },
  infoLabel: { fontSize: 11, color: '#7f8c8d', marginBottom: 4 },
  infoVal: { fontSize: 14, fontWeight: '700', color: '#0a0e27' },
  sheetSecTitle: { fontSize: 15, fontWeight: '800', color: '#0a0e27', marginBottom: 12 },
  findingCard: { 
    flexDirection: 'row', gap: 12, backgroundColor: '#0a0e2705', 
    padding: 16, borderRadius: 16, marginBottom: 30 
  },
  findingText: { flex: 1, fontSize: 13, color: '#595D58', lineHeight: 20 },
  actionRow: { flexDirection: 'row', gap: 12 },
  secondaryBtn: { flex: 1, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#eee' },
  secondaryBtnText: { fontSize: 15, fontWeight: '700', color: '#333' },
  primaryBtn: { flex: 2, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  primaryBtnText: { fontSize: 15, fontWeight: '700', color: '#fff' },
  filterTitle: { fontSize: 18, fontWeight: '800', color: '#0a0e27', marginBottom: 20 },
  filterList: { gap: 10 },
  filterItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  filterText: { fontSize: 14, color: '#333', fontWeight: '500' }
});

export default DrugDiscoveryScreen;
