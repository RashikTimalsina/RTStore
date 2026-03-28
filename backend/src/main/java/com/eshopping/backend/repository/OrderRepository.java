package com.eshopping.backend.repository;

import com.eshopping.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author RashikTimalsina
 * @created 27/03/2026
 */

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

}
