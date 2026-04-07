import React, { useCallback, useRef, useState } from "react";
import { ScrollView, View, Image, TouchableOpacity, TextInput } from "react-native";
import { Text, StickersImage, Button } from "components";
import { t } from "utils";
import { NavStatelessComponent } from "interfaces";
import {
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import RBSheet from "react-native-raw-bottom-sheet";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./SupportUsScreen.styles";
import navigationOptions from "./SupportUsScreen.navigationOptions";
import { CardForm, CardField, confirmPayment } from "@stripe/stripe-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors } from "style";

const SupportUsScreen: NavStatelessComponent = () => {
  const bottomSheetModalRef = useRef<any>(null);
  const [amount, setAmount] = useState(1000);
  const [isShowInput, setIsShowInput] = useState(false);
  const [text, setText] = useState('');
  const handleChange = (inputText) => {
    setText(inputText);
  };

  const handlePayPress = async () => {
    // Gather the customer's billing information (for example, email)
    const billingDetails = {
      email: "jenny.rosen@example.com",
    };

    // Fetch the intent client secret from the backend
    const clientSecret =
      process.env.STRIPE_CLIENT_SECRET || "";

    // Confirm the payment with the card details
    const { paymentIntent, error } = await confirmPayment(clientSecret, {
      paymentMethodType: "Card",
      paymentMethodData: {
        billingDetails,
      },
    });

    if (error) {
      console.log("Payment confirmation error", error);
    } else if (paymentIntent) {
      console.log("Success from promise", paymentIntent);
    }
  };

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        opacity={0}
        style={{ backgroundColor: "transparent" }}
        // onPress={() => navigation.popToTop()}
        {...props}
      />
    ),
    []
  );

  const amounts = [
    { label: "$10", value: 1000 },
    { label: "$20", value: 2000 },
    { label: "$50", value: 5000 },
    { label: "$100", value: 8000 },
    { label: "Other", value: 9000 }
  ];


  const otherOption = (option, item) => {
    console.log(option, 'option#')
    if (item == 'Other') {
      setIsShowInput(true)
    } else {
      setIsShowInput(false)
    }
    setAmount(option)
  }
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <ScrollView style={styles.container}>
          <Image
            style={styles.appLogoStyle}
            source={require("../../../assets/images/support-us-illustration.jpg")}
          />
          <Text.H2 style={styles.title}>{t("SUPPORT_US_SCREEN_WHY_DONATE_TITLE")}</Text.H2>
          <Text.Secondary>
            Dasion, proudly backed by <Text.Primary style={styles.boldText}>NSF SBI </Text.Primary>
            continues to innovate in health-focused projects like ElderCare, even when they’re not
            yet financially sustainable.
          </Text.Secondary>
          <Text.Secondary style={{ top: 5 }}>
            Your support helps us cover essential costs like:
          </Text.Secondary>
          <Text.Secondary style={{ top: 5 }}>● Servers</Text.Secondary>
          <Text.Secondary style={{ top: 5 }}>● Domain names</Text.Secondary>
          <Text.Secondary style={{ top: 5 }}>● Software licenses</Text.Secondary>
          <Text.Secondary style={{ top: 5 }}>● Apple Developer accounts</Text.Secondary>
          <Text.Secondary style={{ top: 10 }}>
            If you believe in our mission to improve health monitoring and prevention, please
            consider donating a small amount to keep us moving forward!
          </Text.Secondary>

          {/* <Button.Primary
            style={{
              width: "100%",
              backgroundColor: Colors.AppColor,
              alignSelf: "center",
              // marginBottom:10
              marginTop: 30,
            }}
            onPress={() => {
              bottomSheetModalRef.current?.open();
            }}
            text="Donate"
          // color="black"
          /> */}

          <TouchableOpacity
                      onPress={() => {
                        bottomSheetModalRef.current?.open();
                      }}
                      style={{
                        width: "100%",
                        backgroundColor: Colors.AppColor,
                        alignSelf: "center",
                        borderRadius: 9999,
                        // marginBottom:10
                        marginTop: 30,
                      }}
                    >
                      <Text.H3
                        style={{
                          color: "black",
                          textAlign: "center",
                          padding: 12,
                          fontSize: 18,
                          fontWeight: "600",
                        }}
                      >
                        Donate
                      </Text.H3>
                    </TouchableOpacity>

          {/* <Text.Link url="https://data-to-decision.com/" style={styles.paragraph}>
        Donate
      </Text.Link> */}

          <RBSheet
            ref={bottomSheetModalRef}
            draggable={false}
            customStyles={{
              wrapper: {
                backgroundColor: "rgba(0, 0, 0, 0.4)",
              },
              container: {
                borderRadius: 10,
              },
            }}
            height={550}
          >
            <View
              style={
                {
                  // flex: 1,
                  // alignItems: "center",
                  // padding: 20
                }
              }
            >
              <View
                style={{
                  height: 50,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.18,
                  shadowRadius: 1.0,

                  elevation: 1,
                }}
              >
                <Text.H1 style={{ alignSelf: "center" }}>Donate</Text.H1>
              </View>
              <View style={{ height: 20 }} />
              {/* <CardField
                postalCodeEnabled={true}
                placeholders={{
                  number: "4242 4242 4242 4242",
                }}
                cardStyle={{
                  backgroundColor: "#FFFFFF",
                  textColor: "#000000",
                  borderWidth:1
                }}
                style={{
                  width: "90%",
                  height: 50,
                  marginVertical: 30,
                  
                }}
                onCardChange={(cardDetails) => {
                  // setCard(cardDetails);
                }}
                onFocus={(focusedField) => {
                  console.log("focusField", focusedField);
                }}
              /> */}
              <View
                style={{
                  // flex: 1,
                  // alignItems: "center",
                  padding: 20,
                }}
              >
                <CardForm
                  placeholders={{
                    number: "4242 4242 4242 4242",
                  }}
                  onFormComplete={(cardDetails) => {
                    console.log("card details", cardDetails);
                    // setCardDetails(cardDetails)
                  }}
                  style={{
                    height: 200,
                    justifyContent: "center",
                    alignItems: "center",
                    // textAlign: "center",
                  }}
                  cardStyle={{
                    backgroundColor: "#efefefef",
                    // textAlign: "center",
                    textColor: "pink",
                  }}
                />

                {/* <View style={{ height: 5 }} /> */}

                <View
                  style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 20 }}
                >
                  {amounts.map((item) => (
                    <>
                      <TouchableOpacity
                        key={item.value}
                        onPress={() => otherOption(item.value, item.label)}
                        style={{
                          borderWidth: 2,
                          borderColor: amount === item.value ? Colors.secondary : Colors.black, // Change color based on selection
                          padding: 6,
                          borderRadius: 5,
                          backgroundColor: "white",
                          width: 60,
                          alignItems: "center",
                        }}
                      >
                        <Text.Secondary>{item.label}</Text.Secondary>
                      </TouchableOpacity>
                    </>
                  ))}
                </View>
                {isShowInput &&
                  <>
                    <View style={styles.passwordContainer}>
                      <TextInput
                        style={styles.input}
                        onChangeText={handleChange}  
                        value={text}
                        placeholder="Enter Amount...."
                        keyboardType="number-pad"
                      />
                      <View
                        // onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                        style={styles.dollarSign}
                      >
                        <Text.Primary>{'$'}</Text.Primary>
                        {/* <Icon name={"usd"} size={20} color="#888" /> */}
                      </View>
                    </View>

                  </>
                }

                <Button.Primary
                  style={{
                    width: "100%",
                    alignSelf: "center",
                    marginBottom: 10,
                    backgroundColor: "green",
                  }}
                  onPress={() => {
                    bottomSheetModalRef.current?.close();
                    // handlePayPress()
                  }}
                  text="Submit"
                // color="black"
                />
                <Button.Primary
                  style={{
                    width: "100%",
                    alignSelf: "center",
                    marginBottom: 10,
                    backgroundColor: "red",
                  }}
                  onPress={() => {
                    bottomSheetModalRef.current?.close();
                    // handlePayPress()
                  }}
                  text="Cancel"
                // color="black"
                />
              </View>
            </View>
          </RBSheet>
          {/* <BottomSheetModal
          
            // conta
            backdropComponent={renderBackdrop} //add this

            ref={bottomSheetModalRef}
          // onChange={handleSheetChanges}
          >
            <BottomSheetView
              style={{
                flex: 1,
                alignItems: "center",
              }}
            >
              <Text.H1>Donate</Text.H1>

              <CardField
                postalCodeEnabled={true}
                placeholder={{
                  number: "4242 4242 4242 4242",
                }}
                cardStyle={{
                  backgroundColor: "#FFFFFF",
                  textColor: "#000000",
                }}
                style={{
                  width: "90%",
                  height: 50,
                  marginVertical: 30,
                }}
                onCardChange={(cardDetails) => {
                  // setCard(cardDetails);
                }}
                onFocus={(focusedField) => {
                  console.log("focusField", focusedField);
                }}
              />

              <View style={{ height: 20 }} />

              <Button.Primary
                style={{
                  width: "90%",
                  alignSelf: "center",
                  marginBottom: 10,
                  backgroundColor: "red",
                }}
                onPress={() => {
                  bottomSheetModalRef.current?.dismiss();
                  // handlePayPress()
                }}
                text="Cancel"
              // color="black"
              />
            </BottomSheetView>
          </BottomSheetModal> */}

          <View style={styles.separator} />
        </ScrollView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

SupportUsScreen.navigationOptions = navigationOptions;

export default SupportUsScreen;
