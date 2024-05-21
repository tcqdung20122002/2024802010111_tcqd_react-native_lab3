import { Alert, Image, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button, HelperText, IconButton, Text, TextInput } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'
import { useMyContextController } from '../store';
import DatePicker from 'react-native-date-picker';

const Appointment = ({ navigation, route }) => {

    const [controller, dispatch] = useMyContextController();
    const { userLogin } = controller;
    const { idservice } = route.params.item
    const [services, setService] = useState([]);
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const SERVICES = firestore().collection('SERVICES')
    const APPOINTMENT = firestore().collection('APPOINTMENT')

    useEffect(() => {
        SERVICES.doc(idservice).onSnapshot(response => {
            setService(response.data())
        })
    }, [])

    useEffect(() => {
        if (userLogin == null)
            navigation.navigate("Login")
    }, [userLogin])

    const handleAddNewAppointment = async () => {
        const data = {
            id_customer: userLogin.email,
            id_services: idservice,
            time: date
        }
        APPOINTMENT.add(data)
        .then(() => 
            Alert.alert("Add new appointment successfully !"),
            navigation.navigate('Customer')
        )
        .catch(e => Alert.alert("Add new appointment fail"))
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            {
                services.image && services.image != '' ? (
                    <Image source={{ uri: services.image }}
                        resizeMode='cover'
                        style={{ height: 300, width: '100%' }}
                    />
                )
                    : (
                        <></>
                    )
            }
            <Text style={{ margin: 10, fontSize: 20, fontWeight: 'bold' }}>
                Service Name:
                <Text style={{ fontSize: 20 }}>
                    {services.serviceName}
                </Text>
            </Text>
            <Text style={{ margin: 10, fontSize: 20, fontWeight: 'bold' }}>
                Price:
                <Text style={{ fontSize: 20 }}>
                    {services.price}
                </Text>
            </Text>
            <View style={{ flexDirection: 'row', margin: 10 }}>
                <TextInput label="Time"
                    disabled='true'
                    style={{ flex: 9 }}
                    value={date.toString()}
                    mode='flat' />
                <Button mode='contained' style={{ flex: 1, borderRadius: 0, justifyContent: 'center' }} buttonColor='#f5456e' onPress={() => setOpen(true)}>Pick</Button>
                <DatePicker
                    modal
                    open={open}
                    date={date}
                    mode='datetime'
                    onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />
            </View>
            <Button mode='contained' style={{ margin: 10, justifyContent: 'center', height: 50 }} buttonColor='#f5456e' onPress={() => handleAddNewAppointment()}>Appointment</Button>
        </View>
    );
}





export default Appointment