import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { getAPIClient } from "../../api/axios";
import { HistoryCard } from "../../components/common/historyCard";
import { clientAPI } from "../../api/api";
import { useFormatDate } from "../../utils/formatDate";

import Head from "next/head";
import Link from "next/link";

export default function Transactions({ transactions }: any) {
  const { user } = useContext(AuthContext);

  const [listTransactions, setListTransactions] = useState(transactions);
  const [date, setDate] = useState("");
  const [filter, setFilter] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function filterByDate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const formattedDate = useFormatDate(date);
      let uri = `transactions/?date=${formattedDate}`;
      if (filter) {
        filter === "Cash In"
          ? (uri = `transactions/?date=${formattedDate}&&type=creditedAccount`)
          : (uri = `transactions/?date=${formattedDate}&&type=debitedAccount`);
      }
      const response = await clientAPI.get(uri);
      if (response) {
        setTimeout(() => {
          setLoading(false);
          setListTransactions(response.data);
        }, 1200);
      }
    } catch (error: any) {
      setLoading(false);
      setError("Ocorreu um erro. Tente novamente");
    }
  }

  return (
    <div className="h-screen bg-white">
      <Head>
        <title>Histórico</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-full max-w-[850px] mx-auto flex flex-col gap-5 px-5 py-10">
        <div className="flex justify-between items-center border-b animate-menuSlide">
          <div>
            <h1 className="text-4xl text-primary font-bold drop-shadow-md lg:mb-5">
              Histórico
            </h1>
            <span className="font-bold drop-shadow-md">
              Visualize todas suas transações em um só lugar
            </span>
          </div>
          <Link
            href="/dashboard"
            className="bg-none border p-2 rounded-full shadow-md font-bold mb-5"
          >
            Voltar
          </Link>
        </div>
        <div>
          <form className="grid grid-cols-3 gap-2" onSubmit={filterByDate}>
            <input
              type="date"
              placeholder="Filtrar por Data"
              className="bg-white border col-span-2 p-3 rounded-full shadow-md font-bold"
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <select
              onChange={(e) => setFilter(e.target.value)}
              className="bg-white border col-span-1 p-3 rounded-full shadow-md font-bold lg:mb-1"
            >
              <option>Selecione uma opção</option>
              <option>Cash In</option>
              <option>Cash Out</option>
            </select>
            <button className="bg-none border col-span-1 col-start-3 p-3 rounded-full shadow-md font-bold lg:mb-1">
              Filtrar
            </button>
          </form>
        </div>
        {!isLoading && (
          <div className="grid overflow-y-scroll gap-5 animate-buttonSlideUp">
            {listTransactions.map((transaction: any) => (
              <HistoryCard
                key={transaction.id}
                transaction={transaction}
                user={user}
              />
            ))}
          </div>
        )}
        {isLoading && <div className="text-3xl font-bold animate-menuSlide">Carregando...</div>}
        {error && <div className="text-3xl text-red font-bold animate-menuSlide">{error}</div>}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ["next.token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/iniciar-sessao",
        permanent: false,
      },
    };
  }

  const response = await apiClient.get("transactions");
  const transactions = response.data;

  return {
    props: {
      transactions,
    },
  };
};
