import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View, Modal } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, Card, Title, Paragraph, Text, Divider } from "react-native-paper";
import { authApis, endpoints } from "../../config/Apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AccountStyles from "../auth/AccountStyles"

const SupportDetail = ({ route }) => {
    const [loading, setLoading] = useState(false);
    const support = route.params?.support;
    const [responses, setResponses] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);


    const loadSupport = async () => {
        try {
            setLoading(true);

            const token = await AsyncStorage.getItem("access-token");
            const res = await authApis(token).get(endpoints["complaints-responses"](support.id));

            setResponses(res.data.results);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSupport();
    }, []);

    return (
        <View style={[AccountStyles.container, { justifyContent: '' }]}>
            <ScrollView>
                {support && (
                    <>
                        <View style={AccountStyles.card}>
                            <View>
                                <View style={styles.row}>
                                    <Text style={styles.title}>{support.title}</Text>
                                    {support.status === "Pending" ? <Text style={{ color: 'orange' }}>Đã gửi</Text> :
                                        <Text style={{ color: '#4CAF50' }}>Đã giải quyết</Text>}
                                </View>
                                <Paragraph style={styles.description}>{support.description}</Paragraph>
                                {support.image !== '' && (
                                    <>
                                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                                            <Image
                                                style={styles.image}
                                                resizeMode="contain"
                                                source={{ uri: support.image }}
                                            />
                                        </TouchableOpacity>

                                        <Modal
                                            visible={modalVisible}
                                            transparent={true}
                                            animationType="fade"
                                            onRequestClose={() => setModalVisible(false)}
                                        >
                                            <TouchableOpacity style={styles.modalContainer} onPress={() => setModalVisible(false)}>
                                                <Image
                                                    style={styles.fullImage}
                                                    resizeMode="contain"
                                                    source={{ uri: support.image }}
                                                />
                                            </TouchableOpacity>
                                        </Modal>
                                    </>
                                )}

                            </View>
                        </View>

                        <View style={AccountStyles.card}>
                            <View>
                                <Text style={styles.title}>Phản hồi</Text>
                                {loading ? (
                                    <View style={{ padding: 20, alignItems: 'center', justifyContent: 'center' }}>
                                        <ActivityIndicator size={40} />
                                    </View>
                                ) : responses.length > 0 ? (
                                    responses.map((r, idx) => (
                                        <View key={idx} style={{ marginBottom: 10 }}>
                                            <Text style={styles.description}>{r.content}</Text>
                                            <Text style={styles.responseDate}>
                                                {new Date(r.created_date).toLocaleDateString("vi-VN", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </Text>
                                            {idx < responses.length - 1 && <Divider style={{ marginTop: 10 }} />}
                                        </View>
                                    ))
                                ) : (
                                    <Paragraph>Chưa có phản hồi!</Paragraph>
                                )}
                            </View>
                        </View>
                    </>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    }, row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    description: {
        fontSize: 16,
        color: 'dark'
    },
    responseDate: {
        fontSize: 14,
        color: "#777",
        marginTop: 4,
    },
    image: {
        height: 200,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ddd',
        borderWidth: 3,
        marginVertical: 8,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullImage: {
        width: '100%',
        height: '100%',
    },

});

export default SupportDetail;
