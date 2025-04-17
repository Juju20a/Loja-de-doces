import { Ionicons } from '@expo/vector-icons';

<Tabs.Screen
  name="doces"
  options={{
    title: "Doces",
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="ice-cream-outline" size={size} color={color} />
    ),
  }}
/>
