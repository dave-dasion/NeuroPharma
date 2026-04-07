import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { emilyUrl } from "constant/urls";
import { styles } from "./AsessmentAISingleNotes.styles";
import AxiosHelper from "utils/AxiosHelper";
import StorageHelper from "utils/StorageHelper";
import navigationOptions from "./AsessmentAISingleNotes.navigationOptions";
import { Colors } from "style";
import { useRoute } from "@react-navigation/native";

const AsessmentAISingleNotes = () => {
  const route = useRoute();

  const {number,title} = route?.params;

  console.log("route",route);
  const [summaryData, setSummaryData] = useState([]);

  const [summaryData1, setSummaryData1] = useState("No Summary");
  const [summaryData2, setSummaryData2] = useState("No Summary");
  const [summaryData3, setSummaryData3] = useState("No Summary");
  const [summaryData4, setSummaryData4] = useState("No Summary");
  const [summaryData5, setSummaryData5] = useState("No Summary");
  const [summaryData6, setSummaryData6] = useState("No Summary");

  const apiCallStep1 = async () => {
    const emailId = await StorageHelper.getItem('emailId');

    AxiosHelper.get(`/api/eldercare/getassesment/?questionset=eldercare-page1&email=${emailId}`)
      .then(async (response) => {
        setSummaryData1(response?.data?.summary_text ?? "No Summary");
      })
      .catch((err) => {
        console.log("Error occurred:", err);
      });
  };

  const apiCallStep2 = async () => {
    const emailId = await StorageHelper.getItem('emailId');
    AxiosHelper.get(`/api/eldercare/getassesment/?questionset=eldercare-page2&email=${emailId}`)
      .then(async (response) => {
        setSummaryData2(response?.data?.summary_text ?? "No Summary");
      })
      .catch((err) => {
        console.log("Error occurred:", err);
      });
  };

  const apiCallStep3 = async () => {
    const emailId = await StorageHelper.getItem('emailId');
    AxiosHelper.get(`/api/eldercare/getassesment/?questionset=eldercare-page3&email=${emailId}`)
      .then(async (response) => {
        setSummaryData3(response?.data?.summary_text ?? "No Summary");
      })
      .catch((err) => {
        console.log("Error occurred:", err);
      });
  };

  const apiCallStep4 = async () => {
    const emailId = await StorageHelper.getItem('emailId');
    AxiosHelper.get(`/api/eldercare/getassesment/?questionset=eldercare-page4&email=${emailId}`)
      .then(async (response) => {
        setSummaryData4(response?.data?.summary_text ?? "No Summary");
      })
      .catch((err) => {
        console.log("Error occurred:", err);
      });
  };

  const apiCallStep5 = async () => {
    const emailId = await StorageHelper.getItem('emailId');
    AxiosHelper.get(`/api/eldercare/getassesment/?questionset=eldercare-page5&email=${emailId}`)
      .then(async (response) => {
        setSummaryData5(response?.data?.summary_text ?? "No Summary");
      })
      .catch((err) => {
        console.log("Error occurred:", err);
      });
  };

  const apiCallStep6 = async () => {
    const emailId = await StorageHelper.getItem('emailId');
    AxiosHelper.get(`/api/eldercare/getassesment/?questionset=eldercare-page6&email=${emailId}`)
      .then(async (response) => {
        setSummaryData6(response?.data?.summary_text ?? "No Summary");
      })
      .catch((err) => {
        console.log("Error occurred:", err);
      });
  };

  useEffect(() => {
    // setSummaryData(data);
    apiCallStep1();
    apiCallStep2();
    apiCallStep3();
    apiCallStep4();
    apiCallStep5();
    apiCallStep6();
  }, []);

  const getAssessmentData = () => {
    let data = "";

    switch (number) {
      case 1:
        data = summaryData1;
        break;
      case 2:
        data = summaryData2;
        break;
      case 3:
        data = summaryData3;
        break;
      case 4:
        data = summaryData4;
        break;
      case 5:
        data = summaryData5;
        break;
      case 6:
        data = summaryData6;
        break;
      default:
        break;
    }
    return (
      <View key={number} style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{data}</Text>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {getAssessmentData()}
      </ScrollView>

      {/* <WebView
       style={{ width: "100%", height: height * 0.6 }}
       originWhitelist={["*"]}
       source={{
         uri:
           "https://eldercare-prof-pdf-storage.s3.amazonaws.com/d4332c8b-f49c-4547-bdfc-dea828e8c9ca.pdf?AWSAccessKeyId=AKIAV6VZDFR5MGEHXV4B&Signature=h9C83zZRhF3CQtQqcET1%2BdVGAmU%3D&Expires=1740645965",
       }}
     /> */}
    </View>
  );
};
AsessmentAISingleNotes.navigationOptions = navigationOptions();
export default AsessmentAISingleNotes;
