import React from 'react';

import './TodoCard.css'
import Aux from '../../hoc/Aux/Aux';


const TodoCard = (props) => {
    return (
        <Aux>
            <div className="TodoCard">
                <div className="card" id={props.id}>
                    <div className="card-header">
                        <h5>{props.title}</h5>
                        <button type="button" id="removeCard" onClick={props.onClick}><i className="fas fa-trash"></i></button>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{props.date}</h5>
                        <p className="card-text">{props.notes}</p>
                    </div>
                </div>
            </div>
        </Aux>
       
    )
  }

export default TodoCard;