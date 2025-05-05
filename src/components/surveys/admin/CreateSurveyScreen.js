import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, Alert,TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import useFetchWithToken from '../../../config/UseFetchWithToken';
import { endpoints } from '../../../config/Apis';
import { ActivityIndicator } from 'react-native-paper';

const CreateSurvey = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([{ question_text: '', question_type: 'text' }]);
  const { fetchWithToken,loading } = useFetchWithToken()

  const handleAddQuestion = () => {
    setQuestions([...questions, { question_text: '', question_type: 'text' }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const submitSurvey = async () => {
    const data = await fetchWithToken({
      url: endpoints['surveys'],
      method: "POST",
      data: {
        title,
        description,
        questions,
      },
    });
  
    if (data) {
      Alert.alert('Tạo khảo sát thành công!');
      navigation.goBack();
    } else {
      Alert.alert('Có lỗi xảy ra khi tạo khảo sát.');
    }
  };

  const handleSubmit = () => {
    // Validate tiêu đề và mô tả
  if (!title.trim()) {
    Alert.alert("Lỗi", "Tiêu đề không được để trống");
    return;
  }

  if (!description.trim()) {
    Alert.alert("Lỗi", "Mô tả không được để trống");
    return;
  }

  // Validate câu hỏi
  for (let i = 0; i < questions.length; i++) {
    const { question_text, question_type } = questions[i];
    if (!question_text.trim()) {
      Alert.alert("Lỗi", `Câu hỏi ${i + 1} chưa có nội dung`);
      return;
    }
    if (!question_type.trim()) {
      Alert.alert("Lỗi", `Câu hỏi ${i + 1} chưa có loại câu hỏi`);
      return;
    }
  }

  // Hiện xác nhận nếu hợp lệ
  Alert.alert(
    "Xác nhận",
    "Bạn có chắc muốn tạo khảo sát này?",
    [
      { text: "Hủy", style: "cancel" },
      { text: "Xác nhận", onPress: submitSurvey }
    ]
  );
    
  };

  const handleRemoveQuestion = (index) => {
    if (questions.length === 1) {
      Alert.alert("Phải có ít nhất 1 câu hỏi");
      return;
    }
  
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  return (
    <SafeAreaView>
      
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Tạo khảo sát mới</Text>
        
        <TextInput
          placeholder="Tiêu đề"
          value={title}
          onChangeText={setTitle}
          style={{ borderBottomWidth: 1, marginBottom: 10 }}
        />

        <TextInput
          placeholder="Mô tả"
          value={description}
          onChangeText={setDescription}
          style={{ borderBottomWidth: 1, marginBottom: 20 }}
        />

        {questions.map((q, index) => (
  <View key={index} style={{ marginBottom: 20, borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Câu hỏi {index + 1}</Text>
      <Button title="X" color="red" onPress={() => handleRemoveQuestion(index)} />
    </View>

    <TextInput
      placeholder="Nội dung câu hỏi"
      value={q.question_text}
      onChangeText={(text) => handleQuestionChange(index, 'question_text', text)}
      style={{ borderBottomWidth: 1, marginTop: 10, paddingVertical: 5 }}
    />

    <TextInput
      placeholder="Loại (text, multiple_choice, ...)"
      value={q.question_type}
      onChangeText={(text) => handleQuestionChange(index, 'question_type', text)}
      style={{ borderBottomWidth: 1, marginTop: 10, paddingVertical: 5 }}
    />
  </View>
))}

        {/* <Button title="Thêm câu hỏi" onPress={handleAddQuestion} /> */}

        <View style={{ alignItems: 'center', marginVertical: 0 }}>
          <TouchableOpacity onPress={handleAddQuestion} style={styles.addButton}>
            
            <Text style={[styles.addButtonText,styles.addButtonShape]}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20 }}>
          {loading?<ActivityIndicator/>:<Button title="Tạo khảo sát" onPress={handleSubmit} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateSurvey;
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderColor: "#ff6"
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    // minWidth:170
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginVertical: 10,
  },
  addButtonShape:{
    backgroundColor:"#9EC6F3",
    paddingTop:10,
    paddingBottom:10,
    paddingRight:40,
    paddingLeft:40,
    borderRadius:20
  },
  addButtonText: {
    marginLeft: 6,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  itemContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  }
});
