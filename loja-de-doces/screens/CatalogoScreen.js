import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Modal, Image, ScrollView, Alert } from 'react-native';


export default function CatalogoScreen({ navigation }) {
  const [doces, setDoces] = useState([]);
  const [busca, setBusca] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [doceSelecionado, setDoceSelecionado] = useState(null);

  useEffect(() => {
    // Carregar os doces armazenados no AsyncStorage
    const carregarDoces = async () => {
      try {
        const docesSalvos = await AsyncStorage.getItem('doces');
        if (docesSalvos) {
          setDoces(JSON.parse(docesSalvos));
        }
      } catch (error) {
        console.error("Erro ao carregar os doces: ", error);
      }
    };
    carregarDoces();
  }, []);

  const filtrarDoces = () => {
    return doces.filter(d =>
      d.nome.toLowerCase().includes(busca.toLowerCase()) ||
      d.categoria.toLowerCase().includes(busca.toLowerCase())
    );
  };

  const salvarDocesNoStorage = async (novosDoces) => {
    try {
      await AsyncStorage.setItem('doces', JSON.stringify(novosDoces));
    } catch (error) {
      console.error("Erro ao salvar os doces: ", error);
    }
  };

  const salvarDoce = () => {
    if (!doceSelecionado.nome || !doceSelecionado.preco) return;

    const precoConvertido = parseFloat(doceSelecionado.preco);
    if (isNaN(precoConvertido)) {
      Alert.alert("Erro", "Preço inválido.");
      return;
    }

    let novosDoces;
    if (doceSelecionado.id) {
      novosDoces = doces.map(d => d.id === doceSelecionado.id ? { ...doceSelecionado, preco: precoConvertido } : d);
    } else {
      novosDoces = [...doces, { ...doceSelecionado, id: Date.now().toString(), preco: precoConvertido }];
    }

    setDoces(novosDoces);
    salvarDocesNoStorage(novosDoces);

    setModalVisible(false);
    setDoceSelecionado(null);
    Alert.alert("Sucesso", "Doce salvo com sucesso!");
  };

  const deletarDoce = () => {
    Alert.alert("Confirmar", "Deseja realmente excluir?", [
      { text: "Cancelar" },
      {
        text: "Excluir", style: "destructive",
        onPress: () => {
          const novosDoces = doces.filter(d => d.id !== doceSelecionado.id);
          setDoces(novosDoces);
          salvarDocesNoStorage(novosDoces);
          setModalVisible(false);
          Alert.alert("Sucesso", "Doce excluído com sucesso!");
        }
      }
    ]);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        placeholder="Buscar doce"
        style={styles.input}
        value={busca}
        onChangeText={setBusca}
      />

      <FlatList
        data={filtrarDoces()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => navigation.navigate('DetalhesDoce', { doce: item })}
            >
              <Image source={{ uri: item.imagem }} style={styles.image} />
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.preco}>R$ {Number(item.preco).toFixed(2)}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnAddCart} onPress={() => abrirModal(item)}>
              <Text style={{ color: '#fff' }}>Editar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.botaoAdd}
        onPress={() => navigation.navigate('NovoDoce', {
          adicionar: (novoDoce) => {
            const novosDoces = [...doces, novoDoce];
            setDoces(novosDoces);
            salvarDocesNoStorage(novosDoces);
          }
        })}
      >
        <Text style={{ color: '#fff', fontSize: 16 }}>+ Adicionar Doce</Text>
      </TouchableOpacity>

      {/* Modal code for editing sweet */}
    </View>
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  card: { backgroundColor: '#fff', padding: 10, borderRadius: 8, elevation: 2, marginBottom: 10 },
  image: { width: '100%', height: 120, borderRadius: 8 },
  nome: { fontWeight: 'bold', fontSize: 16, marginTop: 8 },
  preco: { color: 'green' },
  botaoAdd: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#6200ea', padding: 15, borderRadius: 30 },
  btnAddCart: { backgroundColor: '#2196F3', padding: 10, borderRadius: 5, marginTop: 10, alignItems: 'center' },
});
