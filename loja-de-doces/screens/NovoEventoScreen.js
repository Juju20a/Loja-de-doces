import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function NovoEventoScreen({ navigation }) {
  const [evento, setEvento] = useState({
    nome: '',
    descricao: '',
    data: '',
  });

  const salvarNovoEvento = () => {
    if (!evento.nome || !evento.descricao || !evento.data) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios');
      return;
    }

    console.log('Novo evento criado:', evento);
    Alert.alert('Sucesso', 'Novo evento criado com sucesso');
    
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Evento</Text>

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
        placeholder="Data do Evento"
        value={evento.data}
        onChangeText={(text) => setEvento({ ...evento, data: text })}
      />

      <TouchableOpacity style={[styles.botao, styles.botaoVerde]} onPress={salvarNovoEvento}>
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
