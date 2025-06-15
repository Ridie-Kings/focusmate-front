import { BarChart } from "recharts";
import { useEffect, useState } from "react";
import {
  Bar,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

// Simulando la función de servicio para el ejemplo
const GetMyStatsMonth = async () => {
  // Datos de ejemplo
  return {
    success: true,
    data: {
      response: [
        { month: 1, year: 2024, createdTasks: 45, completedTasks: 38, droppedTasks: 7, pendingTasks: 12 },
        { month: 2, year: 2024, createdTasks: 52, completedTasks: 41, droppedTasks: 11, pendingTasks: 15 },
        { month: 3, year: 2024, createdTasks: 38, completedTasks: 35, droppedTasks: 3, pendingTasks: 8 },
        { month: 4, year: 2024, createdTasks: 61, completedTasks: 55, droppedTasks: 6, pendingTasks: 18 },
        { month: 5, year: 2024, createdTasks: 48, completedTasks: 42, droppedTasks: 6, pendingTasks: 14 },
        { month: 6, year: 2024, createdTasks: 55, completedTasks: 49, droppedTasks: 6, pendingTasks: 16 },
      ]
    }
  };
};

interface MonthlyStatsData {
  completedTasks: number;
  createdTasks: number;
  droppedTasks: number;
  month: number;
  pendingTasks: number;
  year: number;
}

const monthNames = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
];

// Tooltip personalizado
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 backdrop-blur-sm">
        <p className="font-semibold text-gray-800 mb-2">
          {monthNames[label - 1]} 2024
        </p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></span>
            {entry.name}: <span className="font-semibold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Leyenda personalizada
const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex justify-center gap-6 mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-full shadow-sm"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-sm font-medium text-gray-700">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function StatsChard() {
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStatsData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMonthlyStats = async () => {
      setError(null);
      setLoading(true);
      try {
        const { data, success } = await GetMyStatsMonth();
        if (!success) {
          throw new Error(`Error en la API: ${data}`);
        }

        // Formatear datos con nombres de meses
        const formattedData = data.response.map((item: MonthlyStatsData) => ({
          ...item,
          monthName: monthNames[item.month - 1]
        }));

        setMonthlyStats(formattedData);
      } catch (error) {
        console.error("Error loading monthly stats:", error);
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    loadMonthlyStats();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 shadow-lg">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded-lg w-48 mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="h-64 bg-gray-100 rounded-xl mt-6"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-red-50 to-rose-100 rounded-2xl p-8 shadow-lg">
        <div className="flex items-center gap-3 p-6 bg-white/70 backdrop-blur-sm text-red-700 rounded-xl border border-red-200">
          <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>
            <h3 className="font-semibold">Error al cargar datos</h3>
            <p className="text-sm opacity-90">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 shadow-lg border border-white/50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Estadísticas Mensuales
        </h2>
        <p className="text-gray-600 mt-1">Resumen de actividades por mes</p>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={monthlyStats}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            barCategoryGap="20%"
          >
            <defs>
              <linearGradient id="createdGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="#1E40AF" stopOpacity={0.6}/>
              </linearGradient>
              <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="#059669" stopOpacity={0.6}/>
              </linearGradient>
              <linearGradient id="droppedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="#D97706" stopOpacity={0.6}/>
              </linearGradient>
            </defs>

            <XAxis
              dataKey="monthName"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280', fontWeight: 500 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              domain={[0, 'dataMax + 10']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />

            <Bar
              dataKey="createdTasks"
              name="Tareas Creadas"
              fill="url(#createdGradient)"
              radius={[4, 4, 0, 0]}
              stroke="#1E40AF"
              strokeWidth={1}
            />
            <Bar
              dataKey="completedTasks"
              name="Tareas Completadas"
              fill="url(#completedGradient)"
              radius={[4, 4, 0, 0]}
              stroke="#059669"
              strokeWidth={1}
            />
            <Bar
              dataKey="droppedTasks"
              name="Tareas Abandonadas"
              fill="url(#droppedGradient)"
              radius={[4, 4, 0, 0]}
              stroke="#D97706"
              strokeWidth={1}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {monthlyStats.length > 0 && (
          <>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
                <div>
                  <p className="text-sm text-gray-600">Total Creadas</p>
                  <p className="text-lg font-bold text-gray-800">
                    {monthlyStats.reduce((sum, item) => sum + item.createdTasks, 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-green-600"></div>
                <div>
                  <p className="text-sm text-gray-600">Total Completadas</p>
                  <p className="text-lg font-bold text-gray-800">
                    {monthlyStats.reduce((sum, item) => sum + item.completedTasks, 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600"></div>
                <div>
                  <p className="text-sm text-gray-600">Tasa de Éxito</p>
                  <p className="text-lg font-bold text-gray-800">
                    {Math.round((monthlyStats.reduce((sum, item) => sum + item.completedTasks, 0) /
                      monthlyStats.reduce((sum, item) => sum + item.createdTasks, 0)) * 100)}%
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}