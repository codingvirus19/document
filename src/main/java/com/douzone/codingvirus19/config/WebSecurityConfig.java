package com.douzone.codingvirus19.config;

import java.io.IOException;
import java.util.Date;
import java.util.LinkedHashMap;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.cxf.rt.security.SecurityConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.auth0.jwt.JWT;
import com.douzone.codingvirus19.security.LoginFailHandler;
import com.douzone.codingvirus19.security.LoginSuccessHandler;
import com.nimbusds.jose.Algorithm;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private UserDetailsService userDetailsService;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
//		 http
//	        .authorizeRequests()
//	        .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
//	        .anyRequest().authenticated()
//	        .and()
//	        .oauth2Login()
//	        .loginPage("/")
//	        .permitAll();

//		http.authorizeRequests().antMatchers("/assets/**","/chat/**","/api/join","/api/images/**").permitAll()
//		.antMatchers("/").hasRole("GUEST")
//		.antMatchers("/auth/**").hasAnyRole("ADMIN", "USER") // 내부적으로 접두어 "ROLE_"가 붙는다.
//		.anyRequest().authenticated();

		http.csrf().disable().cors();
		

		http.authorizeRequests()
				.antMatchers("/", "/assets/**", "/chat/**", "/api/join", "/api/images/**", "/login/oauth2/code/**")
				.permitAll()
				.antMatchers("/main").hasRole("GUEST")
				.and().headers().disable().formLogin().loginPage("/") // default
				.loginProcessingUrl("/user/auth").failureUrl("/") // 로그인실패시
				.defaultSuccessUrl("/main", true) // 로그인 성공시
				.usernameParameter("username").passwordParameter("password")
				.failureHandler(authenticationFailureHandler()).successHandler(authenticationSuccessHandler()).and()
				.oauth2Login()
				.failureUrl("/")
				.successHandler(new MyOAuth2SuccessHandler()).defaultSuccessUrl("/main", true)
				.and()
				.logout().logoutUrl("/logout") // default
				.logoutSuccessUrl("/").permitAll().and();
	}
	
	public class MyOAuth2SuccessHandler implements AuthenticationSuccessHandler {

	    @Override
	    public void onAuthenticationSuccess(HttpServletRequest req, HttpServletResponse res, Authentication authentication) {
	        String id = authentication.getName();
	        	
//	        LinkedHashMap<String, Object> properties = (LinkedHashMap<String, Object>) ((DefaultOAuth2User)authentication.getPrincipal()).getAttributes().get("properties");
//	        String name = (String) properties.get("nickname");
//	        String img = (String) properties.get("thumbnail_image_url"); 
//	        String email = (String) properties.get("email"); 
	        
//	        res.addHeader(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX + token);
//	        String token = JWT.create()
//	                .withClaim("id", id)
//	                .withClaim("name", name)
//	                .withExpiresAt(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
//	                .sign(Algorithm.HMAC512(SecurityConstants.SECRET.getBytes()));
////
//	        res.addHeader(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX + token);
	    }
		
	}


	@Bean
	public PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

	@Bean
	public AuthenticationSuccessHandler authenticationSuccessHandler() {
		return new LoginSuccessHandler();
	}

	@Bean
	public AuthenticationFailureHandler authenticationFailureHandler() {
		return new LoginFailHandler();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		// 사용자 세부 서비스를 설정하기 위한 오버라이딩이다.
		auth.userDetailsService(userDetailsService);
	}

}
