import React, { useContext, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeContext, Icon } from 'react-native-elements';

import Home from '../screens/Home';
import Order from '../screens/Order';
import Login from '../screens/Login';
import OrderScreen from '../screens/OrderScreen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function RootNavigator() {
  const { theme } = useContext(ThemeContext);

  const {token} = useSelector(state => state.user);

  console.log('token', token);
  
  return (
    <NavigationContainer theme={{ colors: { background: theme.colors.white } }}>
        {token === null ? (
          SignInStackScreen()
        ) : (
          <Tab.Navigator
            screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = focused ? 'home' : 'home';
                } else if (route.name === 'Order') {
                    iconName = focused ? 'list' : 'list';
                }

                return <Icon name={iconName} size={size} color={color} />;
            },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Order" component={OrderScreen} />
        </Tab.Navigator>
        )}
    </NavigationContainer>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Закупки" component={Home} />
      <HomeStack.Screen name="OrderDetails" component={Order} />
    </HomeStack.Navigator>
  );
}

const SignInStack = createStackNavigator();

function SignInStackScreen() {
  return (
    <SignInStack.Navigator>
      <SignInStack.Screen name="Войти" component={Login} />
    </SignInStack.Navigator>
  );
}


export default RootNavigator;
