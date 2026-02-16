import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, Heart } from 'lucide-react';

export const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-6">
                <div className="h-32 bg-gradient-to-r from-teal-500 to-emerald-600"></div>
                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-12 mb-6">
                        <img 
                            src={user?.avatar} 
                            alt="Profile" 
                            className="w-24 h-24 rounded-full border-4 border-white shadow-md bg-white"
                        />
                        <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-200">
                            Edit Profile
                        </button>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">{user?.name}</h1>
                        <p className="text-slate-500 font-medium">{user?.role}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                        <User size={20} className="mr-2 text-teal-600"/> Personal Info
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center text-slate-600">
                            <Mail size={18} className="mr-3 text-slate-400"/> {user?.email}
                        </div>
                        <div className="flex items-center text-slate-600">
                            <Phone size={18} className="mr-3 text-slate-400"/> +1 (555) 123-4567
                        </div>
                        <div className="flex items-center text-slate-600">
                            <MapPin size={18} className="mr-3 text-slate-400"/> New York, USA
                        </div>
                    </div>
                </div>

                {user?.profile && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                            <Heart size={20} className="mr-2 text-red-500"/> Health Profile
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-slate-50 rounded-lg">
                                <p className="text-xs text-slate-500 uppercase">Age</p>
                                <p className="text-lg font-semibold text-slate-800">{user.profile.age} yrs</p>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-lg">
                                <p className="text-xs text-slate-500 uppercase">Blood Type</p>
                                <p className="text-lg font-semibold text-slate-800">{user.profile.bloodType}</p>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-lg">
                                <p className="text-xs text-slate-500 uppercase">Height</p>
                                <p className="text-lg font-semibold text-slate-800">{user.profile.height} cm</p>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-lg">
                                <p className="text-xs text-slate-500 uppercase">Weight</p>
                                <p className="text-lg font-semibold text-slate-800">{user.profile.weight} kg</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs text-slate-500 uppercase mb-2">Allergies</p>
                            <div className="flex flex-wrap gap-2">
                                {user.profile.allergies.map(alg => (
                                    <span key={alg} className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                                        {alg}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
