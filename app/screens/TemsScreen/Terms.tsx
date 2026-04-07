import { NavStatelessComponent } from "interfaces";
import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import CheckBox from 'react-native-check-box';
import navigationOptions from "./TemsScreen.navigationOptions";
import { Colors } from "style";
import CheckBoxSec from "components/CheckBoxSec";

const TermsScreen: NavStatelessComponent = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleAccept = () => {
    if (isChecked) {
      Alert.alert("Consent Accepted", "Thank you for accepting the terms.");
    } else {
      Alert.alert("Consent Required", "You must agree to the terms to proceed.");
    }
  };

  return (
    <View style={styles.mainView}>
      <ScrollView contentContainerStyle={styles.container}>

      {/* <ScrollView style={styles.container}> */}
          <Text style={styles.heading}>
            DASION Data Gathering for NSF Phase II Research Utilizing Geometric Unified Learning
          </Text>

          <Text style={styles.subheading}>Consent Form</Text>

          <Text style={styles.bold}>Purpose</Text>
          <Text style={styles.text}>
            The purpose of this study is to detect speech patterns via a computer by analyzing voice
            recordings of participants with or without Dementia, Depression, Diabetes, or other
            diseases which can be detected by voice. The analysis will focus on the characteristics
            of the speech, not the content.
          </Text>

          <Text style={styles.bold}>Background</Text>
          <Text style={styles.text}>
            This research involves highly scientific methods designed to ensure the safety and
            privacy of participants.
          </Text>

          <Text style={styles.bold}>Criteria for Subject Selection</Text>
          <Text style={styles.bold}>Eligibility:</Text>
          <Text style={styles.text}>
            Only adults (18 years and older) will be recruited. There are no racial or ethnic
            restrictions; the selection aims to mimic the composition of the U.S. Census.
          </Text>

          <Text style={styles.bold}>Process:</Text>
          <Text style={styles.text}>
            The data collection involves using a mobile device, laptop, or desktop computer for
            audio recording, posing no physical risk to participants.
          </Text>

          <Text style={styles.bold}>Risks and Benefits</Text>
          <Text style={styles.bold}>Physical Risk:</Text>
          <Text style={styles.text}>
            No direct physical interaction or in-person correspondence with participants.
          </Text>

          <Text style={styles.bold}>Psychological Risk:</Text>
          <Text style={styles.text}>
            Data collection occurs in private settings like homes, schools, and hospitals, without
            personal or intrusive questions, thus maintaining confidentiality.
          </Text>

          <Text style={styles.bold}>Socio-economic Risk:</Text>
          <Text style={styles.text}>
            Participants do not incur any costs, and data collection does not affect their social or
            economic standing.
          </Text>

          <Text style={styles.bold}>Confidentiality Risk:</Text>
          <Text style={styles.text}>
            All data is anonymized and stored in HIPAA-compliant systems.
          </Text>

          <Text style={styles.bold}>Legal Risk:</Text>
          <Text style={styles.text}>
            Participation does not involve any illegal actions or jeopardize participants' legal
            standing.
          </Text>

          <Text style={styles.bold}>Confidentiality</Text>
          <Text style={styles.text}>
            All collected data will be anonymized and stored securely in HIPAA-compliant systems to
            ensure confidentiality and participant privacy.
          </Text>

          <Text style={styles.bold}>Voluntary Participation</Text>
          <Text style={styles.text}>
            Participation in this study is entirely voluntary. Participants may withdraw at any time
            without any consequences.
          </Text>

          <Text style={styles.bold}>Contact Information</Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Principal Investigator:</Text> Weiqing Gu {"\n"}
            <Text style={styles.bold}>Institution:</Text> DASION {"\n"}
            <Text style={styles.bold}>Email:</Text> gu@dasion.ai {"\n"}
            <Text style={styles.bold}>Phone:</Text> 909-373-7968
          </Text>

          <Text style={styles.bold}>Consent</Text>
          <Text style={styles.text}>
            By clicking the checkbox to indicate your agreement, which constitutes signing this
            form, you confirm that you understand the purpose of the study, the procedures involved,
            and the potential risks and benefits of participation. You voluntarily consent to
            participate in this study.
          </Text>
        {/* </ScrollView> */}
      </ScrollView>
      <View style={styles.positionButton}>

        <View style={styles.checkboxContainer}>
          {/* <Checkbox
            status={isChecked ? "checked" : "unchecked"}
            onPress={() => setIsChecked(!isChecked)}
          style={styles.checkbox}
          /> */}
          <CheckBoxSec
            // ImgViewStyle={styles.ImgViewStyle}
            value={isChecked}
            checkOnpress={() => setIsChecked(!isChecked)}
          />
          <Text style={styles.checkboxLabel}>I agree to the terms and conditions</Text>
        </View>

        <TouchableOpacity
          style={[styles.acceptButton, !isChecked && styles.disabledButton]}
          onPress={handleAccept}
          disabled={!isChecked}
        >
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

TermsScreen.navigationOptions = navigationOptions;

const styles = StyleSheet.create({
  mainView: {
    flex: 1
  },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "flex-start",
    paddingBottom: 150
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  // text: {
  //   fontSize: 16,
  //   marginBottom: 20,
  // },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    paddingLeft:'4%'
  },
  acceptButton: {
    backgroundColor: Colors.AppColor,
    paddingVertical: 15,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color:Colors.black,
    fontSize: 18,
    fontWeight: "bold",
  },
  positionButton: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: 'white',
    padding: 10
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
},
subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
},
bold: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
},
text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
},
});

export default TermsScreen;
