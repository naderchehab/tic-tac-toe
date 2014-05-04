$(function () {
    "use strict";

    TicTacToe.AlphaBetaStrategy = function () {

        var getScore = function (move, xMarks, oMarks, currentPlayer, isMe, boardWidth, winnerPatterns, depth, alpha, beta) {

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
                        var i;

                        for (i = 0; i < legalMoves.length; i++) {
                        alpha = Math.max(alpha, getScore(legalMoves[i], xMarks, oMarks, currentPlayer == "x" ? "o" : "x", false, boardWidth, winnerPatterns, depth + 1, alpha, beta));

                        if (beta > alpha) {
                            break;
                        }
                    }
                    return alpha;
                }
                else {
                    for (i = 0; i < legalMoves.length; i++) {
                        beta = Math.min(beta, getScore(legalMoves[i], xMarks, oMarks, currentPlayer == "x" ? "o" : "x", true, boardWidth, winnerPatterns, depth + 1, alpha, beta));

                        if (beta > alpha) {
                            break;
                        }
                    }

                    return beta;
                }
            }
        };

        return {
            getMove: function (legalMoves, xMarks, oMarks, boardWidth, winnerPatterns, currentPlayer) {
                var bestScore = -100, bestMove = 0;

                _.each(legalMoves, function (value) {
                    var score = getScore(value, xMarks, oMarks, currentPlayer == "x" ? "o" : "x", true, boardWidth, winnerPatterns, 0, -100, 100);

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