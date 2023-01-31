package com.jwt.ServicesTesting;

import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.jwt.entity.JwtRequest;
import com.jwt.service.JwtService;

@SpringBootTest
public class JwtServiceTest {
	
	@Autowired
	private JwtService jwtService;
	
	@Test
	public void me() {
		assertEquals(1,1);
	}

	
	@Test
	public void TestCreateJwtToken() throws Exception {
		JwtRequest jwtRequest = new JwtRequest();
		jwtRequest.setUserName(anyString());
		jwtRequest.setUserPassword(anyString());
//		JwtResponse res= jwtService.createJwtToken(jwtRequest);
		System.out.println(jwtService.createJwtToken(jwtRequest));
	}
	
}
