package com.jwt.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.jwt.entity.Products;

@Repository
public interface ProductDao extends CrudRepository<Products, Long>{
	
	Products findById(long id);
}
