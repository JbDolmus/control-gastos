import { ChangeEvent, FormEvent, useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"
import { currencies } from "../data/currencies"
import { Currency } from "../types"


export default function BudgetForm() {

    const [budget, setBudget] = useState(0)
    const [currency, setCurrency] = useState<Currency["code"]>("")

    const { dispatch } = useBudget()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    }

    const handleCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setCurrency(e.target.value as Currency["code"])
    }


    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0 || currency === ''
    }, [budget, currency])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({ type: 'add-budget', payload: { budget, currency } })
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center dark:text-blue-400">
                    Definir Presupuesto
                </label>
            </div>

            <select
                className="w-full bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-800 p-2 dark:text-slate-200"
                value={currency}
                onChange={handleCurrencyChange}
            >
                <option value="">-- Seleccione una moneda --</option>
                {currencies.map(curr => (
                    <option key={curr.code} value={curr.code}>
                        {curr.name} ({curr.symbol})
                    </option>
                ))}
            </select>


            <input
                id="budget"
                type="number"
                className="w-full bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-800 p-2 dark:text-slate-200"
                placeholder="Define tu presupuesto"
                name="budget"
                value={budget}
                onChange={handleChange}
                min={0}
            />

            <input
                type="submit"
                value='Definir Presupuesto'
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40"
                disabled={isValid}
            />
        </form>
    )
}
