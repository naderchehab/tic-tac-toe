TicTacToe.ReinforcementLearningStrategy = function () {

    var states = JSON.parse(localStorage.getItem("tic-tac-toe-states")) || {};
    var STEP_SIZE = 0.8;
    var numTrainingGames = 100000;
    var explorationRatio = 0.4;
    var debug = false;
    var previousState;

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
            if (debug) {
                console.log(state, states[state]);
            }
        });

        if (model.get("currentPlayer") === "x") {
            bestState = _.maxBy(nextStates, function(s) { return (states[s] && states[s].value) || 0; });
        }
        else {
            bestState = _.minBy(nextStates, function(s) { return (states[s] && states[s].value) || 0; });   
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

        if (debug) {
            console.log(move);
        }

        return move;
    }

    function train(model) {

        debug = false;

        states = {};

        for (var i = 0; i < numTrainingGames; i++) {
            _playOneGame(model);
            model.clear();
        }

        localStorage.setItem("tic-tac-toe-states", JSON.stringify(states));

        console.log("Number of states:", Object.keys(states).length);
    }

    function _playOneGame(model) {
        model.clear();

        while (model.get("gameEnded") === false) {
            _play(model);
            _recordState(model);
            model.nextPlayer();
        }
    }

    function _play(model) {
        var isExploration = Math.random() < explorationRatio;
        var cellNumber = getMove(model);

        if (!cellNumber || isExploration) {
            cellNumber = TicTacToe.RandomStrategy.getMove(model);
        }

        model.markCell(cellNumber);
    }

    function _recordState(model) {
        var xMarks = model.get("xMarks");
        var oMarks = model.get("oMarks");
        var currentPlayer = model.get("currentPlayer");
        var currentState =  xMarks + "-" + oMarks;
        states[currentState] = states[currentState] || {visits: 0, value: 0};

        if (model.checkWin()) {
            if (currentPlayer === "x") {
                states[currentState].value = 100;
            }
            else {
                states[currentState].value = -100;
            }
        }

        // Temporal Difference (TD) Learning
        if (previousState) {
            states[previousState].visits++;
            states[previousState].value = states[previousState].value + (STEP_SIZE/states[previousState].visits) * (states[currentState].value - states[previousState].value);
        }
        
        if (model.getLegalMoves().length === 0) {
            model.set("gameEnded", true);
            previousState = undefined;
        }
        else {
            previousState = currentState;
        }
    }

    return {
        getMove: getMove,
        train: train
    };
}();
