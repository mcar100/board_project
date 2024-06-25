const validateMap = {
	"name": {
		"regex": /^[a-zA-Z0-9]{1,10}$/,
		"hint": "(영어+숫자 조합, 10자리 이하)",
	},
	"email": {
		"regex": /^[a-zA-Z0-9_]+@[a-zA-Z0-9_]+\.[a-zA-Z_.]{2,}$/,
		"hint": "(영어+숫자+특수문자(._@) 조합)",
	},
	"password":{
		"regex": /^[^0-9]{8,15}$/,
		"hint": "(문자+특수문자 조합, 8~15자리)",
	},
	"phone":{
		"regex": /(^01[0-9])-([0-9]{3,4})-([0-9]{4})$/,
		"replaceRegex":  /([0-9]{2,3})([0-9]{3,4})([0-9]{4})/g,
		"hint": "(01x-xxxx-xxxx)",	
	},
	"passwordCheck":{
		"hint": "비밀번호와 일치하지 않습니다.",
	},
};


const preventInputMap = {
	"name": /[^a-zA-Z0-9]/gi,
	"email": /[^a-zA-Z_.@0-9]/gi,
	"phone": /[^0-9]/gi,
}

function validator(type, value){
	const vm = validateMap[type];
	
	if(!vm){
		return;
	}
	
	const regex = vm.regex;
	if(!regex){
		return [true, ""];
	}
	
	if(regex.test(value)){
		return [true, getValidateMessage(type, "correct")];
	}
	else{
		return [false, getValidateMessage(type, "error", vm.hint)]
	}
 }
 
 function preventInputs(target, type, value){
	const regex = preventInputMap[type];
	if(regex.test(value)){
		$(target).val(value.replace(regex,""));	
	}	
 }
 
 function checkFormInfo(formInfo){
	if(!formInfo){
		return [false, "formInfo가 없습니다.", null];
	}
	
	for(const[key, value] of Object.entries(formInfo)){
		if(!isNotBlank(value)){
			return [false, getValidateMessage(key,'blank'), key];
		}
		
		const vm = validateMap[key];
		if(!vm){
			continue;
		}
		
		if(vm.regex&&!vm.regex.test(value)){
			return [false, getValidateMessage(key, "error", vm.hint), key];
		}
	}
	return [true, null, null];
 }

function checkFormInfoBlank(loginInfo){
	for(const[key,value] of Object.entries(loginInfo)){
		if(!isNotBlank(value)){
			return [false, getValidateMessage(key, "blank"), key];
		}
	}
	return [true, "", null]
}

function isNotBlank(content){
	const regex = /\s/g;
	const noSpaceContent = content.replace(regex,"");
	if(noSpaceContent.length===0){
		return false;
	}
	return true;
}

function getValidateMessage(key, type="correct", hint=''){
	const title = $(`[name="${key}"]`).data("title");
	if(type==="correct"){
		return `사용 가능한 ${title? title:key}입니다.`;
	}	
	else if(type==="error"){
		return `${title? title:key}이(가) 올바르지 않습니다. `+hint;	
	}
	else if(type==="blank"){
		return `입력된 ${title? title:key} 정보가 없습니다.`;
	}
}
 
 export { validateMap, validator, preventInputs, checkFormInfo, checkFormInfoBlank, isNotBlank};