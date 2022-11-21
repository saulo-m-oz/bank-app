import formatValue from "../../utils/formatValue";

interface BalanceProp {
  transaction: any;
  user: any;
}

export function HistoryCard({ transaction, user }: BalanceProp) {
  const dateFormatted = new Date(transaction.createdAt).toLocaleDateString();

  return (
    <div className="flex flex-col bg-black font-bold p-3 rounded-lg shadow-md text-white">
      <h2 className="text-lg text-white mb-1">{transaction.debitedAccountId} (Username)</h2>
      <span>{dateFormatted}</span>
      <h3
        className={`text-4xl ${
          transaction.creditedAccountId == user.account
            ? "text-green"
            : "text-red"
        }`}
      >
        {formatValue(Number(transaction.value))}
      </h3>
    </div>
  );
}
