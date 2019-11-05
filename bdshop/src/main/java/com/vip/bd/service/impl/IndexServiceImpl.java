package com.vip.bd.service.impl;


import com.vip.bd.domain.entity.Banner;
import com.vip.bd.domain.entity.Navigation;
import com.vip.bd.domain.vo.CateGoryVo;
import com.vip.bd.mapper.BannerMapper;
import com.vip.bd.mapper.CategoryMapper;
import com.vip.bd.mapper.NavigationMapper;
import com.vip.bd.service.IndexService;
import com.vip.bd.utils.CateBean;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 *
 * @author zhangwei
 */
@Service("indexService")
public class IndexServiceImpl implements IndexService {
    @Resource
    BannerMapper bannerMapper;
    @Resource
    CategoryMapper categoryMapper;
    @Resource
    NavigationMapper navigationMapper;

    @Override
    public CateBean getHeader() {
        CateBean bean = new CateBean();
        List<Banner> banners = bannerMapper.findAll("order");
        List<Navigation> navigations = navigationMapper.findNavigations();
        List<CateGoryVo> cateGoryVos = categoryMapper.findAll();
        bean.setBanners(banners);
        bean.setCateGoryVos(cateGoryVos);
        bean.setNavigations(navigations);
        return bean;
    }

    @Override
    public List<CateGoryVo> getContent() {
        List<CateGoryVo> shops = categoryMapper.findShops();
        return shops;
    }
}
