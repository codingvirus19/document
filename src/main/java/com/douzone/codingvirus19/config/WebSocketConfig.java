package com.douzone.codingvirus19.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.douzone.codingvirus19.Handler.SocketHandler;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
	
	@Autowired
	SocketHandler socketHandler;
	// Bean을 자동으로 주입하기 위해서 사용하는데, socketHandler와 "/chatting"경로를 addHandler로 담는다.
	// 위의 방식의 경우 @Component 및 @Bean registry.addHandler의 경로를 쉽게 받을 수 있다.
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(socketHandler, "/chatting");
//		registry.addHandler(socketHandler, "/Editor");
	}

}
