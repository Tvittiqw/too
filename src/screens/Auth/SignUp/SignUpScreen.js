import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SignUpForm} from '../../../components/auth';
import styles from './styles';
import signupValidationSchema from '../../../validators/signupValidationSchema';
import {useTypedDispatch} from '../../../hooks/storeHooks/typedStoreHooks';
import {signUpRequest} from '../../../redux/auth/authSlice';
import {useTranslation} from 'react-i18next';

const SignUpScreen = ({navigation}) => {
  const [activeStep, setActiveStep] = useState('first');
  const currentValidationSchema = signupValidationSchema[activeStep];
  const [validateFirstStepOnChange, setValidateFirstStepOnChange] =
    useState(false);
  const [validateSecondStepOnChange, setValidateSecondStepOnChange] =
    useState(false);
  const dispatch = useTypedDispatch();

  const {t} = useTranslation();

  const submitSignUpForm = async (formValues, action) => {
    if (activeStep === 'second') {
      action.setSubmitting(true);
      await dispatch(signUpRequest(formValues));
      action.setSubmitting(false);
      navigation.push('BottomTab');
    } else {
      setActiveStep('second');
      action.setTouched({});
      action.setSubmitting(false);
    }
  };

  function handleBack() {
    setActiveStep('first');
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.signupText}>{t('signup.title')}</Text>
        {activeStep === 'second' && (
          <TouchableOpacity onPress={() => handleBack()}>
            <View>
              <Text>Back</Text>
            </View>
          </TouchableOpacity>
        )}

        <KeyboardAvoidingView style={{width: '100%'}} behavior={'position'}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <SignUpForm
              step={activeStep}
              initialValues={{
                firstName: '',
                lastName: '',
                userName: '',
                email: '',
                password: '',
                confirmPassword: '',
              }}
              onSubmit={submitSignUpForm}
              setActiveStep={setActiveStep}
              validationSchema={currentValidationSchema}
              setValidateFirstStepOnChange={setValidateFirstStepOnChange}
              validateFirstStepOnChange={validateFirstStepOnChange}
              setValidateSecondStepOnChange={setValidateSecondStepOnChange}
              validateSecondStepOnChange={validateSecondStepOnChange}
            />

            {activeStep === 'first' && (
              <View style={styles.loginContainer}>
                <Text>{t('signup.already_have_account')}</Text>
                <TouchableOpacity onPress={() => navigation.push('Login')}>
                  <Text style={styles.navLink}>{t('signup.login_link')}</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
