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

import navigationOptions from "./RequestDocument.navigationOptions";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

const DasionConsent: NavStatelessComponent = () => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  // Section animations (multiple refs for staggered animation)
  const section1Anim = useRef(new Animated.Value(0)).current;
  const section2Anim = useRef(new Animated.Value(0)).current;
  const section3Anim = useRef(new Animated.Value(0)).current;
  const section4Anim = useRef(new Animated.Value(0)).current;
  const section5Anim = useRef(new Animated.Value(0)).current;
  const section6Anim = useRef(new Animated.Value(0)).current;

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

  // Trigger animations on mount
  useEffect(() => {
    // Reset all animations first
    fadeAnim.setValue(0);
    slideAnim.setValue(50);
    scaleAnim.setValue(0.9);
    section1Anim.setValue(0);
    section2Anim.setValue(0);
    section3Anim.setValue(0);
    section4Anim.setValue(0);
    section5Anim.setValue(0);
    section6Anim.setValue(0);

    // Start animations
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
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Staggered section animations
    const staggerDelay = 100;
    [section1Anim, section2Anim, section3Anim, section4Anim, section5Anim, section6Anim].forEach(
      (anim, index) => {
        Animated.timing(anim, {
          toValue: 1,
          duration: 500,
          delay: index * staggerDelay,
          useNativeDriver: true,
        }).start();
      }
    );
  }, []);

  const handleDocumentPick = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "image/jpeg", "image/png"],
    });
    if (result.type === "success") {
      setUploadedFile(result);
    }
  };

  const containerStyle = isTablet ? styles.tabletContainer : styles.mobileContainer;
  const contentStyle = isTablet ? styles.tabletContent : styles.mobileContent;

  return (
    <ScrollView style={[styles.container, containerStyle]}>
      <Animated.View
        style={[
          styles.headerContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.headerIconContainer}>
          <Text style={styles.headerIcon}>📋</Text>
        </View>
        <Text style={styles.header}>Medical Records Request</Text>
        <Text style={styles.subHeader}>Please complete all required fields</Text>
      </Animated.View>

      <View style={contentStyle}>
        {/* Patient Information - Left Column on Tablet */}
        <AnimatedSection
          title="👤 Patient Information"
          animValue={section1Anim}
          style={isTablet && styles.tabletSection}
        >
          <FloatingLabelInput
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your full name"
          />

          <Text style={styles.dateLabel}>Date of Birth</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setIsDobPickerVisible(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.dateButtonText}>📅 {dob.toDateString()}</Text>
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

          <Text style={styles.dateLabel}>Phone Number</Text>
          <FloatingLabelInput
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
          />
        </AnimatedSection>

        {/* Facility - Right Column on Tablet */}
        <AnimatedSection
          title="🏥 Facility Releasing Records"
          animValue={section2Anim}
          style={isTablet && styles.tabletSection}
        >
          <FloatingLabelInput
            label="Hospital/Clinic Name"
            value={hospitalName}
            onChangeText={setHospitalName}
            placeholder="Enter facility name"
          />
        </AnimatedSection>
      </View>

      {/* Records Requested - Full Width */}
      <AnimatedSection title="📄 Records Requested" animValue={section3Anim}>
        <View style={isTablet ? styles.tabletCheckboxGrid : styles.mobileCheckboxList}>
          <CheckboxItem
            value={isAll}
            onPress={() => setIsAll(!isAll)}
            label="All Records"
          />
          <CheckboxItem
            value={isNotes}
            onPress={() => setIsNotes(!isNotes)}
            label="Visit Notes"
          />
          <CheckboxItem
            value={isLabs}
            onPress={() => setIsLabs(!isLabs)}
            label="Lab Results"
          />
          <CheckboxItem
            value={isImaging}
            onPress={() => setIsImaging(!isImaging)}
            label="Imaging/X-Ray Reports"
          />
          <CheckboxItem
            value={isOther}
            onPress={() => setIsOther(!isOther)}
            label="Other"
          />
        </View>
        {isOther && (
          <Animated.View style={{ opacity: fadeAnim }}>
            <FloatingLabelInput
              label="Please specify"
              value={otherRecord}
              onChangeText={setOtherRecord}
              placeholder="Specify other records"
            />
          </Animated.View>
        )}
      </AnimatedSection>

      {/* Date Range */}
      <AnimatedSection title="📆 Date Range of Records" animValue={section4Anim}>
        <View style={isTablet ? styles.tabletDateRow : styles.mobileDateColumn}>
          <View style={isTablet ? styles.tabletDateItem : styles.mobileDateItem}>
            <Text style={styles.dateLabel}>From Date</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setIsFromDatePickerVisible(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.dateButtonText}>📅 {fromDate.toDateString()}</Text>
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
          </View>

          <View style={isTablet ? styles.tabletDateItem : styles.mobileDateItem}>
            <Text style={styles.dateLabel}>To Date</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setIsToDatePickerVisible(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.dateButtonText}>📅 {toDate.toDateString()}</Text>
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
          </View>
        </View>
      </AnimatedSection>

      {/* Delivery Options */}
      <AnimatedSection title="📤 Where Should Records Be Sent?" animValue={section5Anim}>
        <View style={isTablet ? styles.tabletCheckboxGrid : styles.mobileCheckboxList}>
          <CheckboxItem
            value={sendToMe}
            onPress={() => setSendToMe(!sendToMe)}
            label="Send to me (email/app)"
          />
          <CheckboxItem
            value={sendToProvider}
            onPress={() => setSendToProvider(!sendToProvider)}
            label="Send to provider/person"
          />
        </View>
        <View style={isTablet ? styles.tabletInputRow : styles.mobileInputColumn}>
          <View style={isTablet ? styles.tabletInputItem : styles.mobileInputItem}>
            <FloatingLabelInput
              label="Recipient Name"
              value={recipientName}
              onChangeText={setRecipientName}
              placeholder="Enter recipient name"
            />
          </View>
          <View style={isTablet ? styles.tabletInputItem : styles.mobileInputItem}>
            <FloatingLabelInput
              label="Email or Fax"
              value={emailFax}
              onChangeText={setEmailFax}
              placeholder="Enter email or fax"
              keyboardType="email-address"
            />
          </View>
        </View>
      </AnimatedSection>

      {/* Authorization */}
      <AnimatedSection title="✍️ Authorization" animValue={section6Anim}>
        <View style={styles.authTextContainer}>
          <Text style={styles.authText}>
            "I authorize the release of my medical records as indicated above. I understand
            this request complies with HIPAA and is valid for one year unless revoked in
            writing."
          </Text>
        </View>
        <FloatingLabelInput
          label="Digital Signature"
          value={signature}
          onChangeText={setSignature}
          placeholder="Type your full name"
        />
        <Text style={styles.dateLabel}>Signature Date</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setIsSigDatePickerVisible(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.dateButtonText}>📅 {signatureDate.toDateString()}</Text>
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
      </AnimatedSection>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};

// 🔹 Animated Section Component
const AnimatedSection = ({ title, children, animValue, style }) => {
  return (
    <Animated.View
      style={[
        styles.section,
        style,
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
      ]}
    >
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.sectionDivider} />
      </View>
      {children}
    </Animated.View>
  );
};

// 🔹 Floating Label Input Component
const FloatingLabelInput = ({ label, value, onChangeText, placeholder, keyboardType }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, isFocused && styles.inputFocused]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor="#999"
      />
    </View>
  );
};

// 🔹 Checkbox Item Component
const CheckboxItem = ({ value, onPress, label }) => {
  return (
    <TouchableOpacity style={styles.checkRow} onPress={onPress} activeOpacity={0.7}>
      <CheckBoxSec value={value} checkOnpress={onPress} />
      <Text style={styles.checkLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

DasionConsent.navigationOptions = navigationOptions;

export default DasionConsent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  mobileContainer: {
    padding: 16,
  },
  tabletContainer: {
    padding: 32,
  },
  mobileContent: {
    width: "100%",
  },
  tabletContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 24,
    paddingVertical: 20,
  },
  headerIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4A90E2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: Platform.OS === "android" ? 0 : 8, // Removed shadow on Android
  },
  headerIcon: {
    fontSize: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: Platform.OS === "android" ? 0 : 3, // Removed shadow on Android
  },
  tabletSection: {
    width: "48%",
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  sectionDivider: {
    height: 3,
    width: 40,
    backgroundColor: "#4A90E2",
    borderRadius: 2,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#fafafa",
    color: "#1a1a1a",
  },
  inputFocused: {
    borderColor: "#4A90E2",
    backgroundColor: "#fff",
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: Platform.OS === "android" ? 0 : 2, // Removed shadow on Android
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 8,
    marginTop: 4,
  },
  dateButton: {
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#fafafa",
    marginBottom: 16,
  },
  dateButtonText: {
    fontSize: 16,
    color: "#1a1a1a",
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  checkLabel: {
    marginLeft: 12,
    fontSize: 15,
    color: "#333",
    flex: 1,
  },
  mobileCheckboxList: {
    marginBottom: 8,
  },
  tabletCheckboxGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  mobileDateColumn: {
    flexDirection: "column",
  },
  tabletDateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mobileDateItem: {
    width: "100%",
  },
  tabletDateItem: {
    width: "48%",
  },
  mobileInputColumn: {
    flexDirection: "column",
  },
  tabletInputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mobileInputItem: {
    width: "100%",
  },
  tabletInputItem: {
    width: "48%",
  },
  authTextContainer: {
    backgroundColor: "#f0f8ff",
    borderLeftWidth: 4,
    borderLeftColor: "#4A90E2",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  authText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
    fontStyle: "italic",
  },
  bottomSpacer: {
    height: 40,
  },
});