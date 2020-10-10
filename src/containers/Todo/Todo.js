import React, { Component } from 'react';
import axios from '../../axios-instance';

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
        notes: "",
        cards: []
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

    submitHandler = () => {
        // Add a card to the array of cards and to Firebase
        const todoCard = {
            title: this.state.title,
            date: this.state.date,
            notes: this.state.notes
        }
        axios.post('/todoItems.json', todoCard);
        // Clear the add form when done
        this.setState({
            title: "",
            date: "When is it..",
            notes: ""
        })
    }

    removeCardHandler = (cardID) => {
        // Remove specific card from array of cards and to Firebase
        axios.delete('/todoItems/' + cardID + '.json' );
    }

    render () {
        // Get todo cards from Firebase
        axios.get('/todoItems.json').then(response => {
            const results = [];
            for (let key in response.data) {
                results.unshift({
                    ...response.data[key],
                    id: key
                })
            }
            this.setState({cards: results})
        })
        // Display Firebase data in cards
        let cardList = (
            <Aux>
                {this.state.cards.map((cards, index) => {
                    return (
                        <div className="col-lg-4 col-xs-12" key= {cards + index}>
                            <TodoCard
                                title={cards.title} 
                                date={cards.date} 
                                notes={cards.notes}
                                id={cards.id} 
                                onClick={() => this.removeCardHandler(cards.id)}/>
                        </div>
                    );
                })}
            </Aux>
        );
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
                                    </form> 
                                    <button className="btn btn-primary" id="addItemBtn" data-dismiss="modal" onClick={this.submitHandler}>ADD</button> 
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
                        {cardList}
                    </div>
                </div>
            </Aux>
        );
    }
}

export default Todo;