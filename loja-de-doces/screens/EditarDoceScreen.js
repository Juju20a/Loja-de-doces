import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function EditarDoceScreen({ route }) {
  const navigation = useNavigation();
  const { doceOriginal, atualizar, excluir } = route.params; // Recebe a função de atualizar e excluir da navegação
  const [doce, setDoce] = useState({ ...doceOriginal });

  const salvar = () => {
    if (!doce.nome || !doce.preco) {
      Alert.alert('Erro', 'Preencha nome e preço!');
      return;
    }

    const precoConvertido = parseFloat(doce.preco);
    if (isNaN(precoConvertido)) {
      Alert.alert('Erro', 'Preço inválido.');
      return;
    }

    atualizar({ ...doce, preco: precoConvertido }); // Chama a função atualizar
    navigation.goBack(); // Volta para a tela anterior
  };

  const excluirDoce = () => {
    Alert.alert(
      'Excluir Doce',
      'Você tem certeza que deseja excluir este doce?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir', 
          onPress: () => {
            excluir(doce.id); // Chama a função excluir com o ID do doce
            navigation.goBack(); // Volta para a tela anterior
          }
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Editar Doce</Text>
      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={doce.nome}
        onChangeText={t => setDoce({ ...doce, nome: t })}
      />
      <TextInput
        placeholder="Preço"
        style={styles.input}
        keyboardType="numeric"
        value={doce.preco.toString()}
        onChangeText={t => setDoce({ ...doce, preco: t })}
      />
      <TextInput
        placeholder="Categoria"
        style={styles.input}
        value={doce.categoria}
        onChangeText={t => setDoce({ ...doce, categoria: t })}
      />
      <TextInput
        placeholder="URL da Imagem"
        style={styles.input}
        value={doce.imagem}
        onChangeText={t => setDoce({ ...doce, imagem: t })}
      />

      {/* Botão Salvar */}
      <TouchableOpacity style={styles.btn} onPress={salvar}>
        <Text style={{ color: '#fff' }}>Salvar</Text>
      </TouchableOpacity>

      {/* Botão Excluir */}
      <TouchableOpacity style={styles.btnExcluir} onPress={excluirDoce}>
        <Text style={{ color: '#fff' }}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  btn: { backgroundColor: '#2196F3', padding: 15, alignItems: 'center', borderRadius: 5 },
  btnExcluir: { backgroundColor: '#F44336', padding: 15, alignItems: 'center', borderRadius: 5, marginTop: 10 },
});
