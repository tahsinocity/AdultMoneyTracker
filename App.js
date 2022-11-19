import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Home from './screens/Home';
import History from './screens/History';
import Itemized from './screens/Itemized';
import Settings from './screens/Settings';
import Transactions from './screens/Transactions';


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Transactions" component={Transactions} />
        <Drawer.Screen name="Itemized" component={Itemized} />
        <Drawer.Screen name="History" component={History} />
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
