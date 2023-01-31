package com.jwt.ServicesTesting;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.jwt.entity.Role;
import com.jwt.service.RoleService;

@SpringBootTest
public class RoleServiceTest {

	@Autowired
	private RoleService roleService;
	
	@Test
	public void createNewRoleTesting() {
		Role role = new Role();
		role.setRoleDescription("Role is won");
		role.setRoleName("Role");

		Role role1 = new Role();
		role1.setRoleDescription("Role1 is won");
		role1.setRoleName("Role1");

		assertEquals(role, roleService.createNewRole(role));
		assertEquals(role1, roleService.createNewRole(role1));
	}
}
