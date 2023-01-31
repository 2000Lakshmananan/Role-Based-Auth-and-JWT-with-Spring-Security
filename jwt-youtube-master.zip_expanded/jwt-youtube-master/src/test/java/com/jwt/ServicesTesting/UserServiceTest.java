package com.jwt.ServicesTesting;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.jwt.dao.UserDao;
import com.jwt.entity.Role;
import com.jwt.entity.User;
import com.jwt.service.UserService;

@SpringBootTest
public class UserServiceTest {

	@Autowired
	private UserService userService;
	
	@MockBean
	private UserDao userDao;
	
	@Mock
	private PasswordEncoder passwordEncoder;
	
	@Test
	public void registerNewUserTest() {

		User user = new User();
		user.setUserFirstName("First Name");
		user.setUserLastName("Admin");
		user.setUserName("UserName");
		user.setUserPassword("UserPassword");
		when(userDao.save(user)).thenReturn(user);
//		when().thenReturn()     //Whenever calling the when, It will return the thenReturn value.
		assertEquals(user.getUserLastName(), userService.registerNewUser(user).getUserLastName());
	}

	@Test
	public void allUsersTest() {
		
		Role role1 = new Role();
		role1.setRoleName("Admin");
		role1.setRoleDescription("Admin is always ultimate.");
		Role role2 = new Role();
		role2.setRoleName("HR");
		role2.setRoleDescription("HR can controls everything.");
		Set<Role> roleSet1 = new HashSet<>();
		roleSet1.add(role1);
		Set<Role> roleSet2 = new HashSet<>();
		roleSet2.add(role2);
		User user1 = new User("Lakshman", "Admin", "Lakshmana", "Lakshman");
		User user2 = new User("Lakshman", "HR", "Lakshmana", "Lakshman");
		user1.setRole(roleSet1);
		user2.setRole(roleSet2);
		when(userDao.findAll()).thenReturn(Stream.of(user1, user2).collect(Collectors.toList()));
		assertEquals(2, userService.allUsers().size());
	}
	

}
