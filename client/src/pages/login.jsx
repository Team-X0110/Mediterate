import React, { useState, useEffect } from 'react';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    updateProfile,
    sendPasswordResetEmail,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';
import { auth } from '../firebase';
import ParticleBackground from '../components/ParticleBackground';
// Import Dashboard component - adjust path as needed
// import Dashboard from './Dashboard';
// For now, we'll use a placeholder until the import is resolved

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [showDashboard, setShowDashboard] = useState(false); // New state for routing
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: ''
    });

    // Check auth state on component mount
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            // Optionally auto-navigate to dashboard when user logs in
            // if (currentUser) {
            //     setShowDashboard(true);
            // }
        });

        return () => unsubscribe();
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error when user starts typing
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                // Sign in existing user
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    formData.email,
                    formData.password
                );
                console.log('User signed in:', userCredential.user);
            } else {
                // Create new user
                if (formData.password !== formData.confirmPassword) {
                    throw new Error('Passwords do not match');
                }

                if (formData.password.length < 6) {
                    throw new Error('Password should be at least 6 characters long');
                }

                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    formData.email,
                    formData.password
                );

                // Update user profile with username
                await updateProfile(userCredential.user, {
                    displayName: formData.username
                });

                console.log('User created:', userCredential.user);
            }
        } catch (error) {
            setError(getErrorMessage(error.code || error.message));
            console.error('Auth error:', error);
        }

        setLoading(false);
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError('');

        try {
            const provider = new GoogleAuthProvider();
            // Add additional scopes if needed
            provider.addScope('profile');
            provider.addScope('email');

            const result = await signInWithPopup(auth, provider);
            console.log('Google sign in successful:', result.user);
        } catch (error) {
            if (error.code !== 'auth/popup-closed-by-user') {
                setError(getErrorMessage(error.code));
                console.error('Google sign in error:', error);
            }
        }

        setLoading(false);
    };

    const handleFacebookSignIn = async () => {
        setLoading(true);
        setError('');

        try {
            const provider = new FacebookAuthProvider();
            // Add additional scopes if needed
            provider.addScope('email');

            const result = await signInWithPopup(auth, provider);
            console.log('Facebook sign in successful:', result.user);
        } catch (error) {
            if (error.code !== 'auth/popup-closed-by-user') {
                setError(getErrorMessage(error.code));
                console.error('Facebook sign in error:', error);
            }
        }

        setLoading(false);
    };

    const handleForgotPassword = async () => {
        if (!formData.email) {
            setError('Please enter your email address first');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await sendPasswordResetEmail(auth, formData.email);
            alert('Password reset email sent! Check your inbox.');
        } catch (error) {
            setError(getErrorMessage(error.code));
            console.error('Password reset error:', error);
        }

        setLoading(false);
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setShowDashboard(false); // Return to login view
            console.log('User signed out');
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    // NEW: Handle navigation to dashboard
    const handleGoToDashboard = () => {
        setShowDashboard(true);
    };

    // NEW: Handle back to login (optional, for testing)
    const handleBackToLogin = () => {
        setShowDashboard(false);
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            username: ''
        });
        setError('');
    };

    const getErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/user-not-found':
                return 'No account found with this email address.';
            case 'auth/wrong-password':
                return 'Incorrect password. Please try again.';
            case 'auth/email-already-in-use':
                return 'An account with this email already exists.';
            case 'auth/weak-password':
                return 'Password should be at least 6 characters long.';
            case 'auth/invalid-email':
                return 'Please enter a valid email address.';
            case 'auth/too-many-requests':
                return 'Too many failed attempts. Please try again later.';
            case 'auth/popup-blocked':
                return 'Pop-up was blocked by your browser. Please allow pop-ups and try again.';
            case 'auth/cancelled-popup-request':
                return 'Sign-in was cancelled.';
            case 'auth/invalid-credential':
                return 'Invalid email or password. Please check your credentials.';
            case 'Passwords do not match':
                return 'Passwords do not match. Please try again.';
            case 'Password should be at least 6 characters long':
                return 'Password should be at least 6 characters long.';
            default:
                return 'An error occurred. Please try again.';
        }
    };

    // Temporary Dashboard placeholder - replace with actual import once resolved
    const Dashboard = ({ user, onSignOut, onBackToLogin }) => (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            textAlign: 'center'
        }}>
            <div style={{
                background: 'rgba(0,0,0,0.8)',
                padding: '40px',
                borderRadius: '20px',
                maxWidth: '500px'
            }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Dashboard</h1>
                <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
                    Welcome to your dashboard, {user?.displayName || user?.email}!
                </p>
                <p style={{ marginBottom: '30px', color: '#ccc' }}>
                    This is a placeholder. Your actual dashboard will load here once the import is fixed.
                </p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <button
                        onClick={onBackToLogin}
                        style={{
                            background: 'rgba(255,255,255,0.2)',
                            border: 'none',
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                    >
                        Back to Login
                    </button>
                    <button
                        onClick={onSignOut}
                        style={{
                            background: 'rgba(239, 68, 68, 0.8)',
                            border: 'none',
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );

    // NEW: Render dashboard if showDashboard is true
    if (showDashboard && user) {
        return <Dashboard user={user} onSignOut={handleSignOut} onBackToLogin={handleBackToLogin} />;
    }

    // Show logged in state
    if (user) {
        return (
            <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
                <ParticleBackground />
                <div style={styles.container}>
                    <div style={styles.formContainer}>
                        <div style={styles.header}>
                            <h1 style={styles.title}>Welcome Back!</h1>
                            <p style={styles.subtitle}>
                                Hello, {user.displayName || user.email}
                            </p>
                        </div>

                        {user.photoURL && (
                            <img
                                src={user.photoURL}
                                alt="Profile"
                                style={styles.profileImage}
                            />
                        )}

                        <div style={styles.userInfo}>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Account Type:</strong> {user.providerData[0]?.providerId || 'Email'}</p>
                            <p><strong>Verified:</strong> {user.emailVerified ? 'Yes' : 'No'}</p>
                        </div>

                        <button
                            onClick={handleGoToDashboard} // Updated to use new handler
                            style={styles.submitButton}
                        >
                            Go to Dashboard
                        </button>

                        <button
                            onClick={handleSignOut}
                            style={{...styles.submitButton, background: 'rgba(239, 68, 68, 0.8)'}}
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
            <ParticleBackground />

            <div style={styles.container}>
                <div style={styles.formContainer}>
                    <div style={styles.header}>
                        <h1 style={styles.title}>
                            {isLogin ? 'Welcome Back' : 'Join Mediterate'}
                        </h1>
                        <p style={styles.subtitle}>
                            {isLogin
                                ? 'Continue your media literacy journey'
                                : 'Start your gamified learning adventure'
                            }
                        </p>
                    </div>

                    {error && (
                        <div style={styles.errorMessage}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={styles.form}>
                        {!isLogin && (
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                    placeholder="Choose a username"
                                    required={!isLogin}
                                    disabled={loading}
                                />
                            </div>
                        )}

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                style={styles.input}
                                placeholder="Enter your email"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                style={styles.input}
                                placeholder="Enter your password"
                                required
                                disabled={loading}
                            />
                        </div>

                        {!isLogin && (
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                    placeholder="Confirm your password"
                                    required={!isLogin}
                                    disabled={loading}
                                />
                            </div>
                        )}

                        {isLogin && (
                            <div style={styles.forgotPassword}>
                                <button
                                    type="button"
                                    onClick={handleForgotPassword}
                                    style={styles.forgotLink}
                                    disabled={loading}
                                >
                                    Forgot Password?
                                </button>
                            </div>
                        )}

                        <button
                            type="submit"
                            style={{
                                ...styles.submitButton,
                                opacity: loading ? 0.6 : 1,
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                            disabled={loading}
                        >
                            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
                        </button>
                    </form>

                    <div style={styles.divider}>
                        <span style={styles.dividerText}>or</span>
                    </div>

                    <div style={styles.socialButtons}>
                        <button
                            style={{
                                ...styles.socialButton,
                                opacity: loading ? 0.6 : 1,
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                            type="button"
                        >
                            <span style={styles.socialIcon}>🌐</span>
                            Continue with Google
                        </button>
                        <button
                            style={{
                                ...styles.socialButton,
                                opacity: loading ? 0.6 : 1,
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                            onClick={handleFacebookSignIn}
                            disabled={loading}
                            type="button"
                        >
                            <span style={styles.socialIcon}>📘</span>
                            Continue with Facebook
                        </button>
                    </div>

                    <div style={styles.toggleSection}>
                        <p style={styles.toggleText}>
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={toggleMode}
                                style={styles.toggleButton}
                                disabled={loading}
                                type="button"
                            >
                                {isLogin ? 'Sign up' : 'Sign in'}
                            </button>
                        </p>
                    </div>

                    {!isLogin && (
                        <div style={styles.benefits}>
                            <h3 style={styles.benefitsTitle}>What you'll get:</h3>
                            <ul style={styles.benefitsList}>
                                <li style={styles.benefitItem}>🎯 Personalized learning path</li>
                                <li style={styles.benefitItem}>🏆 Achievement tracking</li>
                                <li style={styles.benefitItem}>📊 Progress analytics</li>
                                <li style={styles.benefitItem}>🎮 Gamified experience</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 20px 50px',
    },
    formContainer: {
        maxWidth: '400px',
        width: '100%',
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(15px)',
        borderRadius: '20px',
        padding: '40px',
        color: 'white',
        border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    header: {
        textAlign: 'center',
        marginBottom: '30px',
    },
    title: {
        fontSize: '2.5rem',
        marginBottom: '10px',
        background: 'linear-gradient(45deg, #646cff, #88ccff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    subtitle: {
        fontSize: '1rem',
        opacity: 0.8,
        lineHeight: '1.4',
    },
    errorMessage: {
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        border: '1px solid rgba(239, 68, 68, 0.5)',
        borderRadius: '8px',
        padding: '12px',
        marginBottom: '20px',
        color: '#fca5a5',
        fontSize: '0.9rem',
        textAlign: 'center',
    },
    form: {
        marginBottom: '25px',
    },
    inputGroup: {
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontSize: '0.9rem',
        color: '#88ccff',
        fontWeight: '500',
    },
    input: {
        width: '100%',
        padding: '12px 16px',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        fontSize: '1rem',
        transition: 'all 0.3s ease',
        boxSizing: 'border-box',
        outline: 'none',
    },
    forgotPassword: {
        textAlign: 'right',
        marginBottom: '25px',
    },
    forgotLink: {
        background: 'none',
        border: 'none',
        color: '#88ccff',
        textDecoration: 'underline',
        fontSize: '0.9rem',
        cursor: 'pointer',
        padding: '0',
    },
    submitButton: {
        width: '100%',
        padding: '14px',
        borderRadius: '8px',
        border: 'none',
        background: 'linear-gradient(45deg, #646cff, #88ccff)',
        color: 'white',
        fontSize: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        marginBottom: '20px',
    },
    divider: {
        textAlign: 'center',
        position: 'relative',
        margin: '25px 0',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
    },
    dividerText: {
        background: 'rgba(0, 0, 0, 0.8)',
        padding: '0 15px',
        position: 'relative',
        top: '-12px',
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: '0.9rem',
    },
    socialButtons: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '25px',
    },
    socialButton: {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        fontSize: '0.9rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
    },
    socialIcon: {
        fontSize: '1.2rem',
    },
    toggleSection: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    toggleText: {
        fontSize: '0.9rem',
        opacity: 0.8,
        margin: 0,
    },
    toggleButton: {
        background: 'none',
        border: 'none',
        color: '#88ccff',
        cursor: 'pointer',
        textDecoration: 'underline',
        fontSize: '0.9rem',
        fontWeight: 'bold',
    },
    benefits: {
        marginTop: '20px',
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '10px',
    },
    benefitsTitle: {
        fontSize: '1.1rem',
        marginBottom: '15px',
        color: '#ffd1a8',
        textAlign: 'center',
    },
    benefitsList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    benefitItem: {
        padding: '5px 0',
        fontSize: '0.9rem',
        opacity: 0.9,
    },
    userInfo: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '20px',
        fontSize: '0.9rem',
    },
    profileImage: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        margin: '0 auto 20px',
        display: 'block',
        border: '2px solid rgba(255, 255, 255, 0.2)',
    },
};

export default Login;