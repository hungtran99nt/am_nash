package com.nt.rookies.asset.management.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReportDTO {
  private String categoryName;
  private Integer total;
  private Integer assigned;
  private Integer available;
  private Integer notAvailable;
  private Integer waitingForRecycling;
  private Integer recycled;
}
