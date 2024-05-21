import { Alert, Image, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNewService, login, useMyContextController } from '../store'
import { Button, HelperText, Text, TextInput } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import ImagePicker from 'react-native-image-crop-picker'

const AddNewServices = ({ navigation }) => {

  const [serviceName, setServiceName] = useState('');
  const [price, setPrice] = useState(0);
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;
  const [pathImage, setPathImage] = useState(null)

  const SERVICES = firestore().collection('SERVICES')

  const uploadImage = () => {
    ImagePicker.openPicker({
      cropping: true,
      width: 300,
      height: 400,
      mediaType: 'photo'
    })
      .then(image => setPathImage(image.path))
      .catch(e => console.log(e.message))
  }

  useEffect(() => {
    if (userLogin == null)
      navigation.navigate("Login")
  }, [userLogin])

  const handleAddNewServices = async () => {
    if (!serviceName || !price || !pathImage) {
      console.log('Vui lòng nhập đầy đủ thông tin')
    }
    else {
      
      const data = {
        serviceName: serviceName,
        price: price,
        creator: userLogin.name,
        image: '',
      }
      SERVICES.add(data)
      .then(response => {
        const ref = storage().ref("/services/"+ response.id + ".png")
        ref.putFile(pathImage).then(() => {
          ref.getDownloadURL().then(link => 
            {
            console.log(link)
            SERVICES.doc(response.id).update({id: response.id, image: link})
            }
          )
        })
        Alert.alert("Add new service success")
        navigation.navigate('Admin')
      })
      .catch(e => Alert.alert("Add new service fail"))
    }
  }

  

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <Text style={{ paddingTop: 10, paddingLeft: 10, fontWeight: 'bold' }}>Services Name *</Text>
      <TextInput placeholder='Inpur a service name' value={serviceName} onChangeText={setServiceName}
        style={{ margin: 10 }}
        mode='outlined'
      />
      <Text style={{ paddingTop: 10, paddingLeft: 10, fontWeight: 'bold' }}>Price *</Text>
      <TextInput placeholder='input price' value={price} onChangeText={setPrice}
        defaultValue={price.toString()}
        style={{ margin: 10 }}
        mode='outlined'
      />
      <Button onPress={uploadImage}>
        Upload Image
      </Button>
      {
        pathImage &&
          <Image source={{ uri: pathImage }}
            resizeMode='contain'
            style={{ height: 300, width: 400 }}
          />
      }
      <Button mode='contained-tonal' onPress={handleAddNewServices} buttonColor='#f5456e'
        style={{
          margin: 10,
          padding: 5
        }}
        labelStyle={{
          fontSize: 20
        }}
      >
        Add
      </Button>
    </View>
  )
}

export default AddNewServices