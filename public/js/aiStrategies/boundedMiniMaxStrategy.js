$(function () {
    "use strict";

    TicTacToe.BoundedMiniMaxStrategy = function () {

        var getScore = function (move, xMarks, oMarks, currentPlayer, isMax, boardWidth, winnerPatterns, depth) {

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
                    var bestScore = -100, i;

                    for (i = 0; i < legalMoves.length; i++) {
                        bestScore = Math.max(bestScore, getScore(legalMoves[i], xMarks, oMarks, currentPlayer, false, boardWidth, winnerPatterns, depth + 1));

                        if (bestScore == 100) {
                            console.log("break best");
                            break;
                        }
                    }
                    return bestScore;
                }
                else {
                    var worstScore = 100;

                    for (i = 0; i < legalMoves.length; i++) {
                        worstScore = Math.min(worstScore, getScore(legalMoves[i], xMarks, oMarks, currentPlayer, true, boardWidth, winnerPatterns, depth + 1));

                        if (worstScore == -100) {
                            console.log("break worst");
                            break;
                        }
                    }
                    return worstScore;
                }
            }
        };

        return {
            getScore: getScore,
            getMove: function (xMarks, oMarks, boardWidth, winnerPatterns, currentPlayer) {
                var bestScore = -100, bestMove = 0;

                var legalMoves = TicTacToe.Utils.getLegalMoves(xMarks, oMarks, boardWidth);

                _.each(legalMoves, function (value) {
                    var score = getScore(value, xMarks, oMarks, currentPlayer, false, boardWidth, winnerPatterns, 0);
                    console.log("Score: ", score);

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