package com.nt.rookies.asset.management.dto;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class AssetDTO {
  private Integer id;
  private String assetCode;
  private String assetName;
  private String specification;
  private Date installedDate;
  private String state;
  private String location;
  private String categoryName;
}
