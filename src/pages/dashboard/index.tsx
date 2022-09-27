import { useState, FormEvent, useContext, useEffect } from "react";
import Head from "next/head";
import { Header } from "../../components/Header";
import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from "./styles.module.scss";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import ListTarefas from "../../components/ListTarefas";
import { AuthContext } from "../../contexts/AuthContext";

type ListProps = {
  id: string;
  name: string;
  tarefasId: string;
};

interface ListTarefasProps {
  listTarefas: ListProps[];
}

export default function Dashboard({ listTarefas }: ListTarefasProps) {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [id, setId] = useState<any>();
  const [tarefas, setTarefas] = useState(listTarefas || []);

  console.log(id);

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    if (name === "") {
      toast.error("Digite uma tarefa!");
      return;
    }

    const apiClient = setupAPIClient();
    await apiClient.post("/tarefas", {
      name: name,
      tarefasId: user.id,
    });

    toast.success("Tarefa cadastrada com sucesso!");
    setName("");
    window.location.reload();
  }

  useEffect(() => {
    if (user && user.id) {
      setId(user.id);
      list();
    }
  }, [user]);

  async function list() {
    //console.log(tarefa);
    const apiClient = setupAPIClient();
    const response = await apiClient.get(`/listTarefas?tarefasId=${id}`);

    setTarefas(response.data);
  }

  return (
    <>
      <Head>
        <title>Painel - Bloco de Anotações</title>
      </Head>
      <div>
        <Header />
      </div>
      <main className={styles.container}>
        <form className={styles.form} onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Digite a sua tarefa"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button className={styles.buttonAdd} type="submit">
            Cadastrar
          </button>
        </form>
      </main>

      {tarefas.length === 0 ? (
        <main className={styles.container}>
          <h1 className={styles.textName}>
            Sua lista de tarefas está vazia no momento...
          </h1>
        </main>
      ) : (
        <ListTarefas tarefa={tarefas} />
      )}
    </>
  );
}
