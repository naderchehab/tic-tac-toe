/**
 * @jsx React.DOM
 */
Board = React.createClass({
    render: function () {
        var rows = [];

        for (var i = 0; i < this.props.boardWidth; i++) {
            rows.push(<Row boardWidth={this.props.boardWidth} rowNum={i} />);
        }

        return (
            <table>
                {rows}
            </table>
        );
    },
    componentDidMount: function() {
        var board = new TicTacToe.Board();
        var boardView = new TicTacToe.BoardView({model: board});
    }
});

React.renderComponent(
    <Board boardWidth={TicTacToe.Constants.boardWidth}/>,
    document.getElementById('board')
);