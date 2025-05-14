import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Searchbar, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AccountStyles from '../auth/AccountStyles';
import Apis, { authApis, endpoints } from '../../config/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Survey = () => {
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
                let url = `${endpoints['surveys']}?page=${page}`

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
            {loading && surveys.length === 0 ? (
                <View style={{ padding: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size={40} />
                </View>
            ) : surveys.length > 0 ? (
                <>
                    <Searchbar
                        style={{ backgroundColor: 'white', margin: 7, borderRadius: 20 }}
                        placeholder="Tìm kiếm"
                        onChangeText={t => search(t, setQ)}
                        value={q}
                    />

                    <FlatList
                        contentContainerStyle={{ paddingBottom: 20 }}
                        onEndReached={loadMore}
                        ListFooterComponent={loading && <ActivityIndicator size={30} />}
                        data={surveys}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity activeOpacity={0.8} onPress={() => nav.navigate('SurveyQuestions', { survey: item })}>
                                <Card style={[AccountStyles.card, { padding: 5 }]}>
                                    <Card.Content>
                                        <View style={styles.row}>
                                            <View>
                                                <Text style={styles.title}>{item.title}</Text>
                                                <Text style={styles.description}>
                                                    {item.description.length > 30
                                                        ? `${item.description.substring(0, 30)}...`
                                                        : item.description}
                                                </Text>
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
                </>
            ) : (
                <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Không có khảo sát nào</Text>
                </View>
            )}
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
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

export default Survey;
