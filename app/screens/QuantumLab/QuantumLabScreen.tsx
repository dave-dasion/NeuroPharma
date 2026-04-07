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

const SIMULATORS = [
  { id: 1, name: "Molecular Orbital Simulator", icon: "orbit", color: "#6C5CE7", qubits: 48, status: "Active" },
  { id: 2, name: "Protein Folding Q-Solver", icon: "scatter-plot", color: "#00B894", qubits: 128, status: "Queued" },
  { id: 3, name: "Material Property Predictor", icon: "cube-scan", color: "#E17055", qubits: 64, status: "Active" },
  { id: 4, name: "Lattice Dynamics Lab", icon: "grid", color: "#0984E3", qubits: 24, status: "Idle" },
];

const RECENT_JOBS = [
  { id: "Q-902", name: "CO2 Reduction Path", date: "10m ago", cost: "1.2 QC" },
  { id: "Q-881", name: "Graphene Thermal Cond.", date: "4h ago", cost: "0.8 QC" },
];

const QuantumLabScreen = () => {
  const navigation = useNavigation();
  const [selectedSim, setSelectedSim] = useState<any>(null);
  const simSheetRef = useRef<any>(null);
  const infoSheetRef = useRef<any>(null);

  const handleSimPress = (sim: any) => {
    setSelectedSim(sim);
    simSheetRef.current?.open();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient colors={["#0a0e27", "#1a1f4e"]} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => (navigation as any).openDrawer()} style={styles.menuBtn}>
            <Ionicons name="menu" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>⚛️ Quantum Lab</Text>
          <TouchableOpacity onPress={() => infoSheetRef.current?.open()} style={styles.infoBtn}>
            <Ionicons name="information-circle-outline" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSub}>Next-gen materials & molecular physics</Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Computing Resources Banner */}
        <View style={styles.resourceCard}>
           <View style={styles.resInfo}>
              <Text style={styles.resLabel}>Compute Credits</Text>
              <Text style={styles.resVal}>24.5 QC</Text>
           </View>
           <View style={styles.resDivider} />
           <View style={styles.resInfo}>
              <Text style={styles.resLabel}>Priority Lane</Text>
              <Text style={[styles.resVal, { color: '#00B894' }]}>Enabled</Text>
           </View>
        </View>

        <Text style={styles.sectionTitle}>Quantum Simulators</Text>
        <View style={styles.simGrid}>
           {SIMULATORS.map((sim) => (
             <TouchableOpacity 
               key={sim.id} 
               style={styles.simCard} 
               activeOpacity={0.8}
               onPress={() => handleSimPress(sim)}
             >
                <View style={[styles.simIconWrap, { backgroundColor: sim.color + "15" }]}>
                   <MaterialCommunityIcons name={sim.icon as any} size={30} color={sim.color} />
                </View>
                <Text style={styles.simName} numberOfLines={1}>{sim.name}</Text>
                <View style={styles.simMeta}>
                   <Text style={styles.simQubits}>{sim.qubits} Qubits</Text>
                   <View style={[styles.statusDot, { backgroundColor: sim.status === 'Active' ? '#00B894' : '#bdc3c7' }]} />
                </View>
             </TouchableOpacity>
           ))}
        </View>

        <View style={styles.jobHeader}>
          <Text style={styles.sectionTitle}>Recent Task History</Text>
          <TouchableOpacity><Text style={styles.seeAll}>History</Text></TouchableOpacity>
        </View>

        {RECENT_JOBS.map((job) => (
          <View key={job.id} style={styles.jobRow}>
             <View style={styles.jobIcon}>
                <Ionicons name="pulse" size={20} color="#6C5CE7" />
             </View>
             <View style={styles.jobText}>
                <Text style={styles.jobName}>{job.name}</Text>
                <Text style={styles.jobMeta}>{job.id} · {job.date}</Text>
             </View>
             <Text style={styles.jobCost}>{job.cost}</Text>
          </View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Simulator Management Bottom Sheet */}
      <RBSheet
        ref={simSheetRef}
        height={480}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 24
          }
        }}
      >
        {selectedSim && (
          <View style={styles.sheetContent}>
            <View style={styles.sheetHandle} />
            <View style={styles.sheetHeader}>
               <View style={[styles.sheetIconBox, { backgroundColor: selectedSim.color + "15" }]}>
                  <MaterialCommunityIcons name={selectedSim.icon as any} size={36} color={selectedSim.color} />
               </View>
               <View>
                  <Text style={styles.sheetTitle}>{selectedSim.name}</Text>
                  <Text style={styles.sheetMeta}>Capacity: {selectedSim.qubits} Logical Qubits</Text>
               </View>
            </View>

            <View style={styles.specGrid}>
               <View style={styles.specBox}>
                  <Text style={styles.specLabel}>Error Correction</Text>
                  <Text style={styles.specVal}>Surface Code</Text>
               </View>
               <View style={styles.specBox}>
                  <Text style={styles.specLabel}>Gate Speed</Text>
                  <Text style={styles.specVal}>40ns Avg</Text>
               </View>
            </View>

            <Text style={styles.sheetDescLabel}>Available Operations</Text>
            <View style={styles.opRow}>
               {['H-Gate', 'CNOT', 'Phase-Shift', 'Measurement'].map((op, idx) => (
                 <View key={idx} style={styles.opBadge}><Text style={styles.opText}>{op}</Text></View>
               ))}
            </View>

            <TouchableOpacity style={[styles.startBtn, { backgroundColor: selectedSim.color }]}>
               <Text style={styles.startBtnText}>Start Computing Task</Text>
               <Ionicons name="hardware-chip-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </RBSheet>

      <RBSheet
        ref={infoSheetRef}
        height={320}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 24, padding: 24
          }
        }}
      >
        <View style={styles.sheetHandle} />
        <Text style={styles.infoTitle}>Quantum Computing Lab</Text>
        <Text style={styles.infoDesc}>
          Simulate complex molecular interactions and material properties with quantum advantage. This lab provides access to NeuroPharma's priority quantum simulators and HPC resources.
        </Text>
        <TouchableOpacity style={styles.infoClose} onPress={() => infoSheetRef.current?.close()}>
          <Text style={styles.infoCloseText}>Confirm</Text>
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
  headerTitle: { color: "#fff", fontSize: 22, fontWeight: "800" },
  headerSub: { color: "rgba(255,255,255,0.6)", fontSize: 13, marginTop: 4, textAlign: 'center' },
  infoBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { padding: 18 },
  resourceCard: { 
    flexDirection: 'row', backgroundColor: '#fff', borderRadius: 18, 
    padding: 20, marginTop: -20, alignItems: 'center',
    shadowColor: "#000", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1, shadowRadius: 10, elevation: 5,
  },
  resInfo: { flex: 1, alignItems: 'center' },
  resLabel: { fontSize: 11, color: '#7f8c8d', marginBottom: 4 },
  resVal: { fontSize: 18, fontWeight: '800', color: '#0a0e27' },
  resDivider: { width: 1, height: '60%', backgroundColor: '#eee' },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#0a0e27", marginBottom: 15, marginTop: 15 },
  simGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  simCard: { 
    width: (width-48)/2, backgroundColor: '#fff', 
    padding: 16, borderRadius: 20, alignItems: 'center',
    borderWidth: 1, borderColor: '#f0f0f0' 
  },
  simIconWrap: { width: 56, height: 56, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  simName: { fontSize: 13, fontWeight: '700', color: '#0a0e27', marginBottom: 6 },
  simMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  simQubits: { fontSize: 11, color: '#7f8c8d', fontWeight: '600' },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  jobHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  seeAll: { color: '#6C5CE7', fontWeight: '700', fontSize: 13 },
  jobRow: { 
    flexDirection: 'row', alignItems: 'center', 
    backgroundColor: '#fff', padding: 14, borderRadius: 16, 
    marginBottom: 10, gap: 12 
  },
  jobIcon: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#f5f6fa', justifyContent: 'center', alignItems: 'center' },
  jobText: { flex: 1 },
  jobName: { fontSize: 14, fontWeight: '700', color: '#0a0e27' },
  jobMeta: { fontSize: 11, color: '#bdc3c7', marginTop: 2 },
  jobCost: { fontSize: 13, fontWeight: '800', color: '#6C5CE7' },
  // Sheet
  sheetHandle: { width: 40, height: 5, borderRadius: 3, backgroundColor: '#eee', alignSelf: 'center', marginBottom: 20 },
  sheetHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, gap: 15 },
  sheetIconBox: { width: 64, height: 64, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  sheetTitle: { fontSize: 18, fontWeight: '800', color: '#0a0e27' },
  sheetMeta: { fontSize: 13, color: '#bdc3c7', marginTop: 4 },
  specGrid: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  specBox: { flex: 1, padding: 14, backgroundColor: '#f5f6fa', borderRadius: 12 },
  specLabel: { fontSize: 11, color: '#7f8c8d' },
  specVal: { fontSize: 14, fontWeight: '700', color: '#0a0e27', marginTop: 2 },
  sheetDescLabel: { fontSize: 15, fontWeight: '800', color: '#0a0e27', marginBottom: 12 },
  opRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 30 },
  opBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: '#0a0e2705', borderWidth: 1, borderColor: '#eee' },
  opText: { fontSize: 12, color: '#595D58', fontWeight: '500' },
  startBtn: { height: 56, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  startBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  infoTitle: { fontSize: 20, fontWeight: '800', color: '#0a0e27', marginBottom: 12 },
  infoDesc: { fontSize: 15, color: '#7f8c8d', lineHeight: 24, marginBottom: 24 },
  infoClose: { height: 50, borderRadius: 14, backgroundColor: '#0a0e27', justifyContent: 'center', alignItems: 'center' },
  infoCloseText: { color: '#fff', fontSize: 15, fontWeight: '700' }
});

export default QuantumLabScreen;
