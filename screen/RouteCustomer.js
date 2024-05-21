import React, { useEffect, useState } from 'react'
import { useMyContextController } from '../store'
import Services from './Services'
import { createStackNavigator } from '@react-navigation/stack'
import Appointment from './Appointment'

const Stack = createStackNavigator();

export default RouteCustomer = ({ navigation }) => {
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
            <Stack.Screen name='Appointment' component={Appointment}
                options={{
                    headerTitle: 'Appointment',
                    headerStyle: { backgroundColor: '#f5456e' },
                    headerTintColor: 'white'
                }}
            />
        </Stack.Navigator>
    )
}