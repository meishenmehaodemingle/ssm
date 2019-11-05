package com.vip.bd.mapper;

import com.vip.bd.domain.entity.Shop;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ShopMapper {
     List<Shop> findByKeyword(@Param("kw")String kw);
}