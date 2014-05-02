"use strict";

$(function () {
    var Board = Backbone.Model.extend({
        defaults: {
            oMarks: 0,
            xMarks: 0,
            boardSize: 3,
            gameEnded: false,
            currentPlayer: "x",
            winnerPatterns: [
                "111" +
                "000" +
                "000",

                "000" +
                "111" +
                "000",

                "000" +
                "000" +
                "111",

                "100" +
                "100" +
                "100",

                "010" +
                "010" +
                "010",

                "001" +
                "001" +
                "001",

                "100" +
                "010" +
                "001",

                "001" +
                "010" +
                "100"]
        }
    });

    var BoardView = Backbone.View.extend({
        el: $("table.board"),
        initialize: function () {
            _.bindAll(this, "render", "markCell", "checkWin", "getLegalMoves", "getComputerMove");
            this.render();
        },
        events: {
            "click td": "markCell"
        },
        render: function () {
            var boardSize = this.model.get("boardSize");

            for (var i = 0; i < boardSize; i++) {
                $(this.el).append("<tr />");
            }

            for (var i = 0; i < boardSize; i++) {
                $(this.el).find("tr").append("<td />");
            }

            $.each($(this.el).find("td"), function (i, e) {
                $(e).attr("id", "cell" + Math.pow(2, i));
            });

            return this; // for chainable calls, like .render().el
        },
        markCell: function (e) {
            var model = this.model;
            var element = $(e.currentTarget);
            var id = element.attr("id");
            var cellNumber = id.replace("cell", "");
            var currentPlayer = model.get("currentPlayer");
            var playerMarks = currentPlayer + "Marks";

            if (!model.get("gameEnded") && cellNumber != (cellNumber & model.get("xMarks")) && cellNumber != (cellNumber & model.get("oMarks"))) {
                model.set(playerMarks, model.get(playerMarks) | cellNumber);
                element.append(currentPlayer.toUpperCase());

                if (this.checkWin(currentPlayer)) {
                    return;
                }

                model.set("currentPlayer", "o");
                currentPlayer = model.get("currentPlayer");
                playerMarks = currentPlayer + "Marks";
                var cellNumber = this.getComputerMove(model.get("xMarks"), model.get("oMarks"));
                model.set(playerMarks, model.get(playerMarks) | cellNumber);
                $(this.el).find("#cell" + cellNumber).append(currentPlayer.toUpperCase());
                this.checkWin(currentPlayer);
                model.set("currentPlayer", "x");
            }
        },
        checkWin: function(currentPlayer) {
            var model = this.model;
            $.each(model.get("winnerPatterns"), function (index, value) {
                var winnerPattern = parseInt(value, 2);
                if ((winnerPattern & model.get("xMarks")) == winnerPattern || (winnerPattern & model.get("oMarks")) == winnerPattern) {
                    alert(currentPlayer + " wins!");
                    model.set("gameEnded", true);
                }
            });
            return model.get("gameEnded");
        },
        getComputerMove: function (xMarks, oMarks) {
            var legalMoves = this.getLegalMoves(xMarks, oMarks);
            var rand = Math.floor(Math.random() * (legalMoves.length + 1));
            return legalMoves[rand];
        },
        getLegalMoves: function (xMarks, oMarks) {
            var model = this.model;
            var validCells = [];
            var numCells = model.get("boardSize") * model.get("boardSize");
            for (var i = 0; i < numCells; i++) {
                var cellNumber = Math.pow(2, i);

                if (cellNumber != (cellNumber & xMarks) && cellNumber != (cellNumber & oMarks)) {
                    validCells.push(cellNumber);
                }
            }
            return validCells;
        }
    });

    var board = new Board();
    var boardView = new BoardView({model: board});
});

