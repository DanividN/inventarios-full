import TextAreaField from "../ui/TextArea";

const TableEntregas = ({ articles, register, handleRemoveArticle }) => {
    console.log(articles);
  return (
    <>
      <div className="border border-gray-300 rounded-lg overflow-x-auto mt-4">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                No. de Inventario
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Partida del gasto
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Nombre del bien
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Marca
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Modelo
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Costo unitario
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-gray-50 odd:bg-white even:bg-[#edfbf6]">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {article.inventoryNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {article.expenseItem}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {article.itemName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {article.brand}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {article.model}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {article.unitCost}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    type="button"
                    onClick={() => handleRemoveArticle(article.id)}
                    className="inline-flex items-center px-3 py-1 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Descripción */}
      <div className="space-y-2">
        <TextAreaField
          id="description"
          label="Descripción"
          register={register}
        />
      </div>
    </>
  );
};

export default TableEntregas;
