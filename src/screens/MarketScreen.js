import React from 'react';

 const MarketScreen = () => {
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
            }

            alert(JSON.stringify(productInfo));

            window.ReactNativeWebView.postMessage(JSON.stringify(productInfo));
            event.stopPropagation();
            }

        }, true);
        });
        true; // note: this is required, or you'll sometimes get silent failures
    `;

    return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Select products</Text>
        <StatusBar style="auto" />
      </View>
      <View style={styles.webViewContainer}>
        <WebView
            source={{
              uri: 'https://rautdv.ru',
            }}
            onMessage={(event) => {
              console.log(event.nativeEvent.data);
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
      flexDirection: 'column',
      // backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center',
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