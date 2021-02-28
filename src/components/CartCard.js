import React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { Card, Text } from "react-native-paper";

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
    state
}) => {
    let formatDate = new Date(date);
    formatDate = formatDate.toLocaleDateString("th");

    let timeTitle;
    if (time === "morning") {
        timeTitle = "9.30-12.30";
    }
    if (time === "afternoon") {
        timeTitle = "13.30-16.30";
    }

    let colorHeader = "";
    if (state == "waiting") {
        colorHeader = "#fed27b";
    }
    if (state == "success") {
        colorHeader = "#51a7a1";
    }
    return (
        <Card style={styles.card}>
            <Card.Content>
                <Text>{date}</Text>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        borderColor: "#e8e8e8",
        borderWidth: 1
    }
});

export default CartCard;
