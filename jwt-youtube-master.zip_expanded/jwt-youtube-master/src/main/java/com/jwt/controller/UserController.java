package com.jwt.controller;

import com.jwt.dao.RoleDao;
import com.jwt.dao.UserDao;
import com.jwt.entity.Role;
import com.jwt.entity.User;
import com.jwt.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

import javax.annotation.PostConstruct;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private UserDao userDao;
    
    @Autowired
    private RoleDao roleDao;

    //No use
    @PostConstruct
    public void initRoleAndUser() {
        userService.initRoleAndUser();
    }

    @PostMapping({"/registerNewUser"})
    public User registerNewUser(@RequestBody User user) {
        return userService.registerNewUser(user);
    }
    
    @GetMapping("/getusers")
    public List<User> returnAllUsers(){
    	return userService.allUsers();
    }
    
    @GetMapping("/getUserByUserName/{username}")
    public Optional<User> getUserByUserName(@PathVariable("username") String username) {
    	return userService.getUserByUsername(username);
    }
    
    @DeleteMapping("/deleteUser/{username}")
    public void deleteUser(@PathVariable("username") String username) {
    	User user=userDao.findByUserName(username);
    	Role role=roleDao.findByRoleName(user.getUserLastName());
    	userDao.deleteById(username);
    	roleDao.save(role);
    	System.out.println("From User Deleted Successfully");
    }

    @GetMapping({"/forAdmin"})
    @PreAuthorize("hasRole('Admin')")
    public String forAdmin(){
        return "This URL is only accessible for the admin. Not for you!!!";
    }

    @GetMapping({"/forUser"})
    @PreAuthorize("hasRole('User')")
    public String forUser(){
        return "This URL is only accessible to the user. Not for you!!!";
    }
    
}
