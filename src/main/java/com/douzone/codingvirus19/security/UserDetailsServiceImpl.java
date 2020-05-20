package com.douzone.codingvirus19.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.douzone.codingvirus19.service.UserService;
import com.douzone.codingvirus19.vo.UserVo;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserService userService;
    
    @Autowired
    
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserVo userVo = new UserVo();
        userVo.setRole("ROLE_GUEST");
        userVo.setName("test");
        userVo.setId("test");
        userVo.setPassword("1234");
        System.out.println("데이터 인입 정보");
        SecurityUser securityUser = new SecurityUser();
        if ( userVo != null ) {
            securityUser.setName(userVo.getName());         
            securityUser.setUsername(userVo.getId());     // principal
            securityUser.setPassword(passwordEncoder.encode(userVo.getPassword()));  // credetial

            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(userVo.getRole()));
            securityUser.setAuthorities(authorities);
        }

        return securityUser; // 여기서 return된 UserDetails는 SecurityContext의 Authentication에 등록되어 인증 정보를 갖고 있는다.
    }
}