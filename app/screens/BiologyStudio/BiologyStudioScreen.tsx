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

const TOOLS = [
  { id: 1, title: "Protein Structure Viewer", desc: "Visualize 3D protein conformations and folding.", icon: "shapes", color: "#6C5CE7", status: "Ready" },
  { id: 2, title: "Gene Expression Analysis", desc: "RNA-Seq data processing and heatmap visualization.", icon: "bar-chart", color: "#00B894", status: "Syncing" },
  { id: 3, title: "Sequence Alignment", desc: "Multi-sequence alignment using ClustalW algorithms.", icon: "git-compare", color: "#E17055", status: "Ready" },
  { id: 4, title: "Pathway Mapper", desc: "Interactive metabolic pathway analysis and visualization.", icon: "git-network", color: "#0984E3", status: "Maintenance" },
  { id: 5, title: "Molecular Editor", desc: "Draw and modify molecular structures precisely.", icon: "pencil", color: "#e84393", status: "Ready" },
  { id: 6, title: "BLAST Search", desc: "Sequence homology search against NCBI databases.", icon: "search-circle", color: "#FDCB6E", status: "Ready" },
];

const RECENT_SAMPLES = [
  { id: "S-102", name: "Spike-Protein-V1", type: "Protein", date: "2h ago" },
  { id: "S-105", name: "BRCA1-Mut-X", type: "DNA", date: "1d ago" },
];

const BiologyStudioScreen = () => {
  const navigation = useNavigation();
  const [selectedTool, setSelectedTool] = useState<any>(null);
  const toolSheetRef = useRef<any>(null);
  const infoSheetRef = useRef<any>(null);

  const handleToolPress = (tool: any) => {
    setSelectedTool(tool);
    toolSheetRef.current?.open();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient colors={["#0a0e27", "#1a1f4e"]} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => (navigation as any).openDrawer()} style={styles.menuBtn}>
            <Ionicons name="menu" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>🧬 Biology Studio</Text>
          <TouchableOpacity onPress={() => infoSheetRef.current?.open()} style={styles.infoBtn}>
            <Ionicons name="information-circle-outline" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSub}>Advanced molecular analytics platform</Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Recent Samples horizontal list */}
        <Text style={styles.sectionTitle}>Recent Samples</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sampleScroll}>
          {RECENT_SAMPLES.map((sample) => (
            <TouchableOpacity key={sample.id} style={styles.sampleCard}>
               <View style={styles.sampleIcon}>
                  <MaterialCommunityIcons name={sample.type === 'Protein' ? 'molecule' : 'dna'} size={24} color="#6C5CE7" />
               </View>
               <View>
                  <Text style={styles.sampleName}>{sample.name}</Text>
                  <Text style={styles.sampleMeta}>{sample.id} · {sample.date}</Text>
               </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.addSampleBtn}>
             <Ionicons name="add" size={24} color="#bdc3c7" />
          </TouchableOpacity>
        </ScrollView>

        <Text style={styles.sectionTitle}>Studio Modules</Text>
        <View style={styles.toolsGrid}>
          {TOOLS.map((tool) => (
            <TouchableOpacity 
              key={tool.id} 
              style={styles.card} 
              activeOpacity={0.8}
              onPress={() => handleToolPress(tool)}
            >
              <LinearGradient colors={[tool.color + "12", tool.color + "06"]} style={styles.cardGradient}>
                <View style={[styles.iconWrap, { backgroundColor: tool.color + "22" }]}>
                  <Ionicons name={tool.icon as any} size={28} color={tool.color} />
                </View>
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>{tool.title}</Text>
                  <View style={styles.cardFooter}>
                    <Text style={styles.cardDesc} numberOfLines={1}>{tool.desc}</Text>
                    <View style={[styles.statusDot, { backgroundColor: tool.status === 'Ready' ? '#00B894' : '#FDCB6E' }]} />
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#ccc" />
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Module Hub Bottom Sheet */}
      <RBSheet
        ref={toolSheetRef}
        height={450}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 24
          }
        }}
      >
        {selectedTool && (
          <View style={styles.sheetContent}>
            <View style={styles.sheetHandle} />
            <View style={styles.sheetHeader}>
               <View style={[styles.sheetIconBox, { backgroundColor: selectedTool.color + "15" }]}>
                  <Ionicons name={selectedTool.icon as any} size={32} color={selectedTool.color} />
               </View>
               <View>
                  <Text style={styles.sheetTitle}>{selectedTool.title}</Text>
                  <Text style={styles.sheetMeta}>Status: {selectedTool.status}</Text>
               </View>
            </View>

            <Text style={styles.sheetDescLabel}>Tool Description</Text>
            <Text style={styles.sheetDescText}>{selectedTool.desc}</Text>

            <View style={styles.capabilityList}>
               <View style={styles.capItem}>
                  <Ionicons name="checkmark-circle" size={18} color="#00B894" />
                  <Text style={styles.capText}>Full GPU acceleration</Text>
               </View>
               <View style={styles.capItem}>
                  <Ionicons name="checkmark-circle" size={18} color="#00B894" />
                  <Text style={styles.capText}>Export to .PDB format</Text>
               </View>
            </View>

            <TouchableOpacity style={[styles.launchBtn, { backgroundColor: selectedTool.color }]}>
               <Text style={styles.launchBtnText}>Launch Module</Text>
               <Ionicons name="rocket-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </RBSheet>

      {/* Info Bottom Sheet */}
      <RBSheet
        ref={infoSheetRef}
        height={280}
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
        <Text style={styles.infoTitle}>Biology & Molecular Studio</Text>
        <Text style={styles.infoDesc}>
          Access cutting-edge computational biology tools directly from your mobile dashboard. Visualize structures, align sequences, and map clinical pathways in one interface.
        </Text>
        <TouchableOpacity style={styles.infoClose} onPress={() => infoSheetRef.current?.close()}>
          <Text style={styles.infoCloseText}>I Understand</Text>
        </TouchableOpacity>
      </RBSheet>
    </View>
  );
};

BiologyStudioScreen.navigationOptions = () => ({ headerShown: false });

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
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#0a0e27", marginBottom: 15, marginTop: 10 },
  sampleScroll: { marginHorizontal: -18, paddingLeft: 18, marginBottom: 20 },
  sampleCard: { 
    flexDirection: 'row', alignItems: 'center', 
    backgroundColor: '#fff', padding: 16, borderRadius: 18, 
    marginRight: 12, gap: 12, borderWidth: 1, borderColor: '#f0f0f0' 
  },
  sampleIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#f5f6fa', justifyContent: 'center', alignItems: 'center' },
  sampleName: { fontSize: 14, fontWeight: '800', color: '#0a0e27' },
  sampleMeta: { fontSize: 11, color: '#bdc3c7', marginTop: 2 },
  addSampleBtn: { 
    width: 60, height: 76, borderRadius: 18, 
    borderWidth: 1, borderColor: '#eee', 
    borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center' 
  },
  toolsGrid: { gap: 12 },
  card: { borderRadius: 20, overflow: "hidden", backgroundColor: '#fff' },
  cardGradient: { flexDirection: "row", alignItems: "center", padding: 18, borderRadius: 20 },
  iconWrap: {
    width: 52, height: 52, borderRadius: 15,
    justifyContent: "center", alignItems: "center", marginRight: 16,
  },
  cardText: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: "800", color: "#0a0e27" },
  cardFooter: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4 },
  cardDesc: { fontSize: 12, color: "#7f8c8d", flex: 1 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  // Sheet Styles
  sheetHandle: { width: 40, height: 5, borderRadius: 3, backgroundColor: '#eee', alignSelf: 'center', marginBottom: 20 },
  sheetHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, gap: 15 },
  sheetIconBox: { width: 64, height: 64, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  sheetTitle: { fontSize: 18, fontWeight: '800', color: '#0a0e27' },
  sheetMeta: { fontSize: 13, color: '#bdc3c7', marginTop: 4 },
  sheetDescLabel: { fontSize: 15, fontWeight: '800', color: '#0a0e27', marginBottom: 8 },
  sheetDescText: { fontSize: 14, color: '#7f8c8d', lineHeight: 22, marginBottom: 24 },
  capabilityList: { gap: 10, marginBottom: 30 },
  capItem: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  capText: { fontSize: 14, color: '#595D58', fontWeight: '500' },
  launchBtn: { height: 56, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  launchBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  infoTitle: { fontSize: 20, fontWeight: '800', color: '#0a0e27', marginBottom: 12 },
  infoDesc: { fontSize: 15, color: '#7f8c8d', lineHeight: 24, marginBottom: 24 },
  infoClose: { height: 50, borderRadius: 14, backgroundColor: '#0a0e27', justifyContent: 'center', alignItems: 'center' },
  infoCloseText: { color: '#fff', fontSize: 15, fontWeight: '700' }
});

export default BiologyStudioScreen;
