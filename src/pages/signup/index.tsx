import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState, useContext } from "react";
import logoImg from "../../../public/logo.png";
import styles from "../../../styles/home.module.scss";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if (name === "" || email === "" || password === "") {
      toast.error("Preencha todos os campos!");
    }
    setLoading(true);

    let data = {
      name,
      email,
      password,
    };

    await signUp(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Faça seu Cadastro agora!</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo" />
        <div className={styles.login}>
          <h1>Criando sua Conta</h1>
          <form onSubmit={handleSignUp}>
            <Input
              placeholder="Digite seu nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Digite seu email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Sua Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" loading={false}>
              Cadastrar
            </Button>
          </form>

          <Link href="/">
            <a className={styles.text}>Já possui uma conta? Faça login</a>
          </Link>
        </div>
      </div>
    </>
  );
}
