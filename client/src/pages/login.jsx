import React, { useState } from 'react';
import ParticleBackground from '../components/ParticleBackground';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            username: ''
        });
    };

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
                                />
                            </div>
                        )}

                        {isLogin && (
                            <div style={styles.forgotPassword}>
                                <a href="#" style={styles.forgotLink}>Forgot Password?</a>
                            </div>
                        )}

                        <button type="submit" style={styles.submitButton}>
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>

                    <div style={styles.divider}>
                        <span style={styles.dividerText}>or</span>
                    </div>

                    <div style={styles.socialButtons}>
                        <button style={styles.socialButton}>
                            <span style={styles.socialIcon}>🌐</span>
                            Continue with Google
                        </button>
                        <button style={styles.socialButton}>
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
    },
    forgotPassword: {
        textAlign: 'right',
        marginBottom: '25px',
    },
    forgotLink: {
        color: '#88ccff',
        textDecoration: 'none',
        fontSize: '0.9rem',
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
};

export default Login;