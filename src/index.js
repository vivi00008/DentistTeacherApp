import React from "react";
import { NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider as PaperProvider } from "react-native-paper";
import RentScreen from "./screens/RentScreen"
import StatusScreen from "./screens/StatusScreen"
import ProfileScreen from "./screens/ProfileScreen"
import FeatherIcon from "react-native-vector-icons/Feather"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const RentStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Rent"
            screenOptions={{
                headerStyle: { backgroundColor: "#AA52A9" },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontFamily: "kanitRegular",
                },
            }}
        >
            <Stack.Screen
                name="Rent"
                component={RentScreen}
                options={{ title: "หน้าหลัก", headerShown: false }}
            />
        </Stack.Navigator>
    );
};

const StatusStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Status"
            screenOptions={{
                headerStyle: { backgroundColor: "#AA52A9" },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontFamily: "kanitRegular",
                },
            }}
        >
            <Stack.Screen
                name="Status"
                component={StatusScreen}
                options={{ title: "สถานะ", headerShown:false }}
            />
        </Stack.Navigator>
    );
};

const ProfileStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Profile"
            screenOptions={{
                headerStyle: { backgroundColor: "#AA52A9" },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontFamily: "kanitRegular",
                },
            }}
        >
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: "โปรไฟล์", headerShown:false }}
            />
        </Stack.Navigator>
    );
};

const MainApp = () => {
    return (
        <PaperProvider>
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName="RentStack"
                    tabBarOptions={{
                        activeTintColor: "#DE71C0",
                    }}
                >
                    <Tab.Screen
                        name="RentStack"
                        component={RentStack}
                        options={{
                            tabBarLabel: "คำร้องจองห้อง",
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons
                                    name="format-list-checks"
                                    size={size}
                                    color={color}
                                />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="StatusStack"
                        component={StatusStack}
                        options={{
                            tabBarLabel: "ติดตามสถานะ",
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons
                                    name="calendar"
                                    size={size}
                                    color={color}
                                />
                            ),
                        }}
                    />

                    <Tab.Screen
                        name="Profile"
                        component={ProfileStack}
                        options={{
                            tabBarLabel: "โปรไฟล์",
                            tabBarIcon: ({ color, size }) => (
                                <FeatherIcon
                                    name="user"
                                    size={size}
                                    color={color}
                                />
                            ),
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
};

export default MainApp;
