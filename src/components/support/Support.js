import { StyleSheet, View } from "react-native"
import { FlatList, ScrollView } from "react-native-gesture-handler"
import AccountStyles from "../auth/AccountStyles"
import { Divider, Text } from "react-native-paper"
import MenuItem from "../auth/MenuItem"
import { Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import React from "react"

const supports = [
    {
        id: 1,
        title: 'Yêu cầu sữa chữa',
        description: "abc",
        status: 'Pending',
        time: '21:05 - 08/02/2024',
    },
    {
        id: 2,
        title: 'Yêu cầu sữa chữa',
        description: "abc",
        status: 'Pending',
        time: '21:05 - 08/02/2024',
    },
    {
        id: 3,
        title: 'Yêu cầu sữa chữa',
        description: "abc",
        status: 'Resolved',
        time: '21:05 - 08/02/2024',
    }
];

const Support = () => {
    const nav = useNavigation()

    return (
        <View style={AccountStyles.container}>
            <Text style={styles.title}>Yêu cầu</Text>
            <View style={AccountStyles.card}>
                <MenuItem
                    icon={<Feather name="send" size={22} color="#333" />}
                    title="Gửi yêu cầu hỗ trợ"
                    onPress={() => nav.navigate('SendSupport')}
                />
            </View>

            <View style={[styles.row, { padding: 7 }]}>
                <Text style={[styles.title, { marginHorizontal: 5 }]}>Yêu cầu của tôi</Text>
                <Text style={{ color: '#376be3' }}>Xem thêm</Text>
            </View>

            <FlatList
                data={supports}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <View key={item.id}>
                        <View style={[styles.row, { padding: 7, marginVertical: 5 }]}>
                            <View style={styles.row}>
                                <View style={{ marginLeft: 12 }}>
                                    <Text style={styles.label}>{item.title}</Text>
                                    <Text >{item.time}</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: 'flex-end' }} >
                                {item.status === "Pending" ? <Text style={{ color: 'orange' }}>Đã gửi</Text> :
                                    <Text style={{ color: '#4CAF50' }}>Đã giải quyết</Text>}
                            </View>
                        </View>
                        {index < supports.length - 1 && <Divider />}
                    </View>
                )}
                contentContainerStyle={{ paddingHorizontal: 7 }}
            />

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
})

export default Support