package com.eshopping.backend.repository;

import com.eshopping.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author RashikTimalsina
 * @created 27/03/2026
 */

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {



}