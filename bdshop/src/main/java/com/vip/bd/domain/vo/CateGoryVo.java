package com.vip.bd.domain.vo;

import com.vip.bd.domain.entity.Category;
import com.vip.bd.domain.entity.Shop;
import com.vip.bd.domain.entity.SubMenu;
import lombok.Data;

import java.util.List;

@Data
public class CateGoryVo extends Category {
    List<SubMenu> subMenuList;
    List<Shop> shops;
}
