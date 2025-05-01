import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const RoommateItem = ({ item }) => (
    <View style={styles.item}>
        <Image source={item.avatar ? { uri: item.avatar } : require('../../../assets/batman.png')} style={styles.avatar} />
        <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
        <View style={styles.actions}>
            <TouchableOpacity>
                <MaterialIcons name="chat" size={30} color="#4a90e2" />
            </TouchableOpacity>
        </View>
    </View>
);

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 42,
        height: 42,
        borderRadius: 21,
    },
    info: {
        flex: 1,
        marginLeft: 12,
    },
    name: {
        fontSize: 15,
        fontWeight: '600',
    },
    subtitle: {
        fontSize: 13,
        color: '#666',
    },
    actions: {
        flexDirection: 'row',
        gap: 8,
    },
});

export default RoommateItem;
