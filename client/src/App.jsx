import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Levels from "./pages/Levels";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Game1 from "./pages/Game1";
import DefaultLayout from "./layouts/DefaultLayout";
import GameLayout from "./layouts/GameLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout>
              <Home />
            </DefaultLayout>
          }
        />
        <Route
          path="/about"
          element={
            <DefaultLayout>
              <About />
            </DefaultLayout>
          }
        />
        <Route
          path="/levels"
          element={
            <DefaultLayout>
              <Levels />
            </DefaultLayout>
          }
        />
        <Route
          path="/login"
          element={
            <DefaultLayout>
              <Login />
            </DefaultLayout>
          }
        />

        {/* Game uses its own layout */}
        <Route
          path="/game/1"
          element={
            <GameLayout>
              <Game1 />
            </GameLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
