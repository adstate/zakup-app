import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, StyleSheet, StatusBar, ActivityIndicator} from 'react-native';
import { WebView } from 'react-native-webview';
import { Header, Card, ListItem, Button, Icon, Divider, ThemeContext, Text} from 'react-native-elements';
import {selectProduct, selectOrder} from '../store/actions';

const runFirst = `
        document.addEventListener("DOMContentLoaded", function(event) {
        try {
            const style = document.createElement('style');
            
            style.textContent = \`
            .product__nav {
                display: none;
            }
            .product_mobile {
                padding-bottom: 5px !important;
            }
            \`;
            
            document.head.append(style);
        } catch (e) {
            alert(document.body);
        }

        document.body.addEventListener('click', function(event) {        
            if (event.target.classList.contains('bt-add-prod')) {
            const productInfo = {
                url: document.location.href,
                name: document.querySelector('.main-title h1').textContent,
                price: document.querySelector('.product-page__price-default span').textContent,
                count: document.querySelector('.product-page__increment .in-cart-product-input-amount').value
            }

            window.ReactNativeWebView.postMessage(JSON.stringify(productInfo));
            event.stopPropagation();
            window.history.back(); 
          }

        }, true);
        });
        true; // note: this is required, or you'll sometimes get silent failures
    `;

 const MarketScreen = ({navigation, route}) => {
    const dispatch = useDispatch();
    const order = route.params;

    const [loaded, setLoaded] = useState(false);
    
    const onSelectProduct = (product) => {
      dispatch(selectProduct(JSON.parse(product)));
    }

    useEffect(() => {
      dispatch(selectOrder(order));

      setTimeout(() => {
        setLoaded(true);
      }, 1500);
    }, []);

    return (
    <View style={styles.container}>
      

      <View style={styles.webViewContainer}>
        { !loaded &&
          <View style={{flex: 1, marginTop: 50}}>
            <ActivityIndicator size="large"></ActivityIndicator>
          </View>
        }
        <WebView
            style={{opacity: (loaded) ? 100 : 0}}
            source={{
              uri: 'https://rautdv.ru',
            }}
            onMessage={(event) => {
              onSelectProduct(event.nativeEvent.data);
            }}
            injectedJavaScriptBeforeContentLoaded={runFirst}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column'
    },
    header: {
      fontSize: 20,
      marginTop: 20,
      height: 100
    },
    webViewContainer: {
      flexGrow: 1
    }
});

 export default MarketScreen;