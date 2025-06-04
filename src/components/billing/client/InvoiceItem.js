import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { formatVietNamCurrency } from '../../../utils/utils';

const InvoiceItem = ({ item }) => (
    <View style={styles.item}>
        <View style={styles.info}>
            <Text style={styles.name}>{item.description}</Text>
        </View>
        <View>
            <Text style={styles.label}>
                {formatVietNamCurrency(item.amount)}
            </Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    info: {
        flex: 1,
        marginLeft: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
    },
    subtitle: {
        fontSize: 14,
    }
});

export default InvoiceItem;
