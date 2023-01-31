package com.jwt;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.jwt.controller.UserController;
import com.jwt.entity.User;

@SpringBootTest
public class ControllersTesting {
	
	@Autowired
	private UserController userController;
	
	@BeforeEach
	public void testBefore(){
		System.out.println("ok from Junit Test");
	}
	
	@Test
	@DisplayName("Junit")
	public void me() {
		assertEquals(1,1);
	}
	
	//User Controller
	@Test
	@DisplayName("RegisterNewUserTesting")
	public void registerNewUserTest() {
		User user=new User("Lakshman","Lakshman","Admin","password");
		assertEquals(user,userController.registerNewUser(user));
	}
	
}
