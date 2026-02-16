import React, { useState } from 'react';
import { Save, Droplets, Moon, Footprints, Smile } from 'lucide-react';

export const Tracker = () => {
    const [form, setForm] = useState({
        water: '',
        sleep: '',
        steps: '',
        mood: 'Neutral'
    });
    const [saved, setSaved] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSaved(true);
        // Simulate API call
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">Daily Health Logger</h1>
            
            {saved && (
                <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center animate-fade-in">
                   <Save size={18} className="mr-2"/> Data logged successfully!
                </div>
            )}

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                            <Droplets size={16} className="mr-2 text-blue-500"/> Water Intake (ml)
                        </label>
                        <input 
                            type="number" 
                            required
                            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                            placeholder="e.g., 2000"
                            value={form.water}
                            onChange={e => setForm({...form, water: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                            <Moon size={16} className="mr-2 text-indigo-500"/> Sleep Duration (hours)
                        </label>
                        <input 
                            type="number" 
                            step="0.5"
                            required
                            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                            placeholder="e.g., 7.5"
                            value={form.sleep}
                            onChange={e => setForm({...form, sleep: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                            <Footprints size={16} className="mr-2 text-teal-500"/> Steps Count
                        </label>
                        <input 
                            type="number" 
                            required
                            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                            placeholder="e.g., 8000"
                            value={form.steps}
                            onChange={e => setForm({...form, steps: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                            <Smile size={16} className="mr-2 text-yellow-500"/> Overall Mood
                        </label>
                        <select 
                            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white"
                            value={form.mood}
                            onChange={e => setForm({...form, mood: e.target.value})}
                        >
                            <option value="Happy">Happy 😊</option>
                            <option value="Neutral">Neutral 😐</option>
                            <option value="Tired">Tired 😫</option>
                            <option value="Stressed">Stressed 😤</option>
                        </select>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-teal-600/20 transition-all"
                    >
                        Save Daily Log
                    </button>
                </form>
            </div>
        </div>
    );
};
