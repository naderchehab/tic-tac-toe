$(function () {
    "use strict";

    TicTacToe.Board = Backbone.Model.extend({
        defaults: {
            strategy: TicTacToe.Strategies["MiniMaxStrategy"],  // The strategy that the computer will use to play
            oMarks: 0,
            xMarks: 0,
            boardWidth: 3,
            gameEnded: false,
            currentPlayer: "x",
            winnerPatterns: [
                "111" +
                "000" +
                "000",

                "000" +
                "111" +
                "000",

                "000" +
                "000" +
                "111",

                "100" +
                "100" +
                "100",

                "010" +
                "010" +
                "010",

                "001" +
                "001" +
                "001",

                "100" +
                "010" +
                "001",

                "001" +
                "010" +
                "100"]
        }
    });
});