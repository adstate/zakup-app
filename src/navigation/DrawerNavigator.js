import React, { useContext, useReducer } from 'react';
import { View, Image, SafeAreaView, Switch } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { ThemeContext, Text, Divider } from 'react-native-elements';
import { ThemeReducerContext } from '../helpers/ThemeReducer';

function CustomContentComponent(props) {
  const { ThemeState, dispatch } = useContext(ThemeReducerContext);
  const { theme } = useContext(ThemeContext);
  return (
    <SafeAreaView
      style={{ flex: 1, height: '100%', backgroundColor: theme.colors.white }}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text          
          style={{ color: theme.colors.grey8 }}
        >
            zakup.cf
        </Text>
      </View>
      
      <Divider style={{ marginTop: 15 }} />
      <View style={{ marginLeft: 10, width: '100%' }}>
        <DrawerItemList {...props} />
      </View>
    </SafeAreaView>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <CustomContentComponent {...props} />
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
