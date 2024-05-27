import { isNotBlank } from "../utils/validator.js";
import { convertFormDataToObject, getPathNameNumber } from "../utils/convertor.js";
import { deleteCommentInfo, insertCommentInfo, updateCommentInfo, getCommentsData } from "../api/commentApi.js";

$(document).ready(function(){
	init();
})

function init(){
	$("#commentForm").submit(handleFormSubmit);
	$(".commentReply").click(handleReplyBtnClick);
	$(".commentCancle").click(removeCommentElement);
	$(".commentRemove").click(handleDeleteBtnClick);
	$(".commentModify").click(handleModifyBtnClick);
}

function handleReplyBtnClick(){
	const cancelBtn = $(this).siblings('.commentCancle');
	cancelBtn.show();
	
	removeCommentElement();
	const pTarget = $(this).closest("li");
	const pData = $(pTarget).data();
	const element = createReplyCommentElement(pData);
	addElementAfterTarget(pTarget, element);
	$("#replyCommentForm").submit(function(e){
		handleFormSubmit.bind($("#replyCommentForm"))(e, pData);
	});
	$(this).hide();
}

function handleModifyBtnClick(){
	const isActivate = $(this).data("activate");
	const pTarget = $(this).closest("li");
	const contentTarget = $(pTarget).find(".commentDiv > .comment");
	changeModifyCommentElement(contentTarget, isActivate);
	$(this).text(isActivate? '수정' : '취소');
	$(this).data("activate", !isActivate);
}

async function handleDeleteBtnClick(){
	if(!confirm("삭제하시겠습니까?")){
		return;
	}
	const pTarget = $(this).closest("li");
	const commentId = $(pTarget).data("id");
	if(!commentId){
		throw new Error("no commentId");
	}
	const deleteResult = await deleteCommentInfo(commentId);
	if(!deleteResult){
		throw new Error("댓글 삭제 실패");
	}
	
	const boardId =  getPathNameNumber();
	alert('삭제되었습니다.');
	await reloadCommentPage(boardId);
	init();
}

export async function handleFormSubmit(e, pData){
	e.preventDefault();
	try{
		const commentForm = $(this).serializeArray();
		const commentInfo = convertFormDataToObject(commentForm);
		const content = commentInfo['commentContent'];
		const isModify = commentInfo['modify'];
	
		if(!isNotBlank(content)){
			throw new Error('내용을 입력하세요.');
		}
		
		const boardId =  getPathNameNumber();
		if(!isModify){
			const commentInfo = {
				boardId: boardId,
				content: content,
				parentId: pData? pData.id: null,
				depth: pData? pData.depth+1 : 0,
			}
			const result = await insertCommentInfo(commentInfo);
			if(!result){
				throw new Error('댓글 등록 실패')
			
			}
		}
		else{
			const pTarget = $(this).closest("li");
			const commentId = $(pTarget).data("id");
			const result = await updateCommentInfo({content}, commentId);
			if(!result){
				throw new Error('댓글 수정 실패')
			}	
		}
		await reloadCommentPage(boardId);
		init();
	}
	catch(err){
			alert(err.message);
	}
}

function createCommentForm(type="reply", paddingValue=0, formStyle='', parentWriter='', content=''){
	let element = '';
	let formId = `${type}CommentForm`;
	if(type === "reply") element +=`<li id="replyCommentLi" style="padding-left:${paddingValue}px">`;
	element += `<form class="flex" id="${formId}" name="commentForm" style="${formStyle}">`;
	if(type === "reply"){
		element += '<div class="border-left border-bottom" style="width:15px; height:31px" ></div>'
	}
	else if(type === "modify"){
		element += 
			`<input type="hidden" name="modify" value="true" />
			<span class="mr-2 text-primary">${parentWriter}</span>`;
	}
	element += 
		`<textarea cols="30" row="5" name="commentContent" class="form-control flex mr-1" style="width: 90%" placeholder="내용">${content}</textarea>
			<a class="commentAdd flex" style="width: 9%">
				<button type="submit" class="btn btn-primary btn ml-1" style="margin-top: 0.75rem;width: 100%">등록</button>
			</a>
		</form>`
	if(type==="reply") element += '	<hr class="sidebar-divider d-none d-md-block"></li>'
	return element;
}

function createReplyCommentElement(data){
	const depth = data.depth;
	let paddingValue = depth? (depth+1)*20 : 20;
	const element = createCommentForm("reply",paddingValue);
	return element;
}

function removeCommentElement(){
	const replyBtn = $(this).siblings('.commentReply');
	replyBtn.show();
	
	const replyId = $("#replyCommentLi");
	if(replyId){
		const prevLi = replyId.closest('li').prev('li');
		prevLi.find('.commentCancle').hide();
		prevLi.find('.commentReply').show();
		replyId.remove();	
	}
	$(this).hide();
}

function changeModifyCommentElement(target, isActivate){
	const modifyId = $("#modifyCommentForm");
	let element = '';
	if(modifyId){
		const pTarget = modifyId.closest(".comment");
		const parentWriter = $(target).find("span").text();
		const textareaContent = modifyId.find("textarea").val();
		element += `<span class="mr-2 text-primary">${parentWriter}</span>`;
		element += `<pre>${textareaContent}</pre>`;
		const pBtn = modifyId.closest("li").find(".commentModify");
		pBtn.data("activate", false);
		pBtn.text("수정");
		changeTargetElement(pTarget, element);
	}
	
	if(!isActivate){
		const content = $(target).children("pre").text();
		const parentWriter = $(target).children("span").text();
		element = createCommentForm("modify", 0, "width: 100%", parentWriter, content);
	}
	changeTargetElement(target, element);
	$("#modifyCommentForm").submit(handleFormSubmit);
}

async function reloadCommentPage(boardId){
	const commentPage = await getCommentsData(boardId);
	if(!commentPage){
		alert('페이지 리로드에 실패했습니다.');
		return;
	}
	$("#commentContent").html(commentPage);
}

function addElementAfterTarget (target, element){
	target.after(element);
}

function changeTargetElement(target, element){
	target.empty();
	target.append(element);
}
