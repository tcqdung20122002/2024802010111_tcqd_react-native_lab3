import React, { useEffect, useState } from 'react'
import { useMyContextController } from '../store'
import Services from './Services'
import ServicesDetail from './DetailServices'
import { createStackNavigator } from '@react-navigation/stack'
import AddNewServices from './AddNewServices'

const Stack = createStackNavigator();

export default RouterAdmin = ({ navigation }) => {
    const [controller, dispatch] = useMyContextController();
    const { userLogin } = controller;

    useEffect(() => {
        if (userLogin == null)
            navigation.navigate("Login")
    }, [userLogin])

    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Services' component={Services}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='AddNewService' component={AddNewServices}
                options={{
                    headerTitle: 'Service',
                    headerStyle: { backgroundColor: '#f5456e' },
                    headerTintColor: 'white'
                }}
            />
            <Stack.Screen name='ServiceDetail' component={ServicesDetail}
                options={{
                    headerTitle: 'Service Detail',
                    headerStyle: { backgroundColor: '#f5456e' },
                    headerTintColor: 'white'
                }}
            />
        </Stack.Navigator>
    )
}