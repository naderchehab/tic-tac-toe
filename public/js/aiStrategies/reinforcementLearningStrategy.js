TicTacToe.ReinforcementLearningStrategy = function () {

    var states = JSON.parse(localStorage.getItem("tic-tac-toe-states")) || {};
    var STEP_SIZE = 0.1;
    var numTrainingGames = 50000;

    function getMove(model) {
        var legalMoves = model.getLegalMoves();
        var tmpModel;
        var xMarks;
        var oMarks;
        var nextState;
        var state;
        var bestState;
        var stateArray;
        var nextStates = [];
        var move;

        legalMoves.forEach(function(move) {
            tmpModel = model.clone();
            tmpModel.markCell(move);
            xMarks = tmpModel.get("xMarks");
            oMarks = tmpModel.get("oMarks");
            state = xMarks + "-" + oMarks;
            nextStates.push(state);
            console.log(state, states[state]);
        });

        if (model.get("currentPlayer") === "x") {
            bestState = _.maxBy(nextStates, function(s) { return states[s]; });
        }
        else {
            bestState = _.minBy(nextStates, function(s) { return states[s]; });   
        }
        
        if (!bestState) {
            return undefined;
        }

        stateArray = bestState.split("-");

        if (model.get("currentPlayer") === "x") {
            nextState = parseInt(stateArray[0], 10);
        }
        else {
            nextState = parseInt(stateArray[1], 10);
        }
        move = nextState - model.get(model.get("currentPlayer") + "Marks");

        console.log(move);

        return move;
    }

    function train(model) {

        for (var i = 0; i < numTrainingGames; i++) {
            _playOneGame(model);
            model.clear();
        }

        localStorage.setItem("tic-tac-toe-states", JSON.stringify(states));

        console.log("Number of states:", Object.keys(states).length);
    }

    function _playOneGame(model) {
        model.clear();
        var stateHistory = [];

        for (var i = 0; i < 9; i++) {
            _play(model);
            _recordState(model, stateHistory);
            model.nextPlayer();
        }
    }

    function _play(model) {
        var isExploration = Math.random() > 0.5;
        var cellNumber = getMove(model);

        if (!cellNumber || isExploration) {
            cellNumber = TicTacToe.RandomStrategy.getMove(model);
        }

        model.markCell(cellNumber);
    }

    function _recordState(model, stateHistory) {
        var xMarks = model.get("xMarks");
        var oMarks = model.get("oMarks");
        var currentPlayer = model.get("currentPlayer");
        var currentState =  xMarks + "-" + oMarks;
        var previousState;

        if (model.checkWin()) {
            states[currentState] = currentPlayer === "x" ? 1 : -1;

            // TD
            while (stateHistory.length > 0) {
                previousState = stateHistory.pop();
                states[previousState] += STEP_SIZE * (states[currentState] - states[previousState]);
                currentState = previousState;
            }
        }
        else {
            states[currentState] = states[currentState] ? states[currentState] : 0;
            stateHistory.push(currentState);
        }       
    }

    return {
        getMove: getMove,
        train: train
    };
}();
