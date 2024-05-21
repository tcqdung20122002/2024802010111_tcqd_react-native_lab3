import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { login, useMyContextController } from '../store'
import { Button, HelperText, TextInput } from 'react-native-paper'

const Login = ({navigation}) => {
    const [email, setEmail] = useState("trancaoquocdung@gmail.com")
    const [pass, setPass] = useState("123456")
    const [showPass, setShowPass] = useState(false)
    const [controller, dispatch] = useMyContextController()
    const {userLogin} = controller
    const hasErrorEmail = () => !email.includes('@')
    const hasErrorPass = () => !pass.length<6
    
    useEffect(() => {
      if (userLogin != null) {
        if (userLogin.role === 'admin') navigation.navigate('Admin');
        else navigation.navigate('Customer');
      }
    }, [userLogin]);
    const onSubmit =() =>{
      login(dispatch,email,pass);
    }

  return (
    
    <View style={{flex:1,padding:10,justifyContent:'center',alignContent:'center'}}>
      <Text style={{
        fontSize:40,
        fontWeight:'bold',
        color:"pink",
        
        marginBottom: 10,
        
        alignSelf: 'center'
      }}>Login</Text>
      <TextInput

        label={"Email"}
        value={email}
        onChangeText={setEmail}
        mode='outlined'
      />
      <HelperText type='error' visible={hasErrorEmail()}>
        Sai mail
      </HelperText>
      <TextInput
        label={"PassWord"}
        value={pass}
        onChangeText={setPass}
        secureTextEntry ={!showPass}
        mode='outlined'
      />
      <HelperText type='error' visible={hasErrorPass()}>
        Sai PassWord
      </HelperText>

      <Button 
        mode='contained-tonal' 
        buttonColor='pink' 
        onPress={onSubmit}
        style={{
          margin:10,
          padding:5
        }}
        labelStyle={{
          fontSize:20
        }}
        >
        Login
      </Button>

      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Text>
                Don't have account
            </Text>
            <Button onPress={() => navigation.navigate('Register')}>
                create new account
            </Button>
        
      </View>
    </View>
  )
}

export default Login