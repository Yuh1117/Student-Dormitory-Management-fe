import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import useFetchWithToken from '../../config/UseFetchWithToken';
import { endpoints } from '../../config/Apis';
import AdminStyles from '../../styles/AdminStyles';

const RegisterScreen = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const { loading, fetchWithToken } = useFetchWithToken();
  const onSubmit = async (data) => {
    data = {
      ...data,
      role: "Student",
    }

    const res = await fetchWithToken({
      method: 'POST',
      url: `${endpoints['users']}`,
      data: data,
    })

    if (res) {
      Alert.alert('Success', 'Đăng Kí Thành Công');
      navigation.goBack();
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Kí Sinh Viên</Text>

      <Controller
        control={control}
        name="username"
        rules={{ required: 'Tên người dùng bắt buộc' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Tên người dùng"
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
        rules={{ required: 'Mật khẩu bắt buộc' }}
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
        name="student_code"
        rules={{ required: 'Cần nhập mã sinh viên' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Mã số sinh viên"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.student_code && <Text style={styles.error}>{errors.student_code.message}</Text>}

      <Controller
        control={control}
        name="university"
        rules={{ required: 'Cần nhập tên trường đại học' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Tên trường"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.student_code && <Text style={styles.error}>{errors.student_code.message}</Text>}

      {loading ? <ActivityIndicator /> : <TouchableOpacity style={[styles.button, AdminStyles.successColor]} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Đăng Kí</Text>
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

export default RegisterScreen;
