import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { Header, Card, ListItem, Button, Icon, Divider, ThemeContext, Text} from 'react-native-elements';

const Order = ({ navigation, route }) => {
    const { theme } = useContext(ThemeContext);
    const order = route.params;

    console.log('order', order);

    return (
        <View>
            <View style={styles.orderContainer}>
                <Card>
                    <Card.Title>{order.name}</Card.Title>
                    <Card.Divider/>
                    {/* <Card.Image source={require('../images/pic2.jpg')} /> */}
                    <View style={styles.orderDetails}>
                        <Text style={{marginBottom: 10}}>
                            {order.description}
                        </Text>

                        <Text>
                            Дата закупки: {order.date}
                        </Text>
                    </View>

                    <Button
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='Присоединиться' />
                </Card>
            </View>
        </View>
    );
}

export default Order;

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
    emptyContainer: {
        marginTop: 20
    }
  });