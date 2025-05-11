// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import AdminStyles from '../../../styles/AdminStyles';
// import useFetchWithToken from '../../../config/UseFetchWithToken';
// import { endpoints } from '../../../config/Apis';

// const ComplaintDetail = ({ route, navigation }) => {
//   const { complaint } = route.params;
//   const { loading, fetchWithToken } = useFetchWithToken();
//   const [responseContent, setResponseContent] = useState('');
//   const [responses, setResponses] = useState(complaint.responses || []);

//   const isPending = complaint.status.toLowerCase() === 'pending';
//   const isResolved = complaint.status.toLowerCase() === 'resolved';

//   const fullName =
//     complaint.student?.last_name || complaint.student?.first_name
//       ? `${complaint.student?.last_name || ''} ${complaint.student?.first_name || ''}`.trim()
//       : complaint.student?.username || 'Không rõ';

//   // Giải quyết khi bấm nút
//   const Resolve = async () => {
//     const data = await fetchWithToken({
//       url: endpoints['complaints-resolve'](complaint.id),
//       method: 'PATCH',
//     });
//     if (data) {
//       Alert.alert('Đã giải quyết');
//       navigation.goBack();
//     }
//   };

//   // Thêm phản hồi mới
//   const handleAddResponse = async () => {
//     if (!responseContent) {
//       Alert.alert('Vui lòng nhập nội dung phản hồi');
//       return;
//     }

//     const data = await fetchWithToken({
//       url: endpoints['complaints-response'](complaint.id),
//       method: 'POST',
//       body: {
//         content: responseContent,
//       },
//     });

//     if (data) {
//       Alert.alert('Phản hồi thành công');
//       setResponses((prev) => [...prev, data]);
//       setResponseContent('');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.container}>
//         <ScrollView contentContainerStyle={styles.scrollContent}>
//           <View style={styles.header}>
//             <Ionicons
//               name={isResolved ? 'checkmark-circle-outline' : 'warning-outline'}
//               size={32}
//               color={isResolved ? '#34C759' : '#FF3B30'}
//               style={styles.icon}
//             />
//             <Text style={[styles.status, isPending && styles.pending, isResolved && styles.resolved]}>
//               {complaint.status}
//             </Text>
//           </View>

//           <Text style={styles.label}>Mô tả:</Text>
//           <Text style={styles.content}>{complaint.description}</Text>

//           <Text style={styles.label}>Người gửi:</Text>
//           <Text style={styles.content}>{fullName}</Text>

//           <Text style={styles.label}>Ngày tạo:</Text>
//           <Text style={styles.content}>{new Date(complaint.created_date).toLocaleDateString('vi-VN')}</Text>

//           <Text style={styles.label}>Ngày cập nhật:</Text>
//           <Text style={styles.content}>{new Date(complaint.update_date).toLocaleDateString('vi-VN')}</Text>

//           <Text style={styles.label}>Phòng:</Text>
//           <Text style={styles.content}>Số phòng: {complaint.room?.room_number || 'Không rõ'}</Text>
//           <Text style={styles.content}>Tầng: {complaint.room?.floor || 'Không rõ'}</Text>
//           <Text style={styles.content}>Tòa: {complaint.room?.building || 'Không rõ'}</Text>

//           {/* Hiển thị các phản hồi */}
//           <Text style={styles.label}>Phản hồi:</Text>
//           {responses.length > 0 ? (
//             responses.map((response, index) => (
//               <View key={index} style={styles.responseItem}>
//                 <Text style={styles.responseUser}>{response.user.username}:</Text>
//                 <Text style={styles.responseContent}>{response.content}</Text>
//               </View>
//             ))
//           ) : (
//             <Text style={styles.noResponse}>Chưa có phản hồi nào</Text>
//           )}

//           {/* Form nhập nội dung phản hồi */}
//           <TextInput
//             style={styles.input}
//             placeholder="Nhập nội dung phản hồi..."
//             value={responseContent}
//             onChangeText={setResponseContent}
//           />
//           <TouchableOpacity style={styles.addButton} onPress={handleAddResponse}>
//             <Text style={styles.buttonText}>Gửi phản hồi</Text>
//           </TouchableOpacity>
//         </ScrollView>

//         {/* Nút giải quyết */}
//         {isPending && (
//           <TouchableOpacity style={styles.button} onPress={Resolve}>
//             <Text style={styles.buttonText}>Giải quyết</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// export default ComplaintDetail;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'space-between',
//   },
//   scrollContent: {
//     padding: 20,
//     paddingBottom: 80,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   icon: {
//     marginRight: 10,
//   },
//   status: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   pending: {
//     color: '#FF3B30',
//   },
//   resolved: {
//     color: '#34C759',
//   },
//   label: {
//     marginTop: 16,
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   content: {
//     fontSize: 15,
//     color: '#333',
//     marginTop: 4,
//   },
//   responseItem: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: '#f2f2f2',
//     borderRadius: 5,
//   },
//   responseUser: {
//     fontWeight: 'bold',
//   },
//   responseContent: {
//     marginTop: 5,
//   },
//   noResponse: {
//     marginTop: 5,
//     color: '#888',
//   },
//   input: {
//     borderColor: '#ccc',
//     borderWidth: 1,
//     padding: 10,
//     marginTop: 15,
//     borderRadius: 5,
//   },
//   addButton: {
//     backgroundColor: '#007bff',
//     padding: 15,
//     alignItems: 'center',
//     marginTop: 10,
//     borderRadius: 5,
//   },
//   button: {
//     backgroundColor: '#34C759',
//     padding: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderTopWidth: 1,
//     borderColor: '#eee',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });


import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import useFetchWithToken from '../../../config/UseFetchWithToken';
import { endpoints } from '../../../config/Apis';
import { Modal, TextInput, Button } from 'react-native-paper';

const ComplaintDetail = ({ route, navigation }) => {
  const { complaint } = route.params;
  const { loading, fetchWithToken } = useFetchWithToken();
  const [responseContent, setResponseContent] = useState('');
  const [responses, setResponses] = useState(complaint.responses || []);
  const [isModalVisible, setModalVisible] = useState(false);

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.infoCard}>
          <Text style={styles.label}>Nội dung:</Text>
          <Text style={styles.content}>{complaint.description}</Text>
            <Text style={styles.label}>Người gửi:</Text>
            <Text style={styles.content}>{fullName}</Text>

            <Text style={styles.label}>Ngày tạo:</Text>
            <Text style={styles.content}>{new Date(complaint.created_date).toLocaleDateString('vi-VN')}</Text>

            <Text style={styles.label}>Phòng:</Text>
            <Text style={styles.content}>Số phòng: {complaint.room?.room_number || 'Không rõ'}</Text>
            <Text style={styles.content}>Tầng: {complaint.room?.floor || 'Không rõ'}</Text>
            <Text style={styles.content}>Tòa: {complaint.room?.building || 'Không rõ'}</Text>
          </View>

          {complaint.image && (
            <Image source={{ uri: complaint.image }} style={styles.image} resizeMode="contain" />
          )}

          <Text style={styles.label}>Phản hồi:</Text>
          {responses.length > 0 ? (
            responses.map((response, index) => (
              <View key={index} style={styles.responseItem}>
                <Text style={styles.responseUser}>{response.user.username}:</Text>
                <Text style={styles.responseContent}>{response.content}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noResponse}>Chưa có phản hồi nào</Text>
          )}

          <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Tạo phản hồi</Text>
          </TouchableOpacity>
        </ScrollView>

        {isPending && (
          <TouchableOpacity style={styles.button} onPress={Resolve}>
            <Text style={styles.buttonText}>Giải quyết</Text>
          </TouchableOpacity>
        )}

        <Modal visible={isModalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modal}>
          <Text style={styles.modalTitle}>Tạo phản hồi</Text>
          <TextInput
            label="Nội dung phản hồi"
            value={responseContent}
            onChangeText={setResponseContent}
            style={styles.input}
          />
          <Button mode="contained" onPress={handleAddResponse} style={styles.modalButton}>
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
    padding: 20,
  },
  infoCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  content: {
    marginBottom: 5,
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
  },
});


