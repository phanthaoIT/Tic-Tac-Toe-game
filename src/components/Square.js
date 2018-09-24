import React from 'react'

class Square extends React.Component {
    render() {
        const squareClass = `square ${this.props.winner}`;
        return(
            <button className={squareClass} onClick={this.props.onClick}>{this.props.value}</button>
        );
    }
}
export default Square