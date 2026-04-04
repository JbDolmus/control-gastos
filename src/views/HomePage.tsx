import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import BudgetTracker from "../components/BudgetTracker"
import BudgetForm from "../components/BudgetForm"
import FilterByCategory from "../components/FilterByCategory"
import ExpenseList from "../components/ExpenseList"
import ExpenseModal from "../components/ExpenseModal"
import { FolderIcon } from "@heroicons/react/24/solid"
import { Link } from "react-router-dom"


export default function HomePage() {
    const { state } = useBudget()

    const isValidBudget = useMemo(() => state.budget > 0, [state.budget])

    return (
        <>


            <Link
                to="/category-expenses"
                className="
                                m-4
                                inline-flex items-center gap-2
                                px-3 py-2
                                rounded-lg
                                text-slate-700
                                dark:text-slate-200
                                text-sm font-medium
                                hover:bg-slate-300
                                dark:hover:bg-slate-600
                                transition-all
                                "
            >
                <FolderIcon className="w-4 h-4" />
                Categorías de gastos
            </Link>
            
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg mt-10 p-10">
                {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
            </div>

            {isValidBudget && (
                <main className="max-w-3xl mx-auto py-10">
                    <FilterByCategory />
                    <ExpenseList />
                    <ExpenseModal />
                </main>
            )}
        </>
    )
}
