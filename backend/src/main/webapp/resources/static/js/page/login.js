import { checkFormInfoBlank } from '../utils/validator.js';
import { checkLoginInfo, logout } from "../api/loginApi.js";
import { changeObjectKeyName, convertFormDataToObject } from '../utils/convertor.js';
import { ValidatorAlert, thrownHandler } from '../models/ValidatorAlert.js';

$(document).ready(function(){
	$("#loginForm").submit(handleFormSubmit);
	$("#signoutBtn").click(handleSignOut);
})

async function handleFormSubmit(e){
	e.preventDefault();
	const loginForm = $('#loginForm').serializeArray();
	const loginInfo = convertFormDataToObject(loginForm);
	const recaptcha = loginInfo['g-recaptcha-response'];

	try{
		const [isCheck, checkMsg, invalidTarget] = checkFormInfoBlank(loginInfo);
		const target = invalidTarget? `[name="${invalidTarget}"]` : '[name="email"]';
		if(!isCheck){
			throw new ValidatorAlert(checkMsg, $(target));
		}
		
		if(!recaptcha){
			throw new ValidatorAlert("recaptcha 확인을 진행해주세요.");
		}
		changeObjectKeyName(loginInfo,'g-recaptcha-response','recaptcha');
		
		const requestResult =  await checkLoginInfo(loginInfo);
		if(!requestResult){
			throw new ValidatorAlert("이메일 혹은 비밀번호가 실패하였습니다.");
		}
		alert("로그인되었습니다.");
		location.href = "/";
	}
	catch(thrown){
		thrownHandler(thrown);
	}
}

async function handleSignOut(){
	try{
		const result = await logout();
		if(result){
			location.href = "/login";	
		}
		else{
			throw new Error('로그아웃 실패');
		}
	}
	catch(e){
		alert(e.message);
		console.log(e);
	}
}

