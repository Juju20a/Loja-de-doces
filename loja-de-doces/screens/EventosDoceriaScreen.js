import React, { useState } from 'react';
import {
  View, Text, FlatList, TextInput, StyleSheet,
  TouchableOpacity, Modal, ScrollView, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function EventosDoceriaScreen() {
  const [eventos, setEventos] = useState([
    { id: '1', titulo: 'Aniversário da Loja', data: '2025-06-01' },
    { id: '2', titulo: 'Degustação Especial', data: '2026-06-10' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);

  const navigation = useNavigation();

  const abrirModal = (evento = null) => {
    setEventoSelecionado(evento || { titulo: '', data: '' });
    setModalVisible(true);
  };

  const salvarEvento = () => {
    if (!eventoSelecionado.titulo || !eventoSelecionado.data) return;

    if (eventoSelecionado.id) {
      setEventos(eventos.map(e => e.id === eventoSelecionado.id ? eventoSelecionado : e));
    } else {
      setEventos([...eventos, { ...eventoSelecionado, id: Date.now().toString() }]);
    }

    setModalVisible(false);
    setEventoSelecionado(null);
  };

  const deletarEvento = () => {
    Alert.alert("Confirmar", "Deseja excluir este evento?", [
      { text: "Cancelar" },
      {
        text: "Excluir", style: "destructive",
        onPress: () => {
          setEventos(eventos.filter(e => e.id !== eventoSelecionado.id));
          setModalVisible(false);
        }
      }
    ]);
  };

  // Uso da navegação
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('EditarEvento', { evento: item })}
    >
      <Text style={styles.tituloEvento}>{item.titulo}</Text>
      <Text style={styles.dataEvento}>{item.data}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={styles.titulo}>🍬 Eventos da Doceria</Text>

      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
  
      <TouchableOpacity
        style={styles.botaoAdd}
        onPress={() => navigation.navigate('NovoEvento')}
      >
        <Text style={{ color: '#fff', fontSize: 16 }}>+ Novo Evento</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <ScrollView style={{ padding: 20 }}>
          <Text style={styles.tituloModal}>
            {eventoSelecionado?.id ? 'Editar Evento' : 'Novo Evento'}
          </Text>

          <TextInput
            placeholder="Título do Evento"
            style={styles.input}
            value={eventoSelecionado?.titulo}
            onChangeText={t => setEventoSelecionado({ ...eventoSelecionado, titulo: t })}
          />
          <TextInput
            placeholder="Data (YYYY-MM-DD)"
            style={styles.input}
            value={eventoSelecionado?.data}
            onChangeText={t => setEventoSelecionado({ ...eventoSelecionado, data: t })}
          />

          <TouchableOpacity style={styles.btnSalvar} onPress={salvarEvento}>
            <Text style={{ color: 'green' }}>Salvar</Text>
          </TouchableOpacity>

          {eventoSelecionado?.id && (
            <TouchableOpacity style={styles.btnExcluir} onPress={deletarEvento}>
              <Text style={{ color: 'red' }}>Excluir</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.btnCancelar}>
            <Text>Cancelar</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  card: {
    backgroundColor: '#fff0f5', padding: 15, borderRadius: 8,
    marginBottom: 10, borderColor: '#ff69b4', borderWidth: 1
  },
  tituloEvento: { fontSize: 16, fontWeight: 'bold', color: '#d63384' },
  dataEvento: { fontSize: 14, color: '#555' },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 5,
    padding: 10, marginBottom: 10
  },
  botaoAdd: {
    position: 'absolute', right: 20, bottom: 20,
    backgroundColor: '#ff69b4', padding: 15, borderRadius: 30
  },
  tituloModal: {
    fontSize: 20, fontWeight: 'bold', marginBottom: 20
  },
  btnSalvar: {
    backgroundColor: '#ff0000', padding: 15, alignItems: 'center',
    borderRadius: 5, marginBottom: 10
  },
  btnExcluir: {
    backgroundColor: 'red', padding: 15, alignItems: 'center',
    borderRadius: 5, marginBottom: 10
  },
  btnCancelar: {
    backgroundColor: '#d3d3d3', padding: 15, alignItems: 'center',
    borderRadius: 5, marginTop: 10
  }
});
