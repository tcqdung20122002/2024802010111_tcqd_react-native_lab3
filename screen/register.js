import { Alert, View } from 'react-native'
import React, { useState } from 'react'
import { Button, HelperText, Text, TextInput } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

const Register = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const hasErrorName = () => name==""
    const hasErrorEmail = () => !email.includes('@') && email.length > 0
    const hasErrorPass = () => password.length < 6
    const hasErrorPassConfirm = () => passwordConfirm != password || passwordConfirm.length < 6
    const USERS = firestore().collection("USERS")

    const handleCreateAccount = () => {
        auth().createUserWithEmailAndPassword(email, password)
        .then(response => {
            USERS.doc(email)
            .set({
                name,
                email,
                password,
                address,
                phone,
                role: 'customer'
            })
            navigation.navigate("Login")
        })
        .catch(e => Alert.alert('Tài khoản đã tồn tại'))
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
            <Text style={{ fontSize: 40, fontWeight: 'bold', alignSelf: 'center', color: 'pink', marginBottom: 30 }}>
                Register
            </Text>
            <TextInput label={'Full Name'} value={name} onChangeText={setName}
                style={{ margin: 10 }}
                mode='outlined'
            />
            <HelperText type='error' visible={hasErrorName()}>
                Sai name
            </HelperText>
            <TextInput label={'Email'} placeholder='email' value={email} onChangeText={setEmail}
                style={{ margin: 10 }}
                mode='outlined'
            />
            <HelperText type='error' visible={hasErrorEmail()}>
                Sai mail
            </HelperText>
            <TextInput label={'Password'} placeholder='password' value={password} onChangeText={setPassword}
                secureTextEntry={showPassword}
                style={{ margin: 10 }}
                right={<TextInput.Icon icon={showPassword ? "eye" : "eye-off"} onPress={() => setShowPassword(!showPassword)}/>}
                mode='outlined'
            />
            <HelperText type='error' visible={hasErrorPass()}>
                Sai PassWord
            </HelperText>
            <TextInput label={"Password Again"} placeholder='password' value={passwordConfirm} onChangeText={setPasswordConfirm}
                secureTextEntry={showPasswordConfirm}
                style={{ margin: 10 }}
                right={<TextInput.Icon icon={showPasswordConfirm ? "eye" : "eye-off"} onPress={() => setShowPasswordConfirm(!showPasswordConfirm)}/>}
                mode='outlined'
            />
            <HelperText type='error' visible={hasErrorPassConfirm()}>
                Sai PassWord
            </HelperText>
            <TextInput label={'Address'} value={address} onChangeText={setAddress}
                style={{ margin: 10 }}
                mode='outlined'
            />
            <TextInput label={'Phone'} value={phone} onChangeText={setPhone}
                style={{ margin: 10 }}
                mode='outlined'
            />
            <Button mode='contained-tonal' buttonColor='pink' onPress={() => handleCreateAccount()}
                style={{
                    margin: 10,
                    padding: 5
                }}
                labelStyle={{
                    fontSize: 20
                }}
            >
                Đăng ký
            </Button>
        </View>
    )
}

export default Register