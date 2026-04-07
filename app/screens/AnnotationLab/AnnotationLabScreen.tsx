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

const TASKS = [
  { id: 1, title: "Protein Binding-Site NLP", type: "Text Labeling", priority: "High", progress: 82, color: "#6C5CE7", items: "1,200", deadline: "2h" },
  { id: 2, title: "Clinical Trial Sentiment", type: "Sentiment Analysis", priority: "Medium", progress: 45, color: "#00B894", items: "850", deadline: "1d" },
  { id: 3, title: "Drug Interaction Entities", type: "NER Extraction", priority: "Low", progress: 15, color: "#E17055", items: "4,000", deadline: "3d" },
  { id: 4, title: "Adverse Effect Matching", type: "Classification", priority: "High", progress: 95, color: "#0984E3", items: "250", deadline: "Completed" },
];

const AnnotationLabScreen = () => {
  const navigation = useNavigation();
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const taskSheetRef = useRef<any>(null);
  const infoSheetRef = useRef<any>(null);

  const handleTaskPress = (item: any) => {
    setSelectedTask(item);
    taskSheetRef.current?.open();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient colors={["#0a0e27", "#1a1f4e"]} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => (navigation as any).openDrawer()} style={styles.menuBtn}>
            <Ionicons name="menu" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>✍️ Annotation Lab</Text>
          <TouchableOpacity onPress={() => infoSheetRef.current?.open()} style={styles.infoBtn}>
            <Ionicons name="help-circle-outline" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSub}>Label medical data for AI human-reinforcement</Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Performance Overview */}
        <View style={styles.overviewCard}>
           <View style={styles.oHead}>
              <Text style={styles.oTitle}>Lab Accuracy</Text>
              <Text style={styles.oStat}>98.4%</Text>
           </View>
           <View style={styles.oBar}>
              <View style={[styles.oFill, { width: '98.4%', backgroundColor: '#00B894' }]} />
           </View>
           <Text style={styles.oMeta}>Top 5% of annotators globally</Text>
        </View>

        <Text style={styles.sectionTitle}>Active Labeling Tasks</Text>
        {TASKS.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.card} 
            activeOpacity={0.8}
            onPress={() => handleTaskPress(item)}
          >
            <View style={styles.cardRow}>
               <View style={[styles.taskIcon, { backgroundColor: item.color + "15" }]}>
                  <MaterialCommunityIcons name="sticker-text-outline" size={26} color={item.color} />
               </View>
               <View style={styles.taskInfo}>
                  <View style={styles.titleRow}>
                     <Text style={styles.taskTitle}>{item.title}</Text>
                     <View style={[styles.priorityTag, { backgroundColor: item.priority === 'High' ? '#E1705515' : '#00B89415' }]}>
                        <Text style={[styles.priorityText, { color: item.priority === 'High' ? '#E17055' : '#00B894' }]}>{item.priority}</Text>
                     </View>
                  </View>
                  <Text style={styles.taskMeta}>{item.type} · {item.items} items</Text>
                  
                  <View style={styles.progressRow}>
                     <View style={styles.progBarBg}>
                        <View style={[styles.progBarFill, { width: `${item.progress}%`, backgroundColor: item.color }]} />
                     </View>
                     <Text style={styles.progText}>{item.progress}%</Text>
                  </View>
               </View>
               <Ionicons name="chevron-forward" size={18} color="#eee" />
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Task Review Bottom Sheet */}
      <RBSheet
        ref={taskSheetRef}
        height={460}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 24, padding: 24
          }
        }}
      >
        {selectedTask && (
          <View style={styles.sheetContent}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>{selectedTask.title}</Text>
            <Text style={styles.sheetSubTitle}>Type: {selectedTask.type} · Due: {selectedTask.deadline}</Text>

            <View style={styles.sheetGrid}>
               <View style={styles.gridBox}>
                  <Text style={styles.gridLabel}>Remaining Items</Text>
                  <Text style={styles.gridVal}>240 / {selectedTask.items}</Text>
               </View>
               <View style={styles.gridBox}>
                  <Text style={styles.gridLabel}>Reward Potential</Text>
                  <Text style={[styles.gridVal, { color: '#FDCB6E' }]}>120 Lab-C</Text>
               </View>
               <View style={styles.gridBox}>
                  <Text style={styles.gridLabel}>Est. Effort</Text>
                  <Text style={styles.gridVal}>Medium-High</Text>
               </View>
               <View style={styles.gridBox}>
                  <Text style={styles.gridLabel}>Difficulty</Text>
                  <Text style={styles.gridVal}>Expert Level</Text>
               </View>
            </View>

            <Text style={styles.sheetSecTitle}>Task Description</Text>
            <Text style={styles.sheetDesc}>Annotate biochemical entities and their relationships within recent clinical publication abstracts to improve NER model extraction.</Text>

            <TouchableOpacity style={[styles.startBtn, { backgroundColor: selectedTask.color }]}>
               <Text style={styles.startBtnText}>Resume Labeling</Text>
               <Ionicons name="create-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </RBSheet>

      <RBSheet
        ref={infoSheetRef}
        height={280}
        openDuration={250}
        customStyles={{
          container: { borderTopLeftRadius: 24, padding: 24 }
        }}
      >
        <View style={styles.sheetHandle} />
        <Text style={styles.infoTitle}>About Annotation Lab</Text>
        <Text style={styles.infoDesc}>The Annotation Lab connects expert clinical researchers with raw datasets to improve the AI's understanding through real human feedback (RLHF).</Text>
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
  overviewCard: { 
    backgroundColor: '#fff', borderRadius: 20, padding: 20, marginTop: -20,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 10, elevation: 3,
  },
  oHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  oTitle: { fontSize: 15, fontWeight: '700', color: '#0a0e27' },
  oStat: { fontSize: 18, fontWeight: '800', color: '#00B894' },
  oBar: { height: 8, backgroundColor: '#f5f6fa', borderRadius: 4, overflow: 'hidden', marginBottom: 10 },
  oFill: { height: '100%', borderRadius: 4 },
  oMeta: { fontSize: 11, color: '#95a5a6', fontStyle: 'italic' },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#0a0e27", marginBottom: 15, marginTop: 24 },
  card: {
    backgroundColor: "#fff", borderRadius: 20, padding: 18,
    marginBottom: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 6, elevation: 1,
    borderWidth: 1, borderColor: '#f5f6fa'
  },
  cardRow: { flexDirection: 'row', gap: 15, alignItems: 'center' },
  taskIcon: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  taskInfo: { flex: 1 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  taskTitle: { fontSize: 14, fontWeight: '800', color: '#0a0e27' },
  priorityTag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  priorityText: { fontSize: 10, fontWeight: '800' },
  taskMeta: { fontSize: 12, color: '#95a5a6', marginTop: 3 },
  progressRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 10 },
  progBarBg: { flex: 1, height: 6, backgroundColor: '#f5f6fa', borderRadius: 3, overflow: 'hidden' },
  progBarFill: { height: '100%', borderRadius: 3 },
  progText: { fontSize: 12, fontWeight: '700', color: '#0a0e27' },
  // Sheet
  sheetHandle: { width: 40, height: 5, borderRadius: 3, backgroundColor: '#eee', alignSelf: 'center', marginBottom: 20 },
  sheetTitle: { fontSize: 18, fontWeight: '800', color: '#0a0e27', textAlign: 'center' },
  sheetSubTitle: { fontSize: 12, color: '#bdc3c7', textAlign: 'center', marginTop: 4, marginBottom: 20 },
  sheetGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  gridBox: { width: (width-72)/2, padding: 16, backgroundColor: '#f9f9fb', borderRadius: 16 },
  gridLabel: { fontSize: 11, color: '#7f8c8d' },
  gridVal: { fontSize: 14, fontWeight: '700', color: '#0a0e27', marginTop: 2 },
  sheetSecTitle: { fontSize: 15, fontWeight: '800', color: '#0a0e27', marginBottom: 12 },
  sheetDesc: { fontSize: 14, color: '#7f8c8d', lineHeight: 22, textAlign: 'justify', marginBottom: 30 },
  startBtn: { height: 56, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  startBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  infoTitle: { fontSize: 20, fontWeight: '800', color: '#0a0e27', marginBottom: 12 },
  infoDesc: { fontSize: 15, color: '#7f8c8d', lineHeight: 24, marginBottom: 24 },
  infoClose: { height: 50, borderRadius: 14, backgroundColor: '#0a0e27', justifyContent: 'center', alignItems: 'center' },
  infoCloseText: { color: '#fff', fontSize: 15, fontWeight: '700' }
});

export default AnnotationLabScreen;
