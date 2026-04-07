import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import { ListItem } from "components";
import { NavStatelessComponent } from "interfaces";
import styles from "./DoctorSOAPNotes.styles";
import { Colors } from "style";
import navigationOptions from './DoctorSOAPNotes.navigationOptions'
import { Ionicons } from "@expo/vector-icons";
import { Asset } from 'expo-asset'
import StorageHelper from "utils/StorageHelper";
import AxiosHelper from "utils/AxiosHelper";


const DoctorSOAPNotes: NavStatelessComponent = () => {
  const navigation = useNavigation()
  const [dotorSoapNotes, setDotorSoapNotes] = useState<string | null>(null)

  const apiCallStep1 = async () => {
    const emailId = await StorageHelper.getItem('emailId');

    AxiosHelper.get(`/api/eldercare/soap_notes?email=${emailId}`)
      .then(async (response) => {
        setDotorSoapNotes(response?.data?.soap_notes_text ?? "No SOAP Notes");
      })
      .catch((err) => {
        setDotorSoapNotes("No SOAP Notes")
        console.log("Error occurred:", err);
      });
  };
  useEffect(() => {
    apiCallStep1();
    // setDotorSoapNotes
  }, [])

  return (
    <ScrollView style={styles.container}>
      <View style={{ height: 10 }} />
    <Text>{dotorSoapNotes}</Text>
     

    </ScrollView>
  );
};

DoctorSOAPNotes.navigationOptions = navigationOptions;

export default DoctorSOAPNotes;
