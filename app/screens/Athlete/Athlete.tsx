import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { styles } from './Athlete.styles';
import { NavStatelessComponent } from 'interfaces';
import navigationOptions from './Athlete.navigationOptions';
import { useNavigation } from '@react-navigation/native';
import { navigate } from 'navigation';
import { Colors, Font } from 'style';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from "expo-web-browser";
import { emilyUrl } from 'constant/urls';


const Athlete: NavStatelessComponent = () => {
    const navigation = useNavigation();
    const navigator = navigate(navigation);
    const tableHead = ['None', 'Mild', 'Moderate', 'Severe'];
    const symptoms = [
        'Headache',
        'Pressure in head',
        'Neck Pain',
        'Nausea/vomiting',
        'Dizziness',
        'Blurred vision',
        'Balance problems',
        'Sensitivity to light',
        'Sensitivity to noise',
        'Slowed down',
        'Feeling in a fog',
        'Don’t feel right',
        'Hard to focus',
        'Hard to remember',
        'Fatigue/low energy',
        'Confusion',
        'Drowsiness',
        'More emotional',
        'Irritability',
        'Sadness',
        'Nervous/Anxious',
        'Trouble Sleeping',
    ];

    const tableData = Array(symptoms.length).fill([0, 1, 2, 3, 4, 5, 6]);

    // const generateRandomHighlights = (numHighlights) => {
    //     const highlights = [];
    //     for (let i = 0; i < numHighlights; i++) {
    //         const row = i; 
    //         const col = Math.floor(Math.random() * 3);   
    //         highlights.push({ row, col });
    //     }
    //     return highlights;
    // };

    //For 3 to 6

    const generateRandomHighlights = (numHighlights) => {
        const highlights = [];
        for (let i = 0; i < numHighlights; i++) {
            const row = i;
            const col = Math.floor(Math.random() * 4) + 3;  // Generates values between 3 and 6
            highlights.push({ row, col });
        }
        return highlights;
    };

    const highlightCells = generateRandomHighlights(22);

    const renderCell = (data, rowIndex, colIndex) => {
        const isHighlighted = highlightCells.some(
            (cell) => cell.row === rowIndex && cell.col === colIndex
        );

        return (
            <View
                style={[
                    styles.cell,
                    isHighlighted && styles.highlightCell,
                ]}
            >
                <Text style={styles.text}>{data}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center", marginTop: '5%' }}>
                <TouchableOpacity
                    onPress={() => {
                        WebBrowser.openBrowserAsync(emilyUrl);
                    }}
                >
                    <Image
                        style={{ height: 90, width: 80, resizeMode: "cover" }}
                        source={require("../../../assets/images/Emily.png")}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView horizontal>
                <View style={styles.rowContainer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.symptomsAndTable}>
                            <View style={styles.symptomsContainer}>
                                {symptoms.map((symptom, index) => (
                                    <View key={index} style={{ height: 30 }}>
                                        <Text style={styles.symptomText}>{symptom}</Text>
                                        <View style={{ height: 1, backgroundColor: '#d5deef' }}></View>
                                    </View>
                                ))}
                            </View>

                            <View style={styles.tableContainer}>
                                <Table borderStyle={{ borderWidth: 2, borderColor: '#FFF' }}>
                                    <Row
                                        data={tableHead}
                                        flexArr={[1, 2, 2, 2]}
                                        style={styles.header}
                                        textStyle={styles.headerText}
                                    />
                                </Table>
                                <Table borderStyle={{ borderWidth: 1, borderColor: '#FFFF' }}>
                                    {tableData.map((rowData, rowIndex) => (
                                        <TableWrapper
                                            key={rowIndex}
                                            style={styles.row}
                                            flexArr={[1, 1, 1, 1]}
                                        >
                                            {rowData.map((cellData, colIndex) =>
                                                renderCell(cellData, rowIndex, colIndex)
                                            )}
                                        </TableWrapper>
                                    ))}
                                </Table>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
};

Athlete.navigationOptions = navigationOptions;

export default Athlete;


