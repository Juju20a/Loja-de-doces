import React, { useState } from 'react';
import {
  View, Text, FlatList, TextInput, StyleSheet,
  TouchableOpacity, Modal, Image, ScrollView, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LojaDeDocesScreen() {
  const [doces, setDoces] = useState([]);
  const [busca, setBusca] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [doceSelecionado, setDoceSelecionado] = useState(null);

  React.useEffect(() => {
    const carregarDoces = async () => {
      try {
        const json = await AsyncStorage.getItem('doces');
        if (json) {
          setDoces(JSON.parse(json));
        } else {
          setDoces([
            {
              id: '1',
              nome: 'Trufa',
              preco: 3.00,
              categoria: 'Chocolate',
              imagem: 'https://media.istockphoto.com/id/168413702/pt/foto/luxo-leite-e-chocolate-amargo-trufas.webp?a=1&b=1&s=612x612&w=0&k=20&c=jmM1bvj0JHfMtlJ5gXv768gTYNegSYdT2PM4lDVcf7Y=',
            },
            {
              id: '2',
              nome: 'Beijinho',
              preco: 1.5,
              categoria: 'Coco',
              imagem: 'https://media.istockphoto.com/id/183597239/pt/foto/brasileiro-beijinho-um-doce-com-ingredientes.webp?a=1&b=1&s=612x612&w=0&k=20&c=uvp3xpsH15fYmXlFoELF3dJ1qWvtPNG5tq1Gm7UlvMo=',
            },
            {
              id: '3',
              nome: 'Torta de morango',
              preco: 7.00,
              categoria: 'Torta',
              imagem: 'https://media.istockphoto.com/id/1441705881/pt/foto/strawberry-pie.webp?a=1&b=1&s=612x612&w=0&k=20&c=L-MxWS-p1uyF2d2Fo4_6UF_ze-1m0X3JTUAuqwz_i9o=',
            },
            {
              id: '4',
              nome: 'Bolo simples',
              preco: 2.50,
              categoria: 'Bolo',
              imagem: 'https://media.istockphoto.com/id/2154070865/pt/foto/homemade-corn-cake-on-white-plate-on-rustic-wooden-table-typical-brazilian-party-food.webp?a=1&b=1&s=612x612&w=0&k=20&c=MeEkmj_UbHa772oY9WsSCQHVUkHN868QYZYMhOLuyLg=',
            },
          ]);
        }
      } catch (e) {
        Alert.alert('Erro', 'Não foi possível carregar os doces.');
      }
    };
    carregarDoces();
  }, []);

  //AsyncStorage é um sistema de armazenamento de chave-valor 
  // não criptografado, assíncrono e persistente, 
  // global para o aplicativo.
  // Ele é usado para armazenar dados simples, como preferência do usuário,
  // configurações do aplicativo, etc.
  React.useEffect(() => {
  if (doces.length > 0) {
    AsyncStorage.setItem('doces', JSON.stringify(doces));
  }
}, [doces]);

const filtrarDoces = () => {
  return doces.filter(d =>
    d.nome.toLowerCase().includes(busca.toLowerCase()) ||
    d.categoria.toLowerCase().includes(busca.toLowerCase())
  );
};
  // Função para abrir o modal
  const abrirModal = (doce = null) => {
    setDoceSelecionado(doce || { nome: '', preco: '', categoria: '', imagem: '' });
    setModalVisible(true);
  };

  const salvarDoce = () => {
    if (!doceSelecionado.nome || !doceSelecionado.preco || !doceSelecionado.categoria || !doceSelecionado.imagem) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }
    const precoConvertido = parseFloat(doceSelecionado.preco);
    if (isNaN(precoConvertido)) {
      Alert.alert('Erro', 'Preço inválido.');
      return;
    }
    if (doceSelecionado.id) {
      setDoces(doces.map(d => d.id === doceSelecionado.id ? { ...doceSelecionado, preco: precoConvertido } : d));
      Alert.alert('Sucesso', 'Doce atualizado com sucesso!');
    } else {
      setDoces([...doces, { ...doceSelecionado, id: Date.now().toString(), preco: precoConvertido }]);
      Alert.alert('Sucesso', 'Doce salvo com sucesso!');
    }
    setModalVisible(false);
    setDoceSelecionado(null);
  };

  const deletarDoce = () => {
    Alert.alert('Confirmar', 'Deseja realmente excluir?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir', style: 'destructive',
        onPress: () => {
          setDoces(doces.filter(d => d.id !== doceSelecionado.id));
          setModalVisible(false);
          Alert.alert('Sucesso', 'Doce excluído com sucesso!');
        }
      }
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => abrirModal(item)}
      >
        <Image source={{ uri: item.imagem }} style={styles.image} />
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.preco}>R$ {Number(item.preco).toFixed(2)}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnAddCart} onPress={() => abrirModal(item)}>
        <Text style={{ color: '#fff' }}>Editar</Text>
      </TouchableOpacity>
    </View>
  );

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
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={styles.botaoAdd}
        onPress={() => abrirModal()}
      >
        <Text style={{ color: '#fff', fontSize: 16 }}>+ Adicionar Doce</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide">
        <ScrollView style={{ padding: 20 }}>
          <Text style={styles.tituloModal}>{doceSelecionado?.id ? 'Editar Doce' : 'Novo Doce'}</Text>
          <TextInput
            placeholder="Nome"
            style={styles.input}
            value={doceSelecionado?.nome}
            onChangeText={t => setDoceSelecionado({ ...doceSelecionado, nome: t })}
          />
          <TextInput
            placeholder="Preço"
            style={styles.input}
            keyboardType="numeric"
            value={doceSelecionado?.preco.toString()}
            onChangeText={t => setDoceSelecionado({ ...doceSelecionado, preco: t })}
          />
          <TextInput
            placeholder="Categoria"
            style={styles.input}
            value={doceSelecionado?.categoria}
            onChangeText={t => setDoceSelecionado({ ...doceSelecionado, categoria: t })}
          />
          <TextInput
            placeholder="URL da Imagem"
            style={styles.input}
            value={doceSelecionado?.imagem}
            onChangeText={t => setDoceSelecionado({ ...doceSelecionado, imagem: t })}
          />
          <TouchableOpacity style={styles.btnSalvar} onPress={salvarDoce}>
            <Text style={{ color: '#fff' }}>Salvar</Text>
          </TouchableOpacity>
          {doceSelecionado?.id && (
            <TouchableOpacity style={styles.btnExcluir} onPress={deletarDoce}>
              <Text style={{ color: '#fff' }}>Excluir</Text>
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
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  card: { backgroundColor: '#fff', padding: 10, borderRadius: 8, elevation: 2, marginBottom: 10 },
  image: { width: '100%', height: 120, borderRadius: 8 },
  nome: { fontWeight: 'bold', fontSize: 16, marginTop: 8 },
  preco: { color: 'green' },
  botaoAdd: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#6200ea', padding: 15, borderRadius: 30 },
  tituloModal: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  btnSalvar: { backgroundColor: 'green', padding: 15, alignItems: 'center', borderRadius: 5, marginBottom: 10 },
  btnExcluir: { backgroundColor: 'red', padding: 15, alignItems: 'center', borderRadius: 5, marginBottom: 10 },
  btnCancelar: { alignItems: 'center' },
  btnAddCart: { backgroundColor: '#2196F3', padding: 10, borderRadius: 5, marginTop: 10, alignItems: 'center' },
});
