"use strict";

TicTacToe.RandomStrategy = function () {

    return {
        getMove: function (model) {
            var legalMoves = model.getLegalMoves();
            var move = _.sample(legalMoves);
            return move;
        }
    }
}();
