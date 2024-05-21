import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useMyContextController } from '../store'


const Services = ({navigation}) => {
    const [controller, dispatch] = useMyContextController();
    const {userLogin} = controller;
    useEffect(() => {
        if(userLogin==null)
            navigation.navigate("Login")
    }, [userLogin])
  return (
    <View>
      <Text>Services</Text>
    </View>
  )
}

export default Services