import React from 'react'
import './Square.css';

interface Props {
  isAlive: boolean
}

const Square = (props: Props) => {
    return (
        <div className="square" style={{ backgroundColor: props.isAlive ? 'limegreen' : 'white'}}>
            
        </div>
    )
}

export default Square
