TicTacToe.Utils = function () {
    "use strict";

    return {
        getLegalMoves: function (xMarks, oMarks, boardWidth) {
            var validCells = [];
            var boardSize = Math.pow(boardWidth, 2);

            for (var i = 0; i < boardSize; i++) {
                var cellNumber = Math.pow(2, i);

                // Blank cells are valid
                if (cellNumber != (cellNumber & xMarks) && cellNumber != (cellNumber & oMarks)) {
                    validCells.push(cellNumber);
                }
            }

            return validCells;
        },
        checkWin: function(winnerPatterns, xMarks, oMarks) {
            var isWin = false;

            _.each(winnerPatterns, function (value) {
                var winnerPattern = parseInt(value, 2);
                if ((winnerPattern & xMarks) == winnerPattern || (winnerPattern & oMarks) == winnerPattern) {
                    isWin = true;
                }
            });

            return isWin;
        },
        isTerminal: function(winnerPatterns, xMarks, oMarks, boardWidth) {
            return this.getLegalMoves(xMarks, oMarks, boardWidth).length == 0 || this.checkWin(winnerPatterns, xMarks, oMarks);
        },
        getTerminalScore: function (xMarks, oMarks, isMax, winnerPatterns, depth) {
            var isWin = this.checkWin(winnerPatterns, xMarks, oMarks);

            if (isWin) {
                return isMax ? depth - 100 : 100 - depth;
            }

            return 0;
        }
    }
}();