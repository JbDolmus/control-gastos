import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import ErrorMessage from '../../components/ErrorMessage'
import { useBudget } from '../../hooks/useBudget'
import { DraftCategory } from '../../types'
import ImageUpload from '../../components/ImageUpload'
import { showAlert } from '../../alerts'

export default function CategoryExpenseForm() {

    const [error, setError] = useState('')
    const [category, setCategory] = useState<DraftCategory>({
        name: "",
        icon: ""
    })
    const [image, setImage] = useState('');
    const { state, dispatch } = useBudget()

    useEffect(() => {
        if (state.editingCategoryId) {
            const editingCategory = state.categories.filter(currentCategory => currentCategory.id === state.editingCategoryId)[0]
            setImage(editingCategory.icon)
            setCategory(editingCategory)
        }
    }, [state.editingCategoryId])

    function handleSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault()

        category.icon = image
        if (Object.values(category).includes('')) {
            setError("Todos los campos son obligatorios")
            return
        }

        if (state.editingCategoryId) {
            dispatch({ type: 'update-category', payload: { category: { ...category, id: state.editingCategoryId } } })
            showAlert("Categoría actualizada correctamente", "success")
        }else{
            dispatch({ type: "add-category", payload: { category } })
            showAlert("Categoría agregada correctamente", "success")
        }

        setCategory({
            name: "",
            icon: ""
        })
        setImage('')
        setError("")
    }

    function handleNameChange(e: ChangeEvent<HTMLInputElement>): void {
        setCategory(prev => ({ ...prev, name: e.target.value }))
    }


    return (
        <form action="" className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-5 dark:text-white">
                {state.editingExpenseId ? 'Editar categoría de gasto' : 'Nueva categoría de gasto'}
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName"
                    className="text-xl dark:text-slate-200"
                >
                    Nombre de la categoría:
                </label>

                <input type="text"
                    id="expenseName"
                    placeholder="Añade el Nombre de la categoría"
                    className="bg-slate-100 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600 p-2"
                    name="expenseName"
                    value={category.name}
                    onChange={handleNameChange}
                />
            </div>


            <ImageUpload image={image} setImage={setImage} />


            <input type="submit"
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                value={state.editingExpenseId ? 'Actualizar Categoría' : 'Guardar Categoría'}
            />
        </form>
    )
}
