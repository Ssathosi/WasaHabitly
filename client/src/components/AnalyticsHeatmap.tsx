import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { cn } from "@/lib/utils";

const data = [
  { name: 'Sen', habits: 4 },
  { name: 'Sel', habits: 3 },
  { name: 'Rab', habits: 5 },
  { name: 'Kam', habits: 6 },
  { name: 'Jum', habits: 5 },
  { name: 'Sab', habits: 7 },
  { name: 'Min', habits: 6 },
];

export function AnalyticsHeatmap() {
  // Mock heatmap data - 52 weeks, 7 days
  const weeks = 20;
  const days = 7;
  const grid = Array.from({ length: days }).map(() => 
    Array.from({ length: weeks }).map(() => Math.random())
  );

  const getColor = (value: number) => {
    if (value < 0.2) return "bg-white/5";
    if (value < 0.4) return "bg-accent/20";
    if (value < 0.6) return "bg-accent/40";
    if (value < 0.8) return "bg-accent/70";
    return "bg-accent";
  };

  return (
    <div className="space-y-6">
      <div className="p-3 sm:p-6 rounded-2xl border border-white/5 bg-card/30 backdrop-blur-sm">
        <h3 className="text-base sm:text-lg font-semibold mb-4">Aktivitas Habit</h3>
        <div className="h-[200px] w-full -mx-3 sm:mx-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorHabits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1ABC9C" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#1ABC9C" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#1ABC9C' }}
              />
              <Area type="monotone" dataKey="habits" stroke="#1ABC9C" strokeWidth={2} fillOpacity={1} fill="url(#colorHabits)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-3 sm:p-6 rounded-2xl border border-white/5 bg-card/30 backdrop-blur-sm overflow-x-auto">
        <h3 className="text-base sm:text-lg font-semibold mb-4">Konsistensi (Heatmap)</h3>
        <div className="flex gap-1 min-w-max">
           {/* Days Labels */}
           <div className="flex flex-col gap-1 mr-2 text-xs text-muted-foreground py-1 justify-between">
             <span>Sen</span>
             <span>Rab</span>
             <span>Jum</span>
           </div>
           
           {/* Grid */}
           <div className="flex gap-1">
             {Array.from({ length: weeks }).map((_, weekIndex) => (
               <div key={weekIndex} className="flex flex-col gap-1">
                 {Array.from({ length: days }).map((_, dayIndex) => (
                   <div 
                     key={`${weekIndex}-${dayIndex}`}
                     className={cn(
                       "w-3 h-3 rounded-sm transition-colors hover:border hover:border-white/50",
                       getColor(grid[dayIndex][weekIndex])
                     )}
                     title={`Habit score: ${Math.round(grid[dayIndex][weekIndex] * 100)}%`}
                   />
                 ))}
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}
