import { CheckCircle, Circle, Trash } from "phosphor-react";

import styles from './Task.module.css'
import { useState } from "react";

interface TaskProps {
  task: {
    id: number,
    description: string,
    status: boolean
  },
  onCheckTask: (taskId: number) => void,
  onDeleteTask: (taskId: number) => void
}

export function Task({ task, onCheckTask, onDeleteTask }: TaskProps) {
  const [taskDone, setTaskDone] = useState<boolean>(false)

  function handleTaskChecked() {
    if (taskDone) {
      setTaskDone(false)
    } else {
      setTaskDone(true)
    }
    onCheckTask(task.id)
  }

  return (
    <div className={styles.task}>
      <label onClick={handleTaskChecked}>
        { taskDone 
          ? <CheckCircle className={styles.checked} size={28} weight={"fill"} /> 
          : <Circle className={styles.unchecked} size={28} /> 
        }
        <p className={taskDone ? styles.descriptionChecked : styles.description}>
          {task.description}
        </p>
      </label>
      <button onClick={() => onDeleteTask(task.id)}><Trash weight="bold"/></button>
    </div>
  )
}