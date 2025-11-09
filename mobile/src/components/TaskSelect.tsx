import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Task } from "../types/task.types";

interface TaskSelectProps {
  label?: string;
  selectedTask: Task | null;
  tasks: Task[];
  onSelectTask: (task: Task | null) => void;
  onCreateTask: (name: string) => Promise<Task>;
  onDeleteTask: (id: string) => Promise<void>;
  isLoading?: boolean;
  editable?: boolean;
  error?: string;
}

export function TaskSelect({
  label = "Tarefa",
  selectedTask,
  tasks,
  onSelectTask,
  onCreateTask,
  onDeleteTask,
  isLoading = false,
  editable = true,
  error,
}: TaskSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newTaskInput, setNewTaskInput] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleOpen = () => {
    if (editable) {
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setNewTaskInput("");
  };

  const handleSelectTask = (task: Task) => {
    onSelectTask(task);
    handleClose();
  };

  const handleCreateTask = async () => {
    const trimmedName = newTaskInput.trim();
    if (!trimmedName) {
      Alert.alert("Erro", "O nome da tarefa não pode estar vazio");
      return;
    }

    if (trimmedName.length > 100) {
      Alert.alert("Erro", "O nome da tarefa deve ter no máximo 100 caracteres");
      return;
    }

    setIsCreating(true);
    try {
      const newTask = await onCreateTask(trimmedName);
      setNewTaskInput("");
      // Seleciona automaticamente a task criada
      onSelectTask(newTask);
      handleClose();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a tarefa");
      console.error("Error creating task:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteTask = (task: Task) => {
    if (selectedTask?.id === task.id) {
      Alert.alert(
        "Atenção",
        "Esta tarefa está selecionada. Deseja realmente deletá-la?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Deletar",
            style: "destructive",
            onPress: async () => {
              setIsDeleting(task.id);
              try {
                await onDeleteTask(task.id);
                // Se a task deletada estava selecionada, limpa a seleção
                if (selectedTask?.id === task.id) {
                  onSelectTask(null);
                }
              } catch (error) {
                Alert.alert("Erro", "Não foi possível deletar a tarefa");
                console.error("Error deleting task:", error);
              } finally {
                setIsDeleting(null);
              }
            },
          },
        ]
      );
    } else {
      Alert.alert(
        "Deletar Tarefa",
        `Deseja realmente deletar "${task.name}"?`,
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Deletar",
            style: "destructive",
            onPress: async () => {
              setIsDeleting(task.id);
              try {
                await onDeleteTask(task.id);
              } catch (error) {
                Alert.alert("Erro", "Não foi possível deletar a tarefa");
                console.error("Error deleting task:", error);
              } finally {
                setIsDeleting(null);
              }
            },
          },
        ]
      );
    }
  };

  const renderTaskItem = ({ item }: { item: Task }) => {
    const isSelected = selectedTask?.id === item.id;
    const isDeletingThis = isDeleting === item.id;

    return (
      <View style={styles.taskItem}>
        <TouchableOpacity
          style={[
            styles.taskItemContent,
            isSelected && styles.taskItemSelected,
          ]}
          onPress={() => handleSelectTask(item)}
          disabled={isDeletingThis}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.taskItemText,
              isSelected && styles.taskItemTextSelected,
            ]}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          {isSelected && (
            <Ionicons name="checkmark-circle" size={20} color="#1976d2" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteTask(item)}
          disabled={isDeletingThis}
          activeOpacity={0.7}
        >
          {isDeletingThis ? (
            <ActivityIndicator size="small" color="#ef4444" />
          ) : (
            <Ionicons name="trash-outline" size={20} color="#ef4444" />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      {label && (
        <Text style={[styles.label, error && styles.labelError]}>{label}</Text>
      )}
      <TouchableOpacity
        style={[
          styles.selectButton,
          error && styles.selectButtonError,
          !editable && styles.selectButtonDisabled,
        ]}
        onPress={handleOpen}
        disabled={!editable}
      >
        <Text
          style={[
            styles.selectButtonText,
            !selectedTask && styles.selectButtonPlaceholder,
            !editable && styles.selectButtonTextDisabled,
          ]}
        >
          {selectedTask ? selectedTask.name : "Selecione uma tarefa"}
        </Text>
        {editable && <Text style={styles.arrow}>▼</Text>}
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={isOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={handleClose}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={0}
        >
          <TouchableOpacity
            style={styles.modalOverlayTouchable}
            activeOpacity={1}
            onPress={handleClose}
          />
          <View style={styles.modalContentWrapper}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  Selecione ou crie uma tarefa
                </Text>
                <TouchableOpacity
                  onPress={handleClose}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>

              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#000" />
                  <Text style={styles.loadingText}>Carregando tarefas...</Text>
                </View>
              ) : (
                <FlatList
                  data={tasks}
                  keyExtractor={(item) => item.id}
                  renderItem={renderTaskItem}
                  style={styles.tasksList}
                  contentContainerStyle={[
                    styles.tasksListContent,
                    tasks.length === 0 && styles.tasksListContentEmpty,
                  ]}
                  ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                      <Text style={styles.emptyText}>
                        Nenhuma tarefa cadastrada
                      </Text>
                    </View>
                  }
                  showsVerticalScrollIndicator={true}
                  keyboardShouldPersistTaps="handled"
                />
              )}

              <View style={styles.newTaskContainer}>
                <TextInput
                  style={styles.newTaskInput}
                  placeholder="Digite o nome da nova tarefa"
                  placeholderTextColor="#999"
                  value={newTaskInput}
                  onChangeText={setNewTaskInput}
                  editable={!isCreating}
                  onSubmitEditing={handleCreateTask}
                  returnKeyType="done"
                />
                <TouchableOpacity
                  style={[
                    styles.addButton,
                    (!newTaskInput.trim() || isCreating) &&
                      styles.addButtonDisabled,
                  ]}
                  onPress={handleCreateTask}
                  disabled={!newTaskInput.trim() || isCreating}
                >
                  {isCreating ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.addButtonText}>+</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  labelError: {
    color: "#ef4444",
  },
  selectButton: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 4,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectButtonError: {
    borderColor: "#ef4444",
  },
  selectButtonDisabled: {
    opacity: 0.6,
    backgroundColor: "#f5f5f5",
  },
  selectButtonText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  selectButtonPlaceholder: {
    color: "#999",
  },
  selectButtonTextDisabled: {
    color: "#999",
  },
  arrow: {
    fontSize: 12,
    color: "#666",
    marginLeft: 8,
  },
  errorText: {
    fontSize: 12,
    color: "#ef4444",
    marginBottom: 12,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalOverlayTouchable: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContentWrapper: {
    width: "100%",
    maxHeight: "80%",
    backgroundColor: "transparent",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "100%",
    paddingBottom: 20,
    flexShrink: 1,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 24,
    color: "#666",
  },
  tasksList: {
    maxHeight: 300,
    minHeight: 150,
    flexShrink: 1,
  },
  tasksListContent: {
    padding: 16,
    flexGrow: 1,
  },
  tasksListContentEmpty: {
    minHeight: 200,
    justifyContent: "center",
  },
  loadingContainer: {
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 14,
    color: "#666",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    overflow: "hidden",
  },
  taskItemContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  taskItemSelected: {
    backgroundColor: "#e3f2fd",
  },
  taskItemText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  taskItemTextSelected: {
    fontWeight: "600",
    color: "#1976d2",
  },
  deleteButton: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    padding: 32,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
  },
  newTaskContainer: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    gap: 12,
  },
  newTaskInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: "#000",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  addButtonText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
});
