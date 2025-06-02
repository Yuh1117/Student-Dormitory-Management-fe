import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const RoommateItem = ({ item }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <TouchableOpacity onPress={() => setShowDetails(!showDetails)} activeOpacity={0.8}>
            <View style={styles.item}>
                <Image
                    source={item?.avatar ? { uri: item.avatar } : require('../../../assets/batman.png')}
                    style={styles.avatar}
                />
                <View style={styles.info}>
                    <Text style={styles.name}>{item?.last_name} {item?.first_name}</Text>

                    {showDetails && (
                        <>
                            <Text style={styles.subtitle}>{item?.email}</Text>
                            <Text style={styles.subtitle}>{item?.phone_number}</Text>
                            <Text style={styles.subtitle}>{item?.university}</Text>
                        </>
                    )}
                </View>
                <TouchableOpacity style={styles.chatIcon} onPress={() => setShowDetails(!showDetails)}>
                    <MaterialIcons name={showDetails ? "visibility" : "visibility-off"} size={30} color="#4a90e2" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 27,
    },
    info: {
        flex: 1,
        marginLeft: 15,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    subtitle: {
        fontSize: 14,
        color: '#555',
    },
    chatIcon: {
        paddingLeft: 10,
    },
});

export default RoommateItem;
