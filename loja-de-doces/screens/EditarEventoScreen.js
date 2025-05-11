import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function EditarEventoScreen({ route, navigation }) {
  const [evento, setEvento] = useState({
    nome: '',
    descricao: '',
    data: '',
  });

  useEffect(() => {
    if (route.params?.evento) {
      setEvento(route.params.evento);
    }
  }, [route.params?.evento]);

  // Função para salvar o evento
  const salvarEvento = () => {
    if (!evento.nome || !evento.descricao || !evento.data) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios');
      return;
    }

    // Validando a data no formato yyyy-mm-dd
    const dataRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dataRegex.test(evento.data)) {
      Alert.alert('Erro', 'Por favor, insira uma data válida no formato yyyy-mm-dd');
      return;
    }

    console.log('Evento atualizado:', evento);
    Alert.alert('Sucesso', 'Evento editado com sucesso');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Evento</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do Evento"
        value={evento.nome}
        onChangeText={(text) => setEvento({ ...evento, nome: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={evento.descricao}
        onChangeText={(text) => setEvento({ ...evento, descricao: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Data do Evento (yyyy-mm-dd)"
        value={evento.data}
        onChangeText={(text) => setEvento({ ...evento, data: text })}
      />

      <TouchableOpacity style={[styles.botao, styles.botaoVerde]} onPress={salvarEvento}>
        <Text style={styles.textoBotao}>Salvar Evento</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.botao, styles.botaoCinza]} onPress={() => navigation.goBack()}>
        <Text style={styles.textoBotao}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  botao: {
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  botaoVerde: {
    backgroundColor: 'green',
  },
  botaoCinza: {
    backgroundColor: '#666',
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
