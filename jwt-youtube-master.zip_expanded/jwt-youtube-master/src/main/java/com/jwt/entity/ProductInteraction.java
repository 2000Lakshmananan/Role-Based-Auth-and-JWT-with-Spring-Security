package com.jwt.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductInteraction {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private long productId;
	private String userName;
	private boolean addToCard;
	private int productNeed;
	private String approval;
	private String approvedDate;
}
