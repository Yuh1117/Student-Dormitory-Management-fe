import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import Apis, { endpoints } from "../../config/Apis";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({navigation}) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false); // Trạng thái loading

  const onSubmit = async (data) => {
    setLoading(true); 
    try {
      const response = await Apis.post(endpoints["login"],{
        username: data.username,
        password: data.password,
      })
  
      if (response.status === 200) {

        //lấy các thông tin token và user
        const accessToken = response.data.access_token;
        const refreshToken = response.data.refresh_token;
        const user = response.data.user;
        
        //lưu lại vào AsyncStorage để cần thì gọi
        await AsyncStorage.setItem("access-token", accessToken);
        await AsyncStorage.setItem("refresh-token", refreshToken);
        await AsyncStorage.setItem("user", JSON.stringify(user));


        const is_staff  = response.data.user.is_staff 
        const is_first_access = response.data.user.is_first_access 
        // nếu là admin thì chuyển đến admin home, nếu là user thường thì chuyển đến trang user

        if(is_first_access){
          console.log("lan dau")
          navigation.navigate('ChangePass', {user: user})
          
        }else{
          is_staff ? navigation.navigate("AdminHome") : navigation.navigate('UserHome')
        }

      } else {
        Alert.alert('Error', response.data);
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error);
      Alert.alert('Error', error.response?.data?.error_description || 'Login failed');
    }finally {
      setLoading(false); // Ẩn spinner khi xong
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Controller
        control={control}
        name="username"
        rules={{ required: 'Username is required' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Username"
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
        rules={{ required: 'Password is required', minLength: { value: 1, message: 'Password must be at least 6 characters' } }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)} disabled={loading}>
      {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>
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

export default LoginScreen;