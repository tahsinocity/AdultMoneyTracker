import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import { firebaseConfig } from './config'

import Home from './screens/Home';
import History from './screens/History';
import Itemized from './screens/Itemized';
import Settings from './screens/Settings';
import Transactions from './screens/Transactions';
import Login from './screens/Login';


const Drawer = createDrawerNavigator();
const AuthStack = createStackNavigator();

const AuthScreens = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={Login}/>
  </AuthStack.Navigator>
)

const Screens = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="Transactions" component={Transactions} />
    <Drawer.Screen name="Itemized" component={Itemized} />
    <Drawer.Screen name="History" component={History} />
    <Drawer.Screen name="Settings" component={Settings} />
  </Drawer.Navigator>
)

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = getAuth()
  useEffect(() => {
    if(auth.currentUser) {
      setIsAuthenticated(true)
    }

    auth.onAuthStateChanged(user => {
      console.log("Checking auth state...")
      if(user) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
    })
  }, [])

  return (
    <NavigationContainer>
      {isAuthenticated ? <Screens/> : <AuthScreens/>}
    </NavigationContainer>
  );
}

initializeApp(firebaseConfig);