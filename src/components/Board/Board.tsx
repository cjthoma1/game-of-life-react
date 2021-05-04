import React from 'react'
import Square from '../Square/Square';
import './Board.css';

interface Props {
    rowArray: boolean[];
}

const Board = (props: Props) => {

    const renderSquares = () => {
        return props.rowArray.map((isAlive, index) => <Square isAlive={isAlive} key={index}/>)
    }
    return (
        <div className="board-row">
           {renderSquares()}
        </div>
    )
}

export default Board
