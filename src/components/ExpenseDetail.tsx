import { useMemo } from "react"
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list'
import { formatDate } from "../helpers"
import { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import 'react-swipeable-list/dist/styles.css'
import { useBudget } from "../hooks/useBudget"
import Swal from "sweetalert2"
import { showAlert } from "../alerts"

type ExpenseDetailProps = {
    expense: Expense
}

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {

    

    const { state, dispatch } = useBudget()
    const categoryInfo = useMemo(() => state.categories.filter(cat => cat.id === expense.category)[0], [expense])

    const removeExpense = () => {
        Swal.fire({
            title: "¿Estás seguro de eliminar este gasto?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({ type: 'remove-expense', payload: { id: expense.id } })
                showAlert("Gasto eliminado exitosamente", "success")
            }
        });
    }

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction
                onClick={() => dispatch({ type: 'get-expense-by-id', payload: { id: expense.id } })}
            >
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                onClick={removeExpense}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={1}
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="bg-white dark:bg-slate-900 shadow-lg p-5 w-full border-b border-gray-200 dark:border-slate-700 flex gap-5 items-center">
                    <div>
                        <img src={`/icono_${categoryInfo.icon}.svg`}
                            alt="icono gasto"
                            className="w-20"
                        />
                    </div>

                    <div className="flex-1 space-y-2">
                        <p className="text-sm font-bold uppercase text-slate-500 dark:text-slate-400">{categoryInfo.name}</p>
                        <p className="dark:text-slate-200">{expense.expenseName}</p>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">{formatDate(expense.date!.toString())}</p>
                    </div>

                    <AmountDisplay
                        amount={expense.amount}
                        currency={state.currency}
                    />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}
