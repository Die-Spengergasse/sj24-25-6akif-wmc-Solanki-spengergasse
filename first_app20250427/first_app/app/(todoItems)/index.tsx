import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getTodoItems } from '@/utils/todoItems/apiClient';
import { TodoItem } from '@/types/TodoItem';

export default function TodoItemsPage() {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    getTodoItems().then((items) => {
      if (Array.isArray(items)) {
        setTodoItems(items);
      }
    });
  }, []);

  const filteredItems = selectedCategory
    ? todoItems.filter((item) => item.categoryGuid === selectedCategory)
    : todoItems;

  const uniqueCategories = Array.from(new Set(todoItems.map((t) => t.categoryGuid)))
    .map((guid) => {
      const firstMatch = todoItems.find((t) => t.categoryGuid === guid);
      return { guid, name: firstMatch?.categoryName || '' };
    });

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(value) => setSelectedCategory(value)}
        style={styles.picker}
      >
        <Picker.Item label="Alle Kategorien" value={null} />
        {uniqueCategories.map((cat) => (
          <Picker.Item key={cat.guid} label={cat.name} value={cat.guid} />
        ))}
      </Picker>

      {filteredItems.map((item) => (
        <View key={item.guid} style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.description}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  picker: { marginBottom: 16 },
  item: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
  title: { fontWeight: 'bold', marginBottom: 4 },
});
