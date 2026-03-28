package com.eshopping.backend.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * @author RashikTimalsina
 * @created 27/03/2026
 */

@Data
public class OrderRequest {

    private String shippingName;
    private String shippingAddress;
    private String shippingCity;
    private String shippingZip;
    private BigDecimal totalAmount;
    private LocalDateTime createdAt;
    private List<OrderItemRequest> items;

    @Data
    public static class OrderItemRequest {
        private Long productId;
        private Integer quantity;
        private BigDecimal price;

    }


}

