package com.vip.bd.controller;

import com.vip.bd.domain.vo.CateGoryVo;
import com.vip.bd.service.IndexService;
import com.vip.bd.utils.CateBean;
import com.vip.bd.utils.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author zhangwei
 */
@RestController
@RequestMapping("/api/v2")
public class IndexController {
    @Resource
    IndexService indexService;

    /**
     * 导航  菜单  轮播
     *
     * @return
     */
    @GetMapping("/heads")
    public Result getHeaderData() {
        try {
            CateBean cateBean = indexService.getHeader();
            return Result.success(cateBean);
        } catch (Exception ex) {
            return Result.error();
        }
    }

    /**
     * 分类下商品信息
     */
    @RequestMapping("/contents")
    public Result getContentData() {
        try {
            List<CateGoryVo> content = indexService.getContent();
            return Result.success(content);
        } catch (Exception e) {
            return Result.error();
        }
    }

}
