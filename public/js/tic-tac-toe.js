"use strict";

$(function () {
    var Board = Backbone.Model.extend({
        defaults: {
            oMarks: 0,
            xMarks: 0,
            boardSize: 3,
            currentPlayer: "x",
            wins: [
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
        el: $("table"),
        initialize: function () {
            _.bindAll(this, "render", "markCell");
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
                $("tr").append("<td />");
            }

            $.each($("td"), function (i, e) {
                $(e).attr("id", "cell" + Math.pow(2, i));
            });

            return this; // for chainable calls, like .render().el
        },
        markCell: function(e) {
            var element = $(e.currentTarget);
            var id = element.attr("id");
            var cellNumber = id.replace("cell", "");
            var xMarks = this.model.get("xMarks");
            var oMarks = this.model.get("oMarks");
            var currentPlayer = this.model.get("currentPlayer");

            if ((cellNumber & xMarks) == cellNumber || (cellNumber & oMarks) == cellNumber) {
                console.log("Already set!");
            }
            else {
                this.model.set(currentPlayer + "Marks",  this.model.get(currentPlayer + "Marks") | cellNumber);
                element.append(currentPlayer.toUpperCase());
                this.model.set("currentPlayer", currentPlayer == "x" ? "o" : "x");
            }
        }
    });

    var board = new Board();
    var boardView = new BoardView({model: board});
});

