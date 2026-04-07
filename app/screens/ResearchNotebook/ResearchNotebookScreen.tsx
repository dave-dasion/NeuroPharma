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

const NOTEBOOKS = [
  { id: 1, name: "Project Alpha: 3CLpro docking", cells: 14, lastEdit: "2h ago", color: "#6C5CE7" },
  { id: 2, name: "Molecular Dynamics: COVID-19", cells: 8, lastEdit: "1d ago", color: "#00B894" },
  { id: 3, name: "ADMET Prediction: Series-X", cells: 25, lastEdit: "3h ago", color: "#E17055" },
];

const CELLS = [
  { id: 1, type: "Code", content: "import rdkit as rd\nmolecule = rd.MolFromSmiles('CN1C=NC2=C1C(=O)N(C(=O)N2C)C')", status: "Executed" },
  { id: 2, type: "Text", content: "# Analysis Results\nThe docking score shows a high binding affinity of -8.4 kcal/mol.", status: "Preview" },
  { id: 3, type: "Plot", content: "Visualization: Binding Heatmap", status: "Rendered" },
];

const ResearchNotebookScreen = () => {
  const navigation = useNavigation();
  const [selectedNotebook, setSelectedNotebook] = useState<any>(null);
  const [selectedCell, setSelectedCell] = useState<any>(null);
  const notebookSheetRef = useRef<any>(null);
  const cellSheetRef = useRef<any>(null);
  const infoSheetRef = useRef<any>(null);

  const handleNotebookPress = (item: any) => {
    setSelectedNotebook(item);
    notebookSheetRef.current?.open();
  };

  const handleCellPress = (item: any) => {
    setSelectedCell(item);
    cellSheetRef.current?.open();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient colors={["#0a0e27", "#1a1f4e"]} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => (navigation as any).openDrawer()} style={styles.menuBtn}>
            <Ionicons name="menu" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>📓 Research Notebook</Text>
          <TouchableOpacity onPress={() => infoSheetRef.current?.open()} style={styles.infoBtn}>
            <Ionicons name="add-circle-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSub}>Manage your computational research docs</Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Notebook horizontal list */}
        <Text style={styles.sectionTitle}>Active Notebooks</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.notebookScroll}>
           {NOTEBOOKS.map((item) => (
             <TouchableOpacity key={item.id} style={styles.notebookCard} onPress={() => handleNotebookPress(item)}>
                <View style={[styles.bookIcon, { backgroundColor: item.color + "15" }]}>
                   <MaterialCommunityIcons name="notebook-outline" size={28} color={item.color} />
                </View>
                <Text style={styles.bookName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.bookMeta}>{item.cells} Cells · {item.lastEdit}</Text>
             </TouchableOpacity>
           ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
           <Text style={styles.sectionTitle}>Current Journal Cells</Text>
           <TouchableOpacity><Text style={styles.seeAll}>Run All</Text></TouchableOpacity>
        </View>

        {CELLS.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.cellCard} 
            activeOpacity={0.8}
            onPress={() => handleCellPress(item)}
          >
             <View style={styles.cellHeader}>
                <View style={styles.cellType}>
                   <Text style={[styles.cellTypeText, { color: item.type === 'Code' ? '#6C5CE7' : '#00B894' }]}>{item.type}</Text>
                </View>
                <Text style={styles.cellStatus}>{item.status}</Text>
             </View>
             <Text style={styles.cellText} numberOfLines={3}>{item.content}</Text>
             <View style={styles.cellFooter}>
                <Ionicons name="ellipsis-horizontal" size={18} color="#bdc3c7" />
             </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Notebook Details Bottom Sheet */}
      <RBSheet
        ref={notebookSheetRef}
        height={450}
        openDuration={250}
        customStyles={{
          container: { borderTopLeftRadius: 24, padding: 24 }
        }}
      >
        {selectedNotebook && (
          <View style={styles.sheetContent}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>{selectedNotebook.name}</Text>
            <Text style={styles.sheetSubTitle}>ID: NB-JOURNAL-{selectedNotebook.id}</Text>

            <View style={styles.sheetGrid}>
               <View style={styles.gridBox}>
                  <Text style={styles.gridLabel}>Collaborators</Text>
                  <Text style={styles.gridVal}>Me, Dr. Chen</Text>
               </View>
               <View style={styles.gridBox}>
                  <Text style={styles.gridLabel}>Storage Use</Text>
                  <Text style={styles.gridVal}>1.2 MB</Text>
               </View>
            </View>

            <TouchableOpacity style={styles.actionBtn}>
               <Ionicons name="cloud-download-outline" size={22} color="#0a0e27" />
               <Text style={styles.actionText}>Export as PDF / Markdown</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
               <Ionicons name="people-outline" size={22} color="#0a0e27" />
               <Text style={styles.actionText}>Invite Researcher</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.startBtn, { backgroundColor: selectedNotebook.color }]}>
               <Text style={styles.startBtnText}>Open Notebook</Text>
               <Ionicons name="open-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </RBSheet>

      {/* Cell Actions Bottom Sheet */}
      <RBSheet ref={cellSheetRef} height={350}>
         <View style={styles.sheetHandle} />
         <View style={{ padding: 24 }}>
            <Text style={styles.sheetTitle}>Cell Actions</Text>
            <TouchableOpacity style={styles.cellActionBtn} onPress={() => cellSheetRef.current?.close()}>
               <Ionicons name="play-outline" size={22} color="#00B894" />
               <Text style={styles.cellActionText}>Run Cell</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cellActionBtn} onPress={() => cellSheetRef.current?.close()}>
               <Ionicons name="copy-outline" size={22} color="#6C5CE7" />
               <Text style={styles.cellActionText}>Duplicate Cell</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cellActionBtn} onPress={() => cellSheetRef.current?.close()}>
               <Ionicons name="trash-outline" size={22} color="#E17055" />
               <Text style={[styles.cellActionText, { color: '#E17055' }]}>Delete Cell</Text>
            </TouchableOpacity>
         </View>
      </RBSheet>

      <RBSheet
        ref={infoSheetRef}
        height={250}
        openDuration={250}
        customStyles={{
          container: { borderTopLeftRadius: 24, padding: 24 }
        }}
      >
        <View style={styles.sheetHandle} />
        <Text style={styles.infoTitle}>Research Notebook Guide</Text>
        <Text style={styles.infoDesc}>Organize computational experiments and clinical thoughts in an interactive environment. Each cell can hold text, code, or data visualizations.</Text>
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
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#0a0e27", marginBottom: 15, marginTop: 10 },
  notebookScroll: { marginHorizontal: -18, paddingLeft: 18, marginBottom: 24 },
  notebookCard: { 
    width: width * 0.45, backgroundColor: '#fff', borderRadius: 20, padding: 18, 
    marginRight: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05, shadowRadius: 8, elevation: 3, borderWidth: 1, borderColor: '#f0f0f0' 
  },
  bookIcon: { width: 52, height: 52, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  bookName: { fontSize: 14, fontWeight: '800', color: '#0a0e27', marginBottom: 6 },
  bookMeta: { fontSize: 11, color: '#bdc3c7' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  seeAll: { color: '#6C5CE7', fontWeight: '700', fontSize: 13 },
  cellCard: { 
    backgroundColor: '#fff', borderRadius: 18, padding: 18, 
    marginBottom: 12, borderWidth: 1, borderColor: '#f5f6fa' 
  },
  cellHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cellType: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, backgroundColor: '#f5f6fa' },
  cellTypeText: { fontSize: 11, fontWeight: '800' },
  cellStatus: { fontSize: 11, color: '#bdc3c7', fontStyle: 'italic' },
  cellText: { fontSize: 13, color: '#595D58', lineHeight: 20, fontStyle: 'italic' },
  cellFooter: { alignItems: 'flex-end', marginTop: 15 },
  // Sheet
  sheetHandle: { width: 40, height: 5, borderRadius: 3, backgroundColor: '#eee', alignSelf: 'center', marginBottom: 20 },
  sheetTitle: { fontSize: 18, fontWeight: '800', color: '#0a0e27', textAlign: 'center' },
  sheetSubTitle: { fontSize: 12, color: '#bdc3c7', textAlign: 'center', marginTop: 4, marginBottom: 25 },
  sheetGrid: { flexDirection: 'row', gap: 12, marginBottom: 25 },
  gridBox: { flex: 1, padding: 14, backgroundColor: '#f9f9fb', borderRadius: 16 },
  gridLabel: { fontSize: 11, color: '#7f8c8d' },
  gridVal: { fontSize: 13, fontWeight: '700', color: '#0a0e27', marginTop: 2 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#f5f5f5', gap: 12 },
  actionText: { fontSize: 14, color: '#333', fontWeight: '600' },
  startBtn: { height: 56, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 24 },
  startBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  cellActionBtn: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#f5f5f5', gap: 12 },
  cellActionText: { fontSize: 15, color: '#333', fontWeight: '600' },
  infoTitle: { fontSize: 20, fontWeight: '800', color: '#0a0e27', marginBottom: 12 },
  infoDesc: { fontSize: 15, color: '#7f8c8d', lineHeight: 24, marginBottom: 24 },
  infoClose: { height: 50, borderRadius: 14, backgroundColor: '#0a0e27', justifyContent: 'center', alignItems: 'center' },
  infoCloseText: { color: '#fff', fontSize: 15, fontWeight: '700' }
});

export default ResearchNotebookScreen;
