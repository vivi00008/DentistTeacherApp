import React, { useState, useContext } from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
} from "react-native";
import { Card, Text, Dialog, Portal } from "react-native-paper";
import cartApi from "../api/cartApi";
import {UserContext} from '../context/UserContext'

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const CartCard = ({
    name,
    id,
    teacherName,
    roomType,
    date,
    seat,
    time,
    state,
    cartId,
    isConfirm
}) => {
    const [visible, setVisible] = useState(false);
    const [textDialog, setTextDialog] = useState("");

    const user = useContext(UserContext)

    const showDialog = (text) => {
        setTextDialog(text);
        setVisible(true);
    };

    const hideDialog = () => setVisible(false);

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    let formatDate = new Date(date);

    let day = days[formatDate.getDay()];
    let month = months[formatDate.getMonth()];
    let dateTime = formatDate.getDate();

    let timeTitle;
    if (time === "morning") {
        timeTitle = "9.30-12.30";
    }
    if (time === "afternoon") {
        timeTitle = "13.30-16.30";
    }

    const doConfirm = async () => {
        if (textDialog === "อนุมัติ") {
            const response = await cartApi.get("/teacher/confirm/" + cartId, {
                headers: {
                    Authorization: user.token,
                },
            });
            console.log(response.data)
            isConfirm()
        }
        if (textDialog === "ไม่อนุมัติ"){
            const response = await cartApi.get("/teacher/unconfirm/" + cartId, {
                headers: {
                    Authorization: user.token,
                },
            })
            console.log(response.data)
            isConfirm()
        }
        hideDialog();
    };

    const doCancel = () => {
        hideDialog();
    };
    return (
        <Card style={styles.card}>
            <Card.Content style={styles.header}>
                <Text style={styles.textHeaderCard}>{name}</Text>
                <Text style={styles.textHeaderCard}>ID : {id}</Text>
            </Card.Content>
            <Card.Content>
                <View style={styles.row}>
                    <View style={styles.viewDetails}>
                        <Image
                            source={require("../../assets/Icons/grid.png")}
                            style={[
                                styles.dentalChair,
                                { tintColor: "#80277f" },
                            ]}
                            resizeMode="stretch"
                        />
                    </View>
                    <Text style={styles.textDetail}>{roomType}</Text>
                </View>
                <View style={styles.row}>
                    <View style={styles.viewDetails}>
                        <Image
                            source={require("../../assets/Icons/clock.png")}
                            style={[
                                styles.dentalChair,
                                { tintColor: "#80277f" },
                            ]}
                            resizeMode="stretch"
                        />
                    </View>
                    <Text style={[styles.textDetail, { color: "red" }]}>
                        {day}, {month} {dateTime} {"\n"}
                        {timeTitle}
                    </Text>
                </View>
                <View style={styles.row}>
                    <View style={styles.viewDetails}>
                        <Image
                            source={require("../../assets/Icons/dentist-chair.png")}
                            style={[
                                styles.dentalChair,
                                { tintColor: "#80277f" },
                            ]}
                            resizeMode="stretch"
                        />
                    </View>
                    <Text style={styles.textDetail}>{seat}</Text>
                </View>
            </Card.Content>
            <View
                style={[
                    styles.row,
                    { justifyContent: "space-around", marginVertical: 10 },
                ]}
            >
                <TouchableOpacity
                    style={styles.unConfirmBtn}
                    onPress={() => showDialog("ไม่อนุมัติ")}
                >
                    <Image
                        source={require("../../assets/Icons/close.png")}
                        resizeMode="stretch"
                        style={{
                            width: WIDTH / 20,
                            height: HEIGHT / 40,
                            marginHorizontal: 12,
                            tintColor: "#2ec4b6",
                        }}
                    />
                    <Text style={[styles.textBtn, { color: "#2ec4b6" }]}>
                        ไม่อนุมัติ
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.confirmBtn}
                    onPress={() => showDialog("อนุมัติ")}
                >
                    <Text style={[styles.textBtn, { color: "white" }]}>
                        อนุมัติ
                    </Text>
                </TouchableOpacity>
            </View>

            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Content style={styles.contentModal}>
                        <Text style={styles.textModel}>
                            คุณยืนยันว่า '{textDialog}' {"\n"}
                            การจองนี้ใช่หรือไม่
                        </Text>
                    </Dialog.Content>
                    <View
                        style={[
                            styles.row,
                            {
                                justifyContent: "space-around",
                                marginVertical: 10,
                            },
                        ]}
                    >
                        <TouchableOpacity
                            style={styles.unConfirmBtn}
                            onPress={() => doCancel()}
                        >
                            <Text
                                style={[styles.textBtn, { color: "#2ec4b6" }]}
                            >
                                ยกเลิก
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.confirmBtn}
                            onPress={() => doConfirm()}
                        >
                            <Text style={[styles.textBtn, { color: "white" }]}>
                                ยืนยัน
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Dialog>
            </Portal>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        borderColor: "#e8e8e8",
        borderWidth: 1,
    },
    textHeaderCard: {
        fontFamily: "kanitRegular",
    },
    header: {
        backgroundColor: "#fed27b",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
    },
    viewDetails: {
        backgroundColor: "#f4e7f4",
        padding: 8,
        width: WIDTH / 8,
        height: HEIGHT / 18,
        marginVertical: 12,
    },
    textDetail: {
        fontFamily: "kanitRegular",
        fontSize: 14,
        marginLeft: 18,
    },
    dentalChair: {
        width: WIDTH / 15,
        height: HEIGHT / 30,
        alignSelf: "center",
        justifyContent: "center",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    unConfirmBtn: {
        borderColor: "#69d2c8",
        borderWidth: 1,
        height: HEIGHT / 17,
        alignItems: "center",
        justifyContent: "center",
        width: WIDTH / 2.7,
        borderRadius: 8,
        flexDirection: "row",
    },
    confirmBtn: {
        borderColor: "#69d2c8",
        borderWidth: 1,
        height: HEIGHT / 17,
        alignItems: "center",
        justifyContent: "center",
        width: WIDTH / 2.7,
        borderRadius: 8,
        backgroundColor: "#2ec4b6",
    },
    textBtn: {
        fontSize: 16,
        fontFamily: "kanitRegular",
    },
    contentModal: {
        justifyContent: "center",
        alignItems: "center",
    },
    textModel: {
        fontFamily: "kanitRegular",
        fontSize: 18,
        textAlign: "center",
    },
    modalBtn: {
        flexDirection: "row",
    },
});

export default CartCard;
