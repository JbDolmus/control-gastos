import { v4 as uuidv4 } from 'uuid'
import { Category, DraftCategory, DraftExpense, Expense } from "../types"
import { categories as initialCategories } from "../data/categories"

export type BudgetActions =
    { type: 'add-budget', payload: { budget: number, currency: string } } |
    { type: 'show-modal' } |
    { type: 'close-modal' } |
    { type: 'add-expense', payload: { expense: DraftExpense } } |
    { type: 'remove-expense', payload: { id: Expense['id'] } } |
    { type: 'get-expense-by-id', payload: { id: Expense['id'] } } |
    { type: 'update-expense', payload: { expense: Expense } } |
    { type: 'restart-app' } |
    { type: 'add-filter-category', payload: { id: Category['id'] } } |
    { type: 'add-category', payload: { category: DraftCategory } } |
    { type: 'remove-category', payload: { id: Category['id'] } } |
    { type: 'get-category-by-id', payload: { id: Category['id'] } } |
    { type: 'update-category', payload: { category: Category } }


export type BudgetState = {
    budget: number,
    currency: string,
    modal: boolean,
    expenses: Expense[],
    categories: Category[],
    editingExpenseId: Expense['id'],
    editingCategoryId: Category['id'],
    currentCategory: Category['id']
}

const initialBudget = (): number => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}

const initialCurrency = (): string => {
    const localStorageCurrency = localStorage.getItem('currency')
    return localStorageCurrency ? localStorageCurrency : ''
}

const localStorageExpenses = (): Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses')
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}

const localStorageCategories = (): Category[] => {
    const localStorageCategories = localStorage.getItem('categories')
    return localStorageCategories ? JSON.parse(localStorageCategories) : initialCategories
}

export const initialState: BudgetState = {
    budget: initialBudget(),
    currency: initialCurrency(),
    modal: false,
    expenses: localStorageExpenses(),
    categories: localStorageCategories(),
    editingExpenseId: '',
    editingCategoryId: '',
    currentCategory: ''
}

const createExpense = (draftExpense: DraftExpense): Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }
}

const createCategory = (draftCategory: DraftCategory): Category => {
    return {
        ...draftCategory,
        id: uuidv4()
    }
}

export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
) => {

    if (action.type === 'add-budget') {

        return {
            ...state,
            budget: action.payload.budget,
            currency: action.payload.currency
        }
    }

    if (action.type === 'show-modal') {
        return {
            ...state,
            modal: true
        }
    }

    if (action.type === 'close-modal') {
        return {
            ...state,
            modal: false,
            editingExpenseId: ''
        }
    }

    if (action.type === 'add-expense') {

        const expense = createExpense(action.payload.expense)
        return {
            ...state,
            expenses: [...state.expenses, expense],
            modal: false
        }
    }

    if (action.type === 'remove-expense') {
        return {
            ...state,
            expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
        }
    }

    if (action.type === 'get-expense-by-id') {
        return {
            ...state,
            editingExpenseId: action.payload.id,
            modal: true
        }
    }

    if (action.type === 'update-expense') {
        return {
            ...state,
            expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
            modal: false,
            editingExpenseId: ''
        }
    }

    if (action.type === 'restart-app') {
        return {
            ...state,
            budget: 0,
            expenses: [],
            currency: ''
        }
    }

    if (action.type === 'add-filter-category') {
        return {
            ...state,
            currentCategory: action.payload.id
        }
    }

    if (action.type === 'add-category') {
        const category = createCategory(action.payload.category)
        return {
            ...state,
            categories: [...state.categories, category],
            modal: false
        }
    }

    if (action.type === 'remove-category') {
        return {
            ...state,
            categories: state.categories.filter(
                category => category.id !== action.payload.id
            )
        }
    }

    if (action.type === 'get-category-by-id') {
        return {
            ...state,
            editingCategoryId: action.payload.id,
            modal: true
        }
    }

    if (action.type === 'update-category') {
        return {
            ...state,
            categories: state.categories.map(category =>
                category.id === action.payload.category.id
                    ? action.payload.category
                    : category
            ),
            editingCategoryId: '',
            modal: false
        }
    }


    return state
}