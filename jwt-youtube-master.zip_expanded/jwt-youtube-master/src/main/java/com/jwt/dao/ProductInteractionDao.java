package com.jwt.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.jwt.entity.ProductInteraction;

@Repository
public interface ProductInteractionDao extends CrudRepository<ProductInteraction, Integer>{
	
	ProductInteraction findById(int id);
	
	List<ProductInteraction> findByUserName(String username);
}
