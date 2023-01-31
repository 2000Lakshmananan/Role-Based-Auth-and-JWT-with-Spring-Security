package com.jwt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwt.dao.ProductInteractionDao;
import com.jwt.entity.ProductInteraction;

@Service
public class ProductInteractionService {

	@Autowired
	private ProductInteractionDao productInteractionDao;
	
	public ProductInteraction saveNewInteractionOfProduct(ProductInteraction productInteraction) {
		System.out.println(productInteraction);
		return productInteractionDao.save(productInteraction);
	}
	
	public List<ProductInteraction> getAllInteractionOfProduct() {
		return (List<ProductInteraction>) productInteractionDao.findAll();
	}
	
	public ProductInteraction findByIdInteractionOfProduct(int id) {
		return productInteractionDao.findById(id);
	}
	
	public void deleteInteractionOfProduct(int id) {
		productInteractionDao.deleteById(id);
	}
	
	public List<ProductInteraction> findByUserNameOfProductInteraction(String username) {
		return productInteractionDao.findByUserName(username);
	}
}
