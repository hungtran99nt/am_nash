package com.nt.rookies.asset.management.dto;

import java.util.Date;
import lombok.Data;

@Data
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
