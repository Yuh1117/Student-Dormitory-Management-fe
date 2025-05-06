import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import Apis, { endpoints } from "../../config/Apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerForPushNotificationsAsync } from "../../config/Notis";
import { MyDispatchContext } from "../../config/MyContexts";
import AccountStyles from "./AccountStyles";

const LoginScreen = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useContext(MyDispatchContext)

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const expo_token = await registerForPushNotificationsAsync();
      const response = await Apis.post(endpoints["login"], {
        username: data.username,
        password: data.password,
        expo_token: expo_token,
      })

      if (response.status === 200) {

        //lấy các thông tin token và user
        const accessToken = response.data.access_token;
        const user = response.data.user;

        //lưu lại vào AsyncStorage để cần thì gọi
        await AsyncStorage.setItem("access-token", accessToken);

        dispatch({
          "type": "login",
          "payload": user
        })

        const is_staff = response.data.user.is_staff
        const is_first_access = response.data.user.is_first_access
        // nếu là admin thì chuyển đến admin home, nếu là user thường thì chuyển đến trang user

        if (is_first_access) {
          console.log("lan dau")
          navigation.navigate('ChangePass', { user: user })

        } else {
          is_staff ? navigation.navigate("AdminHome") : navigation.navigate('UserHome')
        }

      } else {
        Alert.alert('Error', response.data);
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error);
      Alert.alert('Error', error.response?.data?.error_description || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={AccountStyles.container}>
      <Text style={AccountStyles.title}>Đăng nhập</Text>

      <Controller
        control={control}
        name="username"
        rules={{ required: 'Tên đăng nhập không được để trống' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={AccountStyles.input}
            placeholder="Tên đăng nhập"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.username && <Text style={AccountStyles.error}>{errors.username.message}</Text>}

      <Controller
        control={control}
        name="password"
        rules={{ required: 'Mật khẩu không được để trống', minLength: { value: 1, message: 'Password must be at least 6 characters' } }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={AccountStyles.input}
            placeholder="Mật khẩu"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.password && <Text style={AccountStyles.error}>{errors.password.message}</Text>}

      <TouchableOpacity style={AccountStyles.button} onPress={handleSubmit(onSubmit)} disabled={loading}>
        {loading ? <ActivityIndicator color="white" /> : <Text style={AccountStyles.buttonText}>Đăng nhập</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;