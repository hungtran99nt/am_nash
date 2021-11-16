package com.nt.rookies.asset.management.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter public class ReportDTO {
    private String categoryName;
    private Integer total;
    private Integer assigned;
    private Integer available;
    private Integer notAvailable;
    private Integer waitingForRecycling;
    private Integer recycled;
}
