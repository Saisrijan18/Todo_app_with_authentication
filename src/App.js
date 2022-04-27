import logo from './logo.svg';
import './App.css';
import { Note } from './Components/Note';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { connect } from "react-redux"
import {fetch_data,get_fetch_data,delete_card,update_card,logout} from "./Redux/actions"
import SignUpLogin from "./Components/login"
import { Button } from 'reactstrap';
import {useNavigate} from "react-router-dom"

function App({state_data,fetch_data,get_fetch_data,state_url,state_name,delete_card,update_card,logout}) {
  
  const history = useNavigate();

  const [data,setdata]=useState(state_data)

  const [text,settext]= useState('')

  useEffect(()=>{
    const temp_url=localStorage.getItem('jwt_url');
    const temp_name=localStorage.getItem('jwt_name');
   // console.log(temp_url)
    if(temp_url!==""){
        get_fetch_data(temp_url,temp_name)
    }
        
  },[])

  useEffect(()=>{
    setdata(state_data)
  },[state_data])
  const Logout=()=>{
    logout(history)
  }
  const handleAdd=()=>{
    if(text!=='')
    {
      let temp_object={id:uuidv4(),body:text,name:state_name,completed:false}
      fetch_data(temp_object.id,temp_object.body,false,state_url);
      setdata([...data,temp_object])
      settext('')
    }
  }

  const handledelete=(child_id)=>{
    const temp_data=[]
    let temp_id=''
    data.map((val)=>{
      if(val.id!==child_id)temp_data.push(val);
      else{
        temp_id=val.main_id;
      }
    })
    setdata(temp_data)
    delete_card(state_url,temp_id)
  }
  const handlechecked=(child_id,value)=>{
    const temp_data=[]
    let temp_id=''
    let temp_val={}
    data.map((val)=>{
      if(val.id!==child_id)temp_data.push(val);
      else{
        temp_id=val.main_id;
        temp_val=val
      }
    })
   // setdata(temp_data)
   update_card(state_url,temp_id,temp_val.id,temp_val.body,value)
  }

  return (
    <div className="todos-bg-container">
      
    <div className="container">
      <div className="row">
        <div className="col-12">
        <h1 className="todos-heading">Todo App</h1>
          <div className='d-flex align-items-center justify-content-between'>
          <h1 className="create-task-heading">
            Create Task
          </h1>
          <button className='butto' onClick={()=>{Logout()}}>
          Log Out
         </button>
          </div>
          
          
          <input type="text" id="todoUserInput" value={text} className="todo-user-input" placeholder="What needs to be done?" onChange={(e)=>{settext(e.target.value)}}/>
          <button className="button" id="addTodobutton" onClick={()=>{handleAdd()}}>Add</button>
          <h1 className="todo-items-heading">
            My Tasks
          </h1>
          <div className="todo-items-container d-flex flex-row flex-wrap" id="todoItemsContainer">
            {data.map((val)=>{
              return(
                <Note id={val.id} key={val.id} className="col-4 ml-5" completed={val.checked} body={val.body} name={state_name} handledelete={handledelete} handlechecked={handlechecked}/>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

const MapStateToProps=(state)=>({
  state_data:state.dataFromstate.data,
  state_name:state.dataFromstate.user_name,
  state_url:state.dataFromstate.name_id,
})


export default connect(MapStateToProps,{fetch_data,get_fetch_data,delete_card,update_card,logout})(App);
