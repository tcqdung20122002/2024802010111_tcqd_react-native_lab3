import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal } from 'react-native';

const customers = [
  { id: 1, name: 'a', phone: '123456789', address: 'Address 1', email: 'lecong2002asd@gmail.com' },
  { id: 2, name: 'dung', phone: '034839248399', address: 'aaaaaaaa', email: 'tcqdung@gmail.com' },
  // Add more customers as per your needs
];

const ListCustomer = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleItemPress = (customer) => {
    setSelectedCustomer(customer);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
      <View style={{ flexDirection: 'row', padding: 10, backgroundColor: '#ebebeb' }}>
        <Text style={{ flex: 1, color: '#333333' }}>{item.name}</Text>
        <Text style={{ flex: 1, color: '#333333' }}>{item.phone}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333333' }}>
        ListCustomer
      </Text>
      <FlatList
        data={customers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
          {selectedCustomer && (
            <View>
              <Text style={{ fontSize: 16, marginBottom: 10, color: '#333333' }}>Name: {selectedCustomer.name}</Text>
              <Text style={{ fontSize: 16, marginBottom: 10, color: '#333333' }}>Address: {selectedCustomer.address}</Text>
              <Text style={{ fontSize: 16, marginBottom: 10, color: '#333333' }}>Email: {selectedCustomer.email}</Text>
              <Text style={{ fontSize: 16, marginBottom: 10, color: '#333333' }}>Phone: {selectedCustomer.phone}</Text>
            </View>
          )}
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={{ fontSize: 16, color: '#007AFF' }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ListCustomer;