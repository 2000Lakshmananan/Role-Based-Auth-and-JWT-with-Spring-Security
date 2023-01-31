package com.jwt.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.jwt.entity.ProductInteraction;
import com.jwt.entity.Products;
import com.jwt.service.ProductInteractionService;
import com.jwt.service.ProductService;
import com.jwt.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ProductInteractionService productInteractionService;
	
	
	@PostMapping("/newProduct")
	public Products registerNewProduct(@RequestBody Products product) {
		System.out.println("Product name"+product.getProductName());
		System.out.println("Product "+product);
//		System.out.println(product.setProductAvailable(12));
		return productService.newProductRegister(product);
	}
	
	@GetMapping("/getProductById/{id}")
	public Products getProductById(@PathVariable("id") long id) {
		return productService.getProductByIds(id);
	}
	
	@PutMapping("/placeProductForUser")
	public ProductInteraction placeProductForUser(@RequestBody ProductInteraction productInteraction) {
		System.out.println(productInteraction);
		List<ProductInteraction> product=productInteractionService.findByUserNameOfProductInteraction(productInteraction.getUserName());
		for(ProductInteraction pro:product) {
			if(pro.getProductId() == productInteraction.getProductId()) {
				productInteraction.setId(pro.getId());
				productInteraction.setAddToCard(productInteraction.isAddToCard());
				productInteraction.setProductNeed(pro.getProductNeed() + productInteraction.getProductNeed());
				return productInteractionService.saveNewInteractionOfProduct(productInteraction);
			}
		}
		return productInteractionService.saveNewInteractionOfProduct(productInteraction);	
	}
	
	@GetMapping("/getAllProductInteractions")
	public List<ProductInteraction> getAllProductInteractions() {
		return productInteractionService.getAllInteractionOfProduct();
	}
	
	@GetMapping("/getProductInteractionByUserName/{username}")
	public List<ProductInteraction> getProductInteractionByUserName(@PathVariable("username") String username) {
//		System.out.println(username);
		return productInteractionService.findByUserNameOfProductInteraction(username);
	}
	
	@GetMapping("/getProductInteractionById/{id}")
	public ProductInteraction getProductInteractionByProductInteractionId(@PathVariable("id") int id) {
		return productInteractionService.findByIdInteractionOfProduct(id);
	}
	
	@GetMapping("/getAllProducts")
	public List<Products> getAllProducts(){
		return productService.getAllProducts();
	}
	
	@DeleteMapping("/deleteProduct/{id}")
	public void deleteProduct(@PathVariable("id") long id) {
		productService.deleteProduct(id);
	}
}
