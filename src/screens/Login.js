import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Text, Input, Button } from 'react-native-elements';
import {setToken, setUser} from '../store/actions';

const Login = () => {
    const dispatch = useDispatch();
    const [userPhone, setUserPhone] = useState('');
    const users = useSelector((state) => state.users.list);

    const userData = {
      "auth_date": 12232323,
      "first_name": "Pasha",
      "hash": "dfsdfasdfasdfsdf",
      "id": 133999846,
      "last_name": "Danilin",
      "photo_url": "http://1.jpg",
      "username": "PavelPcrf"
    };

    const signIn = () => {
      fetch('http://zakup.cf/login/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData) // body data type must match "Content-Type" header
      }).then((res) => {
        const user = users.find(u => u.phone === userPhone);
        if (user) {
          dispatch(setToken(12345));
          dispatch(setUser(user));
        }
      })
    }

    return (
        <View style={styles.container}>
            <View style={styles.loginForm}>
              <Input
                placeholder='Номер телефона'
                leftIcon={{ type: 'font-awesome', name: 'phone' }}
                onChangeText={(value) => setUserPhone(value)}
              />

              <Button
                style={{marginTop: 10}}
                title="Войти через Telegram"
                onPress={signIn}
              />
            </View>
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
      //flex: 1,
      justifyContent: "center"
    },
    header: {
      fontSize: 20,
      marginTop: 20,
      height: 80
    },
    webViewContainer: {
      flexGrow: 1
    },
    loginForm: {
      marginTop: 50,
      marginLeft: 15,
      marginRight: 15,
      marginBottom: 15
    }
});