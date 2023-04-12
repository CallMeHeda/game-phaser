import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
// import Phaser from "phaser";
import game from "../configGame";
// const sky = require('../assets/images/sky.png');
var SmurfGame = function () {
    useEffect(function () {
        return function () {
            game.scene.start('default');
        };
    }, []);
    return _jsx("div", { className: "SmurfGame" });
};
export default SmurfGame;
