import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser";
import { emilyUrl } from 'constant/urls';
import { NavStatelessComponent } from 'interfaces';
import navigationOptions from './TalkAi.navigationOptions';


const TalkAi:NavStatelessComponent = () => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}> 
      {/* <Text>TalkAi</Text> */}
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
    </View>
  )
}
TalkAi.navigationOptions = navigationOptions();

export default TalkAi