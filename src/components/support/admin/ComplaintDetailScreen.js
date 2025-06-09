

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import useFetchWithToken from '../../../config/UseFetchWithToken';
import { endpoints } from '../../../config/Apis';
import { Modal, TextInput, Button, ActivityIndicator } from 'react-native-paper';
import AdminStyles from '../../../styles/AdminStyles';
import { FlatList } from 'react-native-gesture-handler';

const ComplaintDetail = ({ route, navigation }) => {
  const { complaint } = route.params;
  const { loading, fetchWithToken } = useFetchWithToken();
  const [responseContent, setResponseContent] = useState('');
  const [responses, setResponses] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false)

  const isPending = complaint.status.toLowerCase() === 'pending';
  const isResolved = complaint.status.toLowerCase() === 'resolved';

  const fullName =
    complaint.student?.last_name || complaint.student?.first_name
      ? `${complaint.student?.last_name || ''} ${complaint.student?.first_name || ''}`.trim()
      : complaint.student?.username || 'Không rõ';

  const Resolve = async () => {
    const data = await fetchWithToken({
      url: endpoints['complaints-resolve'](complaint.id),
      method: 'PATCH',
    });
    if (data) {
      Alert.alert('Đã giải quyết');
      navigation.goBack();
    }
  };

  const handleAddResponse = async () => {
    console.log("handleAddResponse called");
    if (!responseContent) {
      Alert.alert('Vui lòng nhập nội dung phản hồi');
      return;
    }
    console.log(endpoints['complaints-responses'](complaint.id))
    const data = await fetchWithToken({
      url: endpoints['complaints-responses'](complaint.id),
      method: 'POST',
      data: {
        content: responseContent,
      },
    });
    console.log(data)
    if (data) {
      Alert.alert('Phản hồi thành công');
      setResponses((prev) => [...prev, data]);
      setResponseContent('');
      setModalVisible(false);
    }
  };
  const loadResponse = async () => {
    if (page > 0) {

      const data = await fetchWithToken({
        url: `${endpoints['complaints-responses'](complaint.id)}?page=${page}`,
        method: "GET"
      })

      console.log(data.results)

      if (data?.results) {
        setResponses([...responses, ...data.results]);
      }
      if (data.next === null) setPage(0)

    }

  }
  const loadMore = () => {
    if (!loading && responses.length > 0 && page > 0)
      setPage(page + 1)
  }
  const renderRespone = ({ item }) => {
    return (

      <View key={item.id.toString()}
        style={styles.responseItem}>
        <Text style={styles.responseUser}>{item.user.username}:</Text>
        <Text style={styles.responseContent}>{item.content}</Text>
      </View>
    )
  }
  useEffect(() => {
    if (show && page > 0) {
      setResponses([])
      loadResponse();
    }
  }, [page, show])
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View>
          <ScrollView contentContainerStyle={[styles.scrollContent]}>
            <View style={[styles.infoCard, AdminStyles.invoiceCard, AdminStyles.roomBgColor]}>
              <View style={[AdminStyles.mb]}>
                <Text style={styles.label}>Nội dung:</Text>
                <Text style={styles.content}>{complaint.description}</Text>
              </View>

              <View style={[AdminStyles.row, AdminStyles.row_center_start, AdminStyles.mb]}>

                <Text style={styles.label}>Người gửi: </Text>
                <Text style={styles.content}>{fullName}</Text>
              </View>

              <View style={[AdminStyles.row, AdminStyles.row_center_start, AdminStyles.mb]}>

                <Text style={styles.label}>Ngày tạo: </Text>
                <Text style={styles.content}>{new Date(complaint.created_date).toLocaleDateString('vi-VN')}</Text>
              </View>

              <Text style={styles.label}>Phòng:</Text>
              <Text style={styles.content}>Số phòng: {complaint.room?.room_number || 'Không rõ'}</Text>
              <Text style={styles.content}>Tầng: {complaint.room?.floor || 'Không rõ'}</Text>
              <Text style={styles.content}>Tòa: {complaint.room?.building.building_name || 'Không rõ'}</Text>
            </View>

            {complaint.image && (
              <Image source={{ uri: complaint.image }} style={styles.image} resizeMode="contain" />
            )}

          </ScrollView>
          <View style={styles.scrollContent}>
            <View>
              <TouchableOpacity
                onPress={() => { setShow(!show) }}
                style={[AdminStyles.row, { alignItems: "center" }, AdminStyles.mb]}>

                <Text style={[styles.label, AdminStyles.row_center_start]}>Phản hồi

                </Text>
                {show ? <Ionicons name="chevron-up" size={14} color="#000" /> : <Ionicons name="chevron-down" size={14} color="#000" />}
              </TouchableOpacity>
            </View>
            {show ? (
              <FlatList data={responses}
                renderItem={renderRespone}
                ListFooterComponent={loading && <ActivityIndicator />}
                onEndReached={loadMore}
                ListEmptyComponent={!loading && <Text style={styles.noResponse}>Chưa có phản hồi nào</Text>} />
            ) : (
              <></>
            )}
            <TouchableOpacity style={[styles.addButton, AdminStyles.successColor]} onPress={() => setModalVisible(true)}>
              <Text style={styles.buttonText}>Tạo phản hồi</Text>
            </TouchableOpacity>
          </View>
        </View>


        {isPending && (
          <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>

            <TouchableOpacity style={styles.button} onPress={Resolve}>
              <Text style={styles.buttonText}>Giải quyết xong</Text>
            </TouchableOpacity>
          </View>
        )}

        <Modal visible={isModalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modal}>
          <Text style={styles.modalTitle}>Tạo phản hồi</Text>
          <TextInput
            label="Nội dung phản hồi"
            value={responseContent}
            onChangeText={setResponseContent}
            style={styles.input}
          />
          <Button mode="contained" onPress={handleAddResponse} style={[styles.modalButton, AdminStyles.successColor]}>
            Tạo
          </Button>
          <Button mode="outlined" onPress={() => setModalVisible(false)} style={styles.modalButton}>
            Hủy
          </Button>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default ComplaintDetail;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContent: {
    paddingHorizontal: 20,
    marginTop: 20
  },
  infoCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',

  },
  content: {
  },
  image: {
    height: 200,
    width: '100%',
    borderRadius: 10,
    marginBottom: 20,
  },
  responseItem: {
    padding: 10,
    backgroundColor: '#e9ecef',
    borderRadius: 5,
    marginBottom: 10,
  },
  responseUser: {
    fontWeight: 'bold',
  },
  responseContent: {
    marginTop: 5,
  },
  noResponse: {
    marginTop: 5,
    color: '#888',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#34C759',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButton: {
    marginTop: 10,
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#fff"
  },
});


