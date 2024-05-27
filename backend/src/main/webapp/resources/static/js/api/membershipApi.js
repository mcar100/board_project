import { convertApiDataFormat } from "../utils/convertor.js";
import requestApi from "./ajax.js";

function insertUserInfo(userInfo){
	const apiData = convertApiDataFormat(null,null,userInfo,"json");
	return requestApi('post','/membership/signup', apiData,'json');
}

function checkDuplicatedUserInfo(inputType, inputValue){
	const requestParam = {
		'type': inputType,
		'value': inputValue
	}
	const apiData = convertApiDataFormat(null,requestParam);
	return requestApi('get', '/membership/user', apiData);
}

function sendAuthNumberToEmail(email){
	const apiData = convertApiDataFormat(null,null,email,"json");
	return requestApi('post','/membership/send',apiData, "json");
}

function checkUserAuthNum(userCode){
	const apiData = convertApiDataFormat(null,null,userCode,"json");
	return requestApi('post','/membership/verify',apiData, "json");
}


export { insertUserInfo, checkDuplicatedUserInfo, sendAuthNumberToEmail, checkUserAuthNum }