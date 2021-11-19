package com.nt.rookies.asset.management.dto;

import lombok.Data;

@Data
public class ReportDTO {
  private String categoryName;
  private Integer total;
  private Integer assigned;
  private Integer available;
  private Integer notAvailable;
  private Integer waitingForRecycling;
  private Integer recycled;
}
