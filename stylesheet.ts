import { StyleSheet } from "react-native";

const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'stretch',
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    color: '#171717',
    fontSize: 26,
    fontWeight: '600',
  },
  inputRow: {
    alignItems: 'stretch',
    marginBottom: 24,
  },
  input: {
    height: 46,
    width: '100%',
    marginBottom: 8,
    borderColor: '#D4D4D4',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    color: '#151414',
    fontSize: 15,
  },
  addButton: {
    minHeight: 46,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#151414',
  },
  addButtonPressed: {
    backgroundColor: '#404040',
  },
  disabledButton: {
    opacity: 0.45,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  sectionTitle: {
    color: '#171717',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  taskList: {
    flex: 1,
    width: '100%',
  },
  emptyState: {
    color: '#A3A3A3',
    fontSize: 14,
    paddingTop: 16,
  },
  task: {
    width: '100%',
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 0,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e3dbdb',
    backgroundColor: '#FFFFFF',
  },
  taskPressed: {
    backgroundColor: '#FAFAFA',
  },
  taskText: {
    color: '#262626',
    fontSize: 15,
  },
  taskCompleted: {
    color: '#A3A3A3',
    textDecorationLine: 'line-through',
  },
});

export { globalStyle }