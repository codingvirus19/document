package com.douzone.codingvirus19.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

public class LoginFailHandler extends SimpleUrlAuthenticationFailureHandler {

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {
	
		System.out.println("로그인실패");

		String accept = request.getHeader("accept");
		System.out.println(accept);
		// 일반 응답일 경우
		if (accept == null || accept.matches(".*application/json.*") == false) {
			System.out.println("error");
			request.getSession(true).setAttribute("loginFail", false);
//			getRedirectStrategy().sendRedirect(request, response, "/");
			// 메인으로 돌아가!
			// 이전페이지로 돌아가기 위해서는 인증페이지로 가기 전 URL을 기억해 놓았다가
			return;
		}
//		 application/json(ajax) 요청일 경우 아래의 처리!
		MappingJackson2HttpMessageConverter jsonConverter = new MappingJackson2HttpMessageConverter();
		MediaType jsonMimeType = MediaType.APPLICATION_JSON;
		JSONResult jsonResult = JSONResult.fail("fail");
		if (jsonConverter.canWrite(jsonResult.getClass(), jsonMimeType)) {
			jsonConverter.write(jsonResult, jsonMimeType, new ServletServerHttpResponse(response));
		}
	}
	
}
