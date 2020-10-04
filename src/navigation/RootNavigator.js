import React, { useContext, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeContext, Icon, Button, Text } from 'react-native-elements';
import {View, StyleSheet} from 'react-native';

import Home from '../screens/Home';
import Order from '../screens/Order';
import Login from '../screens/Login';
import OrderScreen from '../screens/OrderScreen';
import MarketScreen from '../screens/MarketScreen';
import AddOrder from '../screens/AddOrder';
import Cart from '../screens/Cart';
import InviteOrderSuccess from '../screens/InviteOrderSuccess';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function RootNavigator() {
  const { theme } = useContext(ThemeContext);
  const {token} = useSelector(state => state.user);

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

function HomeStackScreen({navigation, route}) {
  const { theme } = useContext(ThemeContext);
  const { products } = useSelector(state => state.order);

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="Закупки"
        component={Home}
        options={{
          headerRight: () => (
            <Icon 
              type={'font-awesome'} 
              name={"plus-circle"} 
              size={32}
              color={theme.colors.gray4}
              style={styles.orderAddButton}
              onPress={() => navigation.navigate('Создать закупку')}/>
          ),
        }}
      />
      <HomeStack.Screen
        name="Закупка"
        component={Order}
      />
      <HomeStack.Screen name="Создать закупку" component={AddOrder} />
      <HomeStack.Screen
        name="Выбрать товары"
        component={MarketScreen}
        options={{
          headerRight: () => (
            <View style={styles.cartBlock}>
              <Icon
                type={'font-awesome'} 
                name={"shopping-cart"} 
                size={32}
                color={theme.colors.gray4}
                onPress={() => navigation.navigate('Выбранные товары')}
              />
              <Text style={styles.cartCount}>{products.length}</Text>
            </View>
          ),
        }}
      />
      <HomeStack.Screen name="Выбранные товары" component={Cart}/>
      <HomeStack.Screen name="Товары добавлены" component={InviteOrderSuccess}/>
    </HomeStack.Navigator>
  );
}

const SignInStack = createStackNavigator();

function SignInStackScreen() {
  return (
    <SignInStack.Navigator>
      <SignInStack.Screen name="Вход" component={Login} />
    </SignInStack.Navigator>
  );
}

const styles = StyleSheet.create({
  orderAddButton: {
    marginRight: 20
  },
  cartBlock: {
    flexDirection: "row",
    marginRight: 15
  },
  cartCount: {
    marginLeft: 5,
    fontWeight: "bold"
  }
});


export default RootNavigator;
