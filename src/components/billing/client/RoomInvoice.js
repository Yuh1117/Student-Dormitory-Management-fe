import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Button, Divider, Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AccountStyles from '../../auth/AccountStyles';

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
                        <View style={styles.row}>
                            <View style={styles.row}>
                                <Avatar.Icon icon="home" size={30} style={{ backgroundColor: '#FFF3E0' }} color="#FF9800" />
                                <View style={{ marginLeft: 12 }}>
                                    <Text style={styles.invoiceTitle}>Hoá đơn</Text>
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

                <View style={[styles.row, styles.p]}>
                    <Text style={[styles.title, { margin: 0 }]}>Hoá đơn của tôi</Text>
                    <Text style={{ color: '#376be3' }}>Xem thêm</Text>
                </View>

                {invoices.map((item, index) => (
                    <>
                        <View key={item.id} style={[styles.row, styles.p]}>
                            <View style={styles.row}>
                                <Avatar.Icon icon="home" size={30} style={{ backgroundColor: '#376be3' }} color="white" />
                                <View style={{ marginLeft: 12 }}>
                                    <Text style={styles.invoiceTitle}>{item.type}</Text>
                                    <Text >{item.time}</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: 'flex-end' }} >
                                <Text >{item.amount}</Text>
                                <Text style={{ color: '#4CAF50' }}>Đã thanh toán</Text>
                            </View>
                        </View>
                        {index < invoices.length - 1 && <Divider />}
                    </>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    p: {
        padding: 7
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
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
    invoiceTitle: {
        fontSize: 15,
        fontWeight: 'bold',
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
