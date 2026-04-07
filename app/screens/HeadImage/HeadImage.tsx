import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser";
import { emilyUrl } from 'constant/urls';
import { NavStatelessComponent } from 'interfaces';
import navigationOptions from './HeadImage.navigationOptions';


const HeadImage: NavStatelessComponent = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* <Text>TalkAi</Text> */}
            <View style={{ alignItems: "center", marginTop: '5%' }}>

                <Image
                    style={{ height:400, resizeMode: "contain" }}
                    source={require("../../../assets/images/headImage1.jpg")}
                />

            </View>
        </View>
    )
}
HeadImage.navigationOptions = navigationOptions();

export default HeadImage