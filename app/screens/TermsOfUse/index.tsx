import { NavStatelessComponent } from "interfaces";
import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import navigationOptions from "./TermsOfUse.navigationOptions";

const TermsOfUseScreen: NavStatelessComponent = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.header}>Terms of Use</Text> */}
      {/* <Text style={styles.date}>Last Updated: [Insert Date]</Text> */}

      <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
      <Text style={styles.text}>
        By downloading, installing, or using Elder Care, you acknowledge that you have read,
        understood, and agree to be bound by these Terms of Use and our Privacy Policy.
      </Text>

      <Text style={styles.sectionTitle}>2. Eligibility</Text>
      <Text style={styles.text}>
        This app is designed for use by elders and their caregivers. You must be at least 18 years
        old or have the consent of a legal guardian to use the app.
      </Text>

      <Text style={styles.sectionTitle}>3. Services Provided</Text>
      <Text style={styles.text}>
        Elder Care offers AI-driven voice chat assistance to support elder care. The app is provided
        for informational and convenience purposes only and should not be relied upon for medical,
        legal, or emergency services. We do not guarantee the accuracy, completeness, or reliability
        of any information provided.
      </Text>

      <Text style={styles.sectionTitle}>4. User Responsibilities</Text>
      <Text style={styles.text}>
        - You agree to use the app only for its intended purpose and in compliance with applicable
        laws.
        {"\n"}- You will not misuse, exploit, or attempt to manipulate the AI system for unlawful
        activities.
        {"\n"}- You acknowledge that any information provided by the AI assistant is for general
        assistance only and should not be treated as professional advice.
      </Text>

      <Text style={styles.sectionTitle}>5. Privacy and Data Collection</Text>
      <Text style={styles.text}>
        Your use of Elder Care is subject to our Privacy Policy, which outlines how we collect, use,
        and protect your personal data. By using the app, you consent to such data practices.
      </Text>

      <Text style={styles.sectionTitle}>6. No Warranties & Disclaimer</Text>
      <Text style={styles.text}>
        - Elder Care is provided "as is" and "as available" without any warranties, express or
        implied.
        {"\n"}- We make no representations or guarantees regarding the accuracy, reliability, or
        availability of the app.
        {"\n"}- We disclaim all liability for any damages or losses arising from your use of the
        app.
        {"\n"}- You assume full responsibility for any reliance on the AI assistant's responses.
      </Text>

      <Text style={styles.sectionTitle}>7. Limitation of Liability</Text>
      <Text style={styles.text}>
        To the maximum extent permitted by law, Elder Care, its developers, and affiliates shall not
        be liable for any direct, indirect, incidental, or consequential damages resulting from your
        use of the app.
      </Text>

      <Text style={styles.sectionTitle}>8. Termination</Text>
      <Text style={styles.text}>
        We reserve the right to suspend or terminate your access to the app at any time for any
        reason without notice.
      </Text>

      <Text style={styles.sectionTitle}>9. Changes to Terms</Text>
      <Text style={styles.text}>
        We may update these Terms periodically. Continued use of the app after any modifications
        indicates your acceptance of the updated Terms.
      </Text>

      <Text style={styles.sectionTitle}>10. Contact Information</Text>
      <Text style={styles.text}>
        For any questions or concerns regarding these Terms, please contact us at [Support Email].
      </Text>

      <Text style={styles.footer}>
        By using Elder Care, you acknowledge and agree that we are not liable for any issues arising
        from your use of the app.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, justifyContent: "flex-start", paddingBottom: 50 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  date: { fontSize: 14, fontStyle: "italic", marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 15 },
  text: { fontSize: 16, marginTop: 5, lineHeight: 22 },
  footer: { fontSize: 14, fontWeight: "bold", marginTop: 20, textAlign: "center" },
});

TermsOfUseScreen.navigationOptions = navigationOptions;

export default TermsOfUseScreen;
