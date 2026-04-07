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
import React, { useRef, useState } from "react";
import { NavStatelessComponent } from "interfaces";
import navigationOptions from "./FamilyTranscript.navigationOptions";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "style";
import RBSheet from "react-native-raw-bottom-sheet";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const FamilyTranscript: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef<any>(null);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [dob, setDOB] = useState("");
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const [dateOfInjury, setDateOfInjury] = useState("");
  const [isDatePickerVisibleDOI, setDatePickerVisibleDOI] = useState(false);

  const players = [
    {
      id: 1,
      name: "John Doe",
      teamNumber: 15,
      onField: true,
      injured: false,
      skills: ["Dribbling", "Passing", "Shooting"],
    },
    {
      id: 2,
      name: "James Smith",
      teamNumber: 16,
      onField: true,
      injured: false,
      skills: ["Tackling", "Passing", "Speed"],
    },
    {
      id: 3,
      name: "Robert Johnson",
      teamNumber: 169,
      onField: true,
      injured: false,
      skills: ["Heading", "Shooting", "Defense"],
    },
    {
      id: 4,
      name: "Michael Brown",
      onField: true,
      teamNumber: 186,
      injured: true,
      skills: ["Passing", "Dribbling"],
    },
    {
      id: 5,
      name: "William Jones",
      onField: true,
      teamNumber: 163,
      injured: false,
      skills: ["Dribbling", "Speed", "Shooting"],
    },
    {
      id: 6,
      name: "David Garcia",
      onField: true,
      injured: false,
      teamNumber: 94,
      skills: ["Tackling", "Defense", "Strength"],
    },
    {
      id: 7,
      name: "Richard Miller",
      onField: true,
      teamNumber: 114,
      injured: false,
      skills: ["Speed", "Dribbling"],
    },
    {
      id: 8,
      name: "Joseph Wilson",
      onField: true,
      teamNumber: 58,
      injured: false,
      skills: ["Shooting", "Tackling"],
    },
    {
      id: 9,
      name: "Charles Moore",
      onField: true,
      teamNumber: 72,
      injured: false,
      skills: ["Passing", "Defense"],
    },
    {
      id: 10,
      name: "Thomas Taylor",
      onField: true,
      teamNumber: 74,
      injured: false,
      skills: ["Speed", "Shooting", "Passing"],
    },
    {
      id: 11,
      name: "Daniel Anderson",
      onField: true,
      teamNumber: 63,
      injured: true,
      skills: ["Shooting", "Dribbling"],
    },
    {
      id: 12,
      name: "Matthew Thomas",
      onField: true,
      teamNumber: 90,
      injured: false,
      skills: ["Passing", "Defense"],
    },
    {
      id: 13,
      name: "Anthony Jackson",
      onField: true,
      teamNumber: 12,
      injured: false,
      skills: ["Strength", "Shooting"],
    },
    {
      id: 14,
      name: "Mark White",
      onField: true,
      teamNumber: 109,
      injured: false,
      skills: ["Tackling", "Passing"],
    },
    {
      id: 15,
      name: "Donald Harris",
      onField: true,
      teamNumber: 136,
      injured: false,
      skills: ["Speed", "Dribbling"],
    },
    {
      id: 16,
      name: "Steven Clark",
      onField: true,
      teamNumber: 172,
      injured: false,
      skills: ["Passing", "Shooting"],
    },
  ];

  const familyTree = [
    {
      image: "https://randomuser.me/api/portraits/men/43.jpg",
      name: "John Doe",
      relation: "Father",
      mobile: "123-456-7890",
    },
    {
      image: "https://randomuser.me/api/portraits/women/53.jpg",
      name: "Jane Doe",
      relation: "Mother",
      mobile: "987-654-3210",
    },
    {
      image: "https://randomuser.me/api/portraits/women/50.jpg",
      name: "Emily Doe",
      relation: "Sister",
      mobile: "555-123-4567",
    },
    {
      image: "https://randomuser.me/api/portraits/men/59.jpg",
      name: "Mark Doe",
      relation: "Brother",
      mobile: "555-987-6543",
    },
    {
      image: "https://randomuser.me/api/portraits/women/14.jpg",
      name: "Alice Doe",
      relation: "Grandmother",
      mobile: "111-222-3333",
    },
    {
      image: "https://randomuser.me/api/portraits/men/55.jpg",
      name: "George Doe",
      relation: "Grandfather",
      mobile: "444-555-6666",
    },
    {
      image: "https://www.hmc.edu/mathematics/wp-content/uploads/sites/49/2023/01/faculty-gu.jpg",
      name: "Weiqing Gu",
      relation: "Friend",
      mobile: "909-373-7968",
    },
  ];

  return (
    <View style={styles.mainView}>
      <ScrollView
        style={styles.playerList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Text style={{
          fontSize:18
        }}>
          A Sweet Celebration of Victory After winning his football game, a young boy excitedly
          shares his victory with his loving grandmother. He recounts scoring a goal, assisting the
          winning shot, and hearing the crowd cheer for him. Proud of his teamwork and effort, his
          grandmother praises him and suggests celebrating with her famous chocolate chip cookies.
          As they bake together, he continues to share his excitement, making the moment even
          sweeter.
        </Text>
      </ScrollView>
    </View>
  );
};

FamilyTranscript.navigationOptions = navigationOptions();

export default FamilyTranscript;

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
