import React from 'react';
import {useFormik} from 'formik';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CustomButton, CustomInput} from '../../common';
import {useTranslation} from 'react-i18next';

const LoginForm = ({
  initialValues,
  onSubmit,
  validationSchema,
  validateOnChange = true,
  setValidateOnChange,
  navigateToForgotScreen,
  isError,
  errorMessage,
}) => {
  const {values, errors, handleSubmit, isSubmitting, handleChange} = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnChange,
  });

  const {t} = useTranslation();

  return (
    <View style={styles.loginForm}>
      <View style={styles.formFieldContainer}>
        <CustomInput
          value={values.email}
          onChangeText={handleChange('email')}
          placeholder={t('common.email_placeholder')}
          error={errors.email && validateOnChange ? errors.email : ''}
        />
      </View>
      <View style={styles.formFieldContainer}>
        <CustomInput
          value={values.password}
          onChangeText={handleChange('password')}
          placeholder={t('common.password_placeholder', {ns: ''})}
          passwordInput
          error={errors.password && validateOnChange ? errors.password : ''}
        />
      </View>
      <TouchableOpacity
        style={{marginTop: 15, alignItems: 'flex-end'}}
        onPress={navigateToForgotScreen}>
        <Text style={styles.navLink}>{t('login.forgot_text')}</Text>
      </TouchableOpacity>
      <View style={{marginTop: 25}}>
        <CustomButton
          onPress={() => {
            setValidateOnChange(true);
            handleSubmit();
          }}
          text={t('login.button_text')}
          disabled={isSubmitting}
          loading={isSubmitting}
        />
      </View>
      {isError && (
        <View style={styles.requestError}>
          <Text>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  loginForm: {
    width: '100%',
  },
  formFieldContainer: {
    marginTop: 35,
  },
  navLink: {
    color: 'blue',
  },
  requestError: {
    width: '100%',
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
