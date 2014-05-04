$(function () {
    "use strict";

    TicTacToe.AlphaBetaStrategy = function () {

        var getScore = function (move, xMarks, oMarks, currentPlayer, isMax, boardWidth, winnerPatterns, depth, alpha, beta) {

            if (currentPlayer == "x") {
                xMarks = xMarks | move;
            }
            else {
                oMarks = oMarks | move;
            }

            if (TicTacToe.Utils.isTerminal(winnerPatterns, xMarks, oMarks, boardWidth)) {
                return TicTacToe.Utils.getTerminalScore(xMarks, oMarks, isMax, winnerPatterns, depth);
            }
            else {

                var legalMoves = TicTacToe.Utils.getLegalMoves(xMarks, oMarks, boardWidth);
                currentPlayer = currentPlayer == "x" ? "o" : "x";

                if (isMax) {
                    var i;

                    for (i = 0; i < legalMoves.length; i++) {
                        alpha = Math.max(alpha, getScore(legalMoves[i], xMarks, oMarks, currentPlayer, false, boardWidth, winnerPatterns, depth + 1, alpha, beta));

                        if (alpha > beta) {
                            break;
                        }
                    }
                    return alpha;
                }
                else {
                    for (i = 0; i < legalMoves.length; i++) {
                        beta = Math.min(beta, getScore(legalMoves[i], xMarks, oMarks, currentPlayer, true, boardWidth, winnerPatterns, depth + 1, alpha, beta));

                        if (alpha > beta) {
                            break;
                        }
                    }
                    return beta;
                }
            }
        };

        return {
            getScore: getScore,
            getMove: function (xMarks, oMarks, boardWidth, winnerPatterns, currentPlayer) {
                var bestScore = -100, bestMove = 0;

                var legalMoves = TicTacToe.Utils.getLegalMoves(xMarks, oMarks, boardWidth);

                _.each(legalMoves, function (value) {
                    var score = getScore(value, xMarks, oMarks, currentPlayer, false, boardWidth, winnerPatterns, 0, -1000, 1000);

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