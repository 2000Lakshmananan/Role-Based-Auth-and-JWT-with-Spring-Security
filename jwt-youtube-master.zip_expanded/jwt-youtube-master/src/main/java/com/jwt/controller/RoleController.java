package com.jwt.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.jwt.dao.RoleDao;
import com.jwt.entity.Role;
import com.jwt.service.RoleService;
import com.jwt.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class RoleController {

    @Autowired
    private RoleService roleService;
    
    @Autowired
    private RoleDao roleDao;
    
    @Autowired
    private UserService userService;

    @PostMapping({"/createNewRole"})
    public Role createNewRole(@RequestBody Role role) {
    	System.out.println("Role desc "+role.getRoleDescription()+" "+role.getRoleName());
        return roleService.createNewRole(role);
    }
    
    @GetMapping("/getRoles")
    public List<Role> getAllRoles()
    {
    	return (List<Role>) roleDao.findAll();
    }
    
    @DeleteMapping("/delete/{rolename}")
    public void deleteRole(@PathVariable("rolename") String rolename) {
//    	System.out.println(roleDao.allrolesss());
    	Role role=roleDao.findByRoleName(rolename);
    	userService.deleteUsers(role.getRoleName());
    	roleDao.delete(role);
    	System.out.println("From Role Table Deleted Successfully");
    }
    
}
