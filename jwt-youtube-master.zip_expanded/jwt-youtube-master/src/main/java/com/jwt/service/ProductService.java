package com.jwt.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwt.dao.ProductDao;
import com.jwt.dao.UserDao;
import com.jwt.entity.Products;
import com.jwt.entity.User;

@Service
public class ProductService {
	
	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private UserDao userDao;
	
	public Products newProductRegister(Products product) {
		return productDao.save(product);
	}
	
	public Products getByProductID(long id) {
		return productDao.findById(id);
	}
	
	public Products placeUserForProductRespectively(Products product) {
		return productDao.save(product);
	}
	
	public Products getProductByIds(long id) {
		return productDao.findById(id);
	}
	
	public List<Products> getAllProducts() {
		return (List<Products>) productDao.findAll();
	}
	
	public void deleteProduct(long id) {
		productDao.deleteById(id);
	}
}
