import React from 'react'
import Square from './Square'

class Board extends React.Component {
    renderSquare(i) {
      const winner = this.props.winner;
      return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} winner={winner && winner.includes(i) ? 'winner' : ''}/>
    }
    render() {
      const matrixSize = Math.sqrt(this.props.squares.length)
      const rows = Array(matrixSize).fill(null)
      const cols = rows
      const board = rows.map((row, i) => {
        const squares = cols.map((col, j) => {
          const squareKey = i * matrixSize + j;
            return <span key={squareKey}>{this.renderSquare(squareKey)}</span>
        })
        return <div className="board-row" key={i}>{squares}</div> 
      })
      return (
        <div>
          <div>{board}</div>
        </div>
      )
    }
}

export default Board