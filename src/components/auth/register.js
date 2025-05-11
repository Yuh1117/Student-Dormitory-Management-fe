import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import useFetchWithToken from '../../config/UseFetchWithToken';
import { endpoints } from '../../config/Apis';

const RegisterScreen = ({navigation}) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const {loading,fetchWithToken} = useFetchWithToken();
  const onSubmit = async (data) => {
    // try {
    //   const response = await axios.post('https://vovanhuy.pythonanywhere.com/users/', data);
    //   if (response.status === 201) {
    //     Alert.alert('Success', 'User registered successfully');
    //   } else {
    //     Alert.alert('Error', data);
    //   }
    // } catch (error) {
    //     console.log(error.response ? error.response.data : error); // Xem lỗi đầy đủ trong console
    //     if (error.response && error.response.data) {
    //       Alert.alert('Error', JSON.stringify(error.response.data)); // Hiển thị lỗi chính xác
    //     } else {
    //       Alert.alert('Error', 'Network error or server issue');
    //     }
    // }
    data = {
      ...data,
      role:"Student",
    }

    const res = await fetchWithToken({
      method: 'POST',
      url: `${endpoints['users']}`,
      data: data,
    })

    if(res){
      Alert.alert('Success', 'Đăng Kí Thành Công');
      navigation.goBack();
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Kí Sinh Viên</Text>

      {/* <Controller
        control={control}
        name="first_name"
        rules={{ required: 'First name is required' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="First Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      /> */}
      {/* {errors.first_name && <Text style={styles.error}>{errors.first_name.message}</Text>} */}

      {/* <Controller
        control={control}
        name="last_name"
        rules={{ required: 'Last name is required' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.last_name && <Text style={styles.error}>{errors.last_name.message}</Text>} */}

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
        rules={{ required: 'Password is required', minLength: { value: 3, message: 'Password must be at least 3 characters' } }}
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

      {loading ?<ActivityIndicator/>:<TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
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
