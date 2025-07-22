import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Home from "../screens/home";
import Quiz from "../screens/quiz";
import Profile from "../screens/profile";
import Roadmap from "../screens/roadmap";
import Achievements from "../screens/achievements";
const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#0f766e",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarIcon: ({ color, size }) => {
          let iconName: any = "home-outline";

          switch (route.name) {
            case "Home":
              iconName = "home-outline";
              break;
            case "Quiz":
              iconName = "help-circle-outline";
              break;
            case "Profile":
              iconName = "person-outline";
              break;
            case "Roadmap":
              iconName = "map-outline";
              break;
            case "Achievements":
              iconName = "trophy-outline";
              break;
            case "Authorized":
              iconName = "home-outline";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Quiz" component={Quiz} />
      <Tab.Screen name="Roadmap" component={Roadmap} />
      <Tab.Screen name="Achievements" component={Achievements} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
