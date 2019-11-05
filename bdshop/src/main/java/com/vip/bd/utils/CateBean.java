package com.vip.bd.utils;

import com.vip.bd.domain.entity.Banner;
import com.vip.bd.domain.entity.Navigation;
import com.vip.bd.domain.vo.CateGoryVo;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * @author zhangwei
 */
@Data
public class CateBean implements Serializable {
    List<Banner> banners;
    List<Navigation> navigations;
    List<CateGoryVo> cateGoryVos;
}
