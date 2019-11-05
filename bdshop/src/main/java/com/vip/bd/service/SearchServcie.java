package com.vip.bd.service;

import com.vip.bd.domain.entity.Shop;

import java.util.List;

public interface SearchServcie {
    public List<Shop> search(String kw);

}
