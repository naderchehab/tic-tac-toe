$(function () {
    "use strict";

    TicTacToe.BoundedMiniMaxStrategy = function () {

        var getScore = function (move, xMarks, oMarks, currentPlayer, isMe, boardWidth, winnerPatterns, depth) {

            if (currentPlayer == "x") {
                xMarks = xMarks | move;
            }
            else {
                oMarks = oMarks | move;
            }

            if (TicTacToe.Utils.isTerminal(winnerPatterns, xMarks, oMarks, boardWidth)) {
                return TicTacToe.Utils.getTerminalScore(xMarks, oMarks, isMe, winnerPatterns, depth);
            }
            else {

                var legalMoves = TicTacToe.Utils.getLegalMoves(xMarks, oMarks, boardWidth);

                if (isMe) {
                    var bestScore = -100, i;

                    for (i = 0; i < legalMoves.length; i++) {
                        bestScore = Math.max(bestScore, getScore(legalMoves[i], xMarks, oMarks, currentPlayer == "x" ? "o" : "x", false, boardWidth, winnerPatterns, depth + 1));

                        if (bestScore == 100) {
                            break;
                        }
                    }
                    return bestScore;
                }
                else {
                    var worstScore = 100;

                    for (i = 0; i < legalMoves.length; i++) {
                        worstScore = Math.min(legalMoves[i], getScore(value, xMarks, oMarks, currentPlayer == "x" ? "o" : "x", true, boardWidth, winnerPatterns, depth + 1));

                        if (worstScore == -100) {
                            break;
                        }
                    }
                    return worstScore;
                }
            }
        };

        return {
            getMove: function (legalMoves, xMarks, oMarks, boardWidth, winnerPatterns, currentPlayer) {
                var bestScore = -100, bestMove = 0;

                _.each(legalMoves, function (value) {
                    var score = getScore(value, xMarks, oMarks, currentPlayer == "x" ? "o" : "x", true, boardWidth, winnerPatterns, 0);

                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = value;
                    }
                });

                return bestMove;
            }
        }
    }();
});