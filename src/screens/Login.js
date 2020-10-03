import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import { WebView } from 'react-native-webview';

const Login = () => {
    const html = `
      <html>
      <head></head>
      <body>
        <script async src="https://telegram.org/js/telegram-widget.js?11" data-telegram-login="kupihbot" data-size="large" data-onauth="onTelegramAuth(user)" data-request-access="write"></script>
        <script type="text/javascript">
            function onTelegramAuth(user) {
                console.log(user);
                alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
            }
        </script>
      </body>
      </html>
    `;

    return (
        <View style={styles.container}>
            <WebView
                source={{
                    uri: 'http://zakup.cf/',
                }}
                onMessage={(event) => {
                
                }}
            />
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column'
    },
    header: {
      fontSize: 20,
      marginTop: 20,
      height: 80
    },
    webViewContainer: {
      flexGrow: 1
    }
});