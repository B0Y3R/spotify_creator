/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { View, Text, ScrollView } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TracksScreen from '../screens/TracksScreen';

import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Your Library"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="library-outline" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  const colorScheme = useColorScheme();
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="Your Library"
        component={TabOneScreen}
        options={{  
          headerTitle: "Your Library",
          headerLeft: (props) => (
            <View style={{ paddingLeft: 10, paddingBottom: 10, }}>
              <View style={{ height: 35, width: 35, borderRadius: 30, backgroundColor: Colors[colorScheme].tint }} />
            </View>
          ),
          headerRight: (props) => (
            <View style={{ paddingRight: 15, display: 'flex', flexDirection: 'row',  }}>
              <Ionicons name="search" size={18} color="white" style={{marginRight: 15, marginTop: 3 }} />
              <Ionicons name="add" size={24} color="white" />
            </View>
          ),
        }}
      />
      <TabOneStack.Screen
        name="Tracks Screen"
        component={TracksScreen}
        options={{  
          headerTitle: "Tracks",
          headerLeft: (props) => (
            <View style={{ paddingLeft: 10, paddingBottom: 10, }}>
              <View style={{ height: 35, width: 35, borderRadius: 30, backgroundColor: Colors[colorScheme].tint }} />
            </View>
          ),
          headerRight: (props) => (
            <View style={{ paddingRight: 15, display: 'flex', flexDirection: 'row',  }}>
              <Ionicons name="search" size={18} color="white" style={{marginRight: 15, marginTop: 3 }} />
              <Ionicons name="add" size={24} color="white" />
            </View>
          ),
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Search' }}
      />
    </TabTwoStack.Navigator>
  );
}
