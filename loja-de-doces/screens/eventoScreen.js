import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import EventoActionsModal from './components/EventoActionsModal';


export default function EventoScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [evento, setEvento] = useState({
    id: 1,
    nome: 'Evento Exemplo',
    descricao: 'Descrição do evento',
    data: '2025-05-10',
  });

  const handleEditEvent = () => {
    // Navegar para a tela de edição do evento
    console.log('Editando evento', evento);
    // Aqui você poderia usar navigation para ir para a tela de edição
    navigation.navigate('EditarEvento', { evento });
  };

  const handleDeleteEvent = () => {
    // Excluir o evento da lista ou banco de dados
    console.log('Excluindo evento', evento);
    // Aqui você pode fazer a lógica de exclusão, como chamar um API ou atualizar o estado
    Alert.alert('Evento excluído com sucesso');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{evento.nome}</Text>
      <Text>{evento.descricao}</Text>
      <Text>{evento.data}</Text>

      <TouchableOpacity style={styles.button} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.buttonText}>Ações do Evento</Text>
      </TouchableOpacity>

      {/* Modal para editar ou excluir o evento */}
      <EventoActionsModal
        evento={evento}
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
