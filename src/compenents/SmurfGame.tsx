import React, { useEffect } from "react";
// import Phaser from "phaser";
import game from "../configGame";
// const sky = require('../assets/images/sky.png');

const SmurfGame: React.FC<{}> = () => {
    useEffect(() => {
    return () => {
      game.scene.start('default');
    };
  }, []);

  return <div className="SmurfGame">
    </div>;
};

export default SmurfGame;
