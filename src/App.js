import React, { Component} from 'react';
import './App.css';
import ListItems from './ListItems';
import ReactNotification from 'react-notifications-component'
import {store} from "react-notifications-component"
import 'animate.css/animate.min.css';
import 'animate.css/animate.compat.css'
import 'react-notifications-component/dist/theme.css'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      items:[],
      currentItem:{
        text:'',
        key:''
      }
    }
    this.handleNoteInput=this.handleNoteInput.bind(this);
    this.addItem=this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  handleNoteInput(e){
    this.setState({
      currentItem:{
        text:e.target.value,
        key:Date.now()
      }
    })
  }
  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentItem;
    console.log(newItem);
    if(newItem !== ""){
      const newItems=[...this.state.items,newItem];
      this.setState({
        items:newItems,
        currentItem:{
          text:'',
          key:''
        }
      })
      this.setState({
        items:newItems,
        nameItem:{
          text:'',
          key:''
        }
      })
    }
  }
  deleteItem(key){
    const filteredItems= this.state.items.filter(item =>
      item.key!==key);
    this.setState({
      items: filteredItems
    })
  }
  render() {
    const handleOnClickDefault =()=> {
      store.addNotification({
        title:"--Mesaj Bildirimi--",
        message:"Başarılı bir şekilde eklendi!!",
        type:"success",
        container:"bottom-left",
        insert:"bottom",
        animationIn: ["animate__animated animate__fadeIn"],
        animationOut: ["animate__animated animate__fadeOut"],
        dismiss:{
          duration:3000,
          showIcon:true
        },
        width:800
      })
    }
    function btnOnClickVisibiltyNone (){

    }
    return (
      <div className="App">
        <form id="to-do-form" onSubmit={this.addItem}>
            <h4>To Do List</h4>
            <label htmlFor="name">Name</label>
            <input
            id="name"
            type="text"
            placeholder="Enter Name"
            />
            <label htmlFor="lastname">Lastname</label>
            <input
            id="lastname"
            type="text"
            placeholder="Enter Lastname"
            />
            <hr/>
            <input 
            type="text" 
            placeholder="Enter Note"
            value={this.state.currentItem.text}
            onChange={this.handleNoteInput}
            />
            <button onClick={handleOnClickDefault,btnOnClickVisibiltyNone} type="submit">Add List</button>  
            <ReactNotification/>
        </form>
        <hr/>
        <ListItems items={this.state.items} deleteItem={this.deleteItem}/>
        <footer>
            Design by Ceren
        </footer>
      </div>
    )
  }
}

export default App
