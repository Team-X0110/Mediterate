import React from 'react';
import ParticleBackground from '../components/ParticleBackground';

const About = () => {
    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
            <ParticleBackground />

            <div style={styles.container}>
                <div style={styles.content}>
                    <h1 style={styles.title}>About Mediterate</h1>

                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>What is Mediterate?</h2>
                        <p style={styles.text}>
                            Mediterate is an innovative gamified learning platform focused on Media and Information Literacy (MIL).
                            We combine engaging interactive experiences with educational content to help users develop critical
                            thinking skills in the digital age.
                        </p>
                    </div>

                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>Our Mission</h2>
                        <p style={styles.text}>
                            To empower individuals with the knowledge and skills needed to navigate the complex world of digital
                            media, identify reliable information sources, and become responsible digital citizens.
                        </p>
                    </div>

                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>Key Features</h2>
                        <div style={styles.features}>
                            <div style={styles.feature}>
                                <h3 style={styles.featureTitle}>🎮 Gamified Learning</h3>
                                <p style={styles.featureText}>Interactive challenges and rewards system</p>
                            </div>
                            <div style={styles.feature}>
                                <h3 style={styles.featureTitle}>📚 MIL Education</h3>
                                <p style={styles.featureText}>Comprehensive media literacy curriculum</p>
                            </div>
                            <div style={styles.feature}>
                                <h3 style={styles.featureTitle}>🏆 Progress Tracking</h3>
                                <p style={styles.featureText}>Monitor your learning journey</p>
                            </div>
                        </div>
                    </div>
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
    content: {
        maxWidth: '800px',
        width: '100%',
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '40px',
        color: 'white',
    },
    title: {
        fontSize: '3rem',
        marginBottom: '30px',
        textAlign: 'center',
        background: 'linear-gradient(45deg, #646cff, #88ccff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    section: {
        marginBottom: '30px',
    },
    sectionTitle: {
        fontSize: '1.8rem',
        marginBottom: '15px',
        color: '#88ccff',
    },
    text: {
        fontSize: '1.1rem',
        lineHeight: '1.6',
        marginBottom: '20px',
        opacity: 0.9,
    },
    features: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '20px',
    },
    feature: {
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '15px',
        padding: '20px',
        textAlign: 'center',
    },
    featureTitle: {
        fontSize: '1.3rem',
        marginBottom: '10px',
        color: '#ffd1a8',
    },
    featureText: {
        fontSize: '1rem',
        opacity: 0.8,
    },
};

export default About;