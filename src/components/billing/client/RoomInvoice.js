import * as React from 'react';
import { View, StyleSheet, FlatList, ScrollView, Dimensions } from 'react-native';
import { Card, Button, Divider, Avatar } from 'react-native-paper';
import { Text } from 'react-native';
import AccountStyles from '../../auth/AccountStyles';

const invoices = [
    {
        id: 1,
        type: 'Hoá đơn phòng',
        amount: '400.000đ',
        status: 'Unpaid',
        time: '21:05 - 08/02/2024'
    },
    {
        id: 2,
        type: 'Hoá đơn phòng',
        amount: '200.000đ',
        status: 'Paid',
        time: '21:05 - 08/02/2024'
    },
    {
        id: 3,
        type: 'Hoá đơn phòng',
        amount: '1.000.000đ',
        status: 'Paid',
        time: '21:05 - 08/02/2024'
    }
];

const RoomInvoice = () => {
    const screenWidth = Dimensions.get('window').width;


    return (
        <View style={[AccountStyles.container, { flex: 0 }]}>
            <Text style={styles.title}>Hoá đơn chưa thanh toán</Text>

            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {invoices.map((item) => (
                    <Card key={item.id} style={[styles.card, { width: screenWidth - 50 }]}>
                        <Card.Content>
                            <View style={[styles.row, { marginVertical: 5 }]}>
                                <View style={styles.row}>
                                    <Avatar.Icon icon="home" size={45} style={{ backgroundColor: '#FFF3E0' }} color="#FF9800" />
                                    <View style={{ marginLeft: 12 }}>
                                        <Text style={styles.label}>{item.type}</Text>
                                        <Text style={styles.timestamp}>{item.time}</Text>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={styles.unpaid}>{item.amount}</Text>
                                    <Text style={[styles.unpaid, { fontSize: 13 }]}>
                                        Chưa thanh toán
                                    </Text>
                                </View>
                            </View>

                            <Button
                                mode="outlined"
                                style={styles.checkButton}
                                textColor="#376be3"
                                onPress={() => console.log('check')}
                            >
                                Kiểm tra
                            </Button>
                        </Card.Content>
                    </Card>
                ))}
            </ScrollView>

            <View style={[styles.row, { padding: 7 }]}>
                <Text style={[styles.title, { margin: 0 }]}>Hoá đơn của tôi</Text>
                <Text style={{ color: '#376be3' }}>Xem thêm</Text>
            </View>

            <FlatList
                onEndReached={() => console.log(1)}
                data={invoices}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <View key={item.id}>
                        <View style={[styles.row, { padding: 7, marginVertical: 5 }]}>
                            <View style={styles.row}>
                                <Avatar.Icon icon="home" size={30} style={{ backgroundColor: '#376be3' }} color="white" />
                                <View style={{ marginLeft: 12 }}>
                                    <Text style={styles.label}>{item.type}</Text>
                                    <Text>{item.time}</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={styles.label}>{item.amount}</Text>
                                <Text style={{ color: '#4CAF50' }}>
                                    Đã thanh toán
                                </Text>
                            </View>
                        </View>
                        {index < invoices.length - 1 && <Divider />}
                    </View>
                )}
                contentContainerStyle={{ paddingHorizontal: 7 }}
            />
        </View>
    );
};

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
    },
});

export default RoomInvoice;
