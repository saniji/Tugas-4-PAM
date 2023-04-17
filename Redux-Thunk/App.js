import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import configureAppStore from './src/store/store';
import HomeScreen from './components/screens/homeScreen';
import HasilPencarian from './components/screens/hasilPencarian';

const store = configureAppStore();

const Stack = createStackNavigator();

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Hasil Pencarian" component={HasilPencarian} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
