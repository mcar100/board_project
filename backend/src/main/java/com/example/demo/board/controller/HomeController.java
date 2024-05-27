package com.example.demo.board.controller;

import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.board.model.SearchDTO;
import com.example.demo.board.service.BoardService;
import com.example.demo.user.model.User;
import com.example.demo.user.service.UserService;
import com.example.demo.util.PaginationHelper;

@Controller
public class HomeController {
	
	@Autowired
	BoardService boardService;
	@Autowired
	UserService userService;

    @GetMapping("/")
    public String goHome(@RequestParam(value="pageNo", required = true, defaultValue="1") int pageNo, Model model) throws Exception {
		try {
			int boardCount = boardService.countBoardList();
			SearchDTO searchDTO = new SearchDTO(pageNo, 10,boardCount);
			
			int lastPageNo = PaginationHelper.getEndPageNo(searchDTO);
			model.addAttribute("pageNo", pageNo);
			model.addAttribute("lastPageNo", lastPageNo);
			model.addAttribute("pageSize", 10);
			
			ArrayList<HashMap<String,Object>> boardList = boardService.getBoardListInfo(searchDTO);
			if(boardList.size()==0) {
				throw new Exception("데이터가 없습니다. 더미데이터 반환");
			}
			model.addAttribute("boardList", boardList);
		}
		catch(Exception e) {
			ArrayList<HashMap<String, Object>> dummyList = new ArrayList<>();
			HashMap<String,Object> dummyData = new HashMap<>();
			dummyData.put("rowNum",1);
			dummyData.put("userName","dummy");
			dummyData.put("title","dummyData");
			dummyData.put("createdAt","2024-04-25");
			dummyData.put("commentsCount",0);
			dummyList.add(dummyData);
			model.addAttribute("boardList", dummyList);
		}    	
        return "/board/home"; 
    }
    
    @GetMapping("/profile")
    public String goProfile(HttpServletRequest request, Model model) throws Exception {
		try {
			HttpSession session = request.getSession(false);
			Integer userId = (Integer)session.getAttribute("userId");
			if(userId==null) {
				throw new Exception("Session이 없습니다.");
			}
			User userData = userService.getUserById(userId);
			model.addAttribute("userData",userData);
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return "home";
		}    	
        return "/account/profile"; 
    }
}