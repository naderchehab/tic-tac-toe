/**
 * @jsx React.DOM
 */
Boggle = React.createClass({
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
    }
});

React.renderComponent(
    <Boggle boardWidth={3} />,
    document.getElementById('board')
);