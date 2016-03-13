TicTacToe.Constants = function () {
    "use strict";

    return {
        strategy: "ReinforcementLearningStrategy",  // The strategy that the computer will use to play
        //strategy: "AlphaBetaStrategy",  // The strategy that the computer will use to play
        boardWidth: 3,
        winningPatterns: [
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
            "100"
        ]
    }
}();