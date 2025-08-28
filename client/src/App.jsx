// import "./App.css";
// import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Levels from "./pages/Levels";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Game1 from "./pages/Game1";
import DefaultLayout from "./layouts/DefaultLayout";
import GameLayout from "./layouts/GameLayout";
import { Suspense } from "react";
import { useEffect } from "react";

function ReloadOnGameRoute() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/game")) {
      // Prevent infinite reload loop by checking a flag
      if (!sessionStorage.getItem("gameReloaded")) {
        sessionStorage.setItem("gameReloaded", "true");
        window.location.reload();
      }
    } else {
      // Reset flag when user leaves game routes
      sessionStorage.removeItem("gameReloaded");
      // window.location.reload();
    }
  }, [location]);

  return null; // this component doesn’t render anything
}

function App() {
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.startsWith("/game")) {
      import("./index.css");
      import("./App.css");
    } else {
      const styles = document.querySelectorAll(
        'link[href*="index.css"], link[href*="App.css"]'
      );
      styles.forEach((s) => s.remove());
    }
  }, [location.pathname]);

  return (
    <>
      <ReloadOnGameRoute />

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

        {/* <Route
        path="/game/1"
        element={
          <GameLayout>
            <Game1 />
          </GameLayout>
        }
      /> */}

        <Route
          path="/game/1"
          element={
            <GameLayout>
              <Suspense fallback={<div>Loading game…</div>}>
                <Game1 />
              </Suspense>
            </GameLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
