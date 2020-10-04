import React, {useContext} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { DrawerActions } from '@react-navigation/native';
import { Button, Card, ListItem, Icon, Divider, ThemeContext, Text} from 'react-native-elements';
import {setToken} from '../store/actions';

const Home = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);

    const {orders} = useSelector((state) => state.zakupki);
    const dispatch = useDispatch();

    return (
        <View>
            <StatusBar backgroundColor="blue" barStyle={'light-content'} />
            <View style={styles.orderList}>
                {
                    orders.length > 0 && orders.map((order, i) => {
                        return (
                            <ListItem key={i} bottomDivider style={styles.orderListItem} onPress={() => navigation.navigate('Закупка', order)}>
                                <ListItem.Content>
                                    <ListItem.Title>{order.name}</ListItem.Title>
                                    <ListItem.Subtitle style={{color: theme.colors.gray2}}>
                                        {order.status} - {order.date}
                                    </ListItem.Subtitle>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        );
                    })
                }

                {
                    orders.length === 0 && 
                    <View style={styles.emptyContainer}>
                        <Text style={{color: theme.colors.grey2, fontSize: 18, textAlign: "center"}}>Список закупок пуст</Text>
                    </View>
                }
            </View>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    orderList: {
      marginTop: 5
    },
    orderListItem: {
        
    },
    emptyText: {
        fontSize: 18,
        textAlign: "center"
    },
    emptyContainer: {
        marginTop: 20
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingRight: 10,
        fontSize: 12
    }
  });