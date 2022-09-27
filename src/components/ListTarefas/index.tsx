import styles from "./styles.module.scss";
import { FiXCircle } from "react-icons/fi";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";

type ListProps = {
  id: any;
  name?: string;
  tarefasId: string;
};

export default function ListTarefas({ tarefa }) {
  async function handleDelete(tarefa_id: ListProps) {
    //console.log(tarefa);
    const apiClient = setupAPIClient();
    await apiClient.delete(`/tarefas?tarefa_id=${tarefa_id}`, {});

    toast.success("Tarefa excluida com sucesso!");
    window.location.reload();
  }

  return (
    <main className={styles.container}>
      <div className={styles.containerHeader}>
        <h1>Últimas Tarefas</h1>
      </div>
      <article className={styles.listOrders}>
        {tarefa.map((item: ListProps) => (
          <section key={item.id} className={styles.orderItem}>
            <div className={styles.tag}></div>
            <span className={styles.text}>{item.name}</span>

            <button
              className={styles.button}
              onClick={() => handleDelete(item.id)}
            >
              <FiXCircle size={20} color={"#FFF"} />
            </button>
          </section>
        ))}
      </article>
    </main>
  );
}
