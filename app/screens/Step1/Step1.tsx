import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useMemo,useState } from "react";
import { styles } from "./Steep1.styles";
import * as WebBrowser from "expo-web-browser";
import { emilyUrl } from "constant/urls";
import AxiosHelper from "utils/AxiosHelper";
import StorageHelper from "utils/StorageHelper";

const Step1 = () => {
  let symptoms = [
    { text: "What is the year, season, date, day, and month?", c1: "Y", c2: "N" },
    { text: "Where are we (state, county, town/city, hospital/clinic, floor)? ", c1: "Y", c2: "N" },
  ];
  const [symptomsList, setSymptomsList] = useState([]);
  const [symptomsList1, setSymptomsList1] = useState([]);
  const [symptomsList2, setSymptomsList2] = useState([]);
  const [symptomsList3, setSymptomsList3] = useState([]);
  const [symptomsList4, setSymptomsList4] = useState([]);

  

  let symptoms1 = [
    {
      text: "Name three objects (e.g., apple, table, penny) and ask the patient to repeat them.",
      c1: "Y",
      c2: "N",
    },
  ];
  let symptoms2 = [
    {
      text: "Serial sevens: Subtract 7 from 100 and continue backward (100, 93, 86, etc.). ",
      c1: "Y",
      c2: "N",
    },
    { text: 'Spell "WORLD" backward.', c1: "Y", c2: "N" },
  ];
  let symptoms3 = [
    { text: "Ask the patient to recall the three objects mentioned earlier.", c1: "Y", c2: "N" },
  ];
  let symptoms4 = [
    { text: "Name a common object (e.g., a watch or a pen).", c1: "Y", c2: "N" },
    { text: "Repeat the phrase: 'No ifs, ands, or buts'", c1: "Y", c2: "N" },
    {
      text:
        "Follow a three-step command (e.g., 'Take this paper in your right hand, fold it in half, and put it on the table.').",
      c1: "Y",
      c2: "N",
    },
    { text: "Write a sentence of their choice.", c1: "Y", c2: "N" },
    { text: "Copy a drawing of intersecting pentagons.", c1: "Y", c2: "N" },
  ];

  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = async () => {
    const emailId = await StorageHelper.getItem('emailId');
    AxiosHelper.get(
    `/api/eldercare/getassesment/?questionset=eldercare-page1&email=${emailId}`
    )
      .then(async (response) => {

        console.log("response",response.data);

        symptoms[0].result = response?.data?.interactions?.[1]?.score ?? 2;
        symptoms[1].result = response?.data?.interactions?.[2]?.score ?? 2;

        symptoms1[0].result = response?.data?.interactions?.[3]?.score ?? 2;

        symptoms2[0].result = response?.data?.interactions?.[4]?.score ?? 2;
        symptoms2[1].result = response?.data?.interactions?.[5]?.score ?? 2;

        symptoms3[0].result = response?.data?.interactions?.[6]?.score ?? 2;

        symptoms4[0].result = response?.data?.interactions?.[7]?.score ?? 2;
        symptoms4[1].result = response?.data?.interactions?.[8]?.score ?? 2;
        symptoms4[2].result = response?.data?.interactions?.[9]?.score ?? 2;
        symptoms4[3].result = response?.data?.interactions?.[10]?.score ?? 2;
        symptoms4[4].result = response?.data?.interactions?.[11]?.score ?? 2;


        setSymptomsList(symptoms);
        setSymptomsList1(symptoms1);
        setSymptomsList2(symptoms2);
        setSymptomsList3(symptoms3);
        setSymptomsList4(symptoms4);

        console.log("response?.data?.summary_text",response?.data?.summary_text);

         await StorageHelper.setItem('Step1_summary', response?.data?.summary_text ?? 'No Summary');

      })
      .catch((err) => {
        setSymptomsList(symptoms);
        setSymptomsList1(symptoms1);
        setSymptomsList2(symptoms2);
        setSymptomsList3(symptoms3);
        setSymptomsList4(symptoms4);
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
              `${emilyUrl}/?questionset=eldercare-page1&email=${emailId}`
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
      <Text style={styles.StepText}>{"STEP 1: Mini-Mental State Examination (MMSE)"}</Text>
      <ScrollView>
        <View style={styles.symptomsContainer}>
          <View style={{ height: 20 }} />
          <Text style={styles.HeaderText}>{"Orientation"}</Text>
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
          <Text style={styles.HeaderText}>{"Registration"}</Text>
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
          <Text style={styles.HeaderText}>{"Attention and Calculation"}</Text>
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

          <Text style={styles.HeaderText}>{"Recall"}</Text>
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

          <View style={{ height: 50 }} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Step1;

// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
// import { Colors } from "style";
// import * as WebBrowser from "expo-web-browser";
// import { Checkbox } from "react-native-paper";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// const Stap1 = () => {
//   return (
//     <View>
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

//       <Text style={styles.StepText}>{"STEP 1: RED FLAGS"}</Text>
//       <View style={styles.container}>
//         <Text style={styles.title}>RED FLAGS:</Text>
//         <View style={styles.listContainer}>
//           <View style={styles.listColumn}>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Icon
//                 name="checkbox-blank-outline"
//                 size={20}
//                 color="#fdf7f0"
//                 style={styles.checkIcon}
//               />

//               <Text style={styles.listItem}>{`Neck pain or tenderness`}</Text>
//             </View>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Icon
//                 name="checkbox-blank-outline"
//                 size={20}
//                 color="#fdf7f0"
//                 style={styles.checkIcon}
//               />
//               <Text style={styles.listItem}>{`Double vision`}</Text>
//             </View>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Icon
//                 name="checkbox-blank-outline"
//                 size={20}
//                 color="#fdf7f0"
//                 style={styles.checkIcon}
//               />
//               <Text
//                 style={styles.listItem}
//               >{`Weakness or tingling/burning in arms or \nlegs`}</Text>
//             </View>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Icon
//                 name="checkbox-blank-outline"
//                 size={20}
//                 color="#fdf7f0"
//                 style={styles.checkIcon}
//               />
//               <Text style={styles.listItem}>{`Severe or increasing headache`}</Text>
//             </View>
//           </View>
//           <View style={styles.listColumn}>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Icon
//                 name="checkbox-blank-outline"
//                 size={20}
//                 color="#fdf7f0"
//                 style={styles.checkIcon}
//               />
//               <Text style={styles.listItem}>{`Seizure or convulsion`}</Text>
//             </View>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Icon
//                 name="checkbox-blank-outline"
//                 size={20}
//                 color="#fdf7f0"
//                 style={styles.checkIcon}
//               />
//               <Text style={styles.listItem}>{`Loss of consciousness`}</Text>
//             </View>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Icon
//                 name="checkbox-blank-outline"
//                 size={20}
//                 color="#fdf7f0"
//                 style={styles.checkIcon}
//               />
//               <Text style={styles.listItem}>{`Deteriorating conscious state`}</Text>
//             </View>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Icon
//                 name="checkbox-marked"
//                 size={20}
//                 color="#fdf7f0"
//                 style={styles.checkIcon}
//               />
//               <Text style={styles.listItem}>{`Vomiting`}</Text>
//             </View>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Icon
//                 name="checkbox-blank-outline"
//                 size={20}
//                 color="#fdf7f0"
//                 style={styles.checkIcon}
//               />
//               <Text
//                 style={styles.listItem}
//               >{`Increasingly restless,agitated or combative`}</Text>
//             </View>
//           </View>
//         </View>
//       </View>

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
//           <Text style={{ color: "#ffffff", fontSize: 25, textAlign: "center" }}>Upload Video</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: Colors.orange,
//     padding: 20,
//     borderRadius: 8,
//     marginTop: "5%",
//   },
//   title: {
//     color: "#FFFFFF",
//     fontWeight: "bold",
//     fontSize: 18,
//     marginBottom: 10,
//     alignSelf: "center",

//   },
//   listContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//   },
//   listColumn: {
//     flex: 1,
//     marginRight: 10,
//   },
//   listItem: {
//     color: "#FFFFFF",
//     maxWidth:140,
//     // backgroundColor:'yellow',
//     fontSize: 13,
//     marginBottom: 8,
//     fontWeight: "bold",
//     flexWrap: "wrap",
//   },
//   listItemHighlight: {
//     color: "#FFFFFF",
//     fontSize: 14,
//     marginBottom: 8,
//     fontWeight: "bold",
//     flexWrap: "wrap",
//     borderColor: "black",
//     borderWidth: 2,
//   },
//   checkbox: {
//     tintColor: "yellow",
//   },
//   StepText: {
//     fontSize: 18,
//     color: "#313195",
//     fontWeight: "bold",
//     marginTop: "5%",
//   },
//   checkIcon: {
//     marginRight: 10,
//     borderRadius: 5,
//     overflow: "hidden",
//   },
// });

// export default Stap1;
