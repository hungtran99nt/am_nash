package com.nt.rookies.asset.management.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class CategoryDTO {
  private Integer id;
  private String categoryPrefix;
  private String categoryName;
}
