package com.nt.rookies.asset.management.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
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
