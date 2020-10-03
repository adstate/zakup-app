function addToCart() {
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

    document.addEventListener("DOMContentLoaded", function(event) {
        //alert('hi');

        alert(window.zakupProcessingProduct);

        if (window.zakupProcessingProduct) {
            const product = window.zakupProcessingProduct;

            //alert(JSON.stringify(product));

            document.querySelector('.product-page__increment .in-cart-product-input-amount').value = product.count;
            const cartBtn = document.querySelector('.product-page__btns .bt-add-prod');

            cartBtn.addEventListener('click', () => {        
                if (nextProcessingProduct) {
                    setTimeout(() => {
                        window.ReactNativeWebView.postMessage('product added');
                    }, 1000);
                }
            });

            setTimeout(() => {
                if (cartBtn) {
                    fireMouseClick(cartBtn);
                }
            }, 1000);
        }
    });
    true; // note: this is required, or you'll sometimes get silent failures
}


function addToCartWithLocalStorage() {
    const zakupProducts = []

    const runFirst = `
    try {
        if (!localStorage.getItem('zakupProducts')) {
            localStorage.setItem('zakupProcessingProduct', '${JSON.stringify(zakupProducts.shift())}');
            localStorage.setItem('zakupProducts', '${JSON.stringify(zakupProducts)}');
        }
    } catch(e) {
        alert('Error of setting storage');
    }

    alert('run again');

    function triggerMouseEvent(node, eventType) {
        var clickEvent = document.createEvent('MouseEvents');
        clickEvent.initEvent(eventType, true, true);
        node.dispatchEvent(clickEvent);
    }

    document.addEventListener("DOMContentLoaded", function(event) {
        //alert('hi');

        alert(localStorage.getItem('zakupProcessingProduct'));

        if (localStorage.getItem('zakupProcessingProduct')) {
            const product = JSON.parse(localStorage.getItem('zakupProcessingProduct'));

            //alert(JSON.stringify(product));

            document.querySelector('.product-page__increment .in-cart-product-input-amount').value = product.count;
            const cartBtn = document.querySelector('.product-page__btns .bt-add-prod');

            cartBtn.addEventListener('click', () => {
                const remainingProducts = JSON.parse(localStorage.getItem('zakupProducts'));
                localStorage.removeItem('zakupProcessingProduct');
            

                if (remainingProducts && remainingProducts.length > 0) {
                    const nextProcessingProduct = remainingProducts.shift();

                    if (nextProcessingProduct) {
                        localStorage.setItem('zakupProcessingProduct', JSON.stringify(nextProcessingProduct));
                        localStorage.setItem('zakupProducts', JSON.stringify(remainingProducts));

                        setTimeout(() => {
                            window.ReactNativeWebView.postMessage('product added');
                            document.location.href = nextProcessingProduct.url;
                        }, 1000);
                    }
                }
            });

            setTimeout(() => {
                if (cartBtn) {
                    //alert(cartBtn);
                    //--- Simulate a natural mouse-click sequence.
                    triggerMouseEvent(cartBtn, "mouseover");
                    triggerMouseEvent(cartBtn, "mousedown");
                    triggerMouseEvent(cartBtn, "mouseup");
                    triggerMouseEvent(cartBtn, "click");
                }
            }, 1000);
        }
    });
    true; // note: this is required, or you'll sometimes get silent failures
  `;
}