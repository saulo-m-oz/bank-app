import formatValue from "../../utils/formatValue";

interface BalanceProp{
  balance: string;
}

export function BalanceCard({ balance } : BalanceProp) {
  return (
    <div className="bg-black font-bold p-3 col-span-2 rounded-lg shadow-md">
      <h2 className="text-lg text-white mb-1">Balance</h2>
      <span className="text-4xl text-green">{formatValue(Number(balance))}</span>
    </div>
  );
}
