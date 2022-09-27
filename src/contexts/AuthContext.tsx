import { createContext, ReactNode, useState, useEffect } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import Router from "next/router";
import { api } from "../services/errors/apiClient";
import { toast } from "react-toastify";

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, "@notes.token");
    Router.push("/");
  } catch {
    console.log("erro ao deslogar");
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  useEffect(() => {
    async function teste() {
      const { "@notes.token": token } = parseCookies();

      if (token) {
        const response = await api
          .get("/me")
          .then((response) => {
            const { id, name, email } = response.data;

            setUser({
              id,
              name,
              email,
            });
          })
          .catch(() => {
            signOut();
          });
      }
    }

    teste();
  }, []);
  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      const { id, name, token } = response.data;

      setCookie(undefined, "@notes.token", token, {
        maxAge: 60 * 60 * 24 * 30, // Expira em 1 mes
        path: "/",
      });

      setUser({
        id,
        name,
        email,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      toast.success("Logado com sucesso!");

      Router.push("/dashboard");
    } catch (err) {
      toast.error("Erro ao acessar!");
      console.log(err);
    }
  }

  async function signUp({ name, password, email }: SignUpProps) {
    try {
      const response = await api.post("/users", {
        name,
        email,
        password,
      });

      toast.success("Conta criada com sucesso!");

      Router.push("/");
    } catch (err) {
      toast.error("Erro ao cadastrar!");

      console.log("erro ao cadastrar ", err);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}
