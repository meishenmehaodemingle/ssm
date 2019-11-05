package com.vip.bd.mapper;


import com.vip.bd.domain.entity.Navigation;

import java.util.List;

/**
 * '导航操作
 */
public interface NavigationMapper {
    List<Navigation> findNavigations();
}