import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import HomePage from './views/HomePage'
import CategoryExpenseView from './views/categoryExpense/CategoryExpenseView'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index path="/" element={<HomePage />} />
                    <Route path="/category-expenses" element={<CategoryExpenseView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
