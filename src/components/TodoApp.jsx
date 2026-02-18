import React from "react";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";



const TodoApp = () => { 

    let [ items, setItems ] = useState([
        {id : 1 , label : "Html & css " , checked : true },
        {id : 2 , label : "Javascript " , checked : true },
        {id : 3 , label : "react js " , checked : false }
    ]);

    let [newItem, setNewItem] = useState("")

    let [isEditing,setIsEditing] = useState( false)

    let [currentElementId , setCurrentElementId] = useState(null)

    let handleChecked = (id) =>{
      let newListItems = items.map((item)=>{
        return item.id === id ? { ...item, checked : !item.checked} : item;
      });

      setItems(newListItems);
    };

    let handleUpdate = (id)=>{ 
      let listItem = items.find( item => item.id === id)
      setNewItem(listItem.label)
      setIsEditing( true);
      setCurrentElementId(id)
    }

    let handleDelete = (id)=>{
      let newItems = items.filter(item => item.id !== id).map((item,index) =>({
          ...item,id:index + 1
      }))
      setItems(newItems)

    }
    let handleAddOrSaveItem = ()=>{

      if (isEditing) {
        let newListItems = items.map( (item)=>{
          return item.id === currentElementId ? {...item, label: newItem } : item
        })
        setItems(newListItems)
        setCurrentElementId( null )
        setNewItem("")
        setIsEditing( false )
      }
      else{
        setItems( [...items,{id:items.length+1,label : newItem,checked : false}] )
        setNewItem("")
      }
    }
  return (
    <main>
      {/*<Shop user = { user }/>*/}
      <div>
        <input type = "text"
         value={ newItem }
          placeholder="Add new Item"
          onChange={ (e)=>{setNewItem(e.target.value)}}/>
        <button onClick={ handleAddOrSaveItem } > {isEditing ? "Save " : "Add" } </button>
      </div>
      <ul>
        {
            items.map( (item)=>{
                return(
                    <li key={item.id} className="item" >
                        <input type="checkbox" checked = {item.checked} onChange={ ()=> handleChecked(item.id) } />
                        <label > {item.label}</label>
                        <FaEdit id="edit" role="button" tabIndex={0} onClick={ ()=>  handleUpdate(item.id)}/>
                        <FaTrashAlt id="delete" role="button" tabIndex={0} onClick={ ()=> handleDelete(item.id) } />
                    </li>
                )
            } )
        }
      </ul>
    </main>
  );
};

export default TodoApp;