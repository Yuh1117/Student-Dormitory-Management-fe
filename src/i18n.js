import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import translationEn from "./locales/en/translation.json";
import translationVi from "./locales/vi/translation.json";

const resources = {
    "en": { translation: translationEn },
    "vi": { translation: translationVi },
};

const initI18n = async () => {
    let savedLanguage = await AsyncStorage.getItem("language");

    if (!savedLanguage) {
        savedLanguage = Localization.getLocales()[0].languageCode
        await AsyncStorage.setItem('language', savedLanguage)
    }

    i18n.use(initReactI18next).init({
        compatibilityJSON: "v3",
        resources,
        lng: savedLanguage,
        fallbackLng: "vi",
        interpolation: {
            escapeValue: false,
        },
    });
};

initI18n();

export default i18n;