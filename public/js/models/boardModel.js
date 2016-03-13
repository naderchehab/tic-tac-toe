"use strict";

TicTacToe.Board = Backbone.Model.extend({
    defaults: {
        oMarks: 0,
        xMarks: 0,
        gameEnded: false,
        currentPlayer: "x"
    },
    markCell: function(cellNumber) {
        if (typeof cellNumber !== "number") { debugger; }
        var marks = this.get("currentPlayer")  + "Marks";
        this.set(marks, this.get(marks) | cellNumber);
    },
    nextPlayer: function() {
        this.set("currentPlayer", this.get("currentPlayer") === "x" ? "o" : "x");
    },
    clear: function() {
        this.set("xMarks", 0);
        this.set("oMarks", 0);
        this.set("gameEnded", false);
        this.set("currentPlayer", "x");
    },
    getLegalMoves: function () {
        var xMarks = this.get("xMarks");
        var oMarks = this.get("oMarks");
        var boardWidth = TicTacToe.Constants.boardWidth;
        var validCells = [];
        var cellNumber;

        for (cellNumber = 1; cellNumber < Math.pow(2, boardWidth*boardWidth); cellNumber*=2) {

            // Blank cells are valid
            if (cellNumber !== (cellNumber & xMarks) && cellNumber !== (cellNumber & oMarks)) {
                validCells.push(cellNumber);
            }
        }

        return validCells;
    },
    checkWin: function() {
        var xMarks = this.get("xMarks");
        var oMarks = this.get("oMarks");
        var isWin = TicTacToe.Constants.winningPatterns.some(function (value) {
            var winningPattern = parseInt(value, 2);
            if ((winningPattern & xMarks) === winningPattern || (winningPattern & oMarks) === winningPattern) {
                 return true;
            }
            return false;
        });

        return isWin;
    },
    isTerminal: function() {
        return this.getLegalMoves().length == 0 || this.checkWin();
    }
});