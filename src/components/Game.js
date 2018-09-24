import React from 'react'
import Board from './Board'

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winnerPlayer: squares[a],
        winnerLocation: [a,b,c]
      }
    }
  }
  return null;
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          location: ''
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      sort:false
    };
  }
  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const matrixSize = Math.sqrt(history[0].squares.length);
    const location = [(i % matrixSize) + 1, Math.floor(i / matrixSize) + 1].join(", ");
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        location: location,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }
  Sort(sort) {
      this.setState({
        sort:!sort
      })
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ?
        `Go to move #${move} (${step.location})` :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner.winnerPlayer;
    }else if(this.state.stepNumber === 9){
      status = "No one win"
    }else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            winner={winner && winner.winnerLocation}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.Sort(this.state.sort)}>Sort</button>
          <ol reversed={this.state.sort ? 'Sort' :'' }>{this.state.sort ? moves.reverse() : moves}</ol>
        </div>
      </div>
    );
  }
}
export default Game