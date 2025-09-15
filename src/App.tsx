import { useEffect, useMemo } from "react"
import { useBudget } from "./hooks/useBudget"
import BudgetForm from "./components/BudgetForm"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import FilterByCategory from "./components/FilterByCategory"
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid"
import { useDarkMode } from "./hooks/useDarkMode"

function App() {
  const { state } = useBudget()
  const { theme, toggleTheme } = useDarkMode()

  const isValidBudget = useMemo(() => state.budget > 0, [state.budget])

  useEffect(() => {
    localStorage.setItem("budget", state.budget.toString())
    localStorage.setItem("expenses", JSON.stringify(state.expenses))
  }, [state])

  return (
    <>
      <header className="flex justify-between gap-5 px-8 bg-blue-600 py-8 max-h-72 ">
        <h1 className="uppercase text-center font-black text-lg md:text-4xl text-white">
          Planificador de Gastos
        </h1>

        <button
          onClick={toggleTheme}
          className=" p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
        >
          {theme === "dark" ? (
            <SunIcon className="w-6 h-6 text-yellow-300" />
          ) : (
            <MoonIcon className="w-6 h-6 text-gray-200" />
          )}
        </button>
      </header>

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

export default App
