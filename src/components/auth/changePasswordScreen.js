import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import useFetchWithToken from '../../config/UseFetchWithToken';
import { endpoints } from '../../config/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import { MyDispatchContext, MyUserContext } from '../../config/MyContexts';

const ChangPasswordScreen = () => {
    const user = useContext(MyUserContext)
    const dispatch = useContext(MyDispatchContext)
    const navigation = useNavigation();
    const { control, handleSubmit, setValue, formState: { errors } } = useForm();
    const { loading, fetchWithToken } = useFetchWithToken()

    useEffect(() => {
        setValue('username', user._j.username);
    }, [])

    const onSubmit = async (data) => {
        const token = await AsyncStorage.getItem("access-token");
        const res = await fetchWithToken({
            method: 'PATCH',
            url: endpoints["current-user"],
            data: {
                ...data,
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
        <View style={styles.container}>
            <Text style={styles.title}>Cập nhật thông tin cá nhân</Text>

            <Controller
                control={control}
                name="first_name"
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
                name="last_name"
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
                name="password"
                rules={{ required: 'Thông tin bắt buộc', minLength: { value: 4, message: 'Password must be at least 4 characters' } }}
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

            {loading ? <ActivityIndicator /> : <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>Thay đổi</Text>
            </TouchableOpacity>}
        </View>
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
