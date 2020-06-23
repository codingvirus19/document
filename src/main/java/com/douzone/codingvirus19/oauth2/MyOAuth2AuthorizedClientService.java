package com.douzone.codingvirus19.oauth2;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.jaas.SecurityContextLoginModule;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.douzone.codingvirus19.security.SecurityUser;
import com.douzone.codingvirus19.service.UserService;
import com.douzone.codingvirus19.vo.UserVo;

@Service
public class MyOAuth2AuthorizedClientService implements OAuth2AuthorizedClientService {
	
	@Autowired
	UserService userService;
	
	@Override
	public <T extends OAuth2AuthorizedClient> T loadAuthorizedClient(String clientRegistrationId,
			String principalName) {
		return null;
	}

	@Override
	public void saveAuthorizedClient(OAuth2AuthorizedClient oAuth2AuthorizedClient, Authentication authentication) {
        String providerType = oAuth2AuthorizedClient.getClientRegistration().getRegistrationId();
        OAuth2AccessToken accessToken = oAuth2AuthorizedClient.getAccessToken();
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        
        String id = String.valueOf(oauth2User.getAttributes().get("id"));
        String nickname = (String) ((LinkedHashMap) ((LinkedHashMap) oauth2User.getAttribute("kakao_account")).get("profile")).get("nickname");
        String email = (String) (((LinkedHashMap) oauth2User.getAttribute("kakao_account")).get("email"));
        
        SecurityUser securityUser = new SecurityUser();
        System.out.println(accessToken.getTokenValue());
        
        UserVo userVo = new UserVo();
        userVo.setEmail(email);
        userVo.setId(id);
        userVo.setNickname(nickname);
        userVo.setPassword(id);
        userVo.setImage("/assets/images/defaultUser.webp");
        
        
        //++++++++++++++++++++++++++++++++++++++++++++++++
//        List<GrantedAuthority> authorities = new ArrayList<>();
//        authorities.add(new SimpleGrantedAuthority(userVo.getRole()));
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
      
        //+++++++++++++++++++++++++++++++++++++++++++++++++
        //db 주입 부분
        UserVo vo = userService.findById(id);
        if(vo == null) {
        	userService.join(userVo);
        }
        
        
        
        
        
    }

	@Override
	public void removeAuthorizedClient(String clientRegistrationId, String principalName) {
		// TODO Auto-generated method stub

	}

}
