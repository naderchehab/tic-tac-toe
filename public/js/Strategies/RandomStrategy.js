var RandomStrategy = function() {
    return {
        getMove: function(legalMoves) {
            var rand = Math.floor(Math.random() * legalMoves.length);
            return legalMoves[rand];
        }
    }
}();
