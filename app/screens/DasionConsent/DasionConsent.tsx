import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import CheckBoxSec from "components/CheckBoxSec";
import { NavStatelessComponent } from "interfaces";

import navigationOptions from "./DasionConsent.navigationOptions";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

const DasionConsent: NavStatelessComponent = () => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  
  // Section animations (each section animates independently)
  const section1Anim = useRef(new Animated.Value(0)).current;
  const section2Anim = useRef(new Animated.Value(0)).current;
  const section3Anim = useRef(new Animated.Value(0)).current;
  const section4Anim = useRef(new Animated.Value(0)).current;
  const section5Anim = useRef(new Animated.Value(0)).current;
  const section6Anim = useRef(new Animated.Value(0)).current;
  const section7Anim = useRef(new Animated.Value(0)).current;

  // 👤 Patient Info
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState(new Date());
  const [isDobPickerVisible, setIsDobPickerVisible] = useState(false);
  const [phone, setPhone] = useState("");
  const [hospitalName, setHospitalName] = useState("");

  // 📄 Records Checkboxes
  const [isAll, setIsAll] = useState(false);
  const [isNotes, setIsNotes] = useState(false);
  const [isLabs, setIsLabs] = useState(false);
  const [isImaging, setIsImaging] = useState(false);
  const [isOther, setIsOther] = useState(false);
  const [otherRecord, setOtherRecord] = useState("");

  // 📆 Date range
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [isFromDatePickerVisible, setIsFromDatePickerVisible] = useState(false);
  const [isToDatePickerVisible, setIsToDatePickerVisible] = useState(false);

  // 📤 Where to send
  const [sendToMe, setSendToMe] = useState(false);
  const [sendToProvider, setSendToProvider] = useState(false);
  const [recipientName, setRecipientName] = useState("");
  const [emailFax, setEmailFax] = useState("");

  // 📎 Upload
  const [uploadedFile, setUploadedFile] = useState(null);

  // ✍️ Authorization
  const [signature, setSignature] = useState("");
  const [signatureDate, setSignatureDate] = useState(new Date());
  const [isSigDatePickerVisible, setIsSigDatePickerVisible] = useState(false);

  // Animate on mount - runs every time screen is visited
  useEffect(() => {
    // Reset all animations to initial state
    fadeAnim.setValue(0);
    slideAnim.setValue(50);
    scaleAnim.setValue(0.9);
    section1Anim.setValue(0);
    section2Anim.setValue(0);
    section3Anim.setValue(0);
    section4Anim.setValue(0);
    section5Anim.setValue(0);
    section6Anim.setValue(0);
    section7Anim.setValue(0);

    // Main container animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Staggered section animations
    const staggerDelay = 100;
    [section1Anim, section2Anim, section3Anim, section4Anim, section5Anim, section6Anim, section7Anim].forEach(
      (anim, index) => {
        Animated.timing(anim, {
          toValue: 1,
          duration: 500,
          delay: 300 + index * staggerDelay,
          useNativeDriver: true,
        }).start();
      }
    );
  }, []); // Empty dependency array means this runs on every mount

  // 📎 Upload Handler
  const handleDocumentPick = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "image/jpeg", "image/png"],
    });
    if (result.type === "success") {
      setUploadedFile(result);
    }
  };

  const AnimatedSection = ({ children, animValue, style = {} }) => (
    <Animated.View
      style={[
        {
          opacity: animValue,
          transform: [
            {
              translateY: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0],
              }),
            },
          ],
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );

  return (
    <Animated.View
      style={[
        styles.mainContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
        },
      ]}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={isTablet ? styles.tabletContent : styles.mobileContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with gradient background */}
        <Animated.View
          style={[
            styles.headerContainer,
            isTablet && styles.headerContainerTablet,
            { opacity: fadeAnim },
          ]}
        >
          <View style={styles.headerGradient}>
            <Text style={[styles.header, isTablet && styles.headerTablet]}>
              Medical Records Request1
            </Text>
            <Text style={[styles.subheader, isTablet && styles.subheaderTablet]}>
              Complete this form to authorize the release of your medical records
            </Text>
          </View>
        </Animated.View>

        {isTablet ? (
          // TABLET LAYOUT - Two column grid
          <View style={styles.tabletGrid}>
            <View style={styles.tabletColumn}>
              <AnimatedSection animValue={section1Anim}>
                <Section title="👤 Patient Information" icon="👤">
                  <TextInput
                    placeholder="Full Name"
                    style={styles.input}
                    value={fullName}
                    onChangeText={setFullName}
                    placeholderTextColor="#94a3b8"
                  />
                  <Text style={styles.dateLabel}>Date of Birth</Text>
                  <TouchableOpacity
                    style={styles.dateButton}
                    onPress={() => setIsDobPickerVisible(true)}
                  >
                    <Text style={styles.dateButtonText}>{dob.toDateString()}</Text>
                    <Text style={styles.dateIcon}>📅</Text>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isDobPickerVisible}
                    mode="date"
                    date={dob}
                    onConfirm={(selectedDate) => {
                      setDob(selectedDate);
                      setIsDobPickerVisible(false);
                    }}
                    onCancel={() => setIsDobPickerVisible(false)}
                  />
                  <TextInput
                    placeholder="Phone Number"
                    style={styles.input}
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                    placeholderTextColor="#94a3b8"
                  />
                </Section>
              </AnimatedSection>

              <AnimatedSection animValue={section2Anim}>
                <Section title="🏥 Facility Releasing Records" icon="🏥">
                  <TextInput
                    placeholder="Hospital/Clinic Name"
                    style={styles.input}
                    value={hospitalName}
                    onChangeText={setHospitalName}
                    placeholderTextColor="#94a3b8"
                  />
                </Section>
              </AnimatedSection>

              <AnimatedSection animValue={section3Anim}>
                <Section title="📄 Records Requested" icon="📄">
                  <CheckBoxRow
                    value={isAll}
                    onPress={() => setIsAll(!isAll)}
                    label="All Records"
                  />
                  <CheckBoxRow
                    value={isNotes}
                    onPress={() => setIsNotes(!isNotes)}
                    label="Visit Notes"
                  />
                  <CheckBoxRow
                    value={isLabs}
                    onPress={() => setIsLabs(!isLabs)}
                    label="Lab Results"
                  />
                  <CheckBoxRow
                    value={isImaging}
                    onPress={() => setIsImaging(!isImaging)}
                    label="Imaging/X-Ray Reports"
                  />
                  <CheckBoxRow
                    value={isOther}
                    onPress={() => setIsOther(!isOther)}
                    label="Other"
                  />
                  {isOther && (
                    <TextInput
                      placeholder="Please specify"
                      style={[styles.input, styles.inputNested]}
                      value={otherRecord}
                      onChangeText={setOtherRecord}
                      placeholderTextColor="#94a3b8"
                    />
                  )}
                </Section>
              </AnimatedSection>
            </View>

            <View style={styles.tabletColumn}>
              <AnimatedSection animValue={section4Anim}>
                <Section title="📆 Date Range of Records" icon="📆">
                  <Text style={styles.dateLabel}>From</Text>
                  <TouchableOpacity
                    style={styles.dateButton}
                    onPress={() => setIsFromDatePickerVisible(true)}
                  >
                    <Text style={styles.dateButtonText}>{fromDate.toDateString()}</Text>
                    <Text style={styles.dateIcon}>📅</Text>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isFromDatePickerVisible}
                    mode="date"
                    date={fromDate}
                    onConfirm={(selectedDate) => {
                      setFromDate(selectedDate);
                      setIsFromDatePickerVisible(false);
                    }}
                    onCancel={() => setIsFromDatePickerVisible(false)}
                  />

                  <Text style={styles.dateLabel}>To</Text>
                  <TouchableOpacity
                    style={styles.dateButton}
                    onPress={() => setIsToDatePickerVisible(true)}
                  >
                    <Text style={styles.dateButtonText}>{toDate.toDateString()}</Text>
                    <Text style={styles.dateIcon}>📅</Text>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isToDatePickerVisible}
                    mode="date"
                    date={toDate}
                    onConfirm={(selectedDate) => {
                      setToDate(selectedDate);
                      setIsToDatePickerVisible(false);
                    }}
                    onCancel={() => setIsToDatePickerVisible(false)}
                  />
                </Section>
              </AnimatedSection>

              <AnimatedSection animValue={section5Anim}>
                <Section title="📤 Where Should Records Be Sent?" icon="📤">
                  <CheckBoxRow
                    value={sendToMe}
                    onPress={() => setSendToMe(!sendToMe)}
                    label="Send to me (email/app)"
                  />
                  <CheckBoxRow
                    value={sendToProvider}
                    onPress={() => setSendToProvider(!sendToProvider)}
                    label="Send to provider/person"
                  />
                  <TextInput
                    placeholder="Recipient Name"
                    style={styles.input}
                    value={recipientName}
                    onChangeText={setRecipientName}
                    placeholderTextColor="#94a3b8"
                  />
                  <TextInput
                    placeholder="Email or Fax"
                    style={styles.input}
                    value={emailFax}
                    onChangeText={setEmailFax}
                    placeholderTextColor="#94a3b8"
                  />
                </Section>
              </AnimatedSection>

              <AnimatedSection animValue={section6Anim}>
                <Section title="📎 Upload Required Document" icon="📎">
                  <Text style={styles.info}>
                    Upload ID, power of attorney, or legal document
                  </Text>
                  <TouchableOpacity style={styles.uploadBtn} onPress={handleDocumentPick}>
                    <Text style={styles.uploadBtnText}>
                      {uploadedFile ? "Change Document" : "Upload Document"}
                    </Text>
                    <Text style={styles.uploadIcon}>📁</Text>
                  </TouchableOpacity>
                  {uploadedFile && (
                    <View style={styles.filePreview}>
                      <Text style={styles.fileIcon}>📄</Text>
                      <Text style={styles.fileName}>{uploadedFile.name}</Text>
                    </View>
                  )}
                </Section>
              </AnimatedSection>
            </View>
          </View>
        ) : (
          // MOBILE LAYOUT - Single column
          <View>
            <AnimatedSection animValue={section1Anim}>
              <Section title="👤 Patient Information" icon="👤">
                <TextInput
                  placeholder="Full Name"
                  style={styles.input}
                  value={fullName}
                  onChangeText={setFullName}
                  placeholderTextColor="#94a3b8"
                />
                <Text style={styles.dateLabel}>Date of Birth</Text>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setIsDobPickerVisible(true)}
                >
                  <Text style={styles.dateButtonText}>{dob.toDateString()}</Text>
                  <Text style={styles.dateIcon}>📅</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDobPickerVisible}
                  mode="date"
                  date={dob}
                  onConfirm={(selectedDate) => {
                    setDob(selectedDate);
                    setIsDobPickerVisible(false);
                  }}
                  onCancel={() => setIsDobPickerVisible(false)}
                />
                <TextInput
                  placeholder="Phone Number"
                  style={styles.input}
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                  placeholderTextColor="#94a3b8"
                />
              </Section>
            </AnimatedSection>

            <AnimatedSection animValue={section2Anim}>
              <Section title="🏥 Facility Releasing Records" icon="🏥">
                <TextInput
                  placeholder="Hospital/Clinic Name"
                  style={styles.input}
                  value={hospitalName}
                  onChangeText={setHospitalName}
                  placeholderTextColor="#94a3b8"
                />
              </Section>
            </AnimatedSection>

            <AnimatedSection animValue={section3Anim}>
              <Section title="📄 Records Requested" icon="📄">
                <CheckBoxRow
                  value={isAll}
                  onPress={() => setIsAll(!isAll)}
                  label="All Records"
                />
                <CheckBoxRow
                  value={isNotes}
                  onPress={() => setIsNotes(!isNotes)}
                  label="Visit Notes"
                />
                <CheckBoxRow
                  value={isLabs}
                  onPress={() => setIsLabs(!isLabs)}
                  label="Lab Results"
                />
                <CheckBoxRow
                  value={isImaging}
                  onPress={() => setIsImaging(!isImaging)}
                  label="Imaging/X-Ray Reports"
                />
                <CheckBoxRow
                  value={isOther}
                  onPress={() => setIsOther(!isOther)}
                  label="Other"
                />
                {isOther && (
                  <TextInput
                    placeholder="Please specify"
                    style={[styles.input, styles.inputNested]}
                    value={otherRecord}
                    onChangeText={setOtherRecord}
                    placeholderTextColor="#94a3b8"
                  />
                )}
              </Section>
            </AnimatedSection>

            <AnimatedSection animValue={section4Anim}>
              <Section title="📆 Date Range of Records" icon="📆">
                <Text style={styles.dateLabel}>From</Text>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setIsFromDatePickerVisible(true)}
                >
                  <Text style={styles.dateButtonText}>{fromDate.toDateString()}</Text>
                  <Text style={styles.dateIcon}>📅</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isFromDatePickerVisible}
                  mode="date"
                  date={fromDate}
                  onConfirm={(selectedDate) => {
                    setFromDate(selectedDate);
                    setIsFromDatePickerVisible(false);
                  }}
                  onCancel={() => setIsFromDatePickerVisible(false)}
                />

                <Text style={styles.dateLabel}>To</Text>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setIsToDatePickerVisible(true)}
                >
                  <Text style={styles.dateButtonText}>{toDate.toDateString()}</Text>
                  <Text style={styles.dateIcon}>📅</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isToDatePickerVisible}
                  mode="date"
                  date={toDate}
                  onConfirm={(selectedDate) => {
                    setToDate(selectedDate);
                    setIsToDatePickerVisible(false);
                  }}
                  onCancel={() => setIsToDatePickerVisible(false)}
                />
              </Section>
            </AnimatedSection>

            <AnimatedSection animValue={section5Anim}>
              <Section title="📤 Where Should Records Be Sent?" icon="📤">
                <CheckBoxRow
                  value={sendToMe}
                  onPress={() => setSendToMe(!sendToMe)}
                  label="Send to me (email/app)"
                />
                <CheckBoxRow
                  value={sendToProvider}
                  onPress={() => setSendToProvider(!sendToProvider)}
                  label="Send to provider/person"
                />
                <TextInput
                  placeholder="Recipient Name"
                  style={styles.input}
                  value={recipientName}
                  onChangeText={setRecipientName}
                  placeholderTextColor="#94a3b8"
                />
                <TextInput
                  placeholder="Email or Fax"
                  style={styles.input}
                  value={emailFax}
                  onChangeText={setEmailFax}
                  placeholderTextColor="#94a3b8"
                />
              </Section>
            </AnimatedSection>

            <AnimatedSection animValue={section6Anim}>
              <Section title="📎 Upload Required Document" icon="📎">
                <Text style={styles.info}>
                  Upload ID, power of attorney, or legal document
                </Text>
                <TouchableOpacity style={styles.uploadBtn} onPress={handleDocumentPick}>
                  <Text style={styles.uploadBtnText}>
                    {uploadedFile ? "Change Document" : "Upload Document"}
                  </Text>
                  <Text style={styles.uploadIcon}>📁</Text>
                </TouchableOpacity>
                {uploadedFile && (
                  <View style={styles.filePreview}>
                    <Text style={styles.fileIcon}>📄</Text>
                    <Text style={styles.fileName}>{uploadedFile.name}</Text>
                  </View>
                )}
              </Section>
            </AnimatedSection>
          </View>
        )}

        {/* Authorization section - full width on both mobile and tablet */}
        <AnimatedSection animValue={section7Anim}>
          <Section title="✍️ Authorization" icon="✍️" style={isTablet && styles.fullWidthSection}>
            <View style={styles.authContainer}>
              <Text style={styles.authText}>
                "I authorize the release of my medical records as indicated above. I
                understand this request complies with HIPAA and is valid for one year
                unless revoked in writing."
              </Text>
            </View>
            <TextInput
              placeholder="Digital Signature (Type your full name)"
              style={styles.input}
              value={signature}
              onChangeText={setSignature}
              placeholderTextColor="#94a3b8"
            />
            <Text style={styles.dateLabel}>Signature Date</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setIsSigDatePickerVisible(true)}
            >
              <Text style={styles.dateButtonText}>{signatureDate.toDateString()}</Text>
              <Text style={styles.dateIcon}>📅</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isSigDatePickerVisible}
              mode="date"
              date={signatureDate}
              onConfirm={(selectedDate) => {
                setSignatureDate(selectedDate);
                setIsSigDatePickerVisible(false);
              }}
              onCancel={() => setIsSigDatePickerVisible(false)}
            />
          </Section>
        </AnimatedSection>

        {/* Submit Button */}
        <AnimatedSection animValue={section7Anim}>
          <TouchableOpacity style={[styles.submitBtn, isTablet && styles.submitBtnTablet]}>
            <Text style={styles.submitBtnText}>Submit Request</Text>
            <Text style={styles.submitIcon}>✓</Text>
          </TouchableOpacity>
        </AnimatedSection>

        <View style={{ height: 40 }} />
      </ScrollView>
    </Animated.View>
  );
};

// 🔹 Reusable Section Wrapper
const Section = ({ title, icon, children, style = {} }) => (
  <View style={[styles.section, style]}>
    <View style={styles.sectionHeader}>
      <View style={styles.iconBadge}>
        <Text style={styles.sectionIcon}>{icon}</Text>
      </View>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

// 🔹 Checkbox Row Component
const CheckBoxRow = ({ value, onPress, label }) => (
  <TouchableOpacity style={styles.checkRow} onPress={onPress} activeOpacity={0.7}>
    <CheckBoxSec value={value} checkOnpress={onPress} />
    <Text style={styles.checkLabel}>{label}</Text>
  </TouchableOpacity>
);

DasionConsent.navigationOptions = navigationOptions;
export default DasionConsent;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  container: {
    flex: 1,
  },
  mobileContent: {
    padding: 16,
  },
  tabletContent: {
    padding: 32,
    maxWidth: 1200,
    alignSelf: "center",
    width: "100%",
  },
  headerContainer: {
    marginBottom: 24,
    borderRadius: 20,
    overflow: "hidden",
  },
  headerContainerTablet: {
    marginBottom: 32,
    borderRadius: 24,
  },
  headerGradient: {
    backgroundColor: "#0f172a",
    padding: 24,
    borderRadius: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  headerTablet: {
    fontSize: 32,
    marginBottom: 12,
  },
  subheader: {
    fontSize: 14,
    color: "#cbd5e1",
    fontWeight: "400",
    lineHeight: 20,
  },
  subheaderTablet: {
    fontSize: 16,
    lineHeight: 24,
  },
  tabletGrid: {
    flexDirection: "row",
    gap: 24,
  },
  tabletColumn: {
    flex: 1,
  },
  section: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 16,
    padding: 20,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: Platform.OS === "android" ? 0 : 2, // Modified for Android
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  fullWidthSection: {
    width: "100%",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#f1f5f9",
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  sectionIcon: {
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0f172a",
    letterSpacing: -0.3,
  },
  sectionContent: {
    gap: 4,
  },
  input: {
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    backgroundColor: "#ffffff",
    fontSize: 15,
    color: "#0f172a",
    fontWeight: "500",
  },
  inputNested: {
    marginLeft: 32,
    backgroundColor: "#f8fafc",
  },
  dateLabel: {
    marginBottom: 8,
    marginTop: 4,
    fontWeight: "600",
    fontSize: 14,
    color: "#475569",
    letterSpacing: -0.2,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    backgroundColor: "#ffffff",
  },
  dateButtonText: {
    fontSize: 15,
    color: "#0f172a",
    fontWeight: "500",
  },
  dateIcon: {
    fontSize: 18,
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  checkLabel: {
    marginLeft: 12,
    fontSize: 15,
    color: "#334155",
    fontWeight: "500",
  },
  uploadBtn: {
    backgroundColor: "#0f172a",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: Platform.OS === "android" ? 0 : 4, // Modified for Android
  },
  uploadBtnText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: -0.2,
    marginRight: 8,
  },
  uploadIcon: {
    fontSize: 18,
  },
  filePreview: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
  },
  fileIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  fileName: {
    fontSize: 14,
    color: "#475569",
    fontWeight: "500",
    flex: 1,
  },
  info: {
    color: "#64748b",
    marginBottom: 12,
    fontSize: 13,
    lineHeight: 18,
    fontStyle: "italic",
  },
  authContainer: {
    backgroundColor: "#fef3c7",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#f59e0b",
  },
  authText: {
    fontSize: 14,
    color: "#78350f",
    lineHeight: 20,
    fontWeight: "500",
  },
  submitBtn: {
    backgroundColor: "#10b981",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: Platform.OS === "android" ? 0 : 6, // Modified for Android
  },
  submitBtnTablet: {
    padding: 20,
    borderRadius: 16,
  },
  submitBtnText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 17,
    letterSpacing: -0.3,
    marginRight: 8,
  },
  submitIcon: {
    fontSize: 20,
    color: "#ffffff",
  },
});