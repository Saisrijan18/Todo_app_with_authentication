import React from 'react'
import { Button } from 'reactstrap'

export const Note = ({id,name,body,handledelete,completed,handlechecked}) => {

  return (
    <div id={id} style={{backgroundColor:'#79e2bc',padding:12,margin:10,minWidth:300,height:200,borderRadius:5,maxWidth:300}}>
            <div  className="mt-3" style={{overflowY:"auto",height:120}}>
            {body}
            </div>
              <div className='d-flex justify-content-between'>
            <div>
            <p style={{fontWeight:500}}>- {name}</p></div>
            <div className='d-flex align-items-center'>
            <input type="checkbox" defaultChecked={completed} onChange={(e)=>{handlechecked(id,e.target.checked)}}></input>
              <Button color="link" onClick={()=>handledelete(id)}>
                <i className="fa fa-trash fa-sm"></i>
            </Button>
            </div>
        </div>
     </div>
  )
}
