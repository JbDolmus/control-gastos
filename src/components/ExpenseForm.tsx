import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";
import { showAlert } from "../alerts";



export default function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })

    const [error, setError] = useState('')
    const { state, dispatch, remainingBudget } = useBudget()
    const [previousAmount, setPreviousAmount] = useState(0)

    useEffect(() => {
        if (state.editingExpenseId) {
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingExpenseId)[0]
            setExpense(editingExpense)
            setPreviousAmount(editingExpense.amount)
        }
    }, [state.editingExpenseId])

    const handleChageDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target

        setExpense({
            ...expense,
            [name]: value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //Validar
        if (Object.values(expense).includes('')) {
            setError("Todos los campos son obligatorios")
            return
        }

        if ((expense.amount - previousAmount) > remainingBudget) {
            setError("Ese gasto se sale del presupuesto")
            return
        }

        if (expense.amount <= 0) {
            setError("El monto del gasto debe ser mayor a 0")
            return
        }

        //Convertir amount a number
        expense.amount = Number(expense.amount)

        //Agregar o actualizar un  gasto
        if (state.editingExpenseId) {
            dispatch({ type: 'update-expense', payload: { expense: { id: state.editingExpenseId, ...expense } } })
            showAlert("Gasto actualizado exitosamente", "success")
        } else {
            dispatch({ type: 'add-expense', payload: { expense } })
            showAlert("Gasto agregado exitosamente", "success")
        }


        //Reiniciar el state
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })
        setPreviousAmount(0)
        setError('')
    }

    return (
        <form action="" className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-5 dark:text-white">
                {state.editingExpenseId ? 'Editar Gasto' : 'Nuevo Gasto'}
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName"
                    className="text-xl dark:text-slate-200"
                >
                    Nombre Gasto:
                </label>

                <input type="text"
                    id="expenseName"
                    placeholder="Añade el Nombre del gasto"
                    className="bg-slate-100 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600 p-2"
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount"
                    className="text-xl dark:text-slate-200"
                >
                    Cantidad:
                </label>

                <input type="number"
                    id="amount"
                    placeholder="Añade la cantidad del gasto: ej. 300"
                    className="bg-slate-100 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600 p-2"
                    name="amount"
                    value={expense.amount}
                    onChange={handleChange}
                    min={0}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="category"
                    className="text-xl dark:text-slate-200"
                >
                    Categoría:
                </label>

                <select
                    id="category"
                    className="bg-slate-100 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600 p-2"
                    name="category"
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione --</option>
                    {state.categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount"
                    className="text-xl dark:text-slate-200"
                >
                    Fecha Gasto:
                </label>

                <DatePicker
                    className="bg-slate-100 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600 p-2 border-0"
                    value={expense.date}
                    onChange={handleChageDate}
                />
            </div>

            <input type="submit"
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                value={state.editingExpenseId ? 'Guardar Cambios' : 'Registrar Gasto'}
            />
        </form>
    )
}
