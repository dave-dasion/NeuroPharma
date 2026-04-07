import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./Steep2.styles";
import * as WebBrowser from "expo-web-browser";
import { emilyUrl } from "constant/urls";
import AxiosHelper from "utils/AxiosHelper";
import StorageHelper from "utils/StorageHelper";

const Step2 = () => {
  const symptoms = [
    { text: "Draw a clock at a specific time (e.g., 10 past 11).", c1: "Y", c2: "N" },
    { text: "Copy a cube drawing.", c1: "Y", c2: "N" },
  ];
  const symptoms1 = [
    { text: "Name animals in a picture (e.g., lion, rhinoceros, camel).", c1: "Y", c2: "N" },
  ];
  const symptoms2 = [{ text: "Repeat five words and recall them later.", c1: "Y", c2: "N" }];
  const symptoms3 = [
    { text: "Forward and backward digit span.", c1: "Y", c2: "N" },
    { text: "Tap hand when hearing a specific letter (e.g., A).", c1: "Y", c2: "N" },
    { text: "Serial subtraction (similar to MMSE).", c1: "Y", c2: "N" },
  ];
  const symptoms4 = [
    {
      text:
        "Repeat a complex sentence (e.g., 'The cat always hid under the couch when dogs were in the room.').",
      c1: "Y",
      c2: "N",
    },
  ];
  const symptoms5 = [
    {
      text:
        "Explain how two words are alike (e.g., train and bicycle → both are modes of transportation).",
      c1: "Y",
      c2: "N",
    },
  ];
  const symptoms6 = [{ text: "Recall five words from earlier without cues.", c1: "Y", c2: "N" }];
  const symptoms7 = [{ text: "Similar to MMSE.", c1: "Y", c2: "N" }];

  const [symptomsList, setSymptomsList] = useState([]);
  const [symptomsList1, setSymptomsList1] = useState([]);
  const [symptomsList2, setSymptomsList2] = useState([]);
  const [symptomsList3, setSymptomsList3] = useState([]);
  const [symptomsList4, setSymptomsList4] = useState([]);
  const [symptomsList5, setSymptomsList5] = useState([]);
  const [symptomsList6, setSymptomsList6] = useState([]);
  const [symptomsList7, setSymptomsList7] = useState([]);

  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = async () => {
    const emailId = await StorageHelper.getItem('emailId');
    AxiosHelper.get(
      `/api/eldercare/getassesment/?questionset=eldercare-page2&email=${emailId}`
    )
      .then(async (response) => {
        console.log("response", response.data);

        symptoms[0].result = response?.data?.interactions?.[1]?.score ?? 2;
        symptoms[1].result = response?.data?.interactions?.[2]?.score ?? 2;

        symptoms1[0].result = response?.data?.interactions?.[3]?.score ?? 2;

        symptoms2[0].result = response?.data?.interactions?.[4]?.score ?? 2;

        symptoms3[0].result = response?.data?.interactions?.[5]?.score ?? 2;
        symptoms3[1].result = response?.data?.interactions?.[6]?.score ?? 2;
        symptoms3[2].result = response?.data?.interactions?.[7]?.score ?? 2;

        symptoms4[0].result = response?.data?.interactions?.[8]?.score ?? 2;
        symptoms5[0].result = response?.data?.interactions?.[9]?.score ?? 2;
        symptoms6[0].result = response?.data?.interactions?.[10]?.score ?? 2;
        symptoms7[0].result = response?.data?.interactions?.[11]?.score ?? 2;

        setSymptomsList(symptoms);
        setSymptomsList1(symptoms1);
        setSymptomsList2(symptoms2);
        setSymptomsList3(symptoms3);
        setSymptomsList4(symptoms4);
        setSymptomsList5(symptoms5);
        setSymptomsList6(symptoms6);
        setSymptomsList7(symptoms7);
        await StorageHelper.setItem('Step2_summary', response?.data?.summary_text ?? 'No Summary');
      })
      .catch(async (err) => {
        setSymptomsList(symptoms);
        setSymptomsList1(symptoms1);
        setSymptomsList2(symptoms2);
        setSymptomsList3(symptoms3);
        setSymptomsList4(symptoms4);
        setSymptomsList5(symptoms5);
        setSymptomsList6(symptoms6);
        setSymptomsList7(symptoms7);
        await StorageHelper.setItem('Step2_summary','No Summary');

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
              `${emilyUrl}/?questionset=eldercare-page2&email=${emailId}`
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
      <Text style={styles.StepText}>{"STEP 2: Montreal Cognitive Assessment (MoCA)"}</Text>
      <ScrollView>
        <View style={styles.symptomsContainer}>
          <View style={{ height: 20 }} />
          <Text style={styles.HeaderText}>{"Visuospatial/Executive Function"}</Text>
          {symptomsList.map((symptom, index) => (
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
          <Text style={styles.HeaderText}>{"Naming"}</Text>
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
          <Text style={styles.HeaderText}>{"Memory"}</Text>
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

          <Text style={styles.HeaderText}>{"Attention"}</Text>
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
          <Text style={styles.HeaderText}>{"Language"}</Text>
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
          <Text style={styles.HeaderText}>{"Abstraction"}</Text>
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
          <Text style={styles.HeaderText}>{"Delayed Recall"}</Text>
          {symptomsList6.map((symptom, index) => (
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
          <Text style={styles.HeaderText}>{"Orientation"}</Text>
          {symptomsList7.map((symptom, index) => (
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

export default Step2;

// import React from "react";
// import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
// import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
// import { NavStatelessComponent } from "interfaces";
// import { styles } from "./Steep2.styles";
// // import navigationOptions from './Athlete.navigationOptions';
// import * as WebBrowser from "expo-web-browser";
// import { Colors } from "style";
// const Step2: NavStatelessComponent = () => {
//   const tableHead = ["", ""];
//   const symptoms = [
//     "Lying motionless on the playing surface",
//     "Balance / gait difficulties / motor incoordination: \nstumbling, slow /laboured movements",
//     "Disorientation or confusion, or an inability to\nrespond appropriatelyto questions",
//     "Blank or vacant look",
//     "Facial injury after head trauma",
//   ];

//   const tableData = Array(symptoms.length).fill(["Y", "N"]);

//   // const generateRandomHighlights = (numHighlights) => {
//   //     const highlights = [];
//   //     for (let i = 0; i < numHighlights; i++) {
//   //         const row = i;
//   //         const col = Math.floor(Math.random() * 3);
//   //         highlights.push({ row, col });
//   //     }
//   //     return highlights;
//   // };

//   //For 3 to 6

//   const generateRandomHighlights = (numHighlights) => {
//     const highlights = [];
//     for (let i = 0; i < numHighlights; i++) {
//       const row = i;
//       const col = Math.floor(Math.random() * 4) + 3; // Generates values between 3 and 6
//       highlights.push({ row, col });
//     }
//     return highlights;
//   };

//   const highlightCells = generateRandomHighlights(5);

//   const renderCell = (data, rowIndex, colIndex) => {
//     // const isHighlighted = highlightCells.some(
//     //     (cell) => cell.row === rowIndex && cell.col === colIndex
//     // );

//     var isHighlighted = false;
//     if (rowIndex === 0) {
//       if (data === "Y") {
//         isHighlighted = true;
//       } else {
//         isHighlighted = false;
//       }
//     } else if (rowIndex === 1) {
//       if (data === "N") {
//         isHighlighted = true;
//       } else {
//         isHighlighted = false;
//       }
//     } else {
//       if (data === "Y") {
//         isHighlighted = true;
//       } else {
//         isHighlighted = false;
//       }
//     }
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
//       <Text style={styles.StepText}>{"STEP 2: OBSERVABLE SIGNS"}</Text>
//       <ScrollView horizontal>
//         <ScrollView showsVerticalScrollIndicator={false}>
//           <View style={styles.symptomsAndTable}>
//             <View style={styles.symptomsContainer}>
//               {symptoms.map((symptom, index) => (
//                 <View key={index} style={{ height: 30, width: "100%", justifyContent: "center" }}>
//                   <Text style={styles.symptomText}>{symptom}</Text>
//                   <View style={{ height: 1, backgroundColor: "#d5deef" }}></View>
//                 </View>
//               ))}
//             </View>

//             <View style={styles.tableContainer}>
//               <Table borderStyle={{ borderWidth: 2, borderColor: "#FFF" }}>
//                 <Row
//                   data={tableHead}
//                   flexArr={[2, 2]}
//                   style={styles.header}
//                   textStyle={styles.headerText}
//                 />
//               </Table>
//               <Table borderStyle={{ borderWidth: 1, borderColor: "#FFFF" }}>
//                 {tableData.map((rowData, rowIndex) => (
//                   <TableWrapper key={rowIndex} style={styles.row} flexArr={[1, 1, 1, 1]}>
//                     {rowData.map((cellData, colIndex) => renderCell(cellData, rowIndex, colIndex))}
//                   </TableWrapper>
//                 ))}
//               </Table>
//             </View>
//           </View>
//         </ScrollView>
//       </ScrollView>
//       <View>
//         <TouchableOpacity
//           // onPress={handleNext}
//           // disabled={currentStep === labels.length - 1}
//           style={{
//             backgroundColor: "green",
//             padding: 10,
//             borderRadius: 5,
//             marginTop:30
//           }}
//         >
//           <Text style={{ color: "#ffffff", fontSize: 25, textAlign: "center" }}>Call 911</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           // onPress={}
//           // disabled={currentStep === labels.length - 1}
//           style={{
//             backgroundColor: Colors.orange,
//             padding: 10,
//             borderRadius: 5,
//             marginTop:30
//           }}
//         >
//           <Text style={{ color: "#ffffff", fontSize: 25, textAlign: "center" }}>
//             Upload Video or Image
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// // Step2.navigationOptions = navigationOptions;

// export default Step2;
