import React, {useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import { Header, Card, ListItem, Button, Icon, Divider, ThemeContext, Text, Input} from 'react-native-elements';
import {deleteProduct, cleanCart} from '../store/actions';

const Cart = ({ navigation, route }) => {
    const { theme } = useContext(ThemeContext);
    const { products, parentOrder } = useSelector(state => state.order);
    const dispatch = useDispatch();

    const addToParentOrder = () => {
        navigation.navigate('Товары добавлены');
        //dispatch(cleanCart());
    }

    return (
        <View style={styles.orderContainer}>
            <View>
                {
                products.map((product, i) => {
                    return (
                    <ListItem key={i} bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>{product.name}</ListItem.Title>
                            <ListItem.Subtitle style={{fontWeight: "bold", marginTop: 3}}>
                                {product.price} руб / {product.count} шт
                            </ListItem.Subtitle>
                        </ListItem.Content>
                        <Icon 
                            type={'font-awesome'} 
                            name={"times"} 
                            size={20}
                            color={theme.colors.grey3}
                            onPress={() => dispatch(deleteProduct(product))}
                        />
                    </ListItem>
                    )
                })
                }

                {
                    products.length === 0 && 
                    <View style={{padding: 30}}>
                        <Text style={{fontSize: 28, color: theme.colors.grey3, textAlign: "center"}}>Список пуст</Text>
                    </View>
                }
            </View>

            {
                products.length > 0 &&
                <View style={{backgroundColor: theme.colors.grey5, paddingBottom: 20}}>
                    <View style={{marginTop: 5, padding: 15, flexDirection: "row", alignItems: "center"}}>
                        <Text style={{fontSize: 24}}>Закупка</Text>                
                        <Text style={{marginLeft: 10}}>{parentOrder.date}</Text>
                    </View>

                    <View style={styles.btnContainer}>
                        <Button title="Добавить к закупке" style={{width: 200}} onPress={addToParentOrder}></Button>
                    </View>
                </View>
            }
        </View>
    );
}

export default Cart;

const styles = StyleSheet.create({
    orderContainer: {
      marginTop: 5
    },
    orderDetails: {
        marginTop: 5,
        marginBottom: 15
    },
    emptyText: {
        fontSize: 18,
        textAlign: "center"
    },
    inputContainer: {
        marginTop: 5
    },
    btnContainer: {
        marginTop: 5,
        flexDirection: "row",
        justifyContent: "center"
    }
  });