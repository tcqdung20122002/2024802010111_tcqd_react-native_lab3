import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { MyConTextControllerProvider } from './store'
import Login from './screen/login'
import Register from './screen/register'
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"
import { NavigationContainer } from '@react-navigation/native'
import Router from './screen/router'
import storage from '@react-native-firebase/storage'
const initial = () =>{
  const USERS = firestore().collection("USERS")
  const admin = {
    name : "admin",
    phone: "0355521755",
    email: "a",
    pass : "123456",
    role : "admin"
  }
  USERS.doc(admin.email)
  .onSnapshot(u => {
    if(!u.exists)
      {
        auth().createUserWithEmailAndPassword(admin.email, admin.pass)
        .then(() =>
          USERS.doc(admin.email).set(admin)
          .then(() => console.log("Add new user admin"))
        )
      }
  })
}
const App = () => {
  useEffect(() =>{
    initial()
  }, [])
  return (
    <MyConTextControllerProvider>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    
    </MyConTextControllerProvider>
  )
}

export default App