import type { Task } from '../../types/task';
import { SwipeToDelete } from '../ui/SwipeToDelete';
import { TaskCard } from '../ui/TaskCard';

interface TaskRowProps {
  task: Task;
  done: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

export function TaskRow({ task, done, onToggle, onDelete }: TaskRowProps) {
  return (
    <SwipeToDelete onDelete={onDelete} deleteLabel={`Delete ${task.name}`}>
      <TaskCard task={task} done={done} onPress={onToggle} />
    </SwipeToDelete>
  );
}
