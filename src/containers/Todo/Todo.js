import React, { Component } from 'react';

import './Todo.css';
import Aux from '../../hoc/Aux/Aux';
import Navbar from '../../components/Navbar/Navbar';
import TodoCard from '../../components/TodoCard/TodoCard';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Todo extends Component {
    state = {
        title: "",
        date: "When is it..",
        notes: ""
    }

    onChangeHandler = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    onDateChangeHandler = (event) => {
        const dateTemp = event.toLocaleString()
        const date = dateTemp.split(',').slice(0, 1).join(' ');
        this.setState({
            date: date
          });
    }

    componentDidMount = () => {
        //Display array of cards pulled from Firebase
    }

    submitHandler = () => {
        // Add a card to the array of cards and to Firebase
        console.log("submitted!!");
    }

    removedCardHandler = () => {
        // Remove specific card from array of cards and to Firebase
        console.log("removed!!");
    }

    render () {
        return (
            <Aux>
                <div className="Todo"> 
                
                    {/* MODAL */}
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">What's on your list today?</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="form-group">
                                        <h5>Title:</h5>
                                            <input 
                                                onChange={(event) => this.onChangeHandler(event)}
                                                name="title"
                                                value={this.state.title} 
                                                type="text" 
                                                className="form-control" 
                                                id="formGroupExampleInput" 
                                                placeholder="What's it called..">
                                            </input>
                                        </div>
                                        <h5>Date:</h5>
                                            <DatePicker
                                                value={this.state.date}
                                                onChange={date => this.onDateChangeHandler(date)}
                                                minDate={new Date()}
                                                className="form-control"
                                                id= "date"
                                            />
                                        <div className="form-group">
                                        <h5>Notes:</h5>
                                            <textarea 
                                                className="form-control" 
                                                onChange={(event) => this.onChangeHandler(event)} 
                                                name="notes"
                                                value={this.state.notes}  
                                                id="exampleFormControlTextarea1" 
                                                rows="2" 
                                                maxLength="80"
                                                placeholder="What's it about..">
                                            </textarea>
                                        </div>
                                        <button type="submit" className="btn btn-primary" id="addItemBtn" onClick={this.submitHandler}>ADD</button> 
                                    </form> 
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* TO DO LIST PAGE */}
                    <Navbar />
                    <div className="addHeading">
                        <h1 id="todoHeading">Ready to execute?</h1>
                        <button type="submit" className="btn btn-light" id="addTodoBtn" data-toggle="modal" data-target="#exampleModal">ADD A TO-DO</button> 
                    </div> 


                    {/* TO DO CARDS */}
                    <div className="row" id="cardLayout">
                        <div className="col-lg-4 col-xs-12">
                            <TodoCard 
                                title="Walk the Dog" 
                                date="10/14/1998" 
                                notes="6 miles around the nieghborhood" 
                                onClick={this.removedCardHandler}/>
                        </div>
                        <div className="col-lg-4 col-xs-12">
                            <TodoCard />
                        </div>
                        <div className="col-lg-4 col-xs-12">
                            <TodoCard />
                        </div>
                        <div className="col-lg-4 col-xs-12">
                            <TodoCard />
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default Todo;