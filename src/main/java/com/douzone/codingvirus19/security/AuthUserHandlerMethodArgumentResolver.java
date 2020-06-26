
package com.douzone.codingvirus19.security;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.douzone.codingvirus19.service.UserService;
import com.douzone.codingvirus19.vo.UserVo;

public class AuthUserHandlerMethodArgumentResolver implements HandlerMethodArgumentResolver {
	
	@Autowired
	UserService userSevice;
	
    @Override
    public Object resolveArgument(
        MethodParameter parameter, 
        ModelAndViewContainer mavContainer,
        NativeWebRequest webRequest, 
        WebDataBinderFactory binderFactory) throws Exception {
        Object principal = null;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if(authentication != null ) {
        	if(authentication.getPrincipal().getClass().getName().equals("org.springframework.security.oauth2.core.user.DefaultOAuth2User")){
        	SecurityUser securityUser = new SecurityUser();
        	OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
            
            String id = String.valueOf(oauth2User.getAttributes().get("id"));
            UserVo vo = userSevice.findById(id);
            vo.setRole("ROLE_GUEST");
        	securityUser.setImage(vo.getImage());
        	securityUser.setUsername(id);
        	securityUser.setNo(vo.getNo());
        	securityUser.setName(vo.getNickname());
        	List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(vo.getRole()));
        	securityUser.setAuthorities(authorities);
        	principal = securityUser;
        	}else {
            principal = authentication.getPrincipal();
        	}
        }

        if(principal == null || principal.getClass() == String .class) {
            return null;
        }

        return principal;
    }

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        AuthUser authUser = parameter.getParameterAnnotation(AuthUser.class);
        if(authUser==null) {
            return false;
        }
        if(parameter.getParameterType().equals(SecurityUser.class)==false) { 
            return false;
        }
        return true;
    }

}