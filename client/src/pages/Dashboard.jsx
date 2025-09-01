import React, { useState, useEffect } from 'react';
import { signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

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
            <div style={styles.loadingContainer}>
                <div style={styles.loadingText}>Loading dashboard...</div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div style={styles.container}>
            {/* Header */}
            <header style={styles.header}>
                <div style={styles.headerContent}>
                    <h1 style={styles.logo}>Mediterate</h1>
                    <nav style={styles.nav}>
                        <button onClick={() => navigate('/')} style={styles.navButton}>
                            Home
                        </button>
                        <button onClick={() => navigate('/about')} style={styles.navButton}>
                            About
                        </button>
                        <button onClick={() => navigate('/levels')} style={styles.navButton}>
                            Levels
                        </button>
                    </nav>
                    <div style={styles.userSection}>
                        <span style={styles.userName}>{user.displayName || user.email}</span>
                        <button onClick={handleSignOut} style={styles.signOutButton}>
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            <div style={styles.mainContent}>
                {/* Sidebar */}
                <aside style={styles.sidebar}>
                    <nav style={styles.sidebarNav}>
                        {[
                            { id: 'overview', label: 'Overview' },
                            { id: 'games', label: 'My Games' },
                            { id: 'achievements', label: 'Achievements' },
                            { id: 'progress', label: 'Progress' },
                            { id: 'settings', label: 'Settings' }
                        ].map(({ id, label }) => (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id)}
                                style={{
                                    ...styles.sidebarButton,
                                    backgroundColor: activeTab === id ? '#6366f1' : 'transparent'
                                }}
                            >
                                {label}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Content Area */}
                <main style={styles.content}>
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div>
                            <div style={styles.welcomeSection}>
                                <h2 style={styles.welcomeTitle}>
                                    Welcome back, {user.displayName || 'Meditator'}!
                                </h2>
                                <button
                                    onClick={() => navigateToGame(1)}
                                    style={styles.primaryButton}
                                >
                                    Start Game
                                </button>
                            </div>

                            {/* Stats Cards */}
                            <div style={styles.statsGrid}>
                                {[
                                    { label: 'Games Played', value: stats.gamesPlayed },
                                    { label: 'Current Level', value: stats.currentLevel },
                                    { label: 'Achievements', value: stats.achievements },
                                    { label: 'Total Score', value: stats.totalScore }
                                ].map((stat, index) => (
                                    <div key={index} style={styles.statCard}>
                                        <h3 style={styles.statValue}>{stat.value}</h3>
                                        <p style={styles.statLabel}>{stat.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Quick Actions */}
                            <div style={styles.section}>
                                <h3 style={styles.sectionTitle}>Quick Actions</h3>
                                <div style={styles.actionsGrid}>
                                    <button
                                        onClick={() => navigateToGame(1)}
                                        style={styles.actionButton}
                                    >
                                        Play Game 1
                                    </button>
                                    <button
                                        onClick={() => navigateToGame(2)}
                                        style={styles.actionButton}
                                    >
                                        Play Game 2
                                    </button>
                                    <button
                                        onClick={() => navigate('/levels')}
                                        style={styles.actionButton}
                                    >
                                        View Levels
                                    </button>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div style={styles.section}>
                                <h3 style={styles.sectionTitle}>Recent Activity</h3>
                                <div style={styles.activityList}>
                                    {[
                                        { action: 'Completed Level 15 in Game 1', time: '2 hours ago' },
                                        { action: 'Earned "Mindful Master" achievement', time: '4 hours ago' },
                                        { action: 'Reached 7-day meditation streak', time: '1 day ago' },
                                        { action: 'Unlocked new breathing exercise', time: '2 days ago' }
                                    ].map((activity, index) => (
                                        <div key={index} style={styles.activityItem}>
                                            <div>
                                                <p style={styles.activityAction}>{activity.action}</p>
                                                <p style={styles.activityTime}>{activity.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Games Tab */}
                    {activeTab === 'games' && (
                        <div>
                            <div style={styles.welcomeSection}>
                                <h2 style={styles.sectionTitle}>My Games</h2>
                                <button
                                    onClick={() => navigate('/levels')}
                                    style={styles.primaryButton}
                                >
                                    View All Levels
                                </button>
                            </div>

                            <div style={styles.gamesGrid}>
                                <div style={styles.gameCard}>
                                    <h3 style={styles.gameTitle}>Meditation Game 1</h3>
                                    <p style={styles.gameDescription}>Breathing exercises and mindfulness challenges</p>
                                    <div style={styles.gameStats}>
                                        <span>Level 15</span>
                                        <span>Progress: 75%</span>
                                        <span>Best Score: 1,250</span>
                                    </div>
                                    <div style={styles.progressBar}>
                                        <div style={{...styles.progressFill, width: '75%'}}></div>
                                    </div>
                                    <button
                                        onClick={() => navigateToGame(1)}
                                        style={styles.gameButton}
                                    >
                                        Play Now
                                    </button>
                                </div>

                                <div style={styles.gameCard}>
                                    <h3 style={styles.gameTitle}>Meditation Game 2</h3>
                                    <p style={styles.gameDescription}>Advanced meditation techniques and focus training</p>
                                    <div style={styles.gameStats}>
                                        <span>Level 12</span>
                                        <span>Progress: 60%</span>
                                        <span>Best Score: 980</span>
                                    </div>
                                    <div style={styles.progressBar}>
                                        <div style={{...styles.progressFill, width: '60%'}}></div>
                                    </div>
                                    <button
                                        onClick={() => navigateToGame(2)}
                                        style={styles.gameButton}
                                    >
                                        Play Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Settings Tab */}
                    {activeTab === 'settings' && (
                        <div>
                            <h2 style={styles.sectionTitle}>Settings</h2>

                            <div style={styles.section}>
                                <div style={styles.profileHeader}>
                                    <h3>Profile Information</h3>
                                    {!isEditingProfile ? (
                                        <button
                                            onClick={() => setIsEditingProfile(true)}
                                            style={styles.editButton}
                                        >
                                            Edit
                                        </button>
                                    ) : (
                                        <div style={styles.editActions}>
                                            <button
                                                onClick={handleProfileUpdate}
                                                style={styles.saveButton}
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setIsEditingProfile(false)}
                                                style={styles.cancelButton}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div style={styles.profileSection}>
                                    <img
                                        src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=6366f1&color=fff&size=128`}
                                        alt="Profile"
                                        style={styles.profileImage}
                                    />
                                    <div style={styles.profileInfo}>
                                        <h4>{user.displayName || 'User'}</h4>
                                        <p style={styles.email}>{user.email}</p>
                                        <p style={styles.joinDate}>
                                            Joined {new Date(user.metadata.creationTime).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                <div style={styles.formGrid}>
                                    <div style={styles.inputGroup}>
                                        <label style={styles.label}>Display Name</label>
                                        <input
                                            type="text"
                                            name="displayName"
                                            value={profileData.displayName}
                                            onChange={handleInputChange}
                                            disabled={!isEditingProfile}
                                            style={styles.input}
                                        />
                                    </div>
                                    <div style={styles.inputGroup}>
                                        <label style={styles.label}>Email</label>
                                        <input
                                            type="email"
                                            value={user.email}
                                            disabled
                                            style={{...styles.input, opacity: 0.6}}
                                        />
                                    </div>
                                </div>

                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Bio</label>
                                    <textarea
                                        name="bio"
                                        value={profileData.bio}
                                        onChange={handleInputChange}
                                        disabled={!isEditingProfile}
                                        rows={3}
                                        style={styles.textarea}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Other tabs */}
                    {['achievements', 'progress'].includes(activeTab) && (
                        <div>
                            <h2 style={styles.sectionTitle}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
                            <div style={styles.placeholderSection}>
                                <p style={styles.placeholderText}>This section is coming soon!</p>
                                <p style={styles.placeholderSubtext}>We're working on bringing you amazing {activeTab} features.</p>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#0f172a',
        fontFamily: 'Arial, sans-serif'
    },
    loadingContainer: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f172a'
    },
    loadingText: {
        fontSize: '18px',
        color: '#94a3b8'
    },
    header: {
        backgroundColor: '#1e293b',
        borderBottom: '1px solid #334155',
        padding: '1rem 0'
    },
    headerContent: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logo: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#3b82f6',
        margin: 0
    },
    nav: {
        display: 'flex',
        gap: '1rem'
    },
    navButton: {
        background: 'none',
        border: 'none',
        color: '#94a3b8',
        cursor: 'pointer',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        transition: 'color 0.3s'
    },
    userSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    },
    userName: {
        color: '#e2e8f0',
        fontSize: '14px'
    },
    signOutButton: {
        background: '#ef4444',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px'
    },
    mainContent: {
        display: 'flex',
        maxWidth: '1200px',
        margin: '0 auto',
        minHeight: 'calc(100vh - 80px)'
    },
    sidebar: {
        width: '240px',
        backgroundColor: '#1e293b',
        borderRight: '1px solid #334155',
        padding: '2rem 0'
    },
    sidebarNav: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        padding: '0 1rem'
    },
    sidebarButton: {
        width: '100%',
        padding: '0.75rem 1rem',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        textAlign: 'left',
        color: '#94a3b8',
        transition: 'all 0.3s',
        fontSize: '14px'
    },
    content: {
        flex: 1,
        padding: '2rem',
        backgroundColor: '#0f172a'
    },
    welcomeSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2rem',
        padding: '1.5rem',
        backgroundColor: '#1e293b',
        borderRadius: '8px',
        border: '1px solid #334155'
    },
    welcomeTitle: {
        fontSize: '28px',
        margin: 0,
        color: '#e2e8f0'
    },
    primaryButton: {
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        padding: '0.75rem 1.5rem',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
    },
    statCard: {
        backgroundColor: '#1e293b',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '1px solid #334155',
        textAlign: 'center'
    },
    statValue: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#3b82f6',
        margin: '0 0 0.5rem 0'
    },
    statLabel: {
        color: '#94a3b8',
        margin: 0,
        fontSize: '14px'
    },
    section: {
        backgroundColor: '#1e293b',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '1px solid #334155',
        marginBottom: '1.5rem'
    },
    sectionTitle: {
        fontSize: '20px',
        margin: '0 0 1.5rem 0',
        color: '#e2e8f0'
    },
    actionsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem'
    },
    actionButton: {
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        padding: '1rem',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'background-color 0.3s'
    },
    activityList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    activityItem: {
        padding: '1rem',
        backgroundColor: '#0f172a',
        borderRadius: '6px',
        border: '1px solid #334155'
    },
    activityAction: {
        margin: '0 0 0.5rem 0',
        color: '#e2e8f0',
        fontSize: '14px'
    },
    activityTime: {
        margin: 0,
        color: '#94a3b8',
        fontSize: '12px'
    },
    gamesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem'
    },
    gameCard: {
        backgroundColor: '#1e293b',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '1px solid #334155'
    },
    gameTitle: {
        fontSize: '18px',
        margin: '0 0 0.5rem 0',
        color: '#e2e8f0'
    },
    gameDescription: {
        color: '#94a3b8',
        margin: '0 0 1rem 0',
        fontSize: '14px'
    },
    gameStats: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '1rem',
        fontSize: '12px',
        color: '#94a3b8'
    },
    progressBar: {
        width: '100%',
        height: '8px',
        backgroundColor: '#334155',
        borderRadius: '4px',
        marginBottom: '1rem',
        overflow: 'hidden'
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#3b82f6',
        borderRadius: '4px',
        transition: 'width 0.3s'
    },
    gameButton: {
        width: '100%',
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        padding: '0.75rem',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px'
    },
    profileHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem'
    },
    editButton: {
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px'
    },
    editActions: {
        display: 'flex',
        gap: '0.5rem'
    },
    saveButton: {
        backgroundColor: '#10b981',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px'
    },
    cancelButton: {
        backgroundColor: '#6b7280',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px'
    },
    profileSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        marginBottom: '1.5rem'
    },
    profileImage: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        border: '2px solid #334155'
    },
    profileInfo: {
        flex: 1
    },
    email: {
        color: '#94a3b8',
        margin: '0.25rem 0',
        fontSize: '14px'
    },
    joinDate: {
        color: '#64748b',
        margin: 0,
        fontSize: '12px'
    },
    formGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginBottom: '1rem'
    },
    inputGroup: {
        marginBottom: '1rem'
    },
    label: {
        display: 'block',
        marginBottom: '0.5rem',
        color: '#e2e8f0',
        fontSize: '14px',
        fontWeight: '500'
    },
    input: {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid #334155',
        borderRadius: '6px',
        fontSize: '14px',
        backgroundColor: '#0f172a',
        color: '#e2e8f0',
        boxSizing: 'border-box'
    },
    textarea: {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid #334155',
        borderRadius: '6px',
        fontSize: '14px',
        backgroundColor: '#0f172a',
        color: '#e2e8f0',
        resize: 'vertical',
        boxSizing: 'border-box'
    },
    placeholderSection: {
        backgroundColor: '#1e293b',
        padding: '3rem',
        borderRadius: '8px',
        border: '1px solid #334155',
        textAlign: 'center'
    },
    placeholderText: {
        fontSize: '18px',
        color: '#94a3b8',
        margin: '0 0 0.5rem 0'
    },
    placeholderSubtext: {
        fontSize: '14px',
        color: '#64748b',
        margin: 0
    }
};

export default Dashboard;