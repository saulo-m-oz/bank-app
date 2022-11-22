import React, { FormEvent, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Link from "next/link";

interface PropType {
  formType: string;
}

export function Form({ formType }: PropType) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const {signIn, signUp, error, isLoading} = useContext(AuthContext);

  async function handleSubmit(e: FormEvent<HTMLFormElement>, formType: string) {
    e.preventDefault(); // PreventDefault utilizado para não acontecer o refresh no submit

    // Objeto necessário para login/criação de usuário
    const data = {
      username: user,
      password,
    };

    if (formType === "login") {
      signIn(data);
    } else {
      signUp(data);
    }
  }

  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e, formType)}
        className="flex flex-col  max-w-xl mx-auto"
      >
        <input
          onChange={(e) => setUser(e.target.value)}
          className="w-full p-3 rounded-t-md border border-b-0 border-primary bg-black"
          type="text"
          placeholder="Insira seu username"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-b-md border border-primary bg-black mb-3"
          type="password"
          placeholder="Insira sua senha"
          required
        />
        <p className="text-red mb-3 first-letter:capitalize">{error}</p>
        {formType === "login" ? (
          <>
            <button className="inline-block w-full bg-primary text-center p-3 rounded-md text-white font-semibold mb-5">
              {isLoading ? "Validando informações..." : "Iniciar sessão com Username"}
            </button>
          </>
        ) : (
          <button className="inline-block w-full bg-primary text-center p-3 rounded-md text-white font-semibold mb-5">
            {isLoading ? "Cadastrando..." : "Cadastrar-se"}
          </button>
        )}
      </form>
      {formType === "login" ? (
        <Link
          href="/cadastrar-se"
          className="inline-block w-full bg-white text-black text-center p-3 rounded-md font-semibold"
        >
          Registrar-se com Username
        </Link>
      ) : (
        <Link
          href="/iniciar-sessao"
          className="inline-block w-full bg-white text-black text-center p-3 rounded-md font-semibold"
        >
          Iniciar sessão com Username
        </Link>
      )}
    </>
  );
}
