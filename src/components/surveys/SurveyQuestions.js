import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import AccountStyles from "../auth/AccountStyles";
import { authApis, endpoints } from "../../config/Apis";
import { ActivityIndicator, Card, HelperText, Text, TextInput } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MyUserContext } from '../../config/MyContexts';

const SurveyQuestions = ({ route }) => {
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(false);
    const survey = route.params?.survey
    const done = route.params?.done
    const [answers, setAnswers] = useState([])
    const [msg, setMsg] = useState()
    const user = useContext(MyUserContext)
    const nav = useNavigation()

    const loadQuestions = async () => {
        try {
            setLoading(true)

            const token = await AsyncStorage.getItem("access-token")
            let res = await authApis(token).get(endpoints["survey-questions"](survey.id))

            setQuestions(res.data.results)
        } catch (ex) {
            console.error(ex)
        } finally {
            setLoading(false)
        }
    }

    const updateAnswer = (question_id, text) => {
        setAnswers(prev =>
            prev.map(ans =>
                ans.question === question_id ? { ...ans, answer: text } : ans
            )
        );
    };

    const validate = () => {
        for (let a of answers) {
            if (!a.answer || a.answer.trim() === "") {
                setMsg(`Vui lòng nhập câu trả lời!`)
                return false
            }
        }
        return true
    }

    const handleSubmit = () => {
        if (validate() === true) {
            Alert.alert(
                "Xác nhận",
                "Bạn có chắc chắn hoàn thành khảo sát?",
                [
                    { text: "Hủy", style: "cancel" },
                    { text: "Xác nhận", onPress: submitAnswer }
                ]
            )
        }
    }

    const submitAnswer = async () => {
        try {
            setLoading(true)

            const token = await AsyncStorage.getItem("access-token")
            const res = await authApis(token).post(endpoints["survey-responses"](survey.id),
                answers
            )

            if (res) {
                Alert.alert("Bạn đã hoàn thành khảo sát")
                nav.navigate("UserHome")
            }
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    const loadAnswers = async () => {
        try {
            setLoading(true)

            const token = await AsyncStorage.getItem("access-token")
            let url = `${endpoints["survey-responses"](survey.id)}?student=${user._j.id}`

            const res = await authApis(token).get(url)
            setAnswers(res.data.results)
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadQuestions()
    }, [survey.id])

    useEffect(() => {
        if (questions.length > 0 && !done) {
            setAnswers(questions.map(q => ({
                question: q.id,
                answer: ''
            })));
        }
    }, [questions]);

    useEffect(() => {
        if (done) {
            loadAnswers()
        }
    }, [])

    return (
        <View style={AccountStyles.container}>
            <View style={{ margin: 10 }}>
                <Text style={[styles.title, styles.quicksand]}>{survey.title}</Text>
                <Text style={styles.description}>{survey.description}</Text>
            </View>

            <FlatList
                ListFooterComponent={loading && <ActivityIndicator size={30} />}
                data={questions}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <Card style={[AccountStyles.card, { padding: 5 }]}>
                        <Card.Content>
                            <Text style={styles.title}>{`${index + 1}. ${item.question_text}`}</Text>
                            <Text style={styles.description}>{item.question_type}</Text>
                            <TextInput
                                label="Câu trả lời"
                                mode="outlined"
                                style={[AccountStyles.input, { padding: 0, borderWidth: 0, backgroundColor: 'white' }]}
                                multiline
                                numberOfLines={4}
                                theme={{
                                    roundness: 8,
                                }}
                                disabled={done}
                                value={answers.find(a => a.question === item.id)?.answer || ''}
                                onChangeText={(text) => updateAnswer(item.id, text)}
                            />
                        </Card.Content>
                    </Card>
                )}
            />

            {msg &&
                <HelperText style={{ fontSize: 18 }} type="error" visible={msg}>
                    {msg}
                </HelperText>
            }

            {(questions.length > 0 && !done) &&
                <TouchableOpacity onPress={handleSubmit} style={[AccountStyles.button, { backgroundColor: '#376be3', margin: 7 }]} disabled={loading}>
                    {loading ? <ActivityIndicator color="white" /> : <Text style={AccountStyles.buttonText}>Hoàn thành</Text>}
                </TouchableOpacity>
            }
        </View>
    )

}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    description: {
        fontSize: 14,
        color: '#555',
    }
});

export default SurveyQuestions;