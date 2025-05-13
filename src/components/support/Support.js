import { ActivityIndicator, StyleSheet, View } from "react-native"
import { FlatList, ScrollView } from "react-native-gesture-handler"
import AccountStyles from "../auth/AccountStyles"
import { Divider, Text, ToggleButton } from "react-native-paper"
import MenuItem from "../auth/MenuItem"
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { authApis, endpoints } from "../../config/Apis"
import { SafeAreaView } from "react-native-safe-area-context"

const Support = () => {
    const nav = useNavigation()
    const [loading, setLoading] = useState(false)
    const [complaints, setComplaints] = useState([])
    const [page, setPage] = useState(1)
    const [roomLoading, setRoomLoading] = useState(false)
    const [roomComplaints, setRoomComplaints] = useState([])
    const [roomPage, setRoomPage] = useState(1)
    const [viewType, setViewType] = useState("room")

    const loadComplaints = async () => {
        if (page > 0) {
            try {
                setLoading(true)

                const token = await AsyncStorage.getItem("access-token")
                let url = `${endpoints["my-complaints"]}?page=${page}`

                console.info(url)

                let res = await authApis(token).get(url)
                setComplaints([...complaints, ...res.data.results])

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

    const loadRoomComplaints = async () => {
        if (roomPage > 0) {
            try {
                setRoomLoading(true)

                const token = await AsyncStorage.getItem("access-token")
                const url = `${endpoints["my-room-complaints"]}?page=${roomPage}`
                console.info(url)

                const res = await authApis(token).get(url)
                setRoomComplaints([...roomComplaints, ...res.data.results])

                if (res.data.next === null)
                    setRoomPage(0)
            } catch (ex) {
                console.error(ex)
            } finally {
                setRoomLoading(false)
            }
        }
    }

    const loadRoomMore = () => {
        if (!roomLoading && roomPage > 0) {
            setRoomPage(roomPage + 1)
        }
    }

    useEffect(() => {
        if (viewType === "room") {
            loadRoomComplaints();
        }
    }, [roomPage, viewType]);

    useEffect(() => {
        if (viewType === "mine") {
            loadComplaints();
        }
    }, [page, viewType]);

    useEffect(() => {
        if (viewType === "room") {
            setComplaints([])
            setPage(1)
        } else {
            setRoomComplaints([])
            setRoomPage(1)
        }
    }, [viewType])


    const renderComplaintItem = ({ item, index }) => (
        <View key={item.id}>
            <View style={[styles.row, { padding: 7, marginVertical: 5 }]}>
                <View style={styles.row}>
                    <View style={{ marginLeft: 5 }}>
                        <Text style={styles.label}>{item.title}</Text>
                        <Text>{new Date(item.created_date).toLocaleDateString('vi-VN')}</Text>
                    </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    {item.status === "Pending" ? <Text style={{ color: 'orange' }}>Đã gửi</Text> :
                        <Text style={{ color: '#4CAF50' }}>Đã giải quyết</Text>}
                </View>
            </View>
            <Divider />
        </View>
    )

    return (
        <View style={[AccountStyles.container, {justifyContent: 'none'}]}>
            <Text style={styles.title}>Yêu cầu</Text>
            <View style={{}}>
                <MenuItem
                    icon={<Feather name="send" size={22} color="#333" />}
                    title="Gửi yêu cầu hỗ trợ"
                    onPress={() => nav.navigate('SendSupport')}
                />
            </View>

            <View style={[styles.row, { padding: 7 }]}>
                <Text style={[styles.title, { marginHorizontal: 5 }]}>
                    Yêu cầu của {viewType === "mine" ? "tôi" : "phòng"}
                </Text>
                <ToggleButton.Row
                    onValueChange={value => {
                        if (value) setViewType(value)
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
                        Phòng
                    </ToggleButton>


                    <ToggleButton
                        value="mine"
                        icon={() => (
                            <MaterialCommunityIcons name="account" size={25} color={viewType === "mine" ? "#fff" : "#376be3"} />
                        )}
                        style={[viewType === "mine" && styles.activeToggle, { borderRadius: 10 }]}
                    >
                        Cá nhân
                    </ToggleButton>
                </ToggleButton.Row>

            </View>

            {viewType === "mine" ? (
                loading && complaints.length === 0 ? (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                        <ActivityIndicator size={40} />
                    </View>
                ) : complaints.length > 0 ? (
                    <FlatList
                        key={viewType}
                        onEndReached={loadMore}
                        ListFooterComponent={loading && <ActivityIndicator size={30} />}
                        data={complaints}
                        keyExtractor={(item) => `mine-${item.id}`}
                        renderItem={renderComplaintItem}
                        contentContainerStyle={{ paddingHorizontal: 7, paddingBottom: 20 }}
                    />
                ) : (
                    <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>Không có yêu cầu</Text>
                    </View>
                )
            ) : (
                roomLoading && roomComplaints.length === 0 ? (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                        <ActivityIndicator size={40} />
                    </View>
                ) : roomComplaints.length > 0 ? (
                    <FlatList
                        key={viewType}
                        onEndReached={loadRoomMore}
                        ListFooterComponent={roomLoading && <ActivityIndicator size={30} />}
                        data={roomComplaints}
                        keyExtractor={(item) => `room-${item.id}`}
                        renderItem={renderComplaintItem}
                        contentContainerStyle={{ paddingHorizontal: 7, paddingBottom: 20 }}
                    />
                ) : (
                    <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>Không có yêu cầu</Text>
                    </View>
                )
            )}

        </View>
    )
}

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
})

export default Support