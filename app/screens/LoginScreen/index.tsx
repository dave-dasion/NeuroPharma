import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  useWindowDimensions,
  Dimensions,
  Animated,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import { navigate } from "navigation";
import { cognitoPool } from "screens/cognito-pool";
import { NavStatelessComponent } from "interfaces";
import { ImagesAssets } from "constant";
import { Colors } from "style";

import navigationOptions from "./LoginScreen.navigationOptions";

const { width, height } = Dimensions.get("window");

const LoginScreen: NavStatelessComponent = () => {
    const isTablet = width >= 768;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [ispatient, setIspatient] = useState("1");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 50, friction: 8, useNativeDriver: true }),
    ]).start();
  }, []);

  const onPressLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    setLoading(true);
    const user = new CognitoUser({
      Username: email,
      Pool: cognitoPool,
    });
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    user.authenticateUser(authDetails, {
      onSuccess: async res => {
        const token = (res as any).getRefreshToken().getToken();
        const email = (res as any).getIdToken().payload.email;

        await AsyncStorage.setItem("REFRESH_TOKEN", JSON.stringify(token));
        await AsyncStorage.setItem("emailId", email);
        await AsyncStorage.setItem("isAdmin", ispatient);

        setLoading(false);
        setTimeout(() => {
          if (ispatient == "3") {
            (navigation as any).reset({
              index: 0,
              routes: [{ name: "AdminPage" }],
            });
          } else {
            (navigation as any).reset({
              index: 0,
              routes: [{ name: "BottomTab" }],
            });
          }
        }, 350);
      },
      onFailure: err => {
        setLoading(false);
        switch (err.name) {
          case "UserNotConfirmedException":
            return Alert.alert("Error", "Please confirm your email");
          case "NotAuthorizedException":
            return Alert.alert("Error", "Incorrect credentials");
          default:
            return Alert.alert("Error", "Check your internet connection or try again");
        }
      },
    });
  };

  const RoleOption = ({ id, label, icon, mIcon }: { id: string, label: string, icon?: string, mIcon?: string }) => {
    const isSelected = ispatient === id;
    return (
      <TouchableOpacity 
        onPress={() => setIspatient(id)}
        activeOpacity={0.8}
        style={[
          styles.roleCard,
          isSelected && styles.roleCardActive
        ]}
      >
        <LinearGradient
          colors={isSelected ? ["#6C5CE7", "#0984E3"] : ["#f8f9fa", "#fff"]}
          style={styles.roleGradient}
        >
          {icon ? (
             <Ionicons name={icon as any} size={isTablet ? 32 : 24} color={isSelected ? "#fff" : "#95a5a6"} />
          ) : (
             <MaterialCommunityIcons name={mIcon as any} size={isTablet ? 32 : 24} color={isSelected ? "#fff" : "#95a5a6"} />
          )}
          <Text style={[styles.roleLabel, isSelected && styles.roleLabelActive]}>{label}</Text>
          {isSelected && <View style={styles.activeDot} />}
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient colors={["#0a0e27", "#1a1f4e"]} style={styles.background}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"} 
          style={{ flex: 1 }}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
              {/* Logo Area */}
              <View style={styles.logoContainer}>
                <Image 
                  style={styles.logo} 
                  resizeMode="contain" 
                  source={ImagesAssets.logos.nmf} 
                />
                <Text style={styles.welcomeText}>Welcome Researcher</Text>
                <Text style={styles.subText}>Sign in to access Lab Intelligence</Text>
              </View>

              {/* Role Selection */}
              <Text style={styles.sectionLabel}>Identify your role</Text>
              <View style={styles.roleRow}>
                <RoleOption id="1" label="Doctor" icon="medical" />
                <RoleOption id="2" label="Patient" icon="person" />
                <RoleOption id="3" label="Admin" mIcon="shield-account" />
              </View>

              {/* Input Fields */}
              <View style={styles.inputContainer}>
                <View style={styles.fieldWrapper}>
                  <Text style={styles.inputLabel}>Email Address</Text>
                  <View style={styles.inputRow}>
                    <Ionicons name="mail-outline" size={20} color="#6C5CE7" style={styles.fieldIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your lab email"
                      placeholderTextColor="#95a5a6"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                <View style={styles.fieldWrapper}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <View style={styles.inputRow}>
                    <Ionicons name="lock-closed-outline" size={20} color="#6C5CE7" style={styles.fieldIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="••••••••"
                      placeholderTextColor="#95a5a6"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!isPasswordVisible}
                    />
                    <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                      <Ionicons name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={20} color="#95a5a6" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.forgotPass}>
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity 
                style={styles.loginBtn} 
                onPress={onPressLogin}
                activeOpacity={0.8}
                disabled={loading}
              >
                <LinearGradient 
                  colors={["#6C5CE7", "#0984E3"]} 
                  style={styles.btnGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.btnText}>{loading ? "AUTHENTICATING..." : "SIGN IN"}</Text>
                  {!loading && <Ionicons name="arrow-forward" size={18} color="#fff" />}
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => (navigation as any).navigate("SignUp")}>
                  <Text style={styles.signUpText}>Join NeuroPharma</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
};

LoginScreen.navigationOptions = navigationOptions();

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: 40 },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: height * 0.1 },
  logoContainer: { alignItems: 'center', marginBottom: 40 },
  logo: { width: width * 0.7, height: 80, tintColor: '#fff' },
  welcomeText: { color: "#fff", fontSize: 24, fontWeight: '800', marginTop: 15 },
  subText: { color: "rgba(255,255,255,0.6)", fontSize: 14, marginTop: 4 },
  sectionLabel: { color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: '700', marginBottom: 15, letterSpacing: 1 },
  roleRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  roleCard: { width: (width - 68) / 3, height: 100, borderRadius: 20, overflow: 'hidden' },
  roleCardActive: { shadowColor: "#6C5CE7", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 12 },
  roleGradient: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 },
  roleLabel: { fontSize: 12, fontWeight: '700', color: '#95a5a6', marginTop: 8 },
  roleLabelActive: { color: '#fff' },
  activeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#fff', position: 'absolute', top: 10, right: 10 },
  inputContainer: { gap: 20 },
  fieldWrapper: { gap: 8 },
  inputLabel: { color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: '600' },
  inputRow: { 
    flexDirection: 'row', alignItems: 'center', 
    backgroundColor: 'rgba(255,255,255,0.08)', 
    borderRadius: 16, height: 56, paddingHorizontal: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)'
  },
  fieldIcon: { marginRight: 12 },
  input: { flex: 1, color: '#fff', fontSize: 15 },
  forgotPass: { alignSelf: 'flex-end', marginTop: 12 },
  forgotText: { color: '#0984E3', fontSize: 13, fontWeight: '600' },
  loginBtn: { marginTop: 30, borderRadius: 18, overflow: 'hidden', height: 60 },
  btnGradient: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '800', letterSpacing: 1 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 40 },
  footerText: { color: 'rgba(255,255,255,0.6)', fontSize: 14 },
  signUpText: { color: '#6C5CE7', fontSize: 14, fontWeight: '700' }
});

export default LoginScreen;