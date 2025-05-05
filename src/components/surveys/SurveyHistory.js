import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Searchbar, ActivityIndicator, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AccountStyles from '../auth/AccountStyles';
import Apis, { authApis, endpoints } from '../../config/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SurveyHistory = () => {
    const [surveys, setSurveys] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [q, setQ] = useState()
    const nav = useNavigation();

    const loadSurveys = async () => {
        if (page > 0) {
            try {
                setLoading(true)

                const token = await AsyncStorage.getItem("access-token")
                let url = `${endpoints['surveys-history']}?page=${page}`

                if (q) {
                    url = `${url}&q=${q}`
                }
                console.info(url)

                let res = await authApis(token).get(url)
                setSurveys([...surveys, ...res.data.results])

                if (res.data.next === null)
                    setPage(0)
            } catch (ex) {
                console.error(ex)
            } finally {
                setLoading(false)
            }
        }
    }

    const loadMore = () => {
        if (!loading && page > 0) {
            setPage(page + 1)
        }
    }

    const search = (value, callback) => {
        setSurveys([])
        callback(value)
        setTimeout(() => setPage(1), 100);
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            loadSurveys()
        }, 500);

        return () => clearTimeout(timer)
    }, [q, page])

    return (
        <View style={AccountStyles.container}>
            <Searchbar
                style={{ backgroundColor: 'white', margin: 7, borderRadius: 20 }}
                placeholder="Tìm kiếm"
                onChangeText={t => search(t, setQ)}
                value={q}
            />

            <FlatList
                onEndReached={loadMore} ListFooterComponent={loading && <ActivityIndicator size={30} />}
                data={surveys}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => nav.navigate('SurveyQuestions', { 'survey': item, 'done': true })}>
                        <Card style={[AccountStyles.card, { padding: 5 }]}>
                            <Card.Content>
                                <View style={styles.row}>
                                    <View style={styles.row}>
                                        <Avatar.Icon icon="check" size={40} style={{ backgroundColor: '#4CAF50' }} color="white" />
                                        <View style={{ marginLeft: 12 }}>
                                            <Text style={styles.title}>{item.title}</Text>
                                            <Text style={styles.description}>
                                                {item.description.length > 30
                                                    ? `${item.description.substring(0, 30)}...`
                                                    : item.description}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ alignItems: 'flex-end' }}>
                                        <Text style={styles.description}>
                                            {new Date(item.created_date).toLocaleDateString('vi-VN')}
                                        </Text>
                                    </View>
                                </View>
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
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

export default SurveyHistory;
