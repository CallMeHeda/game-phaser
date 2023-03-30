import React, { useEffect } from "react";
import game from "../configGame";

const SmurfGame: React.FC<{}> = () => {
  useEffect(() => {
    return () => {
      game.destroy(false);
    };
  }, []);

  return <div className="SmurfGame"></div>;
};

export default SmurfGame;
