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
  const [tarefas, setTarefas] = useState(listTarefas || []);

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

      <ListTarefas tarefa={tarefas} />
    </>
  );
}

// export const getServerSideProps = canSSRAuth(async (ctx) => {
//   const { user } = useContext(AuthContext);

//   const apiClient = setupAPIClient(ctx);

//   const response = await apiClient.get(`/listTarefas?tarefasId=${user.id}`);
//   return {
//     props: {
//       listTarefas: response.data,
//     },
//   };
// });
