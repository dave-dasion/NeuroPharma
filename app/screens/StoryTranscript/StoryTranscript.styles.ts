import { Dimensions, StyleSheet } from "react-native";

import { Layout as ConstantsLayout } from "constant";
import { Colors, Font, Layout } from "style";
const Height = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#f4f4f4',
  },
  itemContainer: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  sceneContainer: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 10,
  },
  dialogueContainer: {
    backgroundColor: '#d1f0ff',
    padding: 15,
    borderRadius: 10,
    marginLeft: 30,
  },
  sceneText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dialogueText: {
    fontSize: 16,
    color: '#333',
    fontStyle: 'italic',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
    textAlign: 'right',
  },
});
