import React, {useContext, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import { Header, Card, ListItem, Button, Icon, Divider, ThemeContext, Text, Input} from 'react-native-elements';

const InviteOrderSuccess = ({ navigation, route }) => {
    const { theme } = useContext(ThemeContext);
    const { products, parentOrder } = useSelector(state => state.order);
    const dispatch = useDispatch();

    useEffect(() => {

    }, []);

    return (
        <View style={styles.successContainer}>
            <Icon 
                type={'font-awesome'} 
                name={"check"} 
                size={68}
                color={theme.colors.grey3}
                onPress={() => dispatch(deleteProduct(product))}
            />
            <Text style={{fontSize: 26, textAlign: "center", color: theme.colors.grey3, marginTop: 10}}>Товары успешно добавлены</Text>
            <Button
                type="outline"
                title={'ОК'}
                style={{width: 200, marginTop: 25, color: theme.colors.grey2}}
                onPress={() => {
                    navigation.navigate('Закупки');
                }}
            />
        </View>
    );
}

export default InviteOrderSuccess;

const styles = StyleSheet.create({
    successContainer: {
      marginTop: 40,
      padding: 20,
      justifyContent: "center",
      alignItems: "center"
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
