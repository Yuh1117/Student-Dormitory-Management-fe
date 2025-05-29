import { View, StyleSheet, FlatList, ScrollView, Dimensions } from 'react-native';
import { Card, Button, Divider, Avatar, ActivityIndicator } from 'react-native-paper';
import { Text } from 'react-native';
import AccountStyles from '../../auth/AccountStyles';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApis, endpoints } from '../../../config/Apis';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const RoomInvoice = () => {
    const screenWidth = Dimensions.get('window').width;
    const [loading, setLoading] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [page, setPage] = useState(1);
    const [paidInvoices, setPaidInvoices] = useState([]);
    const [unpaidInvoices, setUnpaidInvoices] = useState([]);
    const nav = useNavigation();
    const { t } = useTranslation();

    const loadInvoices = async () => {
        if (page > 0) {
            try {
                setLoading(true);

                const token = await AsyncStorage.getItem("access-token");
                let url = `${endpoints['my-room-invoices']}?page=${page}`;

                console.info(url);

                let res = await authApis(token).get(url);
                const newInvoices = [...invoices, ...res.data.results];
                setInvoices(newInvoices);

                setPaidInvoices(newInvoices.filter(inv => inv.status === 'Paid'));
                setUnpaidInvoices(newInvoices.filter(inv => inv.status == 'Unpaid'));

                if (res.data.next === null) setPage(0);
            } catch (ex) {
                console.error(ex);
            } finally {
                setLoading(false);
            }
        }
    };

    const loadMore = () => {
        if (!loading && page > 0) {
            setPage(page + 1);
        }
    };

    useEffect(() => {
        loadInvoices();
    }, [page]);

    return (
        <View style={[AccountStyles.container, { justifyContent: 'none' }]}>
            <Text style={styles.title}>{t('roomInvoice.unpaid_title')}</Text>

            {loading && unpaidInvoices.length === 0 ? (
                <View style={{ padding: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size={40} />
                </View>
            ) : unpaidInvoices.length > 0 ? (
                <View>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        onEndReached={loadMore}
                        ListFooterComponent={loading && <ActivityIndicator size={30} />}
                        data={unpaidInvoices}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <Card key={item.id} style={[styles.card, { width: screenWidth - 50, padding: 3 }]}>
                                <Card.Content>
                                    <View style={[styles.row, { marginBottom: 5 }]}>
                                        <View style={styles.row}>
                                            <Avatar.Icon
                                                icon="home"
                                                size={45}
                                                style={{ backgroundColor: '#FFF3E0' }}
                                                color="#FF9800"
                                            />
                                            <View style={{ marginLeft: 12 }}>
                                                <Text style={styles.label}>{item.description}</Text>
                                                <Text>
                                                    {new Date(item.created_date).toLocaleDateString('vi-VN')}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{ alignItems: 'flex-end' }}>
                                            <Text style={styles.unpaid}>
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.total_amount)}
                                            </Text>
                                            <Text style={[styles.unpaid, { fontSize: 13 }]}>
                                                {t('roomInvoice.unpaid_status')}
                                            </Text>
                                        </View>
                                    </View>

                                    <Button
                                        mode="outlined"
                                        style={styles.checkButton}
                                        textColor="#376be3"
                                        onPress={() => nav.navigate('InvoiceDetail', { invoice: item })}
                                    >
                                        {t('roomInvoice.check_button')}
                                    </Button>
                                </Card.Content>
                            </Card>
                        )}
                        contentContainerStyle={{ paddingHorizontal: 10 }}
                    />
                </View>
            ) : (
                <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>{t('roomInvoice.no_unpaid_invoices')}</Text>
                </View>
            )}

            <View style={[styles.row, { padding: 7 }]}>
                <Text style={[styles.title, { margin: 3 }]}>{t('roomInvoice.my_invoices_title')}</Text>
                <Text style={{ color: '#376be3' }}>{t('roomInvoice.view_more')}</Text>
            </View>

            {loading && unpaidInvoices.length === 0 ? (
                <View style={{ padding: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size={40} />
                </View>
            ) : paidInvoices.length > 0 ? (
                <FlatList
                    onEndReached={loadMore}
                    ListFooterComponent={loading && <ActivityIndicator size={30} />}
                    data={paidInvoices}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <View key={item.id}>
                            <View style={[styles.row, { padding: 7, marginVertical: 5 }]}>
                                <View style={styles.row}>
                                    <Avatar.Icon icon="home" size={30} style={{ backgroundColor: '#376be3' }} color="white" />
                                    <View style={{ marginLeft: 12 }}>
                                        <Text style={styles.label}>{item.description}</Text>
                                        <Text style={styles.description}>
                                            {new Date(item.created_date).toLocaleDateString('vi-VN')}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={styles.label}>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.total_amount)}
                                    </Text>
                                    <Text style={{ color: '#4CAF50' }}>
                                        {t('roomInvoice.paid_status')}
                                    </Text>
                                </View>
                            </View>
                            {index < invoices.length - 1 && <Divider />}
                        </View>
                    )}
                    contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
                />
            ) : (
                <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>{t('roomInvoice.no_unpaid_invoices')}</Text>
                </View>
            )}
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
        margin: 5,
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
        borderRadius: 10,
    },
});

export default RoomInvoice;