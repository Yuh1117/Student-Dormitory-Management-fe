import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import AccountStyles from "../auth/AccountStyles";
import { Divider, Text, ToggleButton } from "react-native-paper";
import MenuItem from "../auth/MenuItem";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApis, endpoints } from "../../config/Apis";
import { useTranslation } from "react-i18next";
import { MyUserContext } from '../../config/MyContexts';

const Support = () => {
    const user = useContext(MyUserContext)
    const nav = useNavigation();
    const [loading, setLoading] = useState(false);
    const [complaints, setComplaints] = useState([]);
    const [page, setPage] = useState(1);
    const [viewType, setViewType] = useState("room");
    const { t } = useTranslation();

    const loadComplaints = async () => {
        if (page > 0) {
            try {
                setLoading(true);

                const token = await AsyncStorage.getItem("access-token");
                let url = `${endpoints["my-room-complaints"]}?page=${page}`;

                if (viewType === 'mine') {
                    url = `${url}&student=${user?._j.id}`
                }

                console.info(url);

                let res = await authApis(token).get(url);
                setComplaints([...complaints, ...res.data.results]);

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

    const handleViewTypeChange = (value) => {
        setViewType(value)
        setComplaints([]);
        setPage(0);
        setTimeout(() => setPage(1), 0);
    }

    useEffect(() => {
        loadComplaints()
    }, [page]);

    const renderComplaintItem = ({ item }) => (
        <TouchableOpacity onPress={() => nav.navigate('SupportDetail', { support: item })}>
            <View key={item.id}>
                <View style={[styles.row, { padding: 7, marginVertical: 5 }]}>
                    <View style={styles.row}>
                        <View style={{ marginLeft: 5 }}>
                            <Text style={styles.label}>{item.title}</Text>
                            <Text>{new Date(item.created_date).toLocaleDateString('vi-VN')}</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        {item.status === "Pending" ? (
                            <Text style={{ color: 'orange' }}>{t('support.status.pending')}</Text>
                        ) : (
                            <Text style={{ color: '#4CAF50' }}>{t('support.status.resolved')}</Text>
                        )}
                    </View>
                </View>
                <Divider />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={[AccountStyles.container, { justifyContent: 'none' }]}>
            <Text style={styles.title}>{t('support.title')}</Text>
            <View>
                <MenuItem
                    icon={<Feather name="send" size={22} color="#333" />}
                    title={t('sendSupport.title')}
                    onPress={() => nav.navigate('SendSupport')}
                />
            </View>

            <View style={[styles.row, { padding: 7 }]}>
                <Text style={[styles.title, { marginHorizontal: 5 }]}>
                    {t('support.view_type.' + viewType)}
                </Text>
                <ToggleButton.Row
                    onValueChange={(value) => {
                        if (value) {
                            handleViewTypeChange(value)
                        }
                    }}
                    value={viewType}
                    style={{ justifyContent: 'center', marginVertical: 5 }}
                >
                    <ToggleButton
                        value="room"
                        icon={() => (
                            <MaterialCommunityIcons name="account-group" size={25} color={viewType === "room" ? "#fff" : "#376be3"} />
                        )}
                        style={[viewType === "room" && styles.activeToggle, { borderRadius: 10 }]}
                    >
                        {t('support.view_type.room')}
                    </ToggleButton>

                    <ToggleButton
                        value="mine"
                        icon={() => (
                            <MaterialCommunityIcons name="account" size={25} color={viewType === "mine" ? "#fff" : "#376be3"} />
                        )}
                        style={[viewType === "mine" && styles.activeToggle, { borderRadius: 10 }]}
                    >
                        {t('support.view_type.mine')}
                    </ToggleButton>
                </ToggleButton.Row>
            </View>

            {loading && complaints.length === 0 ? (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                    <ActivityIndicator size={40} />
                </View>
            ) : complaints.length > 0 ? (
                <FlatList
                    key={viewType}
                    onEndReached={loadMore}
                    ListFooterComponent={loading && <ActivityIndicator size={30} />}
                    data={complaints}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderComplaintItem}
                    contentContainerStyle={{ paddingHorizontal: 7, paddingBottom: 20 }}
                />
            ) : (
                <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>{t('support.no_requests')}</Text>
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
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 16,
        fontWeight: '700',
    },
    activeToggle: {
        backgroundColor: '#376be3',
    },
});

export default Support;