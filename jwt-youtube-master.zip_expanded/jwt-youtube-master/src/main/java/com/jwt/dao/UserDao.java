package com.jwt.dao;

import com.jwt.entity.Role;
import com.jwt.entity.User;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends CrudRepository<User, String> {
	
	List<User> findByUserLastName(String lastName);
	
	void deleteByUserName(String userName);
	
	User findByUserName(String userName);
}
