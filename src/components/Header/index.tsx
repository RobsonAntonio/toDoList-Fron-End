import Link from "next/link";
import styles from "./styles.module.scss";
import { FiLogOut } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export function Header() {
  const { signOut, user } = useContext(AuthContext);
  const [name, setName] = useState<any>();

  useEffect(() => {
    if (user && user.name) {
      setName(user.name);
    }
  }, [user]);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <img src="/logo.png" width={60} height={50} alt="logo" />
        </Link>
        <h1 className={styles.text}>Bloco de Anotações</h1>
        <button onClick={signOut}>
          <h1 className={styles.textName}>Usuário: {name}</h1>
          <FiLogOut color="#FFF" size={24} />
        </button>
      </div>
    </header>
  );
}
