package com.vip.bd.controller;

import com.vip.bd.domain.entity.Shop;
import com.vip.bd.service.SearchServcie;
import com.vip.bd.utils.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.net.HttpURLConnection;
import java.util.List;

/**
 * 主键索引
 * 普通所有
 * 唯一索引
 * 全文索引
 *  like 关键字 列名 like '%key%'
 *
 * 跨列   商品名称  标题  子标题
 *
 * 跨表
 *
 * 1 首页1
 * 搜索框 -----> 输入关键字
 *  js 获取获取输入的值 -- 浏览器地址栏携带输入的参数(拼接url地址) --> 前端实现跳转
 * 跳转搜搜界面
 * 1> 搜搜界面 --->  获取浏览器地址栏的参数  keyword=电&
 * 2> window.location.search  获取?后面的参数  对字符串的处理 key=value   获取value值
 * 3> 通过ajax请求的搜索的接口
 * 4> DOM操作
 *
 *   详情
 * @author zhangwei
 *  1. 首页的商品信息 ---->展示   DOM操作
 *  2. 详情界面 --- >  显示商品信息  添加购物车 --> 发送ajax请求 add
 *  3. 搜索分页查询   limit
 *
 *
 *
 *
 *   page    size
 *
 *
 *
 *
 */
@RestController
@RequestMapping("/api/v2")
public class SearchController {
    @Resource
    SearchServcie searchServcie;
    @GetMapping("/search")
    public Result<List<Shop>> search(String  keyword){
        try {
            List<Shop> search = searchServcie.search(keyword);
            return Result.success(search);
        } catch (Exception e){
            return Result.error();
        }
    }

    /**
     *
     * 前端界面  page  size
     * 数据库sql start  size
     * 换算的公式   (page-1)  * size
     * 特殊情况
     * 1> 当前端 page size 不传  默认是第一页  size是10'
     * page=   page!=0 ? page:1;
     * size =  size!=0 ? size:10;
     * 2> 最大页数
     *  查询所有的表记录  select count(*)
     *  总记录数 / size  取余 不为0  页码+1
     *
     *
     */

    // 分页的框架  总记录数    最大页数
//    /restful
//    @RequestMapping(/list/{page}/{size})

    @RequestMapping("/list")
    public void  testPage(int page, int size){

    }




}
