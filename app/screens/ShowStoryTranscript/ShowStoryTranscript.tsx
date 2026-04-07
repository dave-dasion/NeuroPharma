import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Linking,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { NavStatelessComponent } from "interfaces";
import navigationOptions from "./ShowStoryTranscript.navigationOptions";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "style";
import RBSheet from "react-native-raw-bottom-sheet";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AxiosHelper from "utils/AxiosHelper";
import StorageHelper from "utils/StorageHelper";

const ShowStoryTranscript: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef<any>(null);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [dob, setDOB] = useState("");
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const [dasionStory, setDasionStory] = useState([]);
  const [isDatePickerVisibleDOI, setDatePickerVisibleDOI] = useState(false);
  const route = useRoute();

  useEffect(() => {
    sendDataOverServer()
  }, [])



  const sendDataOverServer = async () => {
    console.log('callll..')
    const userData = {
      transcript: '',
    };

    const emailId = await StorageHelper.getItem("emailId");

    AxiosHelper.post(`api/eldercare/generate_story?email=${emailId}`, userData) // Make POST request to /users/create endpoint
      .then((response) => {
        console.log("response.data",response.data);
        setDasionStory(response.data.story);
        console.log("Data submitted successfully:", response?.data?.story);
      })
      .catch((err) => {
        console.log("Error occurred:", err);
      });
  };


  return (
    <View style={styles.mainView}>
      <ScrollView
        style={styles.playerList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* {dasionStory?.map((data) => {
          return ( */}
            <Text
              style={{
                marginTop: 10,
              }}
            >
              {dasionStory}
            </Text>
          {/* );
        })} */}
      </ScrollView>
    </View>
  );
};

ShowStoryTranscript.navigationOptions = navigationOptions();

export default ShowStoryTranscript;

const styles = StyleSheet.create({
  input1: {
    // flex:1,
    // backgroundColor:'red',
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    paddingLeft: 15,
    borderRadius: 5,
    fontSize: 15,
    fontWeight: "500",
  },
  input: {
    // flex:1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    paddingLeft: 15,
    borderRadius: 5,
    fontSize: 15,
    fontWeight: "500",
  },
  mainView: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.white,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    // width: "83%",
    marginTop: Platform.OS == "ios" ? 20 : 10,
    position: "absolute",
    top: "5%",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 10,
  },
  playerList: {
    // marginTop: "25%",
    width: "100%",
    // alignSelf: 'center',
  },
  playerItem: {
    margin: 2,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderRadius: 10,
  },
  playerName: {
    fontSize: 16,
    fontWeight: "800",
    marginLeft: 50,
  },
  playerSkills: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
    marginLeft: 50,
  },
  activePlayer: {},
  injuredPlayer: {
    color: "red",
  },
  texTeamContain: {
    // bottom:10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    // width: "30%",
    // right:'2%',
    // position: "absolute",
    // bottom: "9%",
    backgroundColor: Colors.AppColor,
    borderRadius: 10,
    marginBottom: 10,
    width: "95%",
  },
  texTeam: {
    fontSize: 18,
    fontWeight: "700",
    padding: 10,

    // marginLeft: 10,

    color: Colors.white,
  },
});
