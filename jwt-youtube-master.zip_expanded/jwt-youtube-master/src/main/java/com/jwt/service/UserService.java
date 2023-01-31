package com.jwt.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jwt.dao.RoleDao;
import com.jwt.dao.UserDao;
import com.jwt.entity.Role;
import com.jwt.entity.User;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void initRoleAndUser() {
//
//        Role adminRole = new Role();
//        adminRole.setRoleName("Admin");
//        adminRole.setRoleDescription("Admin role can control everything.");
//        roleDao.save(adminRole);
//
//        Role userRole = new Role();
//        userRole.setRoleName("User");
//        userRole.setRoleDescription("User role have some own credentials!!!");
//        roleDao.save(userRole);
//
//        User adminUser = new User();
//        adminUser.setUserName("admin123");
//        adminUser.setUserPassword(getEncodedPassword("admin123"));
//        adminUser.setUserFirstName("admin");
//        adminUser.setUserLastName("admin");
//        Set<Role> adminRoles = new HashSet<>();
//        adminRoles.add(adminRole);
//        adminUser.setRole(adminRoles);
//        userDao.save(adminUser);
//
//        User user = new User();
//        user.setUserName("lk123");
//        user.setUserPassword(getEncodedPassword("lk123"));
//        user.setUserFirstName("Lakshman");
//        user.setUserLastName("kannan");
//        Set<Role> userRoles = new HashSet<>();
//        userRoles.add(userRole);
//        user.setRole(userRoles);
//        userDao.save(user);
    }

    public User registerNewUser(User user) {
//    	if(user.getUserLastName().equals("Admin")) {
//    		Role role = roleDao.findById("Admin").get();
//            Set<Role> userRoles = new HashSet<>();
//            userRoles.add(role);
//            user.setRole(userRoles);
//            user.setUserPassword(getEncodedPassword(user.getUserPassword()));
//            return userDao.save(user);
//    	}else {
//    		Role role = roleDao.findById("User").get();
//            Set<Role> userRoles = new HashSet<>();
//            userRoles.add(role);
//            user.setRole(userRoles);
//            user.setUserPassword(getEncodedPassword(user.getUserPassword()));
//            return userDao.save(user);
//    	}
//    	List<Role> roles=roleController.getAllRoles();
////    	for(int i=0;i<roles.size();i++)
////    	{
////    		
////    	}
        Role role = roleDao.findById(user.getUserLastName()).get();
        Set<Role> userRoles = new HashSet<>();
        userRoles.add(role);
        user.setRole(userRoles);
        user.setUserPassword(getEncodedPassword(user.getUserPassword()));
        return userDao.save(user);
    }
    
    public List<User> allUsers() {
    	return (List<User>) userDao.findAll();
    }

    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }
    
    public Optional<User> getUserByUsername(String username) {
    	return userDao.findById(username);
    }
    
    public User gettingUserByUserName(String username) {
    	return userDao.findByUserName(username);
    }
    
    public void deleteUsers(String roleName) {
    	List<User> users=userDao.findByUserLastName(roleName);
    	userDao.deleteAll(users);
    	System.out.println("From User Table Deleted Successfully");
    }

}
