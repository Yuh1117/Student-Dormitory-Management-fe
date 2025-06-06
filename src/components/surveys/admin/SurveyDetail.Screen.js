import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useFetchWitchToken from '../../../config/UseFetchWithToken'
import { endpoints } from '../../../config/Apis';
import { Button } from 'react-native-paper';

const SurveyDetail = ({ route, navigation }) => {
  const { survey } = route.params;
  const {loading,fetchWithToken} = useFetchWitchToken();
  const [questions,setQuestions] = useState([])
  const [page,setPage] = useState(1);
  const [answedStudent,setAnswedStudent] = useState({})
  const loadQuestions = async () => {
      if(page>0){
        const data = await fetchWithToken({
        url: `${endpoints['survey-questions'](survey.id)}?page=${page}`
        })
        if (data?.results){
          setQuestions([...questions,...data.results])
          if(data.next===null) setPage(0);
        }
    }
  }
  const getAnswedStudent = async () =>{
    const data = await fetchWithToken({
      url:`${endpoints['survey-student-count'](survey.id)}`
    })
    if(data) setAnswedStudent(data);
  }
  useEffect(()=>{
    loadQuestions();
    getAnswedStudent();
    console.log(`${endpoints['survey-student-count'](survey.id)}`)
  },[survey.id])
  const renderQuestion = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('surveyResponses', {surveyId: survey.id, question: item })}
      style={{ padding: 12, borderBottomWidth: 1 }}
    >
      <Text>{item.question_text}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex:1}}>

    <View style={{ padding: 16 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{survey.title}</Text>
      <Text style={{ marginBottom: 12 }}>{survey.description}</Text>

      <FlatList
        data={questions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderQuestion}
      />
    </View>
    <Button style={styles.fab} theme={{ colors: { primary: '#00809D' } }}  icon="account" mode="contained">
      <Text>Đã tham gia khảo sát </Text>
      <Text>{answedStudent.answered_students}/{answedStudent.total_students}</Text>
    </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})
export default SurveyDetail;