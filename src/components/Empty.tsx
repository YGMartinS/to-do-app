import { ClipboardText } from "phosphor-react";

import styles from './Empty.module.css'

export function Empty() {
  return (
    <div className={styles.empty}>
        <ClipboardText size={56} weight="thin"/>
        <strong>Você ainda não tem tarefas cadastradas</strong>
        <span>Crie tarefas e organize seus itens a fazer</span>
    </div>
  )
}