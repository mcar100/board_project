import { validator, preventInputs, checkFormInfo, validateMap, isNotBlank } from '../utils/validator.js';
import { checkDuplicatedUserInfo, checkUserAuthNum, insertUserInfo, sendAuthNumberToEmail } from '../api/membershipApi.js';
import { convertFormDataToObject, convertSecondToTimerFormat } from '../utils/convertor.js';
import {ValidatorAlert, thrownHandler} from '../models/ValidatorAlert.js';

$(document).ready(function(){
	$("#nameInput").on({
		change: handleNameChange,
		input: handleOnInput
	})
	$("#emailInput").on({
		change: handleEmailChange,
		input: handleOnInput
	})
	$("#emailCheck").on({
		click: handleEmailBtnClick,
	});
	$("#sendAuthBtn").click(handleSendAuthBtnClick);
	$("#checkAuthBtn").click(handleCheckAuthBtnClick);
	$("#passwordInput").on("change",handlePasswordChange);
	$("#passwordCheckInput").on("change",handlePasswordConfirmChange);
	$("#phoneInput").on({
		input: handleOnInput,
		change: handleInputChange
	});
	$("#addressBtn").on("click",handleAddressBtnClick);
	$("#registerForm").submit(handleFormSubmit);
})

const membershipStat = {
	isNotDuplicatedName: false,
	isNotDuplicatedEmail: false,
	isEmailVerify: false,
	isValidPassword: false,
	isPasswordConfirm: false,
};

const classMap = {
	"control": {
		"normal": "form-control form-control-user",
		"clear": "form-control form-control-user form-clear",
		"error": "form-control form-control-user form-error"		
	},
	"message": {
		"normal": "form-msg form-msg-hidden",
		"clear": "form-msg form-msg-clear",
		"error": "form-msg form-msg-error",
	}
}

const timerIdArray = [];

async function handleNameChange(){
	const [name, value] = [$(this).attr("name"), $(this).val()];
	const [isValid, validateMsg] = validator(name, value); 
	const msgTag = `#${name}_msg`;
	addTargetClass($(this), "normal");
	
	try{
		if(!isValid){
			membershipStat.isNotDuplicatedName = false;
			addTargetClass($(this), "error");
			addTargetClass($(msgTag), "error", "message");
			throw validateMsg;
		}
		
		const isDuplicated = await checkDuplicatedUserInfo(name, value);
		if(!isDuplicated){
			membershipStat.isNotDuplicatedName= true;
			addTargetClass($(this), "clear");
			addTargetClass($(msgTag),"clear", "message");
			throw validateMsg;
		}
		else{
			membershipStat.isNotDuplicatedName = false;
			addTargetClass($(this), "error");
			addTargetClass($(msgTag), "error", "message");	
			throw "중복된 이름입니다.";
		}		
	}
	catch(thrown){
		if(typeof thrown === "string"){
			$(msgTag).text(thrown);
		}
		else{
			thrownHandler(thrown);
		}
	}

}


function handleOnInput(){
	const [name, value] = [$(this).attr("name"), $(this).val()];
	preventInputs(this, name, value)
	if(name==='phone'){
		const phoneRegex = validateMap[name].replaceRegex;
		$(this).val($(this).val().replace(phoneRegex,"$1-$2-$3"));
	}
}

function handleEmailChange(){
	membershipStat.isNotDuplicatedEmail = false;
	membershipStat.isEmailVerify = false;
	addTargetClass($(this), "normal");
	
	addTargetClass($("#emailAuthInput"),"normal");
	$("#emailAuthInput").attr("disabled",false);
	$("#emailAuthInput").val("");
	$("#sendAuthBtn").show();
	$("#checkAuthBtn").attr("disabled",false);
	$("#checkAuthBtn").hide();
	clearTimer();
}


async function handleEmailBtnClick(e){
	e.preventDefault();
	const emailInput = "#emailInput";
	const [name, value] = [$(emailInput).attr("name"), $(emailInput).val()];
	const [isValid, validateMsg] = validator(name, value);
	
	try{
		if(!isValid){
			addTargetClass($(emailInput), "error");
			throw new ValidatorAlert(validateMsg, $(emailInput));
		}
		
		const isDuplicated = await checkDuplicatedUserInfo(name, value);
		if(!isDuplicated){
			addTargetClass($(emailInput), "clear");
			membershipStat.isNotDuplicatedEmail = true;
			$("#emailAuthForm").show();
			throw new ValidatorAlert(validateMsg, $("#emailAuthInput"));
		}
		else{
			addTargetClass($(emailInput), "error");	
			throw new ValidatorAlert("사용 불가능한 이메일입니다.", $(emailInput));
		}
	}
	catch(thrown){
		thrownHandler(thrown);
	}
}

async function handleSendAuthBtnClick(e){
	e.preventDefault();
	try{
		if(!membershipStat.isNotDuplicatedEmail){
			throw new ValidatorAlert('이메일 중복 검사를 먼저 실시해주세요!',$("#emailInput"));
		}
		const email = $("#emailInput").val();
		const result = await sendAuthNumberToEmail({'email': email});
		if(!result){
			throw new ValidatorAlert("인증번호가 전송에 실패했습니다.", $("#emailAuthInput"));
		}
		handleTimePass();
		$(this).hide();
		$("#checkAuthBtn").show();
		throw new ValidatorAlert("해당 이메일로 인증번호가 전송되었습니다.", $("#emailAuthInput"));
	}
	catch(thrown){
		thrownHandler(thrown);
	}
}

async function handleCheckAuthBtnClick(e){
	e.preventDefault();
	try{
		if(!membershipStat.isNotDuplicatedEmail){
			throw new ValidatorAlert('이메일 중복 검사를 먼저 실시해주세요!',$("#emailInput"));
		}
		
		const userInput = $("#emailAuthInput");
		if(!isNotBlank(userInput.val())){
			throw new ValidatorAlert('인증번호를 입력해주세요.',$("#emailAuthInput"));
		}
		
		
		const result = await checkUserAuthNum({'userNum':userInput.val()});
		
		if(!result){
			membershipStat.isEmailVerify = false;
			addTargetClass(userInput, "error");
			throw new ValidatorAlert('이메일 인증에 실패했습니다.',userInput);
		}
		else{
			membershipStat.isEmailVerify = true;
			addTargetClass(userInput, "clear");
			userInput.attr("disabled",true);
			$(this).attr("disabled",true);
			clearTimer();
			throw new ValidatorAlert('인증되었습니다.',$("#passwordInput"));
		}
	}
	catch(thrown){
		thrownHandler(thrown);
	}
}

function handleTimePass(){
	let [timer,timerId] = [60*5,0];	// 5분
	let [minute, second] = convertSecondToTimerFormat(timer); 
	
	timerId = setInterval(function(){
		if(second !== 0){
			second -= 1;
		}
		else{
			if(minute>0){
				minute -=1;
				second = 59;
			}
			else{
				clearInterval(timerId);
				$("#sendAuthBtn").show();
				$("#checkAuthBtn").hide();
			}
		}

		$("#authTimer").text(`${minute}:${String(second).padStart(2,"0")}`);
	},1000);
	timerIdArray.push(timerId);
}

function clearTimer(){
	for(let i=0;i<timerIdArray.length;i++){
		clearInterval(timerIdArray[i]);
	}
	$("#authTimer").empty();
}

function handlePasswordChange(){
	const [name, value] = [$(this).attr("name"), $(this).val()];
	const [isValid, validateMsg] = validator(name, value);
	
	try{
		if(isValid){
			membershipStat.isValidPassword = true;
			addTargetClass($(this), "clear");
			throw new ValidatorAlert(validateMsg);
		}
		else{
			membershipStat.isValidPassword = false;
			addTargetClass($(this), "error");
			throw new ValidatorAlert(validateMsg, $(this));
		}
	}
	catch(thrown){
		thrownHandler(thrown);
	}
	finally{
		const passwordCheckInput= "#passwordCheckInput";
		$(passwordCheckInput).val("");
		addTargetClass($(passwordCheckInput), "normal");
		membershipStat.isPasswordConfirm = false;
	}
}

function handlePasswordConfirmChange(){
	const password = $("#passwordInput").val();
	
	try{
		if(!membershipStat.isValidPassword){
			$(this).val("");
			addTargetClass($(this), "error");
			throw new ValidatorAlert("먼저 사용 가능한 비밀번호를 입력하세요.", $("#passwordInput"));
		}
	
		if(password === $(this).val()){
			membershipStat.isPasswordConfirm = true;
			addTargetClass($(this), "clear");
			throw new ValidatorAlert("비밀번호가 일치합니다.");
		}
		else{
			membershipStat.isPasswordConfirm = false;
			addTargetClass($(this), "error");
			throw new ValidatorAlert("비밀번호가 일치하지 않습니다.", $(this));
		}
	}
	catch(thrown){
		thrownHandler(thrown);
	}
}

function handleInputChange(){
	const [name, value] = [$(this).attr("name"), $(this).val()];
	const [isValid, validateMsg] = validator(name, value);
	
	try{
		if(isValid){
			addTargetClass($(this), "clear");
			throw new ValidatorAlert(validateMsg);
		}
		else{
			addTargetClass($(this), "error");
			throw new ValidatorAlert(validateMsg, $(this));
		}
	}
	catch(thrown){
		thrownHandler(thrown);
	}
}

function handleAddressBtnClick(e){
	e.preventDefault();
	new daum.Postcode({
		oncomplete: function(data){
			if(!data){
				return;
			}
			$("#addressInput").val(data.address);
			$("#zipCodeInput").val(data.zonecode);
			$("#buildingNameInput").val(data.buildingName? data.buildingName : "없음");
			addTargetClass($("#addressInput"),"clear");
			addTargetClass($("#zipCodeInput"),"clear");
			addTargetClass($("#buildingNameInput"),"clear");
		}
	}).open();	
}

async function handleFormSubmit(e){
	e.preventDefault();
	const userForm = $('#registerForm').serializeArray();
	const userInfo = convertFormDataToObject(userForm);
	
	const [isCheck, checkMsg, invalidTarget] = checkFormInfo(userInfo);
	
	try{	
		if(!isCheck){
			const target = invalidTarget? `[name="${invalidTarget}"]` : `[name="name"]`;
			throw new ValidatorAlert(checkMsg, $(target));
		}
		
		if(!membershipStat.isNotDuplicatedName){
			throw new ValidatorAlert("이름 중복확인을 진행해주세요.", $(`[name="name"]`));
		}
		
		if(!membershipStat.isNotDuplicatedEmail){
			throw new ValidatorAlert("이메일 중복확인을 진행해주세요.", $(`[name="email"]`));
		}
		
		if(!membershipStat.isEmailVerify){
			throw new ValidatorAlert("이메일 인증을 진행해주세요.", $(`[name="email"]`));
		}
		
		if(userInfo.password!==userInfo.passwordCheck||!membershipStat.isPasswordConfirm){
			throw new ValidatorAlert("비밀번호 확인을 진행해주세요.", $(`[name="passwordCheck"]`));
		}
		
		
		if(!confirm("회원가입 하시겠습니까?")){
			return;
		}
		
		const requestResult =  await insertUserInfo(userInfo);
		if(!requestResult){
			throw new Error('회원가입에 실패했습니다.')
		}
		
		alert('회원가입이 완료되었습니다!');
		location.href = "/login";
	}
	catch(thrown){
		thrownHandler(thrown);
	}
}

function addTargetClass(target=null,stat="normal",type="control"){
	if(!target){
		return;
	}
	if(stat==="normal"){
		target.attr("class", classMap[type].normal);
	}
	else if(stat==="clear"){
		target.attr("class", classMap[type].clear);
	}
	else if(stat==="error"){
		target.attr("class", classMap[type].error);
		if(type==="control"){
			target.focus();
		}
	}
}
