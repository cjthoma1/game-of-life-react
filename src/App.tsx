import React, { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board/Board';

function App() {
  const rowCount = 35;
  const columnCount = 35;
  const initialGameBoard = Array(columnCount).fill(null).map(() => Array(rowCount).fill(false))

  // Blinker
  initialGameBoard[1][4] = true;
  initialGameBoard[2][4] = true;
  initialGameBoard[3][4] = true;

  // Toad
  initialGameBoard[1][10] = true;
  initialGameBoard[1][11] = true;
  initialGameBoard[1][12] = true;
  initialGameBoard[2][9] = true;
  initialGameBoard[2][10] = true;
  initialGameBoard[2][11] = true;

  // Beacon
  initialGameBoard[6][10] = true;
  initialGameBoard[6][11] = true;
  initialGameBoard[7][10] = true;
  initialGameBoard[7][11] = true;
  initialGameBoard[8][12] = true;
  initialGameBoard[8][13] = true;
  initialGameBoard[9][12] = true;
  initialGameBoard[9][13] = true;

  // Glider

  initialGameBoard[18][18] = true;
  initialGameBoard[19][19] = true;
  initialGameBoard[20][19] = true;
  initialGameBoard[20][18] = true;
  initialGameBoard[20][17] = true;

  const [gameBoard, setgameBoard] = useState(initialGameBoard);

  useEffect(() => {
    setInterval(runGame, 500);
    return () => {}
  }, []);

  const changeTracker: Array<{ xAxis: number, yAxis: number, value: boolean }> = [];
  let populationCount: number;

  const setLife = (row: number, column: number, isAlive: boolean) => {
    let copy = [...gameBoard];
    copy[row][column] = isAlive;
    setgameBoard(copy);
  }

  const checkVertical = (posX: number, posY: number, board: Array<Array<boolean>>) => {
    if (board[posX + 1] && board[posX + 1][posY]) {
      ++populationCount;
    }

    if (board[posX - 1] && board[posX - 1][posY]) {
      ++populationCount;
    }
  }

  const checkHorizontal = (posX: number, posY: number, board: Array<Array<boolean>>) => {
    if (board[posX][posY + 1]) {
      ++populationCount;
    }

    if (board[posX][posY - 1]) {
      ++populationCount;
    }
  }

  const checkdiagonal = (posX: number, posY: number, board: Array<Array<boolean>>) => {
    if (board[posX - 1] && board[posX - 1][posY + 1]) {
      ++populationCount;
    }

    if (board[posX - 1] && board[posX - 1][posY - 1]) {
      ++populationCount;
    }

    if (board[posX + 1] && board[posX + 1][posY + 1]) {
      ++populationCount;
    }

    if (board[posX + 1] && board[posX + 1][posY - 1]) {
      ++populationCount;
    }
  }

  const runGame = () => {
    for (let x = 0; x < gameBoard.length; ++x) {
      for (let y = 0; y < gameBoard[x].length; ++y) {
        populationCount = 0;
        const currCell = gameBoard[x][y];

        checkVertical(x, y, gameBoard);
        checkHorizontal(x, y, gameBoard);
        checkdiagonal(x, y, gameBoard);

        if (currCell && populationCount < 2) {
          changeTracker.push({
            xAxis: x,
            yAxis: y,
            value: false
          })
        }
        else if (currCell && populationCount > 3) {
          changeTracker.push({
            xAxis: x,
            yAxis: y,
            value: false
          })
        }
        else if (!currCell && populationCount === 3) {
          changeTracker.push({
            xAxis: x,
            yAxis: y,
            value: true
          })
        }
      }
    }
    for (const change of changeTracker) {
      setLife(change.xAxis, change.yAxis, change.value);
    }
  }

  const renderColumns = () => {
    return gameBoard.map((rowArray, index) => <Board rowArray={rowArray} key={index} />)
  }

  return (
    <div>
      <div className="game-board">
        <div>
        {renderColumns()}
        </div>
      </div>
    </div>
  );
}

export default App;
