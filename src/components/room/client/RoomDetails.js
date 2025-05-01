import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AccountStyles from '../../auth/AccountStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import RoommateItem from './RoommateItem';

const RoomDetails = () => {

    const roommates = [
        {
            id: '1',
            name: 'Trương Tuấn Anh',
            subtitle: 'ĐH Khoa học Xã hội và Nhân văn'
        },
        {
            id: '2',
            name: 'Bùi Tuấn Anh',
            subtitle: 'ĐH Sài Gòn'
        },
        {
            id: '3',
            name: 'Châu Đức An',
            subtitle: 'ĐH Mở'
        },
        {
            id: '4',
            name: 'Lê Duy Minh',
            subtitle: 'ĐH Luật'
        },
    ];

    return (
        <View style={AccountStyles.container}>
            <ScrollView>
                <View style={AccountStyles.card}>
                    <View style={styles.row}>
                        <Text style={styles.title}>Toà A - </Text>
                        <Text style={styles.title}>Phòng 101</Text>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.capacityBox}>
                            <Text style={styles.capacityText}>Số chỗ: 6</Text>
                        </View>
                        <View style={styles.availableBox}>
                            <Text style={styles.availableText}>Còn 1 chỗ</Text>
                        </View>
                    </View>
                </View>

                <View style={AccountStyles.card}>
                    <Text style={styles.title}>Bạn cùng phòng</Text>
                    {roommates.map(r => <RoommateItem key={r.id} item={r} />)}
                </View>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'center'
    },
    capacityBox: {
        backgroundColor: '#E6EEFF',
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 6,
        marginRight: 10
    },
    capacityText: {
        color: '#3366CC',
        fontWeight: 'bold',
        fontSize: 13,
    },
    availableBox: {
        backgroundColor: '#E6F4EA',
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    availableText: {
        color: '#2E7D32',
        fontWeight: 'bold',
        fontSize: 13,
    },
});

export default RoomDetails