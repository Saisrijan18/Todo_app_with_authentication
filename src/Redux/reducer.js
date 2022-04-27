import {DATA_REQUEST,NAME_ID,USERS_DATA,USER_NAME,GET_DATA} from './types'

const intialdata={
    name_id:'',
    data:[{
        id:1,
        body:'this is sam',
        name:'SRijan',
        completed:false
    },{
        id:2,
        body:'this is sample',
        name:'SRijan',
        completed:true
    }],
    users_data:{},
    user_name:''
}

export const reduce=(state=intialdata,action)=>{
    switch(action.type)
    {
        case DATA_REQUEST:
        {
            let temp_data=state.data;
            temp_data.push(action.payload)
            return {
                ...state,
                data:temp_data
            }
        }
        case GET_DATA:
        {
            return {
                ...state,
                data:action.payload[0],
                name_id:action.payload[1],
                user_name:action.payload[2]
            }
        }    
        case NAME_ID:
        {
            return {
                ...state,
                name_id:action.payload.name
            }
        }
        case USERS_DATA:
        {
            return {
                ...state,
                users_data:action.payload
            }
        }
        case USER_NAME:
        {
            return {
                ...state,
                user_name:action.payload
            }
        }
        default:
            return state
    }
}