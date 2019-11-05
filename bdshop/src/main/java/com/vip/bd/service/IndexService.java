package com.vip.bd.service;

import com.vip.bd.domain.vo.CateGoryVo;
import com.vip.bd.utils.CateBean;

import java.util.List;


public interface IndexService {
    CateBean getHeader();
    List<CateGoryVo> getContent();
}
