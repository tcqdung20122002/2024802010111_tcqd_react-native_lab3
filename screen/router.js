import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useMyContextController } from '../store';
import Login from './login';
import Register from './register';
import Admin from './admin';
import Customer from './customer';
import { useNavigation } from '@react-navigation/native';
import RouteAdmin from './RouteAdmin';
import RouteCustomer from './RouteCustomer';


const Stack = createStackNavigator();

export default function Router() {
    const navigation = useNavigation();
    const [controller, dispatch] = useMyContextController();
    const { userLogin } = controller;
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Admin" component={Admin} />
            <Stack.Screen name="Customer" component={Customer} />
            <Stack.Screen name="Login" component={Login} navigation = {navigation} />
            <Stack.Screen name="Register" component={Register} navigation = {navigation}/>
            <Stack.Screen name="RouteAdmin" component={RouteAdmin} navigation = {navigation} />
            <Stack.Screen name="RouteCustomer" component={RouteCustomer} navigation = {navigation} />
        </Stack.Navigator>
    );
}