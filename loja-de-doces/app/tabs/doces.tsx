import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function DocesScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🍭 Loja de Doces</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🍫 Doces Tradicionais</Text>
        <Text>- Brigadeiro Clássico: R$ 2,50</Text>
        <Text>- Beijinho de Coco: R$ 2,50</Text>
        <Text>- Cajuzinho: R$ 2,50</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎁 Doces Gourmet</Text>
        <Text>- Brigadeiro de Pistache: R$ 4,00</Text>
        <Text>- Trufa de Maracujá: R$ 4,50</Text>
        <Text>- Brownie com Nozes: R$ 6,00</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📦 Contato e Encomendas</Text>
        <Text>WhatsApp: (11) 91234-5678</Text>
        <Text>Endereço: Rua das Rosas, 123</Text>
        <Text>Instagram: @lojadocinhofeliz</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#e91e63',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#6a1b9a',
  },
});
