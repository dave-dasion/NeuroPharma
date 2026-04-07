import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./Step3.styles";
import * as WebBrowser from "expo-web-browser";
import { emilyUrl } from "constant/urls";
import AxiosHelper from "utils/AxiosHelper";
import StorageHelper from "utils/StorageHelper";

const Step3 = () => {
  const symptoms = [
    { text: "Has the individual had trouble recalling recent events?", c1: "Y", c2: "N" },
  ];
  const symptoms1 = [
    {
      text: "Can the individual correctly identify the time, place, and situation?",
      c1: "Y",
      c2: "N",
    },
  ];
  const symptoms2 = [
    {
      text: "Has the individual made poor decisions or had difficulty handling complex situations?",
      c1: "Y",
      c2: "N",
    },
  ];
  const symptoms3 = [
    { text: "Can they manage money, shopping, or social activities?", c1: "Y", c2: "N" },
  ];
  const symptoms4 = [
    { text: "Have they maintained household responsibilities and hobbies?').", c1: "Y", c2: "N" },
  ];
  const symptoms5 = [
    { text: "Can they handle daily personal hygiene without help?", c1: "Y", c2: "N" },
  ];

  const [symptomsList, setSymptomsList] = useState([]);
  const [symptomsList1, setSymptomsList1] = useState([]);
  const [symptomsList2, setSymptomsList2] = useState([]);
  const [symptomsList3, setSymptomsList3] = useState([]);
  const [symptomsList4, setSymptomsList4] = useState([]);
  const [symptomsList5, setSymptomsList5] = useState([]);

  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = async () => {
    const emailId = await StorageHelper.getItem('emailId');
    AxiosHelper.get(
      `/api/eldercare/getassesment/?questionset=eldercare-page3&email=${emailId}`
    )
      .then(async (response) => {
        console.log("response:::", response?.data?.interactions?.[1]?.score);

        symptoms[0].result = response?.data?.interactions?.[1]?.score ?? 2;

        symptoms1[0].result = response?.data?.interactions?.[2]?.score ?? 2;

        symptoms2[0].result = response?.data?.interactions?.[3]?.score ?? 2;

        symptoms3[0].result = response?.data?.interactions?.[4]?.score ?? 2;

        symptoms4[0].result = response?.data?.interactions?.[5]?.score ?? 2;
        symptoms5[0].result = response?.data?.interactions?.[6]?.score ?? 2;

        setSymptomsList(symptoms);
        setSymptomsList1(symptoms1);
        setSymptomsList2(symptoms2);
        setSymptomsList3(symptoms3);
        setSymptomsList4(symptoms4);
        setSymptomsList5(symptoms5);
        await StorageHelper.setItem('Step3_summary', response?.data?.summary_text ?? 'No Summary');
      })
      .catch(async (err) => {
        setSymptomsList(symptoms);
        setSymptomsList1(symptoms1);
        setSymptomsList2(symptoms2);
        setSymptomsList3(symptoms3);
        setSymptomsList4(symptoms4);
        setSymptomsList5(symptoms5);
        await StorageHelper.setItem('Step3_summary','No Summary');
        console.log("Error occurred:", err);
      });
  };

  return (
    <View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={async () => {
            const emailId = await StorageHelper.getItem('emailId');

            const result = await WebBrowser.openBrowserAsync(
              `${emilyUrl}/?questionset=eldercare-page3&email=${emailId}`
            );
            console.log("result", result);
            apiCall();
          }}
        >
          <Image
            style={{ height: 90, width: 80, resizeMode: "cover" }}
            source={require("../../../assets/images/Emily.png")}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.StepText}>{"STEP 3: Clinical Dementia Rating (CDR) Scale"}</Text>
      <ScrollView>
        <View style={styles.symptomsContainer}>
          <View style={{ height: 20 }} />
          <Text style={styles.HeaderText}>{"Memory"}</Text>
          {symptomsList.map((symptom, index) => (
            <View key={index} style={{ width: "100%" }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                >
                {console.log(symptom.result, "symptom.result::")}
                <Text style={styles.symptomText}>{symptom.text}</Text>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: 1 }}></View>
                  <View
                    style={{
                      height: 30,
                      width: 40,
                      backgroundColor: "#d5deef",
                      justifyContent: "center",
                      borderWidth: symptom.result === 1 ? 2 : 0,
                      borderColor: "red",
                    }}
                  >
                    <Text style={styles.text}>{symptom.c1}</Text>
                  </View>
                  <View style={{ width: 1 }}></View>
                  <View
                    style={{
                      height: 30,
                      width: 40,
                      backgroundColor: "#d5deef",
                      justifyContent: "center",
                      borderWidth: symptom.result === 0 ? 2 : 0,
                      borderColor: "red",
                    }}
                  >
                    <Text style={styles.text}>{symptom.c2}</Text>
                  </View>
                </View>
              </View>
              <View style={{ width: "70%", height: 1, backgroundColor: "#d5deef" }}></View>
            </View>
          ))}
          <Text style={styles.HeaderText}>{"Orientation"}</Text>
          {symptomsList1.map((symptom, index) => (
            <View key={index} style={{ width: "100%" }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.symptomText}>{symptom.text}</Text>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: 1 }}></View>
                  <View
                    style={{
                      height: 30,
                      width: 40,
                      backgroundColor: "#d5deef",
                      justifyContent: "center",
                      borderWidth: symptom.result === 1 ? 2 : 0,
                      borderColor: "red",
                    }}
                  >
                    <Text style={styles.text}>{symptom.c1}</Text>
                  </View>
                  <View style={{ width: 1 }}></View>
                  <View
                    style={{
                      height: 30,
                      width: 40,
                      backgroundColor: "#d5deef",
                      justifyContent: "center",
                      borderWidth: symptom.result === 0 ? 2 : 0,
                      borderColor: "red",
                    }}
                  >
                    <Text style={styles.text}>{symptom.c2}</Text>
                  </View>
                </View>
              </View>
              <View style={{ width: "70%", height: 1, backgroundColor: "#d5deef" }}></View>
            </View>
          ))}
          <Text style={styles.HeaderText}>{"Judgment and Problem-Solving"}</Text>
          {symptomsList2.map((symptom, index) => (
            <View key={index} style={{ width: "100%" }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.symptomText}>{symptom.text}</Text>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: 1 }}></View>
                  <View
                    style={{
                      height: 30,
                      width: 40,
                      backgroundColor: "#d5deef",
                      justifyContent: "center",
                      borderWidth: symptom.result === 1 ? 2 : 0,
                      borderColor: "red",
                    }}
                  >
                    <Text style={styles.text}>{symptom.c1}</Text>
                  </View>
                  <View style={{ width: 1 }}></View>
                  <View
                    style={{
                      height: 30,
                      width: 40,
                      backgroundColor: "#d5deef",
                      justifyContent: "center",
                      borderWidth: symptom.result === 0 ? 2 : 0,
                      borderColor: "red",
                    }}
                  >
                    <Text style={styles.text}>{symptom.c2}</Text>
                  </View>
                </View>
              </View>
              <View style={{ width: "70%", height: 1, backgroundColor: "#d5deef" }}></View>
            </View>
          ))}

          <Text style={styles.HeaderText}>{"Community Affairs"}</Text>
          {symptomsList3.map((symptom, index) => (
            <View key={index} style={{ width: "100%" }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.symptomText}>{symptom.text}</Text>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: 1 }}></View>
                  <View
                    style={{
                      height: 30,
                      width: 40,
                      backgroundColor: "#d5deef",
                      justifyContent: "center",
                      borderWidth: symptom.result === 1 ? 2 : 0,
                      borderColor: "red",
                    }}
                  >
                    <Text style={styles.text}>{symptom.c1}</Text>
                  </View>
                  <View style={{ width: 1 }}></View>
                  <View
                    style={{
                      height: 30,
                      width: 40,
                      backgroundColor: "#d5deef",
                      justifyContent: "center",
                      borderWidth: symptom.result === 0 ? 2 : 0,
                      borderColor: "red",
                    }}
                  >
                    <Text style={styles.text}>{symptom.c2}</Text>
                  </View>
                </View>
              </View>
              <View style={{ width: "70%", height: 1, backgroundColor: "#d5deef" }}></View>
            </View>
          ))}
          <Text style={styles.HeaderText}>{"Home and Hobbies"}</Text>
          {symptomsList4.map((symptom, index) => (
            <View key={index} style={{ width: "100%" }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.symptomText}>{symptom.text}</Text>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: 1 }}></View>
                  <View
                    style={{
                      height: 30,
                      width: 40,
                      backgroundColor: "#d5deef",
                      justifyContent: "center",
                      borderWidth: symptom.result === 1 ? 2 : 0,
                      borderColor: "red",
                    }}
                  >
                    <Text style={styles.text}>{symptom.c1}</Text>
                  </View>
                  <View style={{ width: 1 }}></View>
                  <View
                    style={{
                      height: 30,
                      width: 40,
                      backgroundColor: "#d5deef",
                      justifyContent: "center",
                      borderWidth: symptom.result === 0 ? 2 : 0,
                      borderColor: "red",
                    }}
                  >
                    <Text style={styles.text}>{symptom.c2}</Text>
                  </View>
                </View>
              </View>
              <View style={{ width: "70%", height: 1, backgroundColor: "#d5deef" }}></View>
            </View>
          ))}
          <Text style={styles.HeaderText}>{"Personal Care"}</Text>
          {symptomsList5.map((symptom, index) => (
            <View key={index} style={{ width: "100%" }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.symptomText}>{symptom.text}</Text>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: 1 }}></View>
                  <View
                    style={{
                      height: 30,
                      width: 40,
                      backgroundColor: "#d5deef",
                      justifyContent: "center",
                      borderWidth: symptom.result === 1 ? 2 : 0,
                      borderColor: "red",
                    }}
                  >
                    <Text style={styles.text}>{symptom.c1}</Text>
                  </View>
                  <View style={{ width: 1 }}></View>
                  <View
                    style={{
                      height: 30,
                      width: 40,
                      backgroundColor: "#d5deef",
                      justifyContent: "center",
                      borderWidth: symptom.result === 0 ? 2 : 0,
                      borderColor: "red",
                    }}
                  >
                    <Text style={styles.text}>{symptom.c2}</Text>
                  </View>
                </View>
              </View>
              <View style={{ width: "70%", height: 1, backgroundColor: "#d5deef" }}></View>
            </View>
          ))}

          <View style={{ height: 50 }} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Step3;

// import React from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   ScrollView,
//   Image,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";
// import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
// import { NavStatelessComponent } from "interfaces";
// import { styles } from "./Step3.styles";
// // import navigationOptions from './Athlete.navigationOptions';
// import * as WebBrowser from "expo-web-browser";
// import { Colors } from "style";
// const Step3: NavStatelessComponent = () => {
//   const tableHead = ["", ""];
//   const symptoms = [
//     "What venue are we at today?",
//     `Which half is it now?`,
//     "Who scored last in this match?",
//     "What team did you play last week / game?            ",
//     "Did your team win the last game?",
//   ];

//   const tableData = Array(symptoms.length).fill(["Y", "N"]);

//   const generateRandomHighlights = (numHighlights) => {
//     const highlights = [];
//     for (let i = 0; i < numHighlights; i++) {
//       const row = i;
//       const col = Math.floor(Math.random() * 4) + 3; // Generates values between 3 and 6
//       highlights.push({ row, col });
//     }
//     return highlights;
//   };

//   const highlightCells = generateRandomHighlights(22);

//   const renderCell = (data, rowIndex, colIndex) => {
//     const isHighlighted = highlightCells.some(
//       (cell) => cell.row === rowIndex && cell.col === colIndex
//     );

//     return (
//       <View style={[styles.cell, isHighlighted && styles.highlightCell]}>
//         <Text style={styles.text}>{data}</Text>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View style={{ alignItems: "center" }}>
//         <TouchableOpacity
//           onPress={() => {
//             WebBrowser.openBrowserAsync("http://dev.dasion-guider.com:3000/");
//           }}
//         >
//           <Image
//             style={{ height: 90, width: 80, resizeMode: "cover" }}
//             source={require("../../../assets/images/Emily.png")}
//           />
//         </TouchableOpacity>
//       </View>
//       <Text style={styles.StepText}>{"STEP 3: MEMORY ASSESSMENT\nMADDOCKS QUESTIONS2"}</Text>

//       <ScrollView horizontal>
//         <View style={styles.rowContainer}>
//           <ScrollView showsVerticalScrollIndicator={false}>
//             <View style={styles.symptomsAndTable}>
//               <View style={styles.symptomsContainer}>
//                 {symptoms.map((symptom, index) => (
//                   <View key={index} style={{ height: 30, width: "100%", justifyContent: "center" }}>
//                     <Text style={styles.symptomText}>{symptom}</Text>
//                     <View style={{ height: 1, backgroundColor: "#d5deef" }}></View>
//                   </View>
//                 ))}
//               </View>

//               <View style={styles.tableContainer}>
//                 <Table borderStyle={{ borderWidth: 2, borderColor: "#FFF" }}>
//                   <Row
//                     data={tableHead}
//                     flexArr={[1, 1]}
//                     style={styles.header}
//                     textStyle={styles.headerText}
//                   />
//                 </Table>
//                 <Table borderStyle={{ borderWidth: 1, borderColor: "#FFFF" }}>
//                   {tableData.map((rowData, rowIndex) => (
//                     <TableWrapper key={rowIndex} style={styles.row} flexArr={[1, 1]}>
//                       {rowData.map((cellData, colIndex) =>
//                         renderCell(cellData, rowIndex, colIndex)
//                       )}
//                     </TableWrapper>
//                   ))}
//                 </Table>
//               </View>
//             </View>
//           </ScrollView>
//         </View>
//       </ScrollView>

//       <View style={styles.form}>
//         <View style={styles.rowView}>
//           <Text style={styles.label}>Name:</Text>
//           <TextInput style={styles.input} />
//         </View>
//         <View style={styles.rowView}>
//           <Text style={styles.label}>DOB:</Text>
//           <TextInput style={styles.input} />
//         </View>
//         <View style={styles.rowView}>
//           <Text style={styles.label}>Address:</Text>
//           <TextInput style={styles.input} />
//         </View>
//         <View style={styles.rowView}>
//           <Text style={styles.label}>ID number:</Text>
//           <TextInput style={styles.input} />
//         </View>
//         <View style={styles.rowView}>
//           <Text style={styles.label}>Examiner:</Text>
//           <TextInput style={styles.input} />
//         </View>
//         <View style={styles.rowView}>
//           <Text style={styles.label}>Date:</Text>
//           <TextInput style={styles.input} />
//         </View>
//       </View>
//     </View>
//   );
// };

// // Step2.navigationOptions = navigationOptions;

// export default Step3;
