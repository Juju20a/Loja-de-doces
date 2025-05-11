import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ListaDeEventosScreen({ navigation }) {
  const [eventos, setEventos] = useState([
    { id: 1, nome: 'Evento 1', descricao: 'Descrição 1', data: '2025-06-15' },
    { id: 2, nome: 'Evento 2', descricao: 'Descrição 2', data: '2025-07-20' },
  ]);

  // Função para adicionar evento na lista
  const adicionarEvento = (novoEvento) => {
    setEventos([...eventos, { ...novoEvento, id: eventos.length + 1 }]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nome}</Text>
            <Text>{item.descricao}</Text>
            <Text>{item.data}</Text>
          </View>
        )}
      />
      
      <TouchableOpacity
        style={[styles.botao, styles.botaoVerde]}
        onPress={() => navigation.navigate('AdicionarEvento', { adicionarEvento })}
      >
        <Text style={styles.textoBotao}>Adicionar Novo Evento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  botao: {
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  botaoVerde: {
    backgroundColor: 'green',
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
