import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { Header, Card, ListItem, Button, Icon, Divider, ThemeContext, Text} from 'react-native-elements';


let orders = [
    {id: 1, name: 'Заказ в RautDv', date: '05.10.2020', status: 'активный', description: 'Закупаемся на выходных в Рауте'},
    {id: 2, name: 'Заказ в RautDv', date: '09.10.2020', status: 'активный', description: 'Закупаемся на выходных в Рауте'},
    {id: 3, name: 'Заказ в RautDv', date: '15.10.2020', status: 'активный', description: 'Закупаемся на выходных в Рауте'}
];

const Home = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <View>            
            <View style={styles.orderList}>
                {
                    orders.length > 0 && orders.map((order, i) => {
                        return (
                            <ListItem key={i} bottomDivider style={styles.orderListItem} onPress={() => navigation.navigate('OrderDetails', order)}>
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
    }
  });