package com.douzone.codingvirus19.security;

import java.io.IOException;
import java.security.Principal;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;

public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
	protected final Log logger = LogFactory.getLog(this.getClass());
	private RequestCache requestCache = new HttpSessionRequestCache();

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		System.out.println(authentication+"기존로그인success");
		SavedRequest savedRequest = requestCache.getRequest(request, response);
		if (savedRequest != null) {
			requestCache.removeRequest(request, response);
			clearAuthenticationAttributes(request);
		}
		
		String accept = request.getHeader("accept");
		SecurityUser securityUser = null;
		if (SecurityContextHolder.getContext().getAuthentication() != null) {
			Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			if (principal != null && principal instanceof UserDetails) {
				securityUser = (SecurityUser) principal;
			}
		}
		// 일반 응답일 경우
		if (accept == null || accept.matches(".*application/json.*") == false) {
			request.getSession(true).setAttribute("loginNow", true);
//			getRedirectStrategy().sendRedirect(request, response, "/");
			// 메인으로 돌아가!
			// 이전페이지로 돌아가기 위해서는 인증페이지로 가기 전 URL을 기억해 놓았다가
			return;
		}

//		 application/json(ajax) 요청일 경우 아래의 처리!
		securityUser.setPassword("");
		MappingJackson2HttpMessageConverter jsonConverter = new MappingJackson2HttpMessageConverter();
		MediaType jsonMimeType = MediaType.APPLICATION_JSON;
		JSONResult jsonResult = JSONResult.success("success");
		if (jsonConverter.canWrite(jsonResult.getClass(), jsonMimeType)) {
			jsonConverter.write(jsonResult, jsonMimeType, new ServletServerHttpResponse(response));
		}
		
		

	}

	public void setRequestCache(RequestCache requestCache) {
		this.requestCache = requestCache;
	}

}