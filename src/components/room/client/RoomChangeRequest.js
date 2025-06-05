import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal, Alert, BackHandler } from 'react-native';
import { Text, Button, TextInput, Portal, HelperText, ActivityIndicator } from 'react-native-paper';
import AccountStyles from '../../auth/AccountStyles';
import { roomStyles } from '../../room/client/RoomDetails'
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApis, endpoints } from '../../../config/Apis';
import { useNavigation } from '@react-navigation/native';
import { formatVietNamCurrency } from '../../../utils/utils';

const RoomChangeRequest = ({ visible, onClose, room }) => {
    const { t } = useTranslation()
    const [reason, setReason] = useState('')
    const [msg, setMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const nav = useNavigation()

    if (!room) return null;

    const handleClose = () => {
        setReason('');
        setMsg('');
        onClose();
    };

    const validate = () => {
        if (!reason || reason.trim() === "") {
            setMsg("Lý do không được để trống!")
            return false;
        }

        return true;
    }

    const handleSubmit = () => {
        if (validate() === true) {
            Alert.alert(
                "Xác nhận",
                "Bạn có chắc chắn gửi yêu cầu này?",
                [
                    { text: "Hủy", style: "cancel" },
                    { text: "Xác nhận", onPress: handleSubmitRequest }
                ]
            )
        }
    }

    const handleSubmitRequest = async () => {
        try {
            setLoading(true)

            const token = await AsyncStorage.getItem("access-token")
            const res = await authApis(token).post(endpoints["room-change-requests"], {
                "requested_room": room.id,
                "reason": reason
            })

            Alert.alert("Bạn đã gửi yêu cầu thành công.")
            handleClose()
            nav.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: "UserHome" }],
                })
            )
        } catch (err) {
            console.error(err)
            Alert.alert("Đã xảy ra lỗi.");
        } finally {
            setLoading(false)
        }
    }

    return (
        <Portal>
            <Modal
                visible={visible}
                onRequestClose={handleClose}
                animationType='slide'
                transparent={true}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.header}>{t('roomChange.modal.title')}</Text>

                        <View style={roomStyles.row}>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.modalText}>{t('roomDetails.building')}: {room.building.building_name}</Text>
                                <Text style={styles.modalText}>{t('roomDetails.floor')}: {room.floor}</Text>
                                <Text style={styles.modalText}>{t('room')}: {room.room_number}</Text>
                                <Text style={styles.modalText}>{t('roomChange.monthly_fee')}: {formatVietNamCurrency(room.monthly_fee)}</Text>
                            </View>
                            <View style={[roomStyles.row, { flex: 1, flexWrap: 'wrap', gap: 3 }]}>
                                <View style={[roomStyles.capacityBox, { backgroundColor: '#FFF3E0' }]}>
                                    <Text style={[roomStyles.capacityText, { color: "#FF9800" }]}>
                                        {room.room_type}
                                    </Text>
                                </View>
                                <View style={[roomStyles.capacityBox]}>
                                    <Text style={roomStyles.capacityText}>
                                        {t('roomDetails.total_beds')}: {room.total_beds}
                                    </Text>
                                </View>
                                <View style={roomStyles.availableBox}>
                                    <Text style={roomStyles.availableText}>
                                        {t('roomDetails.available_beds', { count: room.available_beds })}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.header}>{t('roomChange.reason')}</Text>

                            <TextInput
                                label="Lý do"
                                mode="outlined"
                                style={[AccountStyles.input, { padding: 0, borderWidth: 0, height: 150, backgroundColor: 'white' }]}
                                multiline
                                numberOfLines={4}
                                value={reason}
                                onChangeText={setReason}
                                theme={{
                                    roundness: 8,
                                }}
                            />
                        </View>

                        {msg &&
                            <HelperText style={{ fontSize: 18 }} type="error" visible={msg}>
                                {msg}
                            </HelperText>
                        }

                        <View style={styles.modalActions}>
                            <Button
                                mode="outlined"
                                onPress={handleClose}
                                style={styles.actionButton}
                            >
                                {t('close')}
                            </Button>
                            <Button
                                mode="contained"
                                onPress={handleSubmit}
                                style={styles.actionButton}
                                disabled={loading}
                            >
                                {loading ? <ActivityIndicator color="white" /> : <Text style={AccountStyles.buttonText}>{t('send')}</Text>}
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 5,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 5,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    actionButton: {
        flex: 1,
        marginHorizontal: 5,
    },
});

export default RoomChangeRequest;