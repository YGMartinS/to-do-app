import { PlusCircle } from 'phosphor-react'
import { Task } from './components/Task'
import { Empty } from './components/Empty'

import './global.css'
import styles from './App.module.css'

import logo from './assets/to-do-logo.svg'
import { ChangeEvent, FormEvent, useState } from 'react'

interface Task {
  id: number,
  description: string,
  status: boolean
}

export function App() {
  const [taskList, setTaskList] = useState<Task[]>([])
  const [newTaskDescription, setNewTaskDescription] = useState<string>('')

  let taskCounter = taskList.length
  let taskDoneCounter = taskList.filter(task => task.status).length
  const isNewTaskDescriptionEmpty = newTaskDescription.length === 0

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskDescription(event.target.value)
  }

  function handleNewTask(event: FormEvent) {
    event.preventDefault()
    setTaskList([...taskList, { 
      id: taskList.length+1, 
      description: newTaskDescription, 
      status: false 
    }])
    setNewTaskDescription('')
  }

  function onCheckTask(taskId: number) {
    setTaskList(taskList.map(task => task.id === taskId ? {...task, status: task.status ? false : true }: task))
  }

  function onDeleteTask(taskId: number) {
    setTaskList(taskList.filter(task => task.id !== taskId))
  }

  return (
    <>
      <header className={styles.header}>
        <img src={logo} alt="Logo" />
      </header>

      <div onSubmit={handleNewTask} className={styles.wrapper}>
        <form>
          <input 
            type="text" 
            placeholder="Adicione uma nova tarefa"
            value={newTaskDescription}
            onChange={handleNewTaskChange}
          />
          <button disabled={isNewTaskDescriptionEmpty}>
            Criar <PlusCircle size={20} weight="bold" />
          </button>
        </form>

        <main>
          <header>
            <div className={styles.createdCounter}>
              <h4>Tarefas criadas</h4>
              <span>{taskCounter}</span>
            </div>
            <div className={styles.concludedCounter}>
              <h4>Concluídas</h4>
              <span>{taskDoneCounter + ' de ' + taskCounter}</span>
            </div>
          </header>

          
          <div className={styles.taskList}>
            {taskList.length === 0 
              ? <Empty /> 
              : taskList.map(task => {
                return <Task key={task.id} task={task} onCheckTask={onCheckTask} onDeleteTask={onDeleteTask} />
              })
            }
          </div>
        </main>
      </div>
    </>
  )
}
