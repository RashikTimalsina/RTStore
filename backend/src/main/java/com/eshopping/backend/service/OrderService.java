package com.eshopping.backend.service;

import com.eshopping.backend.dto.OrderRequest;
import com.eshopping.backend.entity.Order;
import com.eshopping.backend.entity.OrderItem;
import com.eshopping.backend.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author RashikTimalsina
 * @created 27/03/2026
 */
@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    public Order placeOrder(OrderRequest request){

        //Create order
        Order order=new Order();
        order.setShippingName(request.getShippingName());
        order.setShippingAddress(request.getShippingAddress());
        order.setShippingCity(request.getShippingCity());
        order.setTotalAmount(request.getTotalAmount());
        order.setShippingZip(request.getShippingZip());

        //Create OrderItems from request
        List<OrderItem> items = request.getItems().stream().map(itemRequest -> {
        OrderItem item = new OrderItem();
        item.setProductId(itemRequest.getProductId());
        item.setQuantity(itemRequest.getQuantity());
        item.setPrice(itemRequest.getPrice());
        item.setOrder(order);
        return item;
        }).collect(Collectors.toList());

        order.setItems(items);

        return orderRepository.save(order);

        }
    }