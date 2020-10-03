import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { DrawerActions } from '@react-navigation/native';
import {Header} from 'react-native-elements';


const zakup_products = [
    {"url":"https://rautdv.ru/catalog/fermerskie-produkty/indejka-bedro-vladmila","name":"Индейка бедро, Владмила ","price":"1853", "count": "2"},
    {"url":"https://rautdv.ru/catalog/stejki-iz-myasa/govyadina-stejk-iz-tolstogo-kraya-ribeye-steak-zernovoj-otkorm-zamorozhennyj-vakuum-up-frigorifico-pico-300gr111111111111","name":"Говядина, стейк из толстого края, Ribeye Steak, зерновой откорм, замороженный, Pico Ohra Pampa, 300г ","price":"828", "count": '3'},
    {"url":"https://rautdv.ru/catalog/konditerskie-izdeliya1/konfety-lindt--iz-molochnogo-shokolada--s-nezhnoj-tayushchej-nachinkoj-200g1","name":"КОНФЕТЫ ИЗ МОЛОЧНОГО ШОКОЛАДА С НЕЖНОЙ ТАЮЩЕЙ НАЧИНКОЙ, LINDT, 200Г ","price":"788", "count": '4'}
];

export default function OrderScreen({navigation}) {
    let webview = React.createRef();
    //const zakupProducts = [...zakup_products];

    //const [currentAddProduct, setCurrentAddProduct] = useState(zakupProducts.shift());
    const [products, setProducts] = useState([...zakup_products]);

   // console.log('zakupProducts', zakupProducts);

   const addNextProduct = (event) => {
        console.log('added product');
        const nextProduct = products[0];

        if (nextProduct) {
            //setCurrentAddProduct(nextProduct);
            //setProducts(products);
        } else {
            //setCurrentAddProduct(null);
            setProducts([]);
            return;
        }

        const redirectTo = `
            document.location.href = '${nextProduct.url}';
        `;
        
        webview.injectJavaScript(redirectTo);        
   };

    const addProductToCart = (newNavState) => {
        if (newNavState.navigationType) {
            return;
        }

       // console.log(newNavState.url);

        const currentAddProduct = products[0];
        setProducts(products.slice(1));

        const addProductScript = `
            window.zakupProcessingProduct = ${JSON.stringify(currentAddProduct)};

            function fireMouseClick(element) {
                function triggerMouseEvent(node, eventType) {
                    var clickEvent = document.createEvent('MouseEvents');
                    clickEvent.initEvent(eventType, true, true);
                    node.dispatchEvent(clickEvent);
                }
            
                triggerMouseEvent(element, "mouseover");
                triggerMouseEvent(element, "mousedown");
                triggerMouseEvent(element, "mouseup");
                triggerMouseEvent(element, "click");
            }

            if (window.zakupProcessingProduct) {
                const product = window.zakupProcessingProduct;
        
                document.querySelector('.product-page__increment .in-cart-product-input-amount').value = product.count;
                const cartBtn = document.querySelector('.product-page__btns .bt-add-prod');
                
                if (cartBtn) {
                    cartBtn.addEventListener('click', () => {
                        setTimeout(() => {
                            window.ReactNativeWebView.postMessage('product added');
                        }, 1000);
                    });

                    setTimeout(() => fireMouseClick(cartBtn), 500);
                } else {
                    setTimeout(() => {
                        window.ReactNativeWebView.postMessage('product could not added');
                    }, 500);
                }
            }
            
            document.addEventListener("DOMContentLoaded", function(event) {
                
            });
            true; // note: this is required, or you'll sometimes get silent failures
        `;

        webview.injectJavaScript(addProductScript);
    };

    useEffect(() => {
       
    }, []);


  return (
    <View style={styles.container}>
      <Header
        placement="left"
        leftComponent={{ 
            icon: 'menu', 
            color: '#fff',
            onPress: () => navigation.dispatch(DrawerActions.toggleDrawer())
        }}
        centerComponent={{ text: 'Make order', style: { color: '#fff' } }}
      />
      <View style={styles.webViewContainer}>
        <WebView
            ref={(ref) => (webview = ref)}
            source={{
              uri: zakup_products[0].url,
            }}
            onMessage={(event) => {
              addNextProduct(event);
            }}
            //injectedJavaScriptBeforeContentLoaded={runFirst}
            onNavigationStateChange={addProductToCart}
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
    height: 80
  },
  webViewContainer: {
    flexGrow: 1
  }
});
