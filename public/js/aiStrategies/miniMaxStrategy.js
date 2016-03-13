"use strict";

TicTacToe.MiniMaxStrategy = function () {

    var getMove = function (xMarks, oMarks, boardWidth, winningPatterns, currentPlayer) {
        var bestScore = -100, bestMove = 0;

        var legalMoves = TicTacToe.Utils.getLegalMoves(xMarks, oMarks, boardWidth);

        _.each(legalMoves, function (value) {
            var score = getScore(value, xMarks, oMarks, currentPlayer, false, boardWidth, winningPatterns, 0);

            if (score > bestScore) {
                bestScore = score;
                bestMove = value;
            }
        });

        return bestMove;
    }

    var getScore = function (move, xMarks, oMarks, currentPlayer, isMax, boardWidth, winningPatterns, depth) {

        if (currentPlayer == "x") {
            xMarks = xMarks | move;
        }
        else {
            oMarks = oMarks | move;
        }

        if (TicTacToe.Utils.isTerminal(winningPatterns, xMarks, oMarks, boardWidth)) {
            return TicTacToe.Utils.getTerminalScore(xMarks, oMarks, isMax, winningPatterns, depth);
        }
        else {

            var legalMoves = TicTacToe.Utils.getLegalMoves(xMarks, oMarks, boardWidth);
            currentPlayer = currentPlayer == "x" ? "o" : "x";

            if (isMax) {
                var bestScore = -100, i;

                for (i = 0; i < legalMoves.length; i++) {
                    bestScore = Math.max(bestScore, getScore(legalMoves[i], xMarks, oMarks, currentPlayer, false, boardWidth, winningPatterns, depth + 1));
                }
                return bestScore;
            }
            else {
                var worstScore = 100;

                for (i = 0; i < legalMoves.length; i++) {
                    worstScore = Math.min(worstScore, getScore(legalMoves[i], xMarks, oMarks, currentPlayer, true, boardWidth, winningPatterns, depth + 1));
                }
                return worstScore;
            }
        }
    };

    return {
        getMove: getMove
    }
}();