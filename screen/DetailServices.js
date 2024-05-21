import { Alert, Image, View, Modal } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button, HelperText, IconButton, Text, TextInput } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import ImagePicker from 'react-native-image-crop-picker'
import { useMyContextController } from '../store';


const DetailServices = ({ route, navigation }) => {
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;
  const { idservice } = route.params.item
  const [pathImage, setPathImage] = useState(null)
  const [services, setService] = useState([]);
  const hasErrorServiceName = () => services.serviceName == "";

  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false); // Thêm state để điều khiển hiển thị modal

  const SERVICES = firestore().collection('SERVICES')

  useEffect(() => {
    SERVICES.doc(idservice).onSnapshot(response => {
      setService(response.data())
    })
  }, [])

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

  

  const handleUpdateServices = async () => {
    if (!services.serviceName || !services.price || !pathImage) {
      console.log('Vui lòng nhập đầy đủ thông tin')
    } else {
      const refImage = storage().ref("/services/" + idservice + ".png")
      refImage.putFile(pathImage)
        .then(() => {
          refImage.getDownloadURL().then(link => {
            SERVICES.doc(idservice)
              .update({ ...services, image: link })
              .then(() => {
                console.log("Update Service");
                navigation.navigate('Admin');
              })
              .catch(e => console.log(e.message))
          })
        })
    }
  }

  const handleDeleteServices = () => {
    setShowModal(true); // Hiển thị modal khi nhấn vào nút "Delete"
  }

  const handleConfirmDelete = () => {
    // Xử lý xóa dịch vụ ở đây
    SERVICES.doc(idservice)
      .delete()
      .then(() => {
        console.log("Delete Service");
        navigation.navigate('Admin');
      })
      .catch(e => console.log(e.message))
  }

  const handleCancelDelete = () => {
    setShowModal(false); // Ẩn modal khi chọn "no"
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <Button onPress={uploadImage}>
        Upload Image
      </Button>
      {services && services.image && services.image !== '' ? (
        <Image
          source={{ uri: services.image }}
          resizeMode='contain'
          style={{ height: 300, width: 400 }}
        />
      ) : (
        <></>
      )}
      <TextInput
        label={"Service Name"}
        value={services && services.serviceName}
        onChangeText={(text) => setService({ ...services, serviceName: text })}
        style={{ margin: 10 }}
      />
      <HelperText type='error' visible={services && hasErrorServiceName()}>
        Service Name is empty
      </HelperText>
      <TextInput
        label={"Price"}
        value={services && services.price}
        onChangeText={(text) => setService({ ...services, price: text })}
        style={{ margin: 10 }}
      />
      <Button
        mode='contained-tonal'
        onPress={handleUpdateServices}
        buttonColor='#f5456e'
        style={{ margin: 10, padding:5, labelStyle: { fontSize: 20 } }}
      >
        Update
      </Button>
      <Button
        mode='contained-tonal'
        buttonColor='#fff'
        style={{
          margin: 10,
          padding: 5,
          borderWidth: 2,
          borderColor: 'red',
        }}
        labelStyle={{
          fontSize: 20,
        }}
        onPress={handleDeleteServices}
      >
        Delete
      </Button>
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20 }}>
            <Text>Are you sure you want to delete?</Text>
            <Button mode='contained' onPress={handleConfirmDelete} style={{ marginTop: 10 }}>
              Yes
            </Button>
            <Button mode='outlined' onPress={handleCancelDelete} style={{ marginTop: 10 }}>
              No
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DetailServices;