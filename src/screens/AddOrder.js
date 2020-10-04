import React, {useContext, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, StyleSheet,  SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import { Header, Card, ListItem, Button, Icon, Divider, ThemeContext, Text, Input, BottomSheet } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import {addOrder} from '../store/actions';

const IOS_DISPLAY = Object.freeze({
    default: 'default',
    spinner: 'spinner',
    compact: 'compact',
    inline: 'inline',
});

function dateFormat(date) {
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();

    return [
        (dd>9 ? '' : '0') + dd,
        '.',
        (mm>9 ? '' : '0') + mm,
        '.',
        date.getFullYear()
    ].join('');
};

const AddOrder = ({ navigation, route }) => {
    const { theme } = useContext(ThemeContext);
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [site, setSite] = useState('');
    const [description, setDescription] = useState('');

    const [orderDate, setOrderDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateSelected, setDateSelected] = useState(false);

    const createOrder = () => {
        const order = {
            name,
            url: site,
            date: dateFormat(orderDate),
            description,
            status: 'Активный',
            orgName: 'Феликс Ходаковский',
            phone: '89241303095'
        }
        dispatch(addOrder(order));
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.orderContainer}>
                <View styles={styles.inputContainer}>
                    <Input placeholder='Название' onChangeText={value => setName(value)}/>

                    <Input placeholder='Сайт магазина' onChangeText={value => setSite(value)}/>

                    <TouchableOpacity style={{padding: 8}} onPress={() => setShowDatePicker(true)}>
                        {!dateSelected ? (
                            <Text style={{fontSize: 18, color: theme.colors.grey3, marginBottom: 10}}>
                                {'Дата'}
                            </Text>
                        ) : (
                            <Text style={{fontSize: 18, marginBottom: 10}}>
                                {dateFormat(orderDate)}
                            </Text>
                        )}
                        <Divider style={{height: 1, backgroundColor: theme.colors.grey3}}/>
                    </TouchableOpacity>

                    <Input placeholder='Описание' onChangeText={value => setDescription(value)}/>
                </View>
                <View style={styles.btnContainer}>
                    <Button title="Создать" style={{width: 150}} onPress={createOrder}></Button>
                </View>
            </View>

            <BottomSheet isVisible={showDatePicker}>
                <TouchableOpacity style={{ backgroundColor: '#fff'}}>
                    <Divider style={{marginBottom: 15}}/>
                    <TouchableOpacity onPress={() => {
                        setShowDatePicker(false);
                        setDateSelected(true);
                    }}
                    >
                        <Text style={{color: 'blue', fontWeight: "bold", fontSize: 18, alignSelf: "flex-end", marginRight: 20}}>Done</Text>
                    </TouchableOpacity>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={orderDate}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={(e, d) => {
                            setOrderDate(d)
                        }}
                    />
                </TouchableOpacity>
            </BottomSheet>
        </SafeAreaView>
    );
}

export default AddOrder;

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