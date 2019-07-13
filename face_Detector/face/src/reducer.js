import {CHANGE_PASSWORD,CHANGE_EMAIL,CHANGE_MARK,CHANGE_RNAME,CHANGE_RPASSWORD,CHANGE_REMAIL,CHANGE_RMARK,clearStates,registerClear,CHANGE_INPUT,CHANGE_IMG_URL,CHANGE_BOX
,CHANGE_ROUTE,CHANGE_USER,CHANGE_ISSIGNEDIN,CLEAR_HOME,ON_CLICK_CHANGE} from "./constants"

const initialSignupState ={
	email:"",
	password:"",
	mark:0
}
export const signup = (state=initialSignupState,action={}) => {
	switch(action.type){
		case CHANGE_PASSWORD:
			return Object.assign({},state,{password:action.payload});
		case CHANGE_EMAIL:
			return Object.assign({},state,{email:action.payload});
		case CHANGE_MARK:
			return Object.assign({},state,{mark:1});
		case clearStates:
			return Object.assign({},initialSignupState);
		default:
			return state;
	}
}

const initialRegisterState = {
	email:"",
	password:"",
	mark:0,
	name:""

}
export const register = (state=initialRegisterState,action={}) => {
	switch(action.type){
		case CHANGE_RPASSWORD:
			return Object.assign({},state,{password:action.payload});
		case CHANGE_REMAIL:
			return Object.assign({},state,{email:action.payload});
		case CHANGE_RMARK:
			return Object.assign({},state,{mark:action.payload});
		case CHANGE_RNAME:
			return Object.assign({},state,{name:action.payload});
		case registerClear:
			return Object.assign({},initialRegisterState);
		default:
			return state;
	}
}

const initialHomeState = {
      input: '',
      image_url: '',
      box:{},
      route:'signin',
      user : {
        id:"",
        name:"",
        email:"",
        entries:"",
        joined:""
      },
      issignedin:false
    }

export const home = (state=initialHomeState,action={}) => {
	switch(action.type){
		case CHANGE_INPUT:
			return Object.assign({},state,{input:action.payload});
		case CHANGE_IMG_URL:
			return Object.assign({},state,{image_url:action.payload});
		case CHANGE_BOX:
			return Object.assign({},state,{box:action.payload});
		case CHANGE_ROUTE:
			return Object.assign({},state,{route:action.payload});
		case CHANGE_USER:
			return Object.assign({},state,{user:action.payload});
		case CHANGE_ISSIGNEDIN:
			return Object.assign({},state,{issignedin:action.payload});
		case CLEAR_HOME:
			return Object.assign({},initialHomeState);
		default:
			return state;
	}
}


const initialNavState = {
	click:false
}

export const nav = (state=initialNavState,action={}) => {
	switch(action.type){
		case ON_CLICK_CHANGE:
			return Object.assign({},state,{click:action.payload});
		default:
			return state;
	}
}