import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import useFetchWithToken from '../../config/UseFetchWithToken';
import { endpoints } from '../../config/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { MyDispatchContext, MyUserContext } from '../../config/MyContexts';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChangPasswordScreen = () => {
    const user = useContext(MyUserContext)
    const dispatch = useContext(MyDispatchContext)
    const navigation = useNavigation();
    const { control, handleSubmit, setValue, formState: { errors } } = useForm();
    const { loading, fetchWithToken } = useFetchWithToken()

    useEffect(() => {
        if (user?._j) {
            setValue('username', user._j.username || '');
            setValue('email', user._j.email || '');
            setValue('phone_number', user._j?.phone_number || '');
        }
    }, []);

    const onSubmit = async (data) => {
        const { confirm_password, ...submitData } = data;
        const token = await AsyncStorage.getItem("access-token");
        const res = await fetchWithToken({
            method: 'PATCH',
            url: endpoints["current-user"],
            data: {
                ...submitData,
                is_first_access: false,
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (res) {
            dispatch({
                "type": "update",
                "payload": res
            });
            res.is_staff ? navigation.navigate("AdminHome") : navigation.navigate('UserHome')
        }

    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Cập nhật thông tin cá nhân</Text>

            <Controller
                control={control}
                name="last_name"
                rules={{ required: 'Thông tin bắt buộc' }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Họ"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.first_name && <Text style={styles.error}>{errors.first_name.message}</Text>}

            <Controller
                control={control}
                name="first_name"
                rules={{ required: 'Thông tin bắt buộc' }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Tên"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.last_name && <Text style={styles.error}>{errors.last_name.message}</Text>}

            <Controller
                control={control}
                name="username"
                rules={{ required: 'Thông tin bắt buộc' }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Tên đăng nhập"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}

            <Controller
                control={control}
                name="email"
                rules={{
                    required: 'Thông tin bắt buộc',
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Email không hợp lệ',
                    },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

            <Controller
                control={control}
                name="phone_number"
                rules={{
                    required: 'Thông tin bắt buộc',
                    pattern: {
                        value: /^\d{10}$/,
                        message: 'Số điện thoại không hợp lệ',
                    },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="SĐT"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.phone_number && <Text style={styles.error}>{errors.phone_number.message}</Text>}

            <Controller
                control={control}
                name="password"
                rules={{ required: 'Thông tin bắt buộc' }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Mật khẩu"
                        secureTextEntry
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

            <Controller
                control={control}
                name="confirm_password"
                rules={{
                    required: 'Thông tin bắt buộc',
                    validate: (value) =>
                        value === control._formValues.password || 'Mật khẩu không khớp',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập lại mật khẩu"
                        secureTextEntry
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.confirm_password && <Text style={styles.error}>{errors.confirm_password.message}</Text>}

            {loading ? <ActivityIndicator /> : <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>Thay đổi</Text>
            </TouchableOpacity>}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        minWidth: 300,
        backgroundColor: 'white'
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ChangPasswordScreen;
