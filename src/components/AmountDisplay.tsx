import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
  label?: string,
  amount: number
}

export default function AmountDisplay({ label, amount }: AmountDisplayProps) {
  return (
    <p className="text-2xl text-blue-600 dark:text-blue-400 font-bold">
      {label && `${label}: `}
      <span className="font-black text-black dark:text-white">
        {formatCurrency(amount)}
      </span>
    </p>

  )
}
