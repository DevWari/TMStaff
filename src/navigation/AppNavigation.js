import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createSwitchNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import LoginScreen from 'src/screens/LoginScreen';
import Dashboard from 'src/screens/Dashboard';
import MyAccount from 'src/screens/MyAccount';
import Courses from 'src/screens/Courses';
import RegisterScreen from 'src/screens/RegisterScreen';
import ForgotScreen from 'src/screens/ForgotScreen';
import Support from 'src/screens/Support';
import Resources from 'src/screens/Resources';
import WorkScreen from 'src/screens/WorkScreen';
import WorkResult from 'src/screens/WorkScreen/WorkResult';
import AuthLoadingScreen from 'src/screens/AuthLoadingScreen';

import {
  View,
  Image,
} from 'react-native'
import React from 'react'

const AuthStack = createStackNavigator(
  {
    LoginScreen,
    RegisterScreen,
    ForgotScreen,    
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
    // mode: 'modal'
  }
);
const AppStack = createStackNavigator(
  {
    Courses,    
    Resources,
    WorkScreen,
    WorkResult
  },
  {
    initialRouteName: 'Resources',
    headerMode: 'none',
    //mode: 'modal'
  }
);


const MainTab = createBottomTabNavigator (
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
          tabBarLabel: 'Dashboard',
          activeColor: 'red',
          inactiveColor: 'grey',
          barStyle: {backgroundColor: 'white'},
          tabBarIcon: ({tintColor}) => {
              return (
                  <View>
                      <Image source={require('src/assets/img/dock/dock1.png')} />
                  </View>
              )                                      
          }
      }
    },
    MyAccount: {
      screen: MyAccount,
      navigationOptions: {
          tabBarLabel: 'My Account',               
          tabBarIcon: ({tintColor}) => {
              return (
                <View>
                  <Image source={require('src/assets/img/dock/dock2.png')} />
                </View>
              )                    
          }
        }
    },
    Support: {
      screen: Support,
      navigationOptions: {
          tabBarLabel: 'Support',               
          tabBarIcon: () => {
              return (
                <View>
                  <Image source={require('src/assets/img/dock/dock3.png')} />
                </View>
              )                    
          }
        }
    },
    AppStack: {
      screen: AppStack,
      navigationOptions: {
        tabBarButton: () => null,
        tabBarButtonComponent: () => null,
        tabBarLabel: () => null,
      },
    },
    
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      style:{
        height:90,
        backgroundColor: '#15892E',
        padding: 10
      },
      labelStyle: {
        fontSize: 18,
        
      },
      activeTintColor:'#F9CC34',
      inactiveTintColor: 'black'
    }, 
  },  
)
export const RootNavigator = createAppContainer(
  createSwitchNavigator({		
      AuthLoadingScreen: AuthLoadingScreen,
      App: MainTab,
	  Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoadingScreen'    
  }),
);