import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Form from './components/form';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Form}
          options={{
            headerTitle: 'Form - TheITStudio', headerTitleAlign: 'center', headerTintColor: 'white', headerStyle: {
              backgroundColor: '#312651'
            },
          }} // Customize the header title
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
