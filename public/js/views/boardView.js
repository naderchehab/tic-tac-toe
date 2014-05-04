$(function () {
    "use strict";

    TicTacToe.BoardView = Backbone.View.extend({
        el: $(".tic-tac-toe"),
        initialize: function () {
            _.bindAll(this, "render", "markCell", "playComputer");
            this.render();
        },
        events: {
            "click td": "markCell",
            "click #playComputer": "playComputer",
            "click #saveBoard": "saveBoard"
        },
        render: function () {
            var boardWidth = this.model.get("boardWidth");

            for (var i = 0; i < boardWidth; i++) {
                this.$el.find("table").append("<tr />");
            }

            for (var i = 0; i < boardWidth; i++) {
                this.$el.find("table tr").append("<td />");
            }

            $.each(this.$el.find("table td"), function (i, e) {
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

                if (TicTacToe.Utils.checkWin(this.model.get("winnerPatterns"), model.get("xMarks"), model.get("oMarks"))) {
                    alert(currentPlayer + " wins!");
                    model.set("gameEnded", true);
                    return;
                }

                model.set("currentPlayer", model.get("currentPlayer") == "x" ? "o" : "x");

                this.playComputer();

            }
        },
        playComputer: function() {
            console.log("Computer playing...");
            var model = this.model;
            var legalMoves = TicTacToe.Utils.getLegalMoves(model.get("xMarks"), model.get("oMarks"), model.get("boardWidth"));
            var cellNumber = this.model.get("strategy").getMove(legalMoves, model.get("xMarks"), model.get("oMarks"), model.get("boardWidth"), model.get("winnerPatterns"), model.get("currentPlayer"));
            model.set(model.get("currentPlayer") + "Marks", model.get(model.get("currentPlayer") + "Marks") | cellNumber);
            this.$el.find("#cell" + cellNumber).append(model.get("currentPlayer").toUpperCase());

            if (TicTacToe.Utils.checkWin(model.get("winnerPatterns"), model.get("xMarks"), model.get("oMarks"))) {
                alert(model.get("currentPlayer") + " wins!");
                model.set("gameEnded", true);
                return;
            }

            model.set("currentPlayer", model.get("currentPlayer") == "x" ? "o" : "x");
            console.log("Computer done playing.");
        },
        saveBoard: function() {
            var model = this.model;
            console.log(model.get("xMarks"), model.get("oMarks"));
        }
    });
});

