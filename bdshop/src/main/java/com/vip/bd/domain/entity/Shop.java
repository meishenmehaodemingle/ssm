package com.vip.bd.domain.entity;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class Shop {
    private Integer shopId;

    private String name;

    private String subTitle;

    private BigDecimal originalPrice;

    private BigDecimal promotePrice;

    private Integer stock;

    private Integer cateId;

    private Date createDate;
}