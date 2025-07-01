import Link from "next/link"
import { Heart } from "react-feather"

const AdminDashboardPage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Painel do Administrador</h1>

      {/* Resumo Rápido */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h2 className="text-lg font-medium text-gray-800">Total de Usuários</h2>
          <p className="text-3xl font-bold text-blue-600">1250</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h2 className="text-lg font-medium text-gray-800">Novos Feedbacks</h2>
          <p className="text-3xl font-bold text-green-600">45</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h2 className="text-lg font-medium text-gray-800">Campanhas Ativas</h2>
          <p className="text-3xl font-bold text-purple-600">8</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h2 className="text-lg font-medium text-gray-800">Doações Recebidas</h2>
          <p className="text-3xl font-bold text-orange-600">R$ 15.000</p>
        </div>
      </div>

      {/* Feedbacks Recentes */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Feedbacks Recentes</h3>
          <Link href="/feedbacks" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Ver todos
          </Link>
        </div>
        <ul>
          <li className="py-2 border-b last:border-b-0">
            <p className="text-gray-800">
              <strong>João Silva:</strong> Ótimo trabalho com a campanha de vacinação!
            </p>
            <p className="text-gray-500 text-sm">2 horas atrás</p>
          </li>
          <li className="py-2 border-b last:border-b-0">
            <p className="text-gray-800">
              <strong>Maria Oliveira:</strong> Adorei a iniciativa de castração gratuita.
            </p>
            <p className="text-gray-500 text-sm">5 horas atrás</p>
          </li>
          <li className="py-2 border-b last:border-b-0">
            <p className="text-gray-800">
              <strong>Carlos Pereira:</strong> O site está muito fácil de usar.
            </p>
            <p className="text-gray-500 text-sm">1 dia atrás</p>
          </li>
        </ul>
      </div>

      {/* Campanhas Recentes */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Campanhas Recentes</h3>
          <Link href="/campanhas" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Ver todas
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Campanha 1 */}
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 mb-1">Castração Gratuita</h4>
                <p className="text-xs text-gray-500 mb-2">Campanha de castração para cães e gatos</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-green-600 font-medium">Meta: R$ 50.000</span>
                  <span className="text-xs text-gray-500">85% atingido</span>
                </div>
              </div>
            </div>
          </div>

          {/* Campanha 2 */}
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 mb-1">Adoção Responsável</h4>
                <p className="text-xs text-gray-500 mb-2">Campanha para adoção de pets abandonados</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-600 font-medium">Meta: R$ 30.000</span>
                  <span className="text-xs text-gray-500">62% atingido</span>
                </div>
              </div>
            </div>
          </div>

          {/* Campanha 3 */}
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 mb-1">Vacina Para Todos</h4>
                <p className="text-xs text-gray-500 mb-2">Vacinação gratuita para pets de baixa renda</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-purple-600 font-medium">Meta: R$ 25.000</span>
                  <span className="text-xs text-gray-500">95% atingido</span>
                </div>
              </div>
            </div>
          </div>

          {/* Campanha 4 */}
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 mb-1">Ração Solidária</h4>
                <p className="text-xs text-gray-500 mb-2">Distribuição de ração para ONGs</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-orange-600 font-medium">Meta: R$ 15.000</span>
                  <span className="text-xs text-gray-500">78% atingido</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage
