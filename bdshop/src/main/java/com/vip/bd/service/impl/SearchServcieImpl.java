package com.vip.bd.service.impl;

import com.vip.bd.domain.entity.Shop;
import com.vip.bd.mapper.ShopMapper;
import com.vip.bd.service.SearchServcie;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class SearchServcieImpl implements SearchServcie {
    @Resource
    ShopMapper shopMapper;

    @Override
    public List<Shop> search(String kw) {
        return shopMapper.findByKeyword(kw);
    }
}
