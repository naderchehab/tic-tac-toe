"use strict";

TicTacToe.AlphaBetaStrategy = function () {

    var getTerminalScore = function (model, isMax, depth) {
        console.assert(typeof model === "object");
        console.assert(typeof isMax === "boolean");
        console.assert(typeof depth === "number");

        var isWin = model.checkWin();

        if (isWin) {
            return isMax ? depth - 100 : 100 - depth;
        }

        return 0;
    }

    var getScore = function (move, modeli, isMax, depth, alpha, beta) {

        var legalMoves;
        var i;

        console.assert(typeof move === "number");
        console.assert(typeof modeli === "object");
        console.assert(typeof isMax === "boolean");
        console.assert(typeof depth === "number");
        console.assert(typeof alpha === "number");
        console.assert(typeof beta === "number");

        var model = modeli.clone();

        if (model.get("currentPlayer") === "x") {
            model.set("xMarks", model.get("xMarks") | move);
        }
        else {
            model.set("oMarks", model.get("oMarks") | move);
        }

        if (model.isTerminal()) {
            return getTerminalScore(model, isMax, depth);
        }

        model.nextPlayer();
        legalMoves = model.getLegalMoves();

        if (isMax) {
            for (i = 0; i < legalMoves.length; i++) {
                alpha = Math.max(alpha, getScore(legalMoves[i], model, false, depth + 1, alpha, beta));

                if (alpha > beta) {
                    break;
                }
            }
            return alpha;
        }

        for (i = 0; i < legalMoves.length; i++) {
            beta = Math.min(beta, getScore(legalMoves[i], model, true, depth + 1, alpha, beta));

            if (alpha > beta) {
                break;
            }
        }
        return beta;
    };

    var getMove = function (model) {
        var bestScore = -100, bestMove = 0, legalMoves;

        console.assert(typeof model === "object");

        legalMoves = model.getLegalMoves();

        _.each(legalMoves, function (move) {
            var score = getScore(move, model, false, 0, -1000, 1000);

            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        });

        return bestMove;
    }

    return {
        getMove: getMove,
        getScore: getScore
    }
}();
