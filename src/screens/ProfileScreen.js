import React, { useContext } from "react";
import {
    View,
    Text,
    SafeAreaView,
    ImageBackground,
    TouchableOpacity,
    Image
} from "react-native";
import styles from "../Styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { UserContext } from "../context/UserContext";
import { Avatar } from "react-native-paper";

const ProfileScreen = () => {
    const user = useContext(UserContext);
    const doLogout = () => {
        user.setIsAuth(false);
    };
    return (
        <ImageBackground
            source={require("../../assets/picture/mainBg.png")}
            style={styles.root}
        >
            <SafeAreaView style={styles.bgContainer}>
                <Text style={styles.textHeader}>โปรไฟล์</Text>
            </SafeAreaView>
            <View style={styles.contentBg}>
                <View style={styles.container}>
                    <Avatar.Icon
                        icon={require("../../assets/Icons/user.png")}
                        size={108}
                        style={styles.profileAvatar}
                        color="#80277f"
                    />
                    <View style={styles.profileName}>
                        <Text style={styles.nameText}>{user?.user?.name}</Text>
                        <Text style={[styles.nameText, { color: "#90428f" }]}>
                            {user?.user?.username}
                        </Text>
                    </View>
                    <View style={styles.rowView}>
                    <View style={styles.viewDetails}>
                        <Image
                            source={require("../../assets/Icons/envelope.png")}
                            style={[
                                styles.dentalChair,
                                { tintColor: "#80277f" },
                            ]}
                            resizeMode="stretch"
                        />
                    </View>
                    <Text style={styles.textDetail}>{user?.user?.email}</Text>
                </View>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={doLogout}
                    >
                        <Text style={styles.textButton}>ออกจากระบบ</Text>
                        <MaterialIcons
                            name="logout"
                            size={24}
                            style={styles.iconArrowRight}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

export default ProfileScreen;
