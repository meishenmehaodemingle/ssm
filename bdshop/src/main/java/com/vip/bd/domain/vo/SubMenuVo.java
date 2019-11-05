package com.vip.bd.domain.vo;

import com.vip.bd.domain.entity.SubMenu;
import com.vip.bd.domain.entity.SubMenu1;
import lombok.Data;

import java.util.List;

@Data
public class SubMenuVo extends SubMenu {
    List<SubMenu1>  subMenu1List;
}
