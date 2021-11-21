package com.nt.rookies.asset.management.dto;

import java.util.Date;
import lombok.Data;

@Data
public class AssignmentDTO {
  private Integer id;
  private String assetCode;
  private String assetName;
  private String assignBy;
  private String assignTo;
  private Date assignedDate;
  private String requestBy;
  private String acceptedBy;
  private Date returnedDate;
  private String note;
  private String state;
}
