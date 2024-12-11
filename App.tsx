import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

interface ShoppingItem {
  id: string;
  name: string;
  completed: boolean;
}

export default function ShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [newItemName, setNewItemName] = useState('');

  //Função pra adicionar item à lista
  const addItem = () => {
    if (newItemName.trim() !== '') {
      setItems([...items, { id: Date.now().toString(), name: newItemName, completed: false }]);
      setNewItemName('');
    }
  };

  //Função pra marcar item como completo
  const toggleComplete = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  // Função pra deletar item da lista
  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  //Renderiza a lista de itens
  const renderItem = ({ item }: { item: ShoppingItem }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => toggleComplete(item.id)} style={styles.itemName}>
        <Text style={[styles.itemText, item.completed && styles.completedItem]}>
          {item.name}
        </Text>
      </TouchableOpacity>
      <View style={styles.itemActions}>
        <TouchableOpacity onPress={() => deleteItem(item.id)} style={styles.deleteButton}>
          <Text style={styles.buttonText}>Remover</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Compras</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newItemName}
          onChangeText={setNewItemName}
          placeholder="Adicionar item à lista"
        />
        <TouchableOpacity onPress={addItem} style={styles.addButton}>
          <Text style={styles.PlusButton}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    display: "flex",
    alignItems: 'center',
    textAlign: "center",
    fontSize: 24,
    fontWeight: 'bold',
    borderBottomWidth: 5,
    borderBottomColor: "#4d4d4d",
    marginTop: 20,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  addButton: {
    backgroundColor: '#5cb85c',
    padding: 10,
    borderRadius: 6,
    marginLeft: 10,
    justifyContent: 'center',
  },
  list: {
    flex: 1,
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemName: {
    flex: 1,
  },
  itemText: {
    fontSize: 18,
  },
  completedItem: {
    textDecorationLine: 'line-through',
    color: '#797979',
  },
  itemActions: {
    flexDirection: 'row',
  },
  deleteButton: {
    backgroundColor: '#d9534f',
    padding: 5,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  PlusButton: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  }
});