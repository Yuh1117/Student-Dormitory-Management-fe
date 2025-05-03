import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Button, Divider, Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AccountStyles from '../../auth/AccountStyles';
import { Text } from 'react-native'

const invoices = [
    {
        id: 1,
        type: 'Hoá đơn phòng',
        amount: '400.000đ',
        status: 'Chưa thanh toán',
        paid: false,
        time: '21:05 - 08/02/2024',
    },
    {
        id: 2,
        type: 'Hoá đơn phòng',
        amount: '200.000đ',
        status: 'Chưa thanh toán',
        paid: false,
        time: '21:05 - 08/02/2024',
    },
    {
        id: 3,
        type: 'Hoá đơn phòng',
        amount: '1.000.000đ',
        status: 'Đã thanh toán',
        paid: true,
        time: '21:05 - 08/02/2024',
    }
];

export default function InvoiceScreen() {
    return (
        <View style={AccountStyles.container}>
            <ScrollView>
                <Text style={styles.title}>Hoá đơn chưa thanh toán</Text>

                <Card style={styles.card}>
                    <Card.Content>
                        <View style={[styles.row, {marginVertical: 5}]}>
                            <View style={styles.row}>
                                <Avatar.Icon icon="home" size={45} style={{ backgroundColor: '#FFF3E0' }} color="#FF9800" />
                                <View style={{ marginLeft: 12 }}>
                                    <Text style={styles.label}>Hoá đơn</Text>
                                    <Text style={styles.timestamp}>21:05 - 08/02/2024</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={styles.unpaid}>400.000đ</Text>
                                <Text style={[styles.unpaid, { fontSize: 13 }]}>Chưa thanh toán</Text>
                            </View>
                        </View>

                        <Button mode="outlined" style={styles.checkButton} textColor="#376be3" onPress={() => console.log('check')}>
                            Kiểm tra
                        </Button>
                    </Card.Content>
                </Card>

                <View style={[styles.row, {padding: 7}]}>
                    <Text style={[styles.title, { margin: 0 }]}>Hoá đơn của tôi</Text>
                    <Text style={{ color: '#376be3' }}>Xem thêm</Text>
                </View>

                {invoices.map((item, index) => (
                    <React.Fragment key={item.id}>
                        <View style={[styles.row, {padding: 7, marginVertical: 5}]}>
                            <View style={styles.row}>
                                <Avatar.Icon icon="home" size={30} style={{ backgroundColor: '#376be3' }} color="white" />
                                <View style={{ marginLeft: 12 }}>
                                    <Text style={styles.label}>{item.type}</Text>
                                    <Text >{item.time}</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: 'flex-end' }} >
                                <Text style={styles.label}>{item.amount}</Text>
                                <Text style={{ color: '#4CAF50' }}>Đã thanh toán</Text>
                            </View>
                        </View>
                        {index < invoices.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        margin: 10,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 7,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
    },
    unpaid: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#D32F2F',
    },
    checkButton: {
        borderColor: '#376be3',
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 10
    }

});
