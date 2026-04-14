import { PencilIcon, TrashIcon, PlusIcon, ArrowLeftIcon } from "@heroicons/react/24/outline"
import CategoryExpenseModal from "./CategoryExpenseModal"
import { useBudget } from "../../hooks/useBudget"
import { Link } from "react-router-dom"
import { getImagePath } from "../../helpers"
import { showAlert } from "../../alerts"
import Swal from "sweetalert2"
import { Category } from "../../types"
import { Tooltip } from "react-tooltip"

export default function CategoryExpenseView() {
  const { state, dispatch } = useBudget()

  const removeCategory = (id: Category['id']) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar esta categoría?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: 'remove-category', payload: { id } })
        showAlert("Categoría eliminada exitosamente", "success")
      }
    });
  }

  return (
    <>
      <Link
        to="/"
        className="m-4 inline-flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-slate-300 dark:hover:bg-slate-600  transition-all"
      >
        <ArrowLeftIcon className="w-5 h-5" />
      </Link>
      <div className="max-w-5xl mx-auto mt-4 mb-4 px-6">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Categorías de gastos
          </h2>

          <button
            type="button"
            className="
            inline-flex items-center gap-1
            bg-blue-600 hover:bg-blue-700
            text-white
            p-2
            rounded-lg
            shadow-md
            transition-all
          "
            onClick={() => dispatch({ type: 'show-modal' })}
          >
            <PlusIcon className="w-5 h-5" />
            Agregar Categoría
          </button>
        </div>

        {/* Tabla */}
        <div className="bg-white dark:bg-slate-900 shadow-lg rounded-xl overflow-hidden">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4">Icono</th>
                <th className="px-6 py-4">Nombre</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {state.categories.map((category) => (
                <tr
                  key={category.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <td className="px-6 py-4">
                    <img
                      src={getImagePath(category.icon)}
                      alt={category.name}
                      className="w-8 h-8"
                    />
                  </td>

                  <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-200">
                    {category.name}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-4">
                      <button
                        data-tooltip-id="actions-tooltip"
                        data-tooltip-content="Editar categoría"
                        type="button"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                        onClick={() => dispatch({ type: 'get-category-by-id', payload: { id: category.id } })}
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>

                      <button
                        data-tooltip-id="actions-tooltip"
                        data-tooltip-content="Eliminar categoría"
                        type="button"
                        onClick={() => removeCategory(category.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors">
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
      <CategoryExpenseModal />
      <Tooltip
        id="actions-tooltip"
        place="top"
        className="font-semibold dark:!bg-slate-200 dark:!text-slate-900 !rounded-lg !px-3 !py-2 !text-sm !shadow-lg"
      />
    </>
  )
}