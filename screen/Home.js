import { View, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon, Text } from 'react-native-paper'
import { useMyContextController } from '../store';
import firestore from '@react-native-firebase/firestore'

const Home = ({ navigation }) => {

    const SERVICES = firestore().collection('SERVICES')
    const [serviceData, setServiceData] = useState([]);
    const [controller, dispatch] = useMyContextController();
    const { userLogin } = controller;

    useEffect(() => {
        if (userLogin == null)
            navigation.navigate("Login")
    }, [userLogin])

    useEffect(() => {
        const getServicesData = SERVICES.onSnapshot((snapshot) => {
            const data = [];
            snapshot.forEach((doc) => {
                const service = doc.data();
                const idservice = doc.id;
                data.push({ idservice, ...service });
            });
            setServiceData(data);
        });

        return () => {
            getServicesData();
        };
    }, []);

    const renderItem = ({ item }) => {
        const handleSelectedItem = () => {
            {
                userLogin.role == "admin" ? (
                    navigation.navigate('RouteAdmin', { screen: 'ServiceDetail', params: { item } })
                ) : (
                    navigation.navigate('RouteCustomer', { screen: 'Appointment', params: { item } })
                )
            }
        }
        return (
            <TouchableOpacity onPress={() => handleSelectedItem()} style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between', width: '90%', borderRadius: 20, borderWidth: 1, borderColor: 'black', padding: 15, marginTop: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    {item.serviceName.length > 22 ? `${item.serviceName.substring(0, 22)}...` : item.serviceName}
                </Text>
                <Text style={{ fontSize: 20 }}>{item.price}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Image source={require('../android/app/src/img/logo.png')} style={{ height: '20%', width: '50%', alignSelf: 'center', resizeMode: 'contain' }}></Image>
            <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between', width: '90%' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Danh sách dịch vụ</Text>
                {
                    userLogin.role == "admin" && (
                        <TouchableOpacity onPress={() => navigation.navigate('RouteAdmin', { screen: 'AddNewService' })}>
                            <Icon source="plus-circle" color='#f5456e' size={30} />
                        </TouchableOpacity>
                    )
                }
            </View>
            <View>
                <FlatList
                    data={serviceData}
                    renderItem={({ item }) => renderItem({ item })}
                    keyExtractor={(item) => item.idservice}
                />
            </View>
        </View>
    )
}

export default Home