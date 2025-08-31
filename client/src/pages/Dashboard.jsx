// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import {
    User,
    Settings,
    Activity,
    Bell,
    Search,
    Plus,
    BarChart3,
    Users,
    Calendar,
    LogOut,
    Edit3,
    Save,
    X,
    Home,
    Gamepad2,
    Trophy
} from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [profileData, setProfileData] = useState({
        displayName: '',
        bio: ''
    });
    const [stats, setStats] = useState({
        gamesPlayed: 24,
        currentLevel: 15,
        achievements: 8,
        totalScore: 2450
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setProfileData({
                    displayName: currentUser.displayName || '',
                    bio: 'Meditation enthusiast exploring mindfulness through gaming.'
                });
            } else {
                // Redirect to login if not authenticated
                navigate('/login');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const handleProfileUpdate = async () => {
        try {
            if (user) {
                await updateProfile(user, {
                    displayName: profileData.displayName
                });
                setIsEditingProfile(false);
                console.log('Profile updated successfully');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleInputChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value
        });
    };

    const navigateToGame = (gameNumber) => {
        navigate(`/game/${gameNumber}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading dashboard...</div>
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect in useEffect
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            {/* Navigation Header */}
            <nav className="bg-black/20 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-8">
                            <h1 className="text-2xl font-bold text-white">Mediterate</h1>
                            <div className="hidden md:flex space-x-4">
                                <button
                                    onClick={() => navigate('/home')}
                                    className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1"
                                >
                                    <Home className="h-4 w-4" />
                                    <span>Home</span>
                                </button>
                                <button
                                    onClick={() => navigate('/about')}
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    About
                                </button>
                                <button
                                    onClick={() => navigate('/levels')}
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Levels
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
                                />
                            </div>
                            <Bell className="h-6 w-6 text-white hover:text-purple-300 cursor-pointer" />
                            <div className="flex items-center space-x-2">
                                <img
                                    src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=6366f1&color=fff`}
                                    alt="Profile"
                                    className="h-8 w-8 rounded-full"
                                />
                                <span className="text-white text-sm hidden md:block">{user.displayName || user.email}</span>
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="flex items-center space-x-1 text-white hover:text-red-300 transition-colors"
                            >
                                <LogOut className="h-4 w-4" />
                                <span className="text-sm hidden md:block">Sign Out</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex">
                {/* Sidebar */}
                <div className="w-64 bg-black/20 backdrop-blur-md border-r border-white/10 min-h-[calc(100vh-4rem)]">
                    <div className="p-6">
                        <nav className="space-y-2">
                            {[
                                { id: 'overview', label: 'Overview', icon: BarChart3 },
                                { id: 'games', label: 'My Games', icon: Gamepad2 },
                                { id: 'achievements', label: 'Achievements', icon: Trophy },
                                { id: 'progress', label: 'Progress', icon: Activity },
                                { id: 'community', label: 'Community', icon: Users },
                                { id: 'calendar', label: 'Calendar', icon: Calendar },
                                { id: 'settings', label: 'Settings', icon: Settings }
                            ].map(({ id, label, icon: Icon }) => (
                                <button
                                    key={id}
                                    onClick={() => setActiveTab(id)}
                                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                                        activeTab === id
                                            ? 'bg-purple-600 text-white'
                                            : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span>{label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl font-bold text-white">Welcome back, {user.displayName || 'Meditator'}! 🧘‍♂️</h2>
                                <button
                                    onClick={() => navigateToGame(1)}
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                                >
                                    <Gamepad2 className="h-4 w-4" />
                                    <span>Start Game</span>
                                </button>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { label: 'Games Played', value: stats.gamesPlayed, color: 'from-blue-500 to-blue-600', icon: Gamepad2 },
                                    { label: 'Current Level', value: stats.currentLevel, color: 'from-green-500 to-green-600', icon: Trophy },
                                    { label: 'Achievements', value: stats.achievements, color: 'from-purple-500 to-purple-600', icon: Trophy },
                                    { label: 'Total Score', value: stats.totalScore, color: 'from-orange-500 to-orange-600', icon: BarChart3 }
                                ].map((stat, index) => (
                                    <div key={index} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-colors">
                                        <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${stat.color} mb-4`}>
                                            <stat.icon className="h-6 w-6 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                                        <p className="text-gray-300">{stat.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
                                <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <button
                                        onClick={() => navigateToGame(1)}
                                        className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all flex items-center justify-center space-x-2"
                                    >
                                        <Gamepad2 className="h-5 w-5" />
                                        <span>Play Game 1</span>
                                    </button>
                                    <button
                                        onClick={() => navigateToGame(2)}
                                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center space-x-2"
                                    >
                                        <Gamepad2 className="h-5 w-5" />
                                        <span>Play Game 2</span>
                                    </button>
                                    <button
                                        onClick={() => navigate('/levels')}
                                        className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-lg hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center space-x-2"
                                    >
                                        <Trophy className="h-5 w-5" />
                                        <span>View Levels</span>
                                    </button>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
                                <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
                                <div className="space-y-4">
                                    {[
                                        { action: 'Completed Level 15 in Game 1', time: '2 hours ago', type: 'game' },
                                        { action: 'Earned "Mindful Master" achievement', time: '4 hours ago', type: 'achievement' },
                                        { action: 'Reached 7-day meditation streak', time: '1 day ago', type: 'streak' },
                                        { action: 'Unlocked new breathing exercise', time: '2 days ago', type: 'unlock' }
                                    ].map((activity, index) => (
                                        <div key={index} className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg">
                                            <div className={`p-2 rounded-full ${
                                                activity.type === 'game' ? 'bg-purple-500/20 text-purple-400' :
                                                    activity.type === 'achievement' ? 'bg-yellow-500/20 text-yellow-400' :
                                                        activity.type === 'streak' ? 'bg-green-500/20 text-green-400' :
                                                            'bg-blue-500/20 text-blue-400'
                                            }`}>
                                                {activity.type === 'game' ? <Gamepad2 className="h-4 w-4" /> :
                                                    activity.type === 'achievement' ? <Trophy className="h-4 w-4" /> :
                                                        <Activity className="h-4 w-4" />}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-white">{activity.action}</p>
                                                <p className="text-gray-400 text-sm">{activity.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Games Tab */}
                    {activeTab === 'games' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl font-bold text-white">My Games</h2>
                                <button
                                    onClick={() => navigate('/levels')}
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                                >
                                    <Trophy className="h-4 w-4" />
                                    <span>View All Levels</span>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-colors">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-semibold text-white">Meditation Game 1</h3>
                                        <span className="text-sm bg-green-600 text-white px-2 py-1 rounded-full">Level 15</span>
                                    </div>
                                    <p className="text-gray-400 mb-4">Breathing exercises and mindfulness challenges</p>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="text-sm text-gray-300">
                                            <span>Progress: 75%</span>
                                        </div>
                                        <div className="text-sm text-gray-300">
                                            <span>Best Score: 1,250</span>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{width: '75%'}}></div>
                                    </div>
                                    <button
                                        onClick={() => navigateToGame(1)}
                                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors"
                                    >
                                        Play Now
                                    </button>
                                </div>

                                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-colors">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-semibold text-white">Meditation Game 2</h3>
                                        <span className="text-sm bg-blue-600 text-white px-2 py-1 rounded-full">Level 12</span>
                                    </div>
                                    <p className="text-gray-400 mb-4">Advanced meditation techniques and focus training</p>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="text-sm text-gray-300">
                                            <span>Progress: 60%</span>
                                        </div>
                                        <div className="text-sm text-gray-300">
                                            <span>Best Score: 980</span>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{width: '60%'}}></div>
                                    </div>
                                    <button
                                        onClick={() => navigateToGame(2)}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                                    >
                                        Play Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Settings Tab */}
                    {activeTab === 'settings' && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-white">Settings</h2>

                            {/* Profile Settings */}
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-semibold text-white">Profile Information</h3>
                                    {!isEditingProfile ? (
                                        <button
                                            onClick={() => setIsEditingProfile(true)}
                                            className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
                                        >
                                            <Edit3 className="h-4 w-4" />
                                            <span>Edit</span>
                                        </button>
                                    ) : (
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={handleProfileUpdate}
                                                className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md transition-colors"
                                            >
                                                <Save className="h-4 w-4" />
                                                <span>Save</span>
                                            </button>
                                            <button
                                                onClick={() => setIsEditingProfile(false)}
                                                className="flex items-center space-x-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md transition-colors"
                                            >
                                                <X className="h-4 w-4" />
                                                <span>Cancel</span>
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center space-x-6 mb-6">
                                    <img
                                        src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=6366f1&color=fff&size=128`}
                                        alt="Profile"
                                        className="h-20 w-20 rounded-full"
                                    />
                                    <div>
                                        <h4 className="text-lg font-medium text-white">{user.displayName || 'User'}</h4>
                                        <p className="text-gray-400">{user.email}</p>
                                        <p className="text-sm text-gray-500">Joined {new Date(user.metadata.creationTime).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
                                        <input
                                            type="text"
                                            name="displayName"
                                            value={profileData.displayName}
                                            onChange={handleInputChange}
                                            disabled={!isEditingProfile}
                                            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-60"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={user.email}
                                            disabled
                                            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 opacity-60"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                                    <textarea
                                        name="bio"
                                        value={profileData.bio}
                                        onChange={handleInputChange}
                                        disabled={!isEditingProfile}
                                        rows={3}
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-60"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Other tabs */}
                    {['achievements', 'progress', 'community', 'calendar'].includes(activeTab) && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-white capitalize">{activeTab}</h2>
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 text-center">
                                <div className="text-6xl mb-4">
                                    {activeTab === 'achievements' ? '🏆' :
                                        activeTab === 'progress' ? '📈' :
                                            activeTab === 'community' ? '👥' : '📅'}
                                </div>
                                <p className="text-gray-400 text-lg">This section is coming soon!</p>
                                <p className="text-gray-500 text-sm mt-2">We're working on bringing you amazing {activeTab} features.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;