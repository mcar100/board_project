import { convertApiDataFormat } from "../utils/convertor.js";
import requestApi from "./ajax.js";

function checkLoginInfo(loginInfo){
	const apiData = convertApiDataFormat(null,null,loginInfo);
	return requestApi('post','/login/signin',apiData);
}

function logout(){ 
	return requestApi('get','/login/signout');
}

export { checkLoginInfo, logout };