import React, { useState, useEffect, useRef } from "react";
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
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import { ImagesAssets } from "constant";
import { NavStatelessComponent } from "interfaces";
import { cognitoPool } from "screens/cognito-pool";
import { Colors } from "style";

import navigationOptions from "./SignUp.navigationOptions";

const { width, height } = Dimensions.get("window");

const SignUp: NavStatelessComponent = () => {
    const isTablet = width >= 768;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
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

    const onPressRegister = () => {
        if (!email || !password || !confirmPassword) {
            return Alert.alert("Error", "All fields are required.");
        }
        if (password !== confirmPassword) {
            return Alert.alert("Error", "Passwords do not match.");
        }

        setLoading(true);
        cognitoPool.signUp(email, password, [], null, (err, data) => {
            setLoading(false);
            if (err) {
                switch (err.name) {
                    case "InvalidParameterException":
                        return Alert.alert("Error", "Please enter valid email");
                    case "InvalidPasswordException":
                        return Alert.alert("Error", "Password too weak. Use numbers and special characters.");
                    case "UsernameExistsException":
                        return Alert.alert("Error", "Email already registered");
                    default:
                        return Alert.alert("Error", "Registration failed. Try again.");
                }
            }

            Alert.alert("Success", "Account Created! Verify your email to continue", [
                {
                    text: "Continue To OTP",
                    onPress: async () => {
                        (navigation as any).navigate("OtpVerified", { email: email })
                    },
                },
            ]);
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
                        <Ionicons name={icon as any} size={isTablet ? 32 : 21} color={isSelected ? "#fff" : "#95a5a6"} />
                    ) : (
                        <MaterialCommunityIcons name={mIcon as any} size={isTablet ? 32 : 21} color={isSelected ? "#fff" : "#95a5a6"} />
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
                {/* <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity> */}

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                            <View style={styles.logoContainer}>
                                <Image style={styles.logo} resizeMode="contain" source={ImagesAssets.logos.nmf} />
                                <Text style={styles.welcomeText}>Create Lab Access</Text>
                                <Text style={styles.subText}>Register your NeuroPharma research credential</Text>
                            </View>

                            <Text style={styles.sectionLabel}>Select Researcher Role</Text>
                            <View style={styles.roleRow}>
                                <RoleOption id="1" label="Doctor" icon="medical" />
                                <RoleOption id="2" label="Patient" icon="person" />
                                <RoleOption id="3" label="Admin" mIcon="shield-account" />
                            </View>

                            <View style={styles.inputContainer}>
                                <View style={styles.fieldWrapper}>
                                    <Text style={styles.inputLabel}>Institutional Email</Text>
                                    <View style={styles.inputRow}>
                                        <Ionicons name="mail-outline" size={20} color="#6C5CE7" style={styles.fieldIcon} />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="researcher@lab.com"
                                            placeholderTextColor="#95a5a6"
                                            value={email}
                                            onChangeText={setEmail}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                        />
                                    </View>
                                </View>

                                <View style={styles.fieldWrapper}>
                                    <Text style={styles.inputLabel}>Create Password</Text>
                                    <View style={styles.inputRow}>
                                        <Ionicons name="lock-closed-outline" size={20} color="#6C5CE7" style={styles.fieldIcon} />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="At least 8 chars"
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

                                <View style={styles.fieldWrapper}>
                                    <Text style={styles.inputLabel}>Confirm Credentials</Text>
                                    <View style={styles.inputRow}>
                                        <Ionicons name="shield-checkmark-outline" size={20} color="#6C5CE7" style={styles.fieldIcon} />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Repeat password"
                                            placeholderTextColor="#95a5a6"
                                            value={confirmPassword}
                                            onChangeText={setConfirmPassword}
                                            secureTextEntry={!isConfirmPasswordVisible}
                                        />
                                        <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                                            <Ionicons name={isConfirmPasswordVisible ? "eye-off-outline" : "eye-outline"} size={20} color="#95a5a6" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.registerBtn}
                                onPress={onPressRegister}
                                activeOpacity={0.8}
                                disabled={loading}
                            >
                                <LinearGradient
                                    colors={["#6C5CE7", "#0984E3"]}
                                    style={styles.btnGradient}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <Text style={styles.btnText}>{loading ? "REGISTRATION..." : "CREATE ACCOUNT"}</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <View style={styles.footer}>
                                <Text style={styles.footerText}>Already part of the lab? </Text>
                                <TouchableOpacity onPress={() => (navigation as any).navigate("LoginScreen")}>
                                    <Text style={styles.signUpText}>Sign In</Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </LinearGradient>

        </View>
    );
};

SignUp.navigationOptions = navigationOptions();

const styles = StyleSheet.create({
    container: { flex: 1 },
    background: { flex: 1 },
    backBtn: {
        position: 'absolute', top: Platform.OS === 'ios' ? 60 : 40,
        left: 20, zIndex: 10, width: 44, height: 44,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12, justifyContent: 'center', alignItems: 'center'
    },
    scrollContent: { flexGrow: 1, paddingBottom: 40 },
    content: { flex: 1, paddingHorizontal: 24, paddingTop: height * 0.08 },
    logoContainer: { alignItems: 'center', marginBottom: 35 },
    logo: { width: width * 0.6, height: 70, tintColor: '#fff' },
    welcomeText: { color: "#fff", fontSize: 24, fontWeight: '800', marginTop: 15 },
    subText: { color: "rgba(255,255,255,0.6)", fontSize: 13, marginTop: 4, textAlign: 'center' },
    sectionLabel: { color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: '700', marginBottom: 12, letterSpacing: 1 },
    roleRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
    roleCard: { width: (width - 68) / 3, height: 90, borderRadius: 18, overflow: 'hidden' },
    roleCardActive: { shadowColor: "#6C5CE7", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 12 },
    roleGradient: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 8 },
    roleLabel: { fontSize: 11, fontWeight: '700', color: '#95a5a6', marginTop: 6 },
    roleLabelActive: { color: '#fff' },
    activeDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: '#fff', position: 'absolute', top: 8, right: 8 },
    inputContainer: { gap: 16 },
    fieldWrapper: { gap: 8 },
    inputLabel: { color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: '600' },
    inputRow: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 15, height: 54, paddingHorizontal: 16,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)'
    },
    fieldIcon: { marginRight: 12 },
    input: { flex: 1, color: '#fff', fontSize: 14 },
    registerBtn: { marginTop: 30, borderRadius: 16, overflow: 'hidden', height: 58 },
    btnGradient: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    btnText: { color: '#fff', fontSize: 15, fontWeight: '800', letterSpacing: 1 },
    footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 35 },
    footerText: { color: 'rgba(255,255,255,0.6)', fontSize: 14 },
    signUpText: { color: '#6C5CE7', fontSize: 14, fontWeight: '700' }
});

export default SignUp;