import React from 'react';
import './ListItem.css';

function ListItems (props) {
    const items = props.items;
    const listitems = items.map(item=>{
        return   <div className="draggable" draggable="true" key="item.key">
        <span>{item.text}<button  id="btndelete" onClick={() => {
            props.deleteItem(item.key)}} className="btndelete">X</button><button  id="changeColor" onClick={()=>{
            document.getElementsByClassName("draggable")[0].style.background="#FF5733";
            document.getElementById("changeColor").style.visibility="hidden";
        }}>✓</button></span>
        </div>
    })
    const draggables =document.querySelectorAll('.draggable')
    const contaniers = document.querySelectorAll('.contanier')
    draggables.forEach(draggable=>{
        draggable.addEventListener('dragstart',()=>{
            draggable.classList.add('dragging')
        })
    draggable.addEventListener('dragend',()=>{
        draggable.classList.remove('dragging')
    })
    contaniers.forEach(contanier=>{
        contanier.addEventListener('dragover',e=>{
            e.preventDefault()
        const afterElement =getDragAfterElement(contanier,e.clientY)
        console.log(afterElement)
        const draggable = document.querySelector('.dragging')
        if (afterElement == null){
            contanier.appendChild(draggable)
        }
        else {
            contanier.insertBefore(draggable,afterElement)
        }
        contanier.appendChild(draggable)
        })
    })
})
function getDragAfterElement(contanier,y){
    const draggableElements = [...contanier.querySelectorAll('draggable:not(.draggable)')]
    return draggableElements.reduce((closest,child)=>{
    const box=child.getBoundingClientRect()
    const offset = y - box.top - box.height /2 
    console.log(offset)
    if(offset>0 && offset > closest.offset){
        return {offset: offset,element: child}
    }
    else {
        return closest    
    }
    },{offset:Text.NEGATIVE_INFINITY}).element
}
    return (
    <div className="contanier"> 
        {listitems}
    </div>
    )
}
export default ListItems