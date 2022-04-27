
import {DATA_REQUEST,NAME_ID,USERS_DATA,USER_NAME,GET_DATA} from './types'

export const fetch_data= (id,body,checked,url)=>async dispatch=>{
    const val={id:id,body:body,checked:checked}
    // console.log(url)
    const res= await fetch(
        `https://to-do-app-d431a-default-rtdb.firebaseio.com/${url}.json`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                id,body,checked
            })
        }
    ).then((res)=>{
        return res.json()
    }).then((text)=>{
        // console.log(text)
        dispatch({
            type:DATA_REQUEST,
            payload:val
        })
    })
}

export const login_succes= (data,name,history)=>dispatch=>{
    localStorage.setItem("jwt_token", "LOGIN SUCCESS");
    localStorage.setItem("jwt_url",data)
    localStorage.setItem("jwt_name",name)
    const val={name:data}
    dispatch({
        type: NAME_ID,
         payload: val
    })
    dispatch({
        type:USER_NAME,
        payload:name
    })
    history("/dashboard");
}

export const logout= (history)=>dispatch=>{
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("jwt_url")
    localStorage.removeItem("jwt_name")
    dispatch({
        type: NAME_ID,
         payload:''
    })
    dispatch({
        type:USER_NAME,
        payload:''
    })
    history("/");
}

export const get_fetch_data= (url,name)=>async dispatch=>{

    const res= await fetch(
        `https://to-do-app-d431a-default-rtdb.firebaseio.com/${url}.json`,
        {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            },
        }
    ).then((res)=>{
        return res.json()
    }).then((text)=>{
        // console.log(text)
        let temp_data=[]
        for(let x in text)
        {
            temp_data.push({...text[x],main_id:x});
        }
        // console.log(temp_data)
        dispatch({
            type:GET_DATA,
            payload:[temp_data,url,name]
        })

    })
}


export const fetch_users= (email,password,name,history)=>async dispatch=>{
    const res= await fetch(
        "https://to-do-app-d431a-default-rtdb.firebaseio.com/users.json",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                email,password,name
            })
        }
    ).then((res)=>{
        return res.json()
    }).then((text)=>{
        // console.log(text)
        localStorage.setItem("jwt_token", "LOGIN SUCCESS");
        localStorage.setItem("jwt_url",text.name)
        localStorage.setItem("jwt_name",name)
        dispatch({
            type: NAME_ID,
             payload: text
        })
        dispatch({
            type:USER_NAME,
            payload:name
        })
        history("/dashboard");
    })
}


export const get_users= ()=>async dispatch=>{

    const res= await fetch(
        "https://to-do-app-d431a-default-rtdb.firebaseio.com/users.json",
        {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            },
        }
    ).then((res)=>{
        return res.json()
    }).then((text)=>{
        // console.log(text)
        dispatch({
            type: USERS_DATA,
             payload: text
        })
    })
}


export const delete_card= (url,id)=>async dispatch=>{
    // console.log(url,id)
    const res= await fetch(
        `https://to-do-app-d431a-default-rtdb.firebaseio.com/${url}/${id}.json`,
        {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
            },
        }
    ).then((res)=>{
        return res.json()
    }).then((text)=>{
        console.log(text)

    })
}

export const update_card= (url,uid,id,body,checked)=>async dispatch=>{
   
    const res= await fetch(
        `https://to-do-app-d431a-default-rtdb.firebaseio.com/${url}/${uid}.json`,
        {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                id,body,checked
            })
        }
    ).then((res)=>{
        return res.json()
    }).then((text)=>{
        // console.log(text)

    })
}