import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AccountStyles from '../auth/AccountStyles';
import { Feather } from '@expo/vector-icons';

const surveys = [
    {
        id: '1',
        title: 'Khảo sát tiện nghi phòng ở',
        description: 'Đánh giá chất lượng phòng, thiết bị, và dịch vụ.',
    },
    {
        id: '2',
        title: 'Khảo sát vệ sinh KTX',
        description: 'Ý kiến về công tác vệ sinh, môi trường xung quanh.',
    },
    {
        id: '3',
        title: 'Khảo sát thái độ BQL',
        description: 'Góp ý về cách làm việc của ban quản lý ký túc xá.',
    },
];

const Survey = () => {
    const navigation = useNavigation();

    return (
        <View style={AccountStyles.container}>
            <FlatList
                data={surveys}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity>
                        <Card style={[AccountStyles.card, { padding: 5 }]}>
                            <Card.Content>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.description}>{item.description}</Text>
                            </Card.Content>
                        </Card>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
});

export default Survey;
