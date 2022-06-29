import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from 'react-redux';
import store from './redux/store';
import StackNavigator from './navigation/StackNavigator';
import {SplashScreen} from './screens';
import {useTranslation} from 'react-i18next';

const App = () => {
  const [isInitApp, setInitApp] = useState(false);

  const [isSettingsSetup, setSettingsSetup] = useState(false);
  const [splashAnimationFinish, setSplashAnimationFinish] = useState(false);
  const [isDynamicTheme, setDynamicTheme] = useState(null);

  const {i18n} = useTranslation();

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem('@token');
    if (token) {
    } else {
    }
  };

  const setupThemeSettings = async () => {
    const dynamicThemeStatus = await AsyncStorage.getItem('@isDynamicTheme');
    if (dynamicThemeStatus) {
      setDynamicTheme(dynamicThemeStatus.status);
    } else {
      setDynamicTheme(true);
    }
  };

  const setupLanguageSettings = async () => {
    try {
      const lang = await AsyncStorage.getItem('@language');
      if (lang) {
        await i18n.changeLanguage(lang);
      }
    } catch (err) {
      console.warn('-----lang error', err);
    }
  };

  const initAppSettings = async () => {
    await checkAuth();
    await setupThemeSettings();
    await setupLanguageSettings();
    setSettingsSetup(true);
  };

  useEffect(() => {
    initAppSettings();
  });

  useEffect(() => {
    if (isSettingsSetup && splashAnimationFinish) {
      setInitApp(true);
    }
  }, [isSettingsSetup, splashAnimationFinish]);

  return (
    <Provider store={store}>
      <StackNavigator dynamicThemeStatus={isDynamicTheme} />
    </Provider>
  );
};

export default App;