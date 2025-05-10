import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { authApis } from '../../../config/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VNPayScreen = ({ paymentUrl, onPaymentComplete }) => {
    const [loading, setLoading] = useState(true);

    return (
        <View style={styles.container}>
            {loading && (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
            )}
            <WebView
                source={{ uri: paymentUrl }}
                onLoadEnd={() => setLoading(false)}
                onNavigationStateChange={async (navState) => {
                    if (navState.url.includes('vnpay_payment_return')) {
                        try {
                            const token = await AsyncStorage.getItem("access-token");
                            const res = await authApis(token).get(navState.url);

                            if (res.data.status === 'success') {
                                onPaymentComplete(true);
                            } else if (res.data.status === 'canceled') {
                                onPaymentComplete('canceled');
                            } else {
                                onPaymentComplete(false);
                            }
                        } catch (e) {
                            console.error(e);
                            onPaymentComplete(false)
                        }
                    }
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loader: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }],
    },
});

export default VNPayScreen;