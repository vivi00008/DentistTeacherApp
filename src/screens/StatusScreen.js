import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, Text, SafeAreaView, ImageBackground, RefreshControl } from "react-native";
import { Avatar } from "react-native-paper";
import styles from "../Styles";
import { Calendar, LocaleConfig } from "react-native-calendars";
import moment from "moment";
import { UserContext } from "../context/UserContext";
import cartApi from "../api/cartApi";
import CartCard from "../components/CartCard";
import { ScrollView } from "react-native-gesture-handler";

const StatusScreen = () => {
    const [markedDates, setMarkedDates] = useState();
    const [cartData, setCartData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [isSelectedDate, setIsSelectedDate] = useState(false);
    const [textSelect, setTextSelect] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    const user = useContext(UserContext);

    LocaleConfig.locales["th"] = {
        monthNames: [
            "มกราคม",
            "กุมภาพันธ์",
            "มีนาคม",
            "เมษายน",
            "พฤษภาคม",
            "มิถุนายน",
            "กรกฏาคม",
            "สิงหาคม",
            "กันยายน",
            "ตุลาคม",
            "พฤศจิกายน",
            "ธันวาคม",
        ],
        monthNamesShort: [
            "มกรา",
            "กุมภา",
            "มีนา",
            "เมษา",
            "พฤษภา",
            "มิถุ",
            "กรกฏา",
            "สิงหา",
            "กันยา",
            "ตุลา",
            "พฤศจิ",
            "ธันวา",
        ],
        dayNames: [
            "อาทิตย์",
            "จันทร์",
            "อังคาร",
            "พุธ",
            "พฤหัสบดี",
            "ศุกร์",
            "เสาร์",
        ],
        dayNamesShort: ["อา.", "จ.", "อ.", "พุธ.", "พฤ.", "ศ.", "เสา."],
    };
    LocaleConfig.defaultLocale = "th";

    const getSession = async () => {
        const response = await cartApi.get("/teacher/success", {
            headers: {
                Authorization: user.token,
            },
        });
        if (response.data.success) {
            setCartData(response.data.message);
        }
    };

    useEffect(() => {
        getSession();
    }, [refreshing]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
    }, []);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }

    const getSelectedDayEvents = (date) => {
        setFilterData([]);
        let markedDates = {};
        markedDates[date] = {
            selected: true,
            selectedColor: "#2ec4b6",
            textColor: "#FFFFFF",
        };
        setMarkedDates(markedDates);

        let serviceDate = moment(date);
        serviceDate = serviceDate.format("YYYY-MM-DD");

        let sessionData = cartData.filter((session) => {
            let dateItem = moment(session.session_docs.end);
            dateItem = dateItem.format("YYYY-MM-DD");
            return dateItem == date;
        });
        setFilterData(sessionData);
        console.log(filterData);
        setIsSelectedDate(true);

        if (sessionData.length == 0) {
            setTextSelect("ไม่พบช่วงตารางการนัดหมาย");
        }
        if (sessionData.length > 0) {
            setTextSelect("");
        }
    };

    return (
        <ImageBackground
            source={require("../../assets/picture/mainBg.png")}
            style={styles.root}
        >
            <SafeAreaView style={styles.bgContainer}>
                <Text style={styles.textHeader}>ตารางนัดหมาย</Text>
            </SafeAreaView>
            <View style={[styles.contentBg, { marginTop: 20 }]}>
                <View style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false} refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }>
                        <Calendar
                            current={Date.now()}
                            onDayPress={(date) =>
                                getSelectedDayEvents(date.dateString)
                            }
                            markedDates={markedDates}
                        />

                        {isSelectedDate ? (
                            <View>
                                <Text style={{fontFamily:"kanitRegular", fontSize:20, textAlign:'center', marginTop:20}}>{textSelect}</Text>
                                {filterData.map((e) => {
                                    return (
                                        <CartCard
                                            key={e._id}
                                            date={e.session_docs.end}
                                            name={e.user_docs.name}
                                            id={e.user_docs.username}
                                            roomType={e.floor_docs.name}
                                            time={e.session_docs.sessionInDay}
                                            seat={e.reservation.seats}
                                            showButton={false}
                                            cartId={e.id}
                                        />
                                    );
                                })}
                            </View>
                        ) : null}
                    </ScrollView>
                </View>
            </View>
        </ImageBackground>
    );
};

export default StatusScreen;
