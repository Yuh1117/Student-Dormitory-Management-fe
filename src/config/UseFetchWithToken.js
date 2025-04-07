import { useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Apis from '../config/Apis'; // axios instance

const useFetchWithToken = () => {
  const [loading, setLoading] = useState(false);

  const fetchWithToken = async ({ url, method = 'GET', data = null, headers = {} }) => {
    try {
      setLoading(true);

      //   const token = await AsyncStorage.getItem('access-token');

      const config = {
        method,
        url,
        headers: headers,
      };

      if (data) {
        config.data = data;
      }

      const res = await Apis(config);
      return res.data;
    } catch (error) {
      console.log(error.response ? error.response.data : error);
      Alert.alert('Error', error.response?.data?.error_description || 'Đã xảy ra lỗi');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, fetchWithToken };
};

export default useFetchWithToken;