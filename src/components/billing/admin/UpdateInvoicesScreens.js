import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import useFetchWithToken from '../../../config/UseFetchWithToken';
import { endpoints } from '../../../config/Apis';
import { ActivityIndicator } from 'react-native-paper';
import AdminStyles from '../../../styles/AdminStyles';
import { RoomContext } from '../../room/admin/roomContext';

export default function UpdateInvoice({ route, navigation }) {
    // const { invoice } = route.params;
    const { selectedInvoice } = useContext(RoomContext);
    const [invoice, setInvoice] = useState(selectedInvoice)
    const [status, setStatus] = useState(selectedInvoice.status || 'Unpaid');
    const [description, setDescription] = useState(selectedInvoice.description || '');
    const [items, setItems] = useState(selectedInvoice.items || []);
    const [totalAmount, setTotalAmount] = useState(selectedInvoice.total_amount || 0);
    const { loading, fetchWithToken } = useFetchWithToken();
    const [errors, setErrors] = useState([]);

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);

    };

    const handleAddItem = () => {
        setItems([...items, { description: '', amount: '' }]);
    };

    const handleRemoveItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    const handleUpdate = async () => {
        const newErrors = items.map(item => {
            return {
                description: !item.description.trim(),
                amount: isNaN(parseFloat(item.amount)),
            };
        });

        setErrors(newErrors);

        const hasErrors = newErrors.some(err => err.description || err.amount);
        if (hasErrors) {
            alert("Vui lòng điền đầy đủ mô tả và số tiền hợp lệ cho tất cả các khoản.");
            return;
        }
        const payload = {
            status,
            description,
            total_amount: parseFloat(totalAmount),
            items: items.map(item => ({
                id: item.id,
                description: item.description,
                amount: parseFloat(item.amount),
            })),
        };


        const data = await fetchWithToken({
            method: 'PATCH',
            url: `${endpoints['invoices']}${invoice.id}/`,
            data: payload
        });

        if (data) {
            navigation.goBack();
        }

    };

    const handleDelete = () => {
        Alert.alert(
            "Xác nhận xoá",
            "Bạn có chắc muốn xoá hóa đơn này không?",
            [
                {
                    text: "Huỷ",
                    style: "cancel"
                },
                {
                    text: "Xoá",
                    style: "destructive",
                    onPress: async () => {
                        const data = await fetchWithToken({
                            method: 'DELETE',
                            url: `${endpoints['invoices']}${invoice.id}/`
                        });

                        alert("Xoá thành công!");
                        navigation.goBack();

                    }
                }
            ]
        );
    };

    useEffect(() => {
        const total = items.reduce((sum, item) => {
            const amount = parseFloat(item.amount);
            return sum + (isNaN(amount) ? 0 : amount);
        }, 0);
        setTotalAmount(total.toFixed(2));
    }, [items]);
    useEffect(() => {
        setInvoice(selectedInvoice);
        setStatus(selectedInvoice.status)
        setDescription(selectedInvoice.description)
        setItems(selectedInvoice.items)
    }, [selectedInvoice])
    return (
        <ScrollView style={styles.container}>
            <View style={AdminStyles.pbottom}>


                <Text style={styles.label}>Phòng số: {invoice.room.room_number}</Text>

                <Text style={styles.label}>Tổng tiền: {parseFloat(totalAmount).toLocaleString('vi-VN')} VND</Text>

                <Text style={styles.label}>Mô tả</Text>
                <TextInput
                    style={styles.input}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Tiền trọ tháng ..."
                />

                <Text style={styles.label}>Chi tiết các khoản</Text>
                {items.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Mô tả"
                            value={item.description}
                            onChangeText={(text) => handleItemChange(index, 'description', text)}

                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Số tiền"
                            keyboardType="numeric"
                            value={String(item.amount)}
                            onChangeText={(text) => handleItemChange(index, 'amount', text)}
                        />
                        <Button title="Xoá" color="red" onPress={() => handleRemoveItem(index)} />
                    </View>
                ))}

                <TouchableOpacity onPress={handleAddItem} style={styles.addButton}>

                    <Text style={[styles.addButtonText, styles.addButtonShape]}>+</Text>
                </TouchableOpacity>
                <View style={{ marginVertical: 10 }} />
                {loading ? <ActivityIndicator /> : <Button title="Cập nhật hóa đơn" onPress={handleUpdate} color={AdminStyles.successColor.backgroundColor} />}
                <View style={{ marginVertical: 10 }} />
            <Button title="Xoá hóa đơn" onPress={handleDelete} color="red"/>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderColor: "#ff6",
    },
    input: {
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 8,
        padding: 10,
        marginVertical: 8,
        // minWidth:170
    },
    label: {
        fontWeight: 'bold',
        marginTop: 12,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // marginVertical: 10,
    },
    addButtonShape: {
        backgroundColor: "#9EC6F3",
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 40,
        paddingLeft: 40,
        borderRadius: 20
    },
    addButtonText: {
        marginLeft: 6,
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
    itemContainer: {
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
    }
});