import {CHANGE_PASSWORD,CHANGE_EMAIL,CHANGE_MARK,CHANGE_RNAME,CHANGE_RPASSWORD,CHANGE_REMAIL,CHANGE_RMARK,clearStates,registerClear,CHANGE_INPUT,CHANGE_IMG_URL,CHANGE_BOX
,CHANGE_ROUTE,CHANGE_USER,CHANGE_ISSIGNEDIN,CLEAR_HOME,ON_CLICK_CHANGE} from "./constants"


export const onPasswordChange = (text) => ({
	type: CHANGE_PASSWORD,
	payload:text
});
export const onEmailChange = (text) => ({
	type: CHANGE_EMAIL,
	payload:text
});
export const onMarkChange = (val) => ({
	type:CHANGE_MARK,
	payload:val
});
export const clearState = () => ({
	type:clearStates

});


export const onRPasswordChange = (text) => ({
	type: CHANGE_RPASSWORD,
	payload:text
});
export const onREmailChange = (text) => ({
	type: CHANGE_REMAIL,
	payload:text
});
export const onRMarkChange = (val) => ({
	type:CHANGE_RMARK,
	payload:val
});
export const onRNameChange = (text)=> ({
	type:CHANGE_RNAME,
	payload:text
});
export const clearRegister = () => ({
	type:registerClear
})


export const onInputChange = (text) => ({
	type: CHANGE_INPUT,
	payload:text
});
export const onImgUrlChange = (text) => ({
	type: CHANGE_IMG_URL,
	payload:text
});
export const onBoxChange = (box) => ({
	type: CHANGE_BOX,
	payload:box
});
export const onRouteChange = (text) => ({
	type: CHANGE_ROUTE,
	payload:text
});
export const onUserChange = (user) => ({
	type: CHANGE_USER,
	payload:user
});
export const isSignedChange = (val) => ({
	type: CHANGE_ISSIGNEDIN,
	payload:val

});
export const clearHome = () => ({
	type:CLEAR_HOME
})


export const clickChange = (text) => ({
	type:ON_CLICK_CHANGE,
	payload:text
})