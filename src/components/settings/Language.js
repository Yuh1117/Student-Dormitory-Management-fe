import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { List, RadioButton, ActivityIndicator, Text } from 'react-native-paper';
import AccountStyles from '../auth/AccountStyles';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Language = () => {
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [loading, setLoading] = useState(false);
    const { t, i18n } = useTranslation();

    const changeLanguage = async () => {
        try {
            setLoading(true)

            await AsyncStorage.setItem("language", selectedLanguage);
            i18n.changeLanguage(selectedLanguage);
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        const loadLanguage = async () => {
            const language = await AsyncStorage.getItem("language");
            setSelectedLanguage(language)
        };
        loadLanguage();
    }, []);

    return (
        <View style={[AccountStyles.container, { justifyContent: '' }]}>
            <View style={{ padding: 7 }}>
                <RadioButton.Group
                    onValueChange={setSelectedLanguage}
                    value={selectedLanguage}
                >
                    <RadioButton.Item label="🇻🇳 Tiếng Việt" value="vi" />
                    <RadioButton.Item label="🇬🇧 English" value="en" />
                </RadioButton.Group>
            </View>
            <TouchableOpacity
                style={[AccountStyles.button, { backgroundColor: '#376be3', margin: 7 }]}
                disabled={loading}
                onPress={changeLanguage}
            >
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text style={AccountStyles.buttonText}>{t('save')}</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default Language;
