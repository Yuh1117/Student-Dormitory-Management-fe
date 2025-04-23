import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { endpoints } from '../../../config/Apis';
import useFetchWithToken from '../../../config/UseFetchWithToken';
import AdminStyles from '../../../styles/AdminStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { set } from 'react-hook-form';

export default function CreateNotification({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [announcementType, setAnnouncementType] = useState('');
  const { fetchWithToken, loading } = useFetchWithToken();

  const handleSubmit = async () => {
    if (!title || !content) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ tiêu đề và nội dung');
      return;
    }

      const res = await fetchWithToken({
        method: 'POST',
        url: endpoints['notifications'], // /api/notifications/
        data: {
          title,
          content,
          announcement_type: announcementType
        }
      });

      if(res){
        Alert.alert('Thành công', 'Đã tạo thông báo mới!');
        navigation.goBack();

      }else{
        Alert.alert('Tạo thông báo thất bại');
      }

    
  };
  useEffect(()=>{
    setContent("");
    setTitle("");
    setAnnouncementType("");
  },[])
  return (
    <SafeAreaView style={[AdminStyles.bgc,AdminStyles.flex_1]}>

    <View style={styles.container}>
      <Text style={styles.label}>Tiêu đề</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập tiêu đề..."
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Nội dung</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Nhập nội dung..."
        multiline
        value={content}
        onChangeText={setContent}
        />

      <Text style={styles.label}>Loại thông báo</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={announcementType}
          onValueChange={(itemValue) => setAnnouncementType(itemValue)}
          >
          <Picker.Item label="Chọn loại" value="" />
          <Picker.Item label="Thông báo chung" value="general" />
          <Picker.Item label="Thông báo khẩn" value="urgent" />
        </Picker>
      </View>

      <TouchableOpacity onPress={handleSubmit} style={[styles.button,AdminStyles.successColor]}>
        <Text style={styles.buttonText}>{loading ? 'Đang gửi...' : 'Tạo thông báo'}</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    container: {
      // flex: 1,
      padding: 16,
      backgroundColor: '#fff'
    },
    label: {
      fontWeight: 'bold',
      marginTop: 16
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 12,
      marginTop: 8
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      marginTop: 8,
      overflow: 'hidden'
    },
    button: {
      backgroundColor: '#4caf50',
      padding: 16,
      borderRadius: 8,
      marginTop: 24,
      alignItems: 'center'
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold'
    }
  });
  