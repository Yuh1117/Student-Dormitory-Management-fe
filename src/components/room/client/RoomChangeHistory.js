import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApis, endpoints } from "../../../config/Apis";
import { useEffect, useState } from "react";
import AccountStyles from "../../auth/AccountStyles";
import { ActivityIndicator, Card, Text, Chip } from "react-native-paper";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const RoomChangeHistory = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [expandedId, setExpandedId] = useState(null);
    const nav = useNavigation();
    const { t } = useTranslation();

    const loadSurveys = async () => {
        if (page > 0) {
            try {
                setLoading(true);
                const token = await AsyncStorage.getItem("access-token");
                const url = `${endpoints["room-change-requests-history"]}?page=${page}`;
                const res = await authApis(token).get(url);
                
                setRequests([...requests, ...res.data.results]);
                
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

    useEffect(() => {
        loadSurveys();
    }, [page]);

    const toggleShow = (id) => {
        setExpandedId((prev) => (prev === id ? null : id));
    };

    const renderHistoryItem = ({ item }) => {
        const isExpanded = expandedId === item.id;
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => toggleShow(item.id)}>
                <Card style={[AccountStyles.card, { padding: 10 }]}>
                    <Card.Content>
                        <View style={styles.row}>
                            <View>
                                <Text style={styles.title}>
                                    {t("roomChangeHistory.currentRoom")}: <Text style={styles.highlight}>{item.current_room.room_number}</Text>
                                </Text>
                                <Text style={styles.title}>
                                    {t("roomChangeHistory.requestedRoom")}: <Text style={styles.highlight}>{item.requested_room.room_number}</Text>
                                </Text>
                            </View>
                            <Chip
                                style={{
                                    backgroundColor: item.status === "Pending" ? "orange" : item.status === "Approved" ? "#4CAF50" : "red",
                                    marginTop: 5,
                                }}
                            >
                                {t(`roomChangeHistory.status.${item.status.toLowerCase()}`)}
                            </Chip>
                        </View>
                        {isExpanded && (
                            <View style={styles.reasonBox}>
                                <Text style={styles.title}>{t("roomChangeHistory.reason")}:</Text>
                                <Text>{item.reason}</Text>
                            </View>
                        )}
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        );
    };

    return (
        <View style={[AccountStyles.container]}>
            {loading && requests.length === 0 ? (
                <View style={{ padding: 20, alignItems: "center", justifyContent: "center" }}>
                    <ActivityIndicator size={40} />
                </View>
            ) : requests.length > 0 ? (
                <FlatList
                    contentContainerStyle={{ paddingBottom: 20 }}
                    onEndReached={loadMore}
                    ListFooterComponent={loading && <ActivityIndicator size={30} />}
                    data={requests}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderHistoryItem}
                />
            ) : (
                <View style={{ padding: 10, alignItems: "center", justifyContent: "center" }}>
                    <Text>{t("roomChangeHistory.noRequests")}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    title: {
        fontSize: 16,
        fontWeight: "800",
        marginBottom: 4,
    },
    highlight: {
        color: "#376be3",
    },
    reasonBox: {
        marginTop: 12,
        padding: 10,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: "#376be3",
    },
});

export default RoomChangeHistory;