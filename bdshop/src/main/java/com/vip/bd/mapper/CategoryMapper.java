package com.vip.bd.mapper;



import com.vip.bd.domain.vo.CateGoryVo;

import java.util.List;

public interface CategoryMapper {
    List<CateGoryVo> findAll();
    List<CateGoryVo> findShops();


}