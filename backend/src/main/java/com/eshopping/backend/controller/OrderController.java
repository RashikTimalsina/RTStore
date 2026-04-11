package com.eshopping.backend.controller;

import com.eshopping.backend.dto.OrderRequest;
import com.eshopping.backend.entity.Order;
import com.eshopping.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author RashikTimalsina
 * @created 27/03/2026
 */

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> placeOrder(@RequestBody OrderRequest request){
        Order savedOrder=orderService.placeOrder(request);
        return ResponseEntity.ok(savedOrder);

    }

}
