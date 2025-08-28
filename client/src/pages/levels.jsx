import React, { useState } from "react";
import ParticleBackground from "../components/ParticleBackground";
import { useNavigate } from "react-router-dom";

const Levels = () => {
  const navigate = useNavigate();

  const [selectedLevel, setSelectedLevel] = useState(null);

  const levels = [
    {
      id: 1,
      title: "Information Basics",
      difficulty: "Beginner",
      description:
        "Learn the fundamentals of identifying reliable information sources",
      topics: [
        "Source credibility",
        "Fact vs. opinion",
        "Primary vs. secondary sources",
      ],
      unlocked: true,
      completed: false,
      score: 95,
    },
    {
      id: 2,
      title: "Digital Footprints",
      difficulty: "Beginner",
      description: "Understand how your digital activities leave traces online",
      topics: ["Privacy settings", "Data tracking", "Digital identity"],
      unlocked: true,
      completed: true,
      score: 87,
    },
    {
      id: 3,
      title: "Misinformation Detection",
      difficulty: "Intermediate",
      description: "Develop skills to identify false or misleading information",
      topics: ["Fake news", "Deepfakes", "Verification techniques"],
      unlocked: true,
      completed: false,
      score: null,
    },
    {
      id: 4,
      title: "Social Media Literacy",
      difficulty: "Intermediate",
      description: "Navigate social media platforms responsibly and critically",
      topics: ["Algorithm awareness", "Echo chambers", "Engagement tactics"],
      unlocked: true,
      completed: false,
      score: null,
    },
    {
      id: 5,
      title: "Advanced Fact-Checking",
      difficulty: "Advanced",
      description: "Master professional fact-checking techniques and tools",
      topics: [
        "Cross-referencing",
        "Expert verification",
        "Statistical analysis",
      ],
      unlocked: false,
      completed: false,
      score: null,
    },
    {
      id: 6,
      title: "Media Creation Ethics",
      difficulty: "Advanced",
      description: "Learn ethical considerations in creating and sharing media",
      topics: ["Copyright law", "Fair use", "Attribution", "Consent"],
      unlocked: false,
      completed: false,
      score: null,
    },
  ];

  const onclickHandler = (id) => {
    if (id === 1) navigate("/game/1");
    else alert("Game not available yet!");
  };

  return (
    <div
      style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}
    >
      <ParticleBackground />

      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Learning Levels</h1>
          <p style={styles.subtitle}>
            Progress through your Media Information Literacy journey
          </p>
        </div>

        <div style={styles.levelsGrid}>
          {levels.map((level) => (
            <div
              key={level.id}
              style={{
                ...styles.levelCard,
                ...(level.unlocked ? {} : styles.lockedCard),
                ...(selectedLevel === level.id ? styles.selectedCard : {}),
              }}
              onClick={() =>
                level.unlocked &&
                setSelectedLevel(level.id === selectedLevel ? null : level.id)
              }
            >
              <div style={styles.levelHeader}>
                <h3 style={styles.levelTitle}>{level.title}</h3>
                <div
                  style={{
                    ...styles.difficultyBadge,
                    ...(level.difficulty === "Beginner"
                      ? styles.beginnerBadge
                      : level.difficulty === "Intermediate"
                      ? styles.intermediateBadge
                      : styles.advancedBadge),
                  }}
                >
                  {level.difficulty}
                </div>
              </div>

              <p style={styles.levelDescription}>{level.description}</p>

              <div style={styles.levelStatus}>
                {!level.unlocked && (
                  <span style={styles.lockedText}>🔒 Locked</span>
                )}
                {level.unlocked && level.completed && (
                  <span style={styles.completedText}>
                    ✅ Completed - Score: {level.score}%
                  </span>
                )}
                {level.unlocked && !level.completed && (
                  <span style={styles.availableText}>🎯 Available</span>
                )}
              </div>

              {selectedLevel === level.id && level.unlocked && (
                <div style={styles.levelDetails}>
                  <h4 style={styles.topicsTitle}>Topics covered:</h4>
                  <ul style={styles.topicsList}>
                    {level.topics.map((topic, index) => (
                      <li key={index} style={styles.topicItem}>
                        {topic}
                      </li>
                    ))}
                  </ul>
                  <button
                    style={{
                      ...styles.actionButton,
                      ...(level.completed
                        ? styles.reviewButton
                        : styles.startButton),
                    }}
                    onClick={() => {
                      onclickHandler(level.id);
                    }}
                  >
                    {level.completed ? "Review Level" : "Start Level"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={styles.progressSection}>
          <h2 style={styles.progressTitle}>Your Progress</h2>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${
                  (levels.filter((l) => l.completed).length / levels.length) *
                  100
                }%`,
              }}
            ></div>
          </div>
          <p style={styles.progressText}>
            {levels.filter((l) => l.completed).length} of {levels.length} levels
            completed
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    zIndex: 10,
    minHeight: "100vh",
    padding: "100px 20px 50px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "10px",
    background: "linear-gradient(45deg, #646cff, #88ccff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "white",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "rgba(255, 255, 255, 0.8)",
  },
  levelsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "20px",
    marginBottom: "50px",
  },
  levelCard: {
    background: "rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(10px)",
    borderRadius: "15px",
    padding: "25px",
    color: "white",
    cursor: "pointer",
    transition: "all 0.3s ease",
    border: "2px solid transparent",
  },
  lockedCard: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  selectedCard: {
    border: "2px solid #646cff",
    transform: "scale(1.02)",
  },
  levelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "15px",
  },
  levelTitle: {
    fontSize: "1.5rem",
    margin: 0,
    color: "#88ccff",
  },
  difficultyBadge: {
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: "bold",
  },
  beginnerBadge: {
    backgroundColor: "#4ade80",
    color: "#000",
  },
  intermediateBadge: {
    backgroundColor: "#fbbf24",
    color: "#000",
  },
  advancedBadge: {
    backgroundColor: "#f87171",
    color: "#000",
  },
  levelDescription: {
    fontSize: "1rem",
    lineHeight: "1.5",
    marginBottom: "15px",
    opacity: 0.9,
  },
  levelStatus: {
    marginBottom: "15px",
  },
  lockedText: {
    color: "#9ca3af",
    fontSize: "0.9rem",
  },
  completedText: {
    color: "#4ade80",
    fontSize: "0.9rem",
    fontWeight: "bold",
  },
  availableText: {
    color: "#fbbf24",
    fontSize: "0.9rem",
    fontWeight: "bold",
  },
  levelDetails: {
    marginTop: "20px",
    paddingTop: "20px",
    borderTop: "1px solid rgba(255, 255, 255, 0.2)",
  },
  topicsTitle: {
    fontSize: "1.1rem",
    marginBottom: "10px",
    color: "#ffd1a8",
  },
  topicsList: {
    listStyle: "none",
    padding: 0,
    marginBottom: "20px",
  },
  topicItem: {
    padding: "5px 0",
    fontSize: "0.9rem",
    opacity: 0.8,
  },
  actionButton: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  startButton: {
    backgroundColor: "#646cff",
    color: "white",
  },
  reviewButton: {
    backgroundColor: "#4ade80",
    color: "#000",
  },
  progressSection: {
    background: "rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(10px)",
    borderRadius: "15px",
    padding: "30px",
    textAlign: "center",
    color: "white",
  },
  progressTitle: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#88ccff",
  },
  progressBar: {
    width: "100%",
    height: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "10px",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #646cff, #88ccff)",
    transition: "width 0.5s ease",
  },
  progressText: {
    fontSize: "1.1rem",
    opacity: 0.9,
  },
};

export default Levels;
