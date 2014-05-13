$(function () {
    "use strict";

    TicTacToe.MonteCarloStrategy = function () {

        var getMove = function (xMarks, oMarks, boardWidth, winnerPatterns, currentPlayer) {
            var bestScore = -100, bestMove = 0;

            var legalMoves = TicTacToe.Utils.getLegalMoves(xMarks, oMarks, boardWidth);

            _.each(legalMoves, function (value) {
                var score = getScore(value, xMarks, oMarks, currentPlayer, false, boardWidth, winnerPatterns, 0, 5);

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = value;
                }
            });

            return bestMove;
        };

        var getScore = function (move, xMarks, oMarks, currentPlayer, isMax, boardWidth, winnerPatterns, depth, maxDepth) {
            var bestScore = 0, worstScore = 100, i, legalMoves;

            if (currentPlayer == "x") {
                xMarks = xMarks | move;
            }
            else {
                oMarks = oMarks | move;
            }

            if (TicTacToe.Utils.isTerminal(winnerPatterns, xMarks, oMarks, boardWidth)) {
                return TicTacToe.Utils.getTerminalScore(xMarks, oMarks, isMax, winnerPatterns, depth);
            }
            else if (depth > maxDepth) {
                return getMonteCarloScore(xMarks, oMarks, currentPlayer, false, boardWidth, winnerPatterns, depth);
            }
            else {
                legalMoves = TicTacToe.Utils.getLegalMoves(xMarks, oMarks, boardWidth);
                currentPlayer = currentPlayer == "x" ? "o" : "x";

                if (isMax) {

                    _.each(legalMoves, function (value) {
                        bestScore = Math.max(bestScore, getScore(value, xMarks, oMarks, currentPlayer, false, boardWidth, winnerPatterns, depth + 1, maxDepth));
                    });

                    return bestScore;
                }
                else {

                    _.each(legalMoves, function (value) {
                        worstScore = Math.min(worstScore, getScore(value, xMarks, oMarks, currentPlayer, true, boardWidth, winnerPatterns, depth + 1, maxDepth));
                    });

                    return worstScore;
                }
            }
        };

        var getMonteCarloScore = function (xMarks, oMarks, currentPlayer, isMax, boardWidth, winnerPatterns, depth) {
            var scoreSum = 0;

            for (var i = 0; i < 100; i++) {
                scoreSum += gotoTerminal(xMarks, oMarks, currentPlayer, winnerPatterns, boardWidth, isMax, depth);
            }
            return scoreSum / 100;
        }

        var gotoTerminal = function(xMarks, oMarks, currentPlayer, winnerPatterns, boardWidth, isMax, depth) {

            if (TicTacToe.Utils.isTerminal(winnerPatterns, xMarks, oMarks, boardWidth)) {
                return TicTacToe.Utils.getTerminalScore(xMarks, oMarks, isMax, winnerPatterns, depth);
            }
            else {
                var legalMoves = TicTacToe.Utils.getLegalMoves(xMarks, oMarks, boardWidth);
                var move = legalMoves[_.random(0, legalMoves.length-1)];

                currentPlayer = currentPlayer == "x" ? "o" : "x";

                if (currentPlayer == "x") {
                    xMarks = xMarks | move;
                }
                else {
                    oMarks = oMarks | move;
                }

                return gotoTerminal(xMarks, oMarks, currentPlayer, winnerPatterns, boardWidth, !isMax, depth + 1);
            }
        }

        return {
            "getMove": getMove
        }
    }();
});