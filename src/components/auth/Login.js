import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ImageBackground } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Apis, { endpoints } from "../../config/Apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerForPushNotificationsAsync } from "../../config/Notis";
import { MyDispatchContext } from "../../config/MyContexts";
import AccountStyles from "./AccountStyles";
import { CommonActions } from "@react-navigation/native";

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

        const accessToken = response.data.access_token;
        const user = response.data.user;

        await AsyncStorage.setItem("access-token", accessToken);
        await AsyncStorage.setItem("user", JSON.stringify(user));

        dispatch({
          "type": "login",
          "payload": user
        })

        const is_staff = response.data.user.is_staff
        const is_first_access = response.data.user.is_first_access

        if (is_staff) {
          navigation.navigate("AdminHome")
        } else {
          is_first_access ? navigation.navigate("ChangePass") :
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "UserHome" }],
              })
            )
        }
      } else {
        Alert.alert('Error', response.data);
      }
    } catch (ex) {
      if (ex.response?.status === 401) {
        const errs = ex.response.data.error;
        Alert.alert(errs)
      } else {
        Alert.alert("Lỗi hệ thống hoặc kết nối.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[AccountStyles.container, { padding: 0 }]}>
      <ImageBackground style={[AccountStyles.backGround, AccountStyles.container]} source={require('../../assets/room2.jpg')} resizeMode="cover">
        <View style={[styles.loginArea]}>
          <View style={styles.backgroundBlur} />
          <View style={styles.foregroundContent}>


            {/* <Text style={[AccountStyles.title,styles.LoginTitle]}>Đăng nhập</Text> */}

            <Controller
              control={control}
              name="username"
              rules={{ required: 'Tên đăng nhập không được để trống' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[AccountStyles.input, styles.loginInput]}
                  placeholder="Tên đăng nhập"
                  placeholderTextColor={"#886e61"}
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
              rules={{ required: 'Mật khẩu không được để trống' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[AccountStyles.input, styles.loginInput]}
                  placeholder="Mật khẩu"
                  placeholderTextColor={"#886e61"}
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.password && <Text style={AccountStyles.error}>{errors.password.message}</Text>}

            <TouchableOpacity style={[AccountStyles.button, styles.loginButton]} onPress={handleSubmit(onSubmit)} disabled={loading}>
              {loading ? <ActivityIndicator color="white" /> : <Text style={AccountStyles.buttonText}>Đăng nhập</Text>}
            </TouchableOpacity>
          </View>

        </View>
      </ImageBackground>
    </View>
  );

};


export default LoginScreen;
const styles = StyleSheet.create({

  loginArea: {
    position: 'relative',
    padding: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  backgroundBlur: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    opacity: 0,
    zIndex: 0,
  },
  foregroundContent: {
    zIndex: 1,
  },
  loginInput: {
    borderColor: "#886e61",
    color: "#886e61"
  },
  LoginTitle: {
    color: "#a48c80",
    fontSize: 30
  },
  loginButton: {
    backgroundColor: "#7fad90"
  }
})