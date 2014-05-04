$(function () {

    var board = new TicTacToe.Board();
    var move = 128;
    board.set("xMarks", 25);
    board.set("oMarks", 68);
    board.set("currentPlayer", "o");

    var score = TicTacToe.MiniMaxStrategy.getScore(move, board.get("xMarks"), board.get("oMarks"), board.get("currentPlayer"), true, board.get("boardWidth"), board.get("winnerPatterns"), 0);
    console.log(score);
});