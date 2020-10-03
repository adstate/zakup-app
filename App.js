import React, {useEffect, useState, useReducer} from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import { useColorScheme } from 'react-native-appearance';
import { AppLoading } from 'expo'
import OrderScreen from './src/screens/OrderScreen';
import bootstrap from './src/bootstrap';
import RootNavigator from './src/navigation/RootNavigator';
import { Provider } from 'react-redux';
import {store, persistor} from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react'

import {
  ThemeReducer,
  initialState,
  ThemeReducerContext,
} from './src/helpers/ThemeReducer';


export default function App() {
  const [ThemeState, dispatch] = useReducer(ThemeReducer, initialState);
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (colorScheme === 'dark') {
      dispatch({ type: 'set-theme', payload: 'dark' });
    }
  }, [colorScheme]);
 
  const [isReady, setIsReady] = useState(false);

  const renderLoading = () => {
        return (
            <View>                
                <ActivityIndicator size={"large"} />
            </View>        
        );    
    };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={bootstrap}
        onFinish={() => setIsReady(true)}
        onError={err => console.log(err)}
      />
    )
  }

  return (
    <ThemeReducerContext.Provider value={{ ThemeState, dispatch }}>
      <ThemeProvider useDark={ThemeState.themeMode === 'dark' ? true : false}>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={renderLoading()}>
            <RootNavigator />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </ThemeReducerContext.Provider>
  )

}
