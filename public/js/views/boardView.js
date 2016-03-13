"use strict";

TicTacToe.BoardView = Backbone.View.extend({
    el: $("#tic-tac-toe"),
    initialize: function () {
        _.bindAll(this, "render", "cellClick", "playComputer");
        this.render();
    },
    events: {
        "click td": "cellClick",
        "click #playComputer": "playComputer",
        "click #trainComputer": "trainComputer"
    },
    render: function () {
        return this; // for chainable calls, like .render().el
    },
    cellClick: function (e) {
        var model = this.model;
        var element = $(e.currentTarget);
        var id = element.attr("id");
        var cellNumber = id.replace("cell", "");
        var currentPlayer = model.get("currentPlayer");
        var playerMarks = currentPlayer + "Marks";

        if (!model.get("gameEnded") && cellNumber != (cellNumber & model.get("xMarks")) && cellNumber != (cellNumber & model.get("oMarks"))) {
            model.set(playerMarks, model.get(playerMarks) | cellNumber);
            element.append(currentPlayer.toUpperCase());

            if (model.checkWin()) {
                alert(currentPlayer + " wins!");
                model.set("gameEnded", true);
                return;
            }

            model.nextPlayer();

            this.playComputer();
        }
    },
    trainComputer: function() {
        var strategy = TicTacToe.Strategies[TicTacToe.Constants.strategy];
        console.log("Computer training...");
        strategy.train(this.model);
        console.log("Computer done training.");
    },
    playComputer: function() {
        console.log("Computer playing...");
        var model = this.model;
        var strategy = TicTacToe.Strategies[TicTacToe.Constants.strategy];
        var cellNumber = strategy.getMove(model);

        if (!cellNumber) {
            return;
        }
        
        model.markCell(cellNumber);

        this.$el.find("#cell" + cellNumber).text(model.get("currentPlayer").toUpperCase());

        if (model.checkWin()) {
            alert(model.get("currentPlayer") + " wins!");
            model.set("gameEnded", true);
            return;
        }

        model.nextPlayer();
        console.log("Computer done playing.");
    }
});
