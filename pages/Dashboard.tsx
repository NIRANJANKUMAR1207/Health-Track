import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DailyLog, UserRole } from '../types';
import { ActivityChart, SleepWaterChart, MoodPieChart } from '../components/Charts';
import { Activity, Droplets, Moon, TrendingUp, AlertCircle, Calendar } from 'lucide-react';
import { createHealthChat } from '../services/geminiService';

// Mock Data
const MOCK_DATA: DailyLog[] = [
  { date: 'Mon', steps: 4500, waterIntake: 1500, sleepHours: 6.5, mood: 'Tired', caloriesBurned: 1800, heartRateAvg: 72 },
  { date: 'Tue', steps: 8200, waterIntake: 2200, sleepHours: 7.5, mood: 'Happy', caloriesBurned: 2400, heartRateAvg: 70 },
  { date: 'Wed', steps: 6000, waterIntake: 1800, sleepHours: 6.0, mood: 'Stressed', caloriesBurned: 2000, heartRateAvg: 78 },
  { date: 'Thu', steps: 10500, waterIntake: 2500, sleepHours: 8.0, mood: 'Happy', caloriesBurned: 2800, heartRateAvg: 68 },
  { date: 'Fri', steps: 9000, waterIntake: 2100, sleepHours: 7.0, mood: 'Neutral', caloriesBurned: 2500, heartRateAvg: 71 },
  { date: 'Sat', steps: 12000, waterIntake: 2800, sleepHours: 9.0, mood: 'Happy', caloriesBurned: 3000, heartRateAvg: 65 },
  { date: 'Sun', steps: 3500, waterIntake: 1200, sleepHours: 10.0, mood: 'Tired', caloriesBurned: 1500, heartRateAvg: 66 },
];

const StatCard = ({ icon: Icon, label, value, trend, trendUp, color }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-lg ${color} bg-opacity-10 text-white`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trendUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
        {trend}
      </span>
    </div>
    <h3 className="text-slate-500 text-sm font-medium">{label}</h3>
    <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
  </div>
);

const UserDashboard = () => {
    const { user } = useAuth();
    const [aiInsight, setAiInsight] = useState<string | null>(null);
    const [loadingInsight, setLoadingInsight] = useState(false);

    const getInsight = async () => {
        setLoadingInsight(true);
        // Simulate Gemini analysis of MOCK_DATA
        // In real app, we would pass MOCK_DATA to the prompt
        try {
           const chat = createHealthChat();
           const prompt = `Analyze this weekly health summary: Avg Steps 7000, Avg Sleep 7.5hrs, Water 2000ml. The user feels tired on days with low water. Provide 2 concise sentences of advice.`;
           const response = await chat.sendMessage({ message: prompt });
           setAiInsight(response.text || "Drink more water!");
        } catch (e) {
            setAiInsight("Based on your data: Try to increase water intake on weekends and aim for consistent sleep schedules.");
        }
        setLoadingInsight(false);
    }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Hello, {user?.name.split(' ')[0]} 👋</h1>
          <p className="text-slate-500">Here's your daily health analytics overview.</p>
        </div>
        <button 
            onClick={getInsight}
            disabled={loadingInsight}
            className="mt-4 md:mt-0 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center shadow-lg shadow-teal-600/20 transition-all"
        >
            {loadingInsight ? 'Analyzing...' : (
                <>
                <TrendingUp size={18} className="mr-2" />
                Generate AI Insight
                </>
            )}
        </button>
      </div>

      {aiInsight && (
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-xl shadow-lg text-white relative overflow-hidden animate-fade-in">
              <div className="relative z-10">
                  <h3 className="font-bold text-lg mb-1 flex items-center"><Activity className="mr-2"/> AI Health Analysis</h3>
                  <p className="text-indigo-100">{aiInsight}</p>
              </div>
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
          </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
            icon={Activity} 
            label="Daily Steps" 
            value="8,245" 
            trend="+12%" 
            trendUp={true} 
            color="bg-teal-500" 
        />
        <StatCard 
            icon={Droplets} 
            label="Water Intake" 
            value="1,850 ml" 
            trend="-5%" 
            trendUp={false} 
            color="bg-blue-500" 
        />
        <StatCard 
            icon={Moon} 
            label="Sleep Duration" 
            value="7h 20m" 
            trend="+2%" 
            trendUp={true} 
            color="bg-indigo-500" 
        />
        <StatCard 
            icon={TrendingUp} 
            label="Calories Burned" 
            value="2,140 kcal" 
            trend="+8%" 
            trendUp={true} 
            color="bg-orange-500" 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Activity Trends</h3>
          <ActivityChart data={MOCK_DATA} />
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Sleep vs Water Intake</h3>
          <SleepWaterChart data={MOCK_DATA} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Mood Analysis</h3>
              <MoodPieChart data={MOCK_DATA} />
          </div>
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Upcoming Reminders</h3>
              <div className="space-y-4">
                  <div className="flex items-center p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                      <AlertCircle className="text-yellow-600 mr-3" />
                      <div>
                          <p className="font-semibold text-slate-800">Hydration Alert</p>
                          <p className="text-sm text-slate-600">You haven't logged water intake in 4 hours.</p>
                      </div>
                  </div>
                  <div className="flex items-center p-4 bg-teal-50 rounded-lg border border-teal-100">
                      <Activity className="text-teal-600 mr-3" />
                      <div>
                          <p className="font-semibold text-slate-800">Goal Achieved!</p>
                          <p className="text-sm text-slate-600">You reached your step goal yesterday. Keep it up!</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

const DoctorDashboard = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">Doctor Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="text-slate-500 font-medium">Total Patients</h3>
                    <p className="text-3xl font-bold text-slate-800 mt-2">124</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="text-slate-500 font-medium">Critical Alerts</h3>
                    <p className="text-3xl font-bold text-red-600 mt-2">3</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="text-slate-500 font-medium">Appointments Today</h3>
                    <p className="text-3xl font-bold text-teal-600 mt-2">8</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800">Recent Patient Activity</h3>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Patient</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Last Log</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        <tr>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <div className="h-8 w-8 rounded-full bg-slate-200 mr-3"></div>
                                    <span className="font-medium text-slate-800">John Doe</span>
                                </div>
                            </td>
                            <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">Stable</span></td>
                            <td className="px-6 py-4 text-sm text-slate-500">2 hours ago</td>
                            <td className="px-6 py-4"><button className="text-teal-600 hover:underline text-sm font-medium">View Report</button></td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <div className="h-8 w-8 rounded-full bg-slate-200 mr-3"></div>
                                    <span className="font-medium text-slate-800">Jane Smith</span>
                                </div>
                            </td>
                            <td className="px-6 py-4"><span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold">Attention</span></td>
                            <td className="px-6 py-4 text-sm text-slate-500">1 day ago</td>
                            <td className="px-6 py-4"><button className="text-teal-600 hover:underline text-sm font-medium">View Report</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const AdminDashboard = () => (
    <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-800">System Administration</h1>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold mb-4">User Management</h2>
            <p className="text-slate-600">System stats and user roles management would go here.</p>
        </div>
    </div>
);

export const Dashboard = () => {
  const { user } = useAuth();
  
  if (user?.role === UserRole.DOCTOR) return <DoctorDashboard />;
  if (user?.role === UserRole.ADMIN) return <AdminDashboard />;
  return <UserDashboard />;
};
