import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useFetchWitchToken from '../../../config/UseFetchWithToken'
import { endpoints } from '../../../config/Apis';

const SurveyDetail = ({ route, navigation }) => {
  const { survey } = route.params;
  const {loading,fetchWithToken} = useFetchWitchToken();
  const [questions,setQuestions] = useState([])
  const [page,setPage] = useState(1);
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
  useEffect(()=>{
    loadQuestions();
  },[survey.id])
  const renderQuestion = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('surveyResponses', {surveyId: survey.id, question: item })}
      style={{ padding: 12, borderBottomWidth: 1 }}
    >
      <Text>{item.question_text}</Text>
      {/* <Text style={{ fontStyle: 'italic' }}>{item.question_type}</Text> */}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>

    <View style={{ padding: 16 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{survey.title}</Text>
      <Text style={{ marginBottom: 12 }}>{survey.description}</Text>

      <FlatList
        data={questions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderQuestion}
      />
    </View>
    </SafeAreaView>
  );
};

export default SurveyDetail;
