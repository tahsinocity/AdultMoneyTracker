import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { auth } from './config'

import Home from './screens/Home';
import History from './screens/History';
import Itemized from './screens/Itemized';
import Settings from './screens/Settings';
import Transactions from './screens/Transactions';
import Login from './screens/Login';
import ResetPassword from './screens/ResetPassword';


const Drawer = createDrawerNavigator();
const AuthStack = createStackNavigator();

const AuthScreens = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
    <AuthStack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }}/>
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
    <RootSiblingParent>
      <NavigationContainer>
        {isAuthenticated ? <Screens/> : <AuthScreens/>}
      </NavigationContainer>
    </RootSiblingParent>
  );
}