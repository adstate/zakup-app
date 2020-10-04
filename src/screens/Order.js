import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { Header, Card, ListItem, Button, Icon, Divider, ThemeContext, Text} from 'react-native-elements';

const Order = ({ navigation, route }) => {
    const { theme } = useContext(ThemeContext);
    const order = route.params;

    //console.log('order', order);

    return (
        <View>
            <View style={styles.orderContainer}>
                <Text style={{fontSize: 24, marginBottom: 10}}>{order.name}</Text>
                <View style={styles.orderDetails}>
                    <Text style={{marginBottom: 5, color: theme.colors.grey3}}>
                        Описание:
                    </Text>
                    <Text style={{marginBottom: 10, fontSize: 18}}>{order.description}</Text>

                    <Text style={{color: theme.colors.grey3}}>Дата закупки:</Text>
                    <Text style={{marginBottom: 10, fontSize: 18}}>
                        {order.date}
                    </Text>

                    <Text style={{color: theme.colors.grey3}}>Статус:</Text> 
                    <Text style={{marginBottom: 10, fontSize: 18}}>
                        {order.status}
                    </Text>

                    <Text style={{color: theme.colors.grey3}}>Организатор:</Text> 
                    <Text style={{marginBottom: 10, fontSize: 18}}>
                        {order.orgName}
                    </Text>

                    <Text style={{color: theme.colors.grey3}}>Телефон:</Text>
                    <Text style={{marginBottom: 10, fontSize: 18}}>
                        {order.phone}
                    </Text>
                </View>
                
                <Button
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginTop: 20, width: 200, alignSelf: "center"}}
                    title='Присоединиться'
                    onPress={() => navigation.navigate('Выбрать товары', order)}
                />
            </View>
        </View>
    );
}

export default Order;

const styles = StyleSheet.create({
    orderContainer: {
      padding: 15,
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
    emptyContainer: {
        marginTop: 20
    }
  });