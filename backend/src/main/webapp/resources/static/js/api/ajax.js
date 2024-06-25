function processFormData(dataList){
	const formData = new FormData();
	for(let i=0; i<dataList.length; i++){
		formData.append("formData",dataList[i]);
	}
	return formData;
}

// return [data, contentType ]
function formatData(data, type){
	if(!data) return [null, null];
	if(type==="json") return [JSON.stringify(data), "application/json; charset=utf-8"];
	else if(type==="file") return [processFormData(data) , false];
	else if(type==="formData") return [processFormData(data), "multipart/form-data"];
	else if(type==="string") return [data, false];
}

function formatUrl(url, pathVar, requestParams){
	let formattedUrl = url;
	if(pathVar){
		formattedUrl += `/${pathVar}`;
	}
	if(requestParams){
		formattedUrl += '?';
		for(let [key, value] of Object.entries(requestParams)){
			formattedUrl += `&${key}=${value}`;
		}
	}
	return formattedUrl;
}

const defaultApiData = {pathVar:null, requestApi:null,data:null,formatType:'json'}

function requestApi(method='get',url='/', apiData=defaultApiData, dataType){
	const {pathVar, requestParams, data, formatType} = apiData;	
	
	const formattedUrl = formatUrl(url, pathVar, requestParams);
	const [formattedData, contentType] = formatData(data, formatType);

	const ajaxObj = {
		"type":method,
		"url": formattedUrl,
	}
		
	if(formattedData){
		ajaxObj["data"] = formattedData;
		ajaxObj["contentType"] = contentType;
	}
	if(formatType==="file"){
		ajaxObj["processData"] = false;
		ajaxObj["enctype"] = "multipart/form-data";
	}
	if(dataType){
		ajaxObj["dataType"] = dataType;
	}
	return new Promise((resolve, reject)=>{
		ajaxObj["success"] =  function(result){
			resolve(result)
		}
		ajaxObj["error"] = function(request,status,error){
			reject(error);
		}
		$.ajax(ajaxObj);
	})
}

export default requestApi;