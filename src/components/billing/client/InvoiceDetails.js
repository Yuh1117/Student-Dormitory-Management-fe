import { useNavigation } from "@react-navigation/native";
import AccountStyles from "../../auth/AccountStyles";
import { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, Avatar, RadioButton, Text } from "react-native-paper";
import InvoiceItem from "./InvoiceItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApis, endpoints } from "../../../config/Apis";
import VNPayScreen from "./VNPayScreen";
import { useTranslation } from "react-i18next";

const InvoiceDetails = ({ route }) => {
    const invoice = route.params?.invoice;
    const [loading, setLoading] = useState(false);
    const [payment, setPayment] = useState('vnpay');
    const [showWebView, setShowWebView] = useState(false);
    const [paymentUrl, setPaymentUrl] = useState(null);
    const nav = useNavigation();
    const { t } = useTranslation();

    const pay = async () => {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem("access-token");
            const res = await authApis(token).post(endpoints['invoice-payment'](invoice.id));
            const url = res.data.payment_url;

            setPaymentUrl(url);
            setShowWebView(true);
        } catch (error) {
            console.error(error);
            alert(t('invoiceDetails.payment_error'));
        } finally {
            setLoading(false);
        }
    };

    if (showWebView && paymentUrl) {
        return (
            <Modal visible={showWebView} animationType="slide" presentationStyle="fullScreen">
                <VNPayScreen
                    paymentUrl={paymentUrl}
                    onPaymentComplete={(status) => {
                        setShowWebView(false);
                        if (status === true) {
                            Alert.alert(t('invoiceDetails.payment_success'));
                            nav.navigate('UserHome');
                        } else if (status === 'canceled') {
                            Alert.alert(t('invoiceDetails.payment_canceled'));
                        } else {
                            Alert.alert(t('invoiceDetails.payment_failed'));
                        }
                    }}
                />
            </Modal>
        );
    }

    return (
        <ScrollView contentContainerStyle={[AccountStyles.container, { justifyContent: '' }]}>
            <View style={{ flex: 1 }}>
                <View style={[AccountStyles.card]}>
                    <View style={styles.row}>
                        <Avatar.Icon icon="home" size={45} style={{ backgroundColor: '#FFF3E0' }} color="#FF9800" />
                        <View style={{ marginLeft: 12 }}>
                            <Text style={styles.title}>{invoice.description}</Text>
                            <Text>
                                {new Date(invoice.created_date).toLocaleDateString('vi-VN')}
                            </Text>
                        </View>
                    </View>

                    <View>
                        <Text style={[styles.label, { marginVertical: 10 }]}>
                            {t('invoiceDetails.details')}
                        </Text>

                        {invoice.items.map(i =>
                            <InvoiceItem key={i.id} item={i} />)
                        }
                    </View>
                </View>

                <View style={AccountStyles.card}>
                    <View style={[styles.row]}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.label}>{t('invoiceDetails.total_amount')}</Text>
                        </View>
                        <View>
                            <Text style={[styles.label, { fontSize: 25, color: '#376be3' }]}>
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(invoice.total_amount)}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={AccountStyles.card}>
                    <Text style={styles.title}>{t('invoiceDetails.payment_method')}</Text>
                    <RadioButton.Group onValueChange={newValue => setPayment(newValue)} value={payment}>
                        <View style={styles.row}>
                            <RadioButton value="vnpay" />
                            <Text>{t('invoiceDetails.payment_methods.vnpay')}</Text>
                        </View>
                    </RadioButton.Group>
                </View>
            </View>

            <TouchableOpacity style={[AccountStyles.button, { backgroundColor: '#376be3', margin: 7 }]} disabled={loading}
                onPress={pay}>
                {loading ? <ActivityIndicator color="white" /> : <Text style={AccountStyles.buttonText}>{t('invoiceDetails.pay_button')}</Text>}
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        fontWeight: '800',
    },
});

export default InvoiceDetails;