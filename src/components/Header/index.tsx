import Link from "next/link";
import styles from "./styles.module.scss";
import { FiLogOut } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export function Header() {
  const { signOut, user } = useContext(AuthContext);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <img src="/logo.png" width={60} height={50} alt="logo" />
        </Link>
        <h1 className={styles.text}>Bloco de Anotações</h1>
        <button onClick={signOut}>
          <FiLogOut color="#FFF" size={24} />
        </button>
      </div>
    </header>
  );
}
