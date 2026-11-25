import { Pressable, Text } from 'react-native';
import { globalStyle } from '../stylesheet';

type TaskProps = {
  task: string;
  completed: boolean;
  disabled: boolean;
  onPress: () => void;
};

export function TaskItem({ task, completed, disabled, onPress }: TaskProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        globalStyle.task,
        pressed && globalStyle.taskPressed,
        disabled && globalStyle.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: completed, disabled }}
    >
      <Text style={[globalStyle.taskText, completed && globalStyle.taskCompleted]}>
        {task}
      </Text>
    </Pressable>
  );
}