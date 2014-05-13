$(function () {
    "use strict";

    TicTacToe.Strategies = function () {
        return {
            "RandomStrategy": TicTacToe.RandomStrategy,
            "MiniMaxStrategy": TicTacToe.MiniMaxStrategy,
            "BoundedMiniMaxStrategy": TicTacToe.BoundedMiniMaxStrategy,
            "AlphaBetaStrategy": TicTacToe.AlphaBetaStrategy,
            "MonteCarloStrategy": TicTacToe.MonteCarloStrategy
        };
    }();
});