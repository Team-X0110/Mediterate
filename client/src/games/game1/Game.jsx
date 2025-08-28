import React from "react";
import Scene from "./components/Scene";
import Player from "./components/Player";
import Map from "./components/Map";
import Controls from "./components/control/Controls";
import "./Game.css";
import { Score } from "./components/score/Score";
import { Result } from "./components/result/Result";

const Game = () => {
  return (
    <div className="game">
      <Scene>
        <Player />
        <Map />
      </Scene>
      <Score />
      <Controls />
      <Result />
    </div>
  );
};

export default Game;
