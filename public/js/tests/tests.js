$(function () {

    var board = new TicTacToe.Board();

    var move = 16;
    board.set("xMarks", 321);
    board.set("oMarks", 10);
    board.set("currentPlayer", "o");

    var score = TicTacToe.MiniMaxStrategy.getScore(move, board.get("xMarks"), board.get("oMarks"), board.get("currentPlayer"), true, board.get("boardWidth"), board.get("winnerPatterns"), 0);
    console.log("16:", score);


    move = 128;
    board.set("xMarks", 321);
    board.set("oMarks", 10);
    board.set("currentPlayer", "o");

    score = TicTacToe.MiniMaxStrategy.getScore(move, board.get("xMarks"), board.get("oMarks"), board.get("currentPlayer"), true, board.get("boardWidth"), board.get("winnerPatterns"), 0);
    console.log("128:", score);
});