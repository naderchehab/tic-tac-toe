/**
 * @jsx React.DOM
 */
var Row = React.createClass({
    render: function() {
        var cells = [];
        var start = this.props.rowNum * this.props.boardWidth;
        for (var i = start; i < start + this.props.boardWidth; i++) {
            cells.push(<td id={"cell" + Math.pow(2, i)} />);
        }

        return (
            <tr>
                {cells}
            </tr>
            );
    }
});