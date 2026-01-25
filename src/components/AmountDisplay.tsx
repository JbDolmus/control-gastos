import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
  label?: string,
  amount: number,
  currency: string
}

export default function AmountDisplay({ label, amount, currency }: AmountDisplayProps) {
  return (
    <p className="text-2xl text-blue-600 dark:text-blue-400 font-bold">
      {label && `${label}: `}
      <span className="font-black text-black dark:text-white">
        {formatCurrency(amount, currency)}
      </span>
    </p>

  )
}
