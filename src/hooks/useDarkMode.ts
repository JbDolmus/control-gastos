import { useEffect, useState } from "react"

export function useDarkMode() {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("theme") as "light" | "dark" | null
            if (stored) return stored
            return window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"
        }
        return "light"
    })

    useEffect(() => {
        const root = window.document.documentElement
        if (theme === "dark") {
            root.classList.add("dark")
            localStorage.setItem("theme", "dark")
        } else {
            root.classList.remove("dark")
            localStorage.setItem("theme", "light")
        }
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => (prev === "dark" ? "light" : "dark"))
    }

    return { theme, toggleTheme }
}
