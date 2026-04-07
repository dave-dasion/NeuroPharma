import { Platform, StyleSheet } from "react-native";
import { Colors } from "style";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 1,
    },
    rowContainer: {
        flexDirection: 'row',
    },
    symptomsAndTable: {
        flexDirection: 'row',
    },
    symptomsContainer: {
        marginRight: 10,
        marginTop: '11%',
    },
    symptomText: {
        // marginTop:'-10',
        fontSize: 14,
    },
    tableContainer: {
        flex: 1,
    },
    header: {
        height: 30,
        width:260,
        backgroundColor: '#dadbda',
    },
    headerText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 13,
    },
    row: {
        flexDirection: 'row',
        backgroundColor: '#d5deef',
    },
    cell: {
        flex: 1,
        height: 30,
        // backgroundColor:'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFFF',
    },
    text: {
        textAlign: 'center',
    },
    highlightCell: {
        borderWidth:2,
        borderColor:'red'
        // backgroundColor:'red'
    },
});