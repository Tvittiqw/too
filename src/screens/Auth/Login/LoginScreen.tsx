import React, {FC, useState} from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {LoginForm} from "../../../components/auth";
import {LoginFormValuesType} from "../../../types/formsTypes";
import styles from "./styles"
import {NavigationPropsType} from "../../../types/navigationTypes";
import loginValidationSchema from "../../../validators/loginValidationSchema";
import {routes} from "../../../consants/routes";
import {useTypedDispatch} from "../../../hooks/storeHooks/typedStoreHooks";
import {fetchLoginForm} from "../../../redux/auth/authSlice";
import {FormikHelpers} from "formik";

type LoginNavigationProps = NavigationPropsType<"Login">

const LoginScreen: FC<LoginNavigationProps> = ({ navigation }) => {

    const [validateOnChange, setValidateOnChange] = useState(false);

    const dispatch = useTypedDispatch();

    const submitLoginForm = async (formValues: LoginFormValuesType, action: FormikHelpers<LoginFormValuesType>) => {
        action.setSubmitting(true);
        await dispatch(fetchLoginForm(formValues))
        action.setSubmitting(false);
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                <Text style={styles.loginText}>Login</Text>

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    style={{ flex: 1, width: "100%", alignItems: "center" }}
                    contentContainerStyle={{ flex: 1 }}
                    // keyboardVerticalOffset={500}
                >

                    <LoginForm
                        initialValues={{ email: "", password: "" }}
                        validationSchema={loginValidationSchema}
                        onSubmit={submitLoginForm}
                        validateOnChange={validateOnChange}
                        setValidateOnChange={setValidateOnChange}
                    />

                    <View style={{ marginTop: 30 }}>
                        <Text>Or login with...</Text>
                    </View>

                    <View style={styles.socialContainer}>
                        <TouchableOpacity
                            style={styles.socialButton}
                        >
                            <Text style={[styles.navLink, { fontSize: 22 }]}>Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.socialButton}
                        >
                            <Text style={[styles.navLink, { fontSize: 22 }]}>AppleID</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.registerContainer}>
                        <Text>Don't have an account yet? Go to </Text>
                        <TouchableOpacity onPress={() => navigation.navigate(routes.public.signup)}>
                            <Text style={styles.navLink}>Register</Text>
                        </TouchableOpacity>
                    </View>

                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;