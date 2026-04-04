import { Tooltip } from "react-tooltip";
import { useDarkMode } from "../hooks/useDarkMode";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid"

export default function Header() {
    const { theme, toggleTheme } = useDarkMode()
    return (
        <header className="flex justify-between gap-5 px-8 bg-blue-600 py-8 max-h-72 ">
            <h1 className="uppercase text-center font-black text-lg md:text-4xl text-white">
                Planificador de Gastos
            </h1>

            <button
                onClick={toggleTheme}
                data-tooltip-id="theme-toggle-tooltip"
                data-tooltip-content={`Cambiar a modo ${theme === "dark" ? "claro" : "oscuro"}`}
                className=" p-1 md:p-2 rounded-full bg-slate-200/20 hover:bg-white/30 transition"
            >
                {theme === "dark" ? (
                    <SunIcon className="w-6 h-6 text-yellow-300" />
                ) : (
                    <MoonIcon className="w-6 h-6 text-gray-200" />
                )}
            </button>
            <Tooltip
                id="theme-toggle-tooltip"
                place="top"
                className="font-semibold dark:!bg-slate-200 dark:!text-slate-900 !rounded-lg !px-3 !py-2 !text-sm !shadow-lg"
            />
        </header>
    )
}
