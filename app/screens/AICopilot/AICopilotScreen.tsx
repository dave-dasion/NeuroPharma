import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Animated,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";

const { width } = Dimensions.get("window");

const SUGGESTIONS = [
  "Predict drug-target interactions for compound X",
  "Summarize recent clinical trial results for Alzheimer's",
  "Explain the mechanism of action of Metformin",
  "Design a CRISPR experiment for gene ABC",
];

const AICopilotScreen = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([
    { id: 1, role: "ai", text: "Hello researcher! I'm your NeuroPharma AI Copilot. How can I assist with your discovery today?" },
  ]);
  const [input, setInput] = useState("");
  const [selectedMsg, setSelectedMsg] = useState<any>(null);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const msgSheetRef = useRef<any>(null);
  const infoSheetRef = useRef<any>(null);

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  const handleSend = (text?: string) => {
    const msgText = text || input;
    if (!msgText.trim()) return;

    const userMsg = { id: Date.now(), role: "user", text: msgText };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "ai", text: "Analyzing relevant pharmacological databases... I'll provide a detailed insight on that shortly. 🔬" },
      ]);
    }, 1000);
  };

  const onMessagePress = (msg: any) => {
    setSelectedMsg(msg);
    msgSheetRef.current?.open();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient colors={["#0a0e27", "#1a1f4e"]} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => (navigation as any).openDrawer()} style={styles.menuBtn}>
            <Ionicons name="menu" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>🤖 AI Copilot</Text>
          <TouchableOpacity onPress={() => infoSheetRef.current?.open()} style={styles.infoBtn}>
            <Ionicons name="help-circle-outline" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSub}>Real-time pharmaceutical intelligence</Text>
      </LinearGradient>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
      >
        <ScrollView 
          style={styles.chatArea} 
          contentContainerStyle={styles.chatPadding}
          showsVerticalScrollIndicator={false}
          ref={(ref) => ref?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg) => (
            <TouchableOpacity 
              key={msg.id} 
              activeOpacity={0.9} 
              onLongPress={() => onMessagePress(msg)}
              onPress={() => onMessagePress(msg)}
              style={[styles.msgRow, msg.role === "user" ? styles.userRow : styles.aiRow]}
            >
              {msg.role === "ai" && (
                <View style={styles.aiAvatar}>
                  <MaterialCommunityIcons name="robot" size={18} color="#fff" />
                </View>
              )}
              <View style={[styles.bubble, msg.role === "user" ? styles.userBubble : styles.aiBubble]}>
                <Text style={[styles.bubbleText, msg.role === "user" && { color: "#fff" }]}>{msg.text}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* Suggestions */}
          {messages.length < 3 && (
            <Animated.View style={{ opacity: fadeAnim }}>
              <Text style={styles.sugLabel}>Try asking:</Text>
              <View style={styles.sugGrid}>
                {SUGGESTIONS.map((s, idx) => (
                  <TouchableOpacity key={idx} style={styles.sugItem} onPress={() => handleSend(s)}>
                    <Text style={styles.sugText}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>
          )}
        </ScrollView>

        <SafeAreaView style={styles.inputArea}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Query molecule data..."
              placeholderTextColor="#999"
              value={input}
              onChangeText={setInput}
              multiline
            />
            <TouchableOpacity 
              style={[styles.sendBtn, !input.trim() && { opacity: 0.5 }]} 
              onPress={() => handleSend()}
              disabled={!input.trim()}
            >
              <LinearGradient colors={["#6C5CE7", "#0984E3"]} style={styles.sendGrad}>
                <Ionicons name="send" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>

      {/* Message Options Bottom Sheet */}
      <RBSheet
        ref={msgSheetRef}
        height={250}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 20
          }
        }}
      >
        <View style={styles.sheetHandle} />
        <Text style={styles.sheetTitle}>Message Settings</Text>
        <TouchableOpacity style={styles.sheetActionItem}>
          <Ionicons name="copy-outline" size={22} color="#0a0e27" />
          <Text style={styles.sheetActionLabel}>Copy to Research Notebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sheetActionItem}>
          <Ionicons name="share-social-outline" size={22} color="#0a0e27" />
          <Text style={styles.sheetActionLabel}>Share Insights</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sheetActionItem} onPress={() => msgSheetRef.current?.close()}>
          <Ionicons name="trash-outline" size={22} color="#E17055" />
          <Text style={[styles.sheetActionLabel, { color: '#E17055' }]}>Delete Message</Text>
        </TouchableOpacity>
      </RBSheet>

      {/* Copilot Info Bottom Sheet */}
      <RBSheet
        ref={infoSheetRef}
        height={320}
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
        <Text style={styles.infoTitle}>About AI Copilot</Text>
        <Text style={styles.infoDesc}>
          This AI is specifically trained on medicinal chemistry, clinical trial results, and biological databases to provide precise assist during your discovery workflow.
        </Text>
        <View style={styles.capabilityRow}>
          <View style={styles.capItem}><Text style={styles.capText}>✓ Drug-Target ID</Text></View>
          <View style={styles.capItem}><Text style={styles.capText}>✓ ADMET Prediction</Text></View>
          <View style={styles.capItem}><Text style={styles.capText}>✓ Clinical Analytics</Text></View>
        </View>
        <TouchableOpacity style={styles.infoClose} onPress={() => infoSheetRef.current?.close()}>
          <Text style={styles.infoCloseText}>Close</Text>
        </TouchableOpacity>
      </RBSheet>
    </View>
  );
};

AICopilotScreen.navigationOptions = () => ({ headerShown: false });

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
  chatArea: { flex: 1, paddingHorizontal: 16 },
  chatPadding: { paddingBottom: 30, paddingTop: 20 },
  msgRow: { flexDirection: "row", marginBottom: 16, alignItems: "flex-end" },
  userRow: { justifyContent: "flex-end" },
  aiRow: { justifyContent: "flex-start" },
  aiAvatar: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: "#1a1f4e", justifyContent: "center",
    alignItems: "center", marginRight: 8,
  },
  bubble: { 
    maxWidth: "80%", borderRadius: 20, padding: 14, 
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.05, shadowRadius: 3, elevation: 1 
  },
  userBubble: { backgroundColor: "#6C5CE7", borderBottomRightRadius: 4 },
  aiBubble: { backgroundColor: "#fff", borderBottomLeftRadius: 4 },
  bubbleText: { fontSize: 14, lineHeight: 22, color: "#0a0e27" },
  sugLabel: { fontSize: 13, fontWeight: "700", color: "#bdc3c7", marginTop: 20, marginBottom: 12 },
  sugGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  sugItem: { 
    backgroundColor: '#fff', padding: 12, borderRadius: 12, 
    borderWidth: 1, borderColor: '#eee', 
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.03, shadowRadius: 2, elevation: 1
  },
  sugText: { fontSize: 12, color: '#595D58', fontWeight: '500' },
  inputArea: { backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  inputContainer: { 
    flexDirection: 'row', alignItems: 'flex-end', 
    paddingHorizontal: 16, paddingVertical: 12, gap: 12 
  },
  textInput: { 
    flex: 1, minHeight: 45, maxHeight: 100, 
    backgroundColor: '#f5f6fa', borderRadius: 15, 
    paddingHorizontal: 16, paddingVertical: 12, 
    fontSize: 14, color: '#0a0e27' 
  },
  sendBtn: { width: 45, height: 45 },
  sendGrad: { 
    width: 45, height: 45, borderRadius: 15, 
    justifyContent: 'center', alignItems: 'center' 
  },
  // Sheets
  sheetHandle: { width: 40, height: 5, borderRadius: 3, backgroundColor: '#eee', alignSelf: 'center', marginBottom: 20 },
  sheetTitle: { fontSize: 16, fontWeight: '800', color: '#0a0e27', marginBottom: 20, textAlign: 'center' },
  sheetActionItem: { 
    flexDirection: 'row', alignItems: 'center', paddingVertical: 15, 
    borderBottomWidth: 1, borderBottomColor: '#f5f5f5', gap: 12 
  },
  sheetActionLabel: { fontSize: 14, color: '#333', fontWeight: '600' },
  infoTitle: { fontSize: 20, fontWeight: '800', color: '#0a0e27', marginBottom: 12 },
  infoDesc: { fontSize: 15, color: '#7f8c8d', lineHeight: 24, marginBottom: 20 },
  capabilityRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 30 },
  capItem: { backgroundColor: '#f5f6fa', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  capText: { fontSize: 12, color: '#0a0e27', fontWeight: '700' },
  infoClose: { height: 50, borderRadius: 14, backgroundColor: '#0a0e27', justifyContent: 'center', alignItems: 'center' },
  infoCloseText: { color: '#fff', fontSize: 15, fontWeight: '700' }
});

export default AICopilotScreen;
