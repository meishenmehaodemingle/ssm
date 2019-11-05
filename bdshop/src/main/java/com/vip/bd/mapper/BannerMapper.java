package com.vip.bd.mapper;

import com.vip.bd.domain.entity.Banner;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author zhangwei
 */
public interface BannerMapper {
     List<Banner>  findAll(@Param("ord") String ord);
}