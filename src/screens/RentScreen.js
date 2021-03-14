import React, { useEffect, useState, useContext, useCallback } from "react";
import {
    View,
    Text,
    SafeAreaView,
    ImageBackground,
    RefreshControl,
} from "react-native";
import { Avatar } from "react-native-paper";
import styles from "../Styles";
import cartApi from "../api/cartApi";
import { UserContext } from "../context/UserContext";
import CartCard from "../components/CartCard";
import { ScrollView } from "react-native-gesture-handler";

const RentScreen = () => {
    const [cartData, setCartData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const user = useContext(UserContext);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
    }, []);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }

    const getCartData = async () => {
        setIsLoading(false);
        const response = await cartApi.get("/teacher/waiting", {
            headers: {
                Authorization: user.token,
            },
        });
        if (response.data.success) {
            setCartData(response.data.message);
            setIsLoading(true);
        }
    };

    useEffect(() => {
        getCartData();
        setConfirm(false);
    }, [confirm, refreshing]);

    return (
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
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View style={styles.container}>
                        <View style={styles.rentContent}>
                            {cartData.length == 0 ?(<Text style={{textAlign:'center', fontFamily:"kanitRegular", fontSize:24, marginTop:20}}>ไม่พบข้อมูลการจอง</Text>) : null}
                            {isLoading
                                ? cartData.map((e) => {
                                      const date = new Date(e.session_docs.end);
                                      return (
                                          <CartCard
                                              key={e._id}
                                              date={date}
                                              name={e.user_docs.name}
                                              id={e.user_docs.username}
                                              roomType={e.floor_docs.name}
                                              time={e.session_docs.sessionInDay}
                                              seat={e.reservation.seats}
                                              cartId={e.id}
                                              showButton={true}
                                              isConfirm={() => setConfirm(true)}
                                          />
                                      );
                                  })
                                : null}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

export default RentScreen;
