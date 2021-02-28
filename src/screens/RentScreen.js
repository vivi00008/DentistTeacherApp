import React, { useEffect, useState, useContext } from "react";
import { View, Text, SafeAreaView, ImageBackground } from "react-native";
import { Avatar } from "react-native-paper";
import styles from "../Styles";
import cartApi from "../api/cartApi";
import { UserContext } from "../context/UserContext";
import CartCard from "../components/CartCard";
import { ScrollView } from "react-native-gesture-handler";

const RentScreen = () => {
    const [cartData, setCartData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const user = useContext(UserContext);

    const getCartData = async () => {
        setIsLoading(false);
        const response = await cartApi.get("/teacher", {
            headers: {
                Authorization: user.token
            }
        });
        if (response.data.success) {
            console.log(response.data.message);
            setCartData(response.data.message);
            setIsLoading(true);
        }
    };

    useEffect(() => {
        getCartData();
    }, []);

    return isLoading ? (
        <ImageBackground
            source={require("../../assets/picture/mainBg.png")}
            style={styles.root}
        >
            <SafeAreaView style={styles.bgContainer}>
                <Text style={styles.textHeader}>
                    คุณเช็คคำร้อง{"\n"}จองห้องหรือยัง?
                </Text>
            </SafeAreaView>

            <View style={styles.contentBg}>
                <Avatar.Image
                    size={108}
                    source={require("../../assets/picture/dental-care.png")}
                    style={styles.iconContent}
                />
                <View style={styles.container}>
                    <View style={styles.rentContent}>
                        <ScrollView>
                            {cartData.map((e) => {
                                const date = new Date(e.session_docs.end);
                                return (
                                    <CartCard
                                        date={date.toLocaleDateString()}
                                    />
                                );
                            })}
                        </ScrollView>
                    </View>
                </View>
            </View>
        </ImageBackground>
    ) : null;
};

export default RentScreen;
