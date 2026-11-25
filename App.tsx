import { useEffect, useRef, useState, DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS } from "react";
import { StatusBar } from 'expo-status-bar';
import { TextInput, Text, View, Pressable } from 'react-native';

import { globalStyle } from './stylesheet'
import { TaskItem } from './components/TaskItem'

import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_KEY = '@tasks';
type Task = { id: number; task: string; completed: boolean };

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksLoaded, setTasksLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const nextId = useRef(0);

  useEffect(() => {
    async function loadTasks() {
      try {
        const saved = await AsyncStorage.getItem(TASKS_KEY);
        if (saved !== null) {
          const restoredTasks = (
            JSON.parse(saved) as Array<Omit<Task, 'completed'> & { completed?: boolean }>
          ).map(item => ({
            ...item,
            completed: item.completed ?? false,
          }));

          setTasks(restoredTasks);
          nextId.current = restoredTasks.reduce(
            (next, item) => Math.max(next, item.id + 1),
            0
          );
        }
      } catch (error) {
        console.error('Could not load tasks:', error);
      } finally {
        setTasksLoaded(true);
      }
    }

    void loadTasks();
  }, []);

  async function updateTasks() {
    const description = task.trim();
    if (!description || !tasksLoaded || isSaving) return;

    const newTask = { id: nextId.current++, task: description, completed: false };
    const updatedTasks = [...tasks, newTask];

    setIsSaving(true);
    try {
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
      setTask('');
    } catch (error) {
      console.error('Could not save tasks:', error);
    } finally {
      setIsSaving(false);
    }
  }

  async function toggleTask(id: number) {
    if (isSaving) return;

    const previousTasks = tasks;
    const updatedTasks = tasks.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );

    setTasks(updatedTasks);
    setIsSaving(true);
    try {
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
    } catch (error) {
      setTasks(previousTasks);
      console.error('Could not save tasks:', error);
    } finally {
      setIsSaving(false);
    }
  }


  return (
    <View style={globalStyle.container}>
      <StatusBar style="auto" />
      <Text style={globalStyle.title}>My tasks</Text>

      <View style={globalStyle.inputRow}>
        <TextInput
          style={globalStyle.input}
          onChangeText={setTask}
          value={task}
          placeholder="Add a task..."
          placeholderTextColor="#94A3B8"
          keyboardType="default"
          returnKeyType="done"
          onSubmitEditing={() => {
            void updateTasks();
          }}
        />
        <Pressable
          style={({ pressed }) => [
            globalStyle.addButton,
            pressed && globalStyle.addButtonPressed,
            (!tasksLoaded || isSaving) && globalStyle.disabledButton,
          ]}
          onPress={() => {
            void updateTasks();
          }}
          disabled={!tasksLoaded || isSaving}
        >
          <Text style={globalStyle.addButtonText}>Add</Text>
        </Pressable>
      </View>

      <Text style={globalStyle.sectionTitle}>Tasks ({tasks.length})</Text>
      <View style={globalStyle.taskList}>
        {tasks.length === 0 ? (
          <Text style={globalStyle.emptyState}>Your tasks will appear here.</Text>
        ) : (
          tasks.map(item => (
            <TaskItem
              key={item.id}
              task={item.task}
              completed={item.completed}
              disabled={isSaving}
              onPress={() => {
                void toggleTask(item.id);
              }}
            />
          ))
        )}
      </View>
    </View>
  );
}
