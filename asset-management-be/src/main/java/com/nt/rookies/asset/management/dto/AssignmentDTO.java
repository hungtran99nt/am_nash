package com.nt.rookies.asset.management.dto;

import com.nt.rookies.asset.management.common.BaseConstants;
import java.util.Date;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Data;

@Data
public class AssignmentDTO {
  private Integer id;

  @NotBlank(message = BaseConstants.ERR_ASSIGNMENT_ASSET_CODE_BLANK)
  private String assetCode;

  @Size(max = 50, message = BaseConstants.ERR_ASSET_NAME_LENGTH)
  private String assetName;

  @NotBlank(message = BaseConstants.ERR_USER_USERNAME_BLANK)
  @Size(max = 30, message = BaseConstants.ERR_USER_USERNAME_LENGTH)
  private String assignBy;

  @NotBlank(message = BaseConstants.ERR_USER_USERNAME_BLANK)
  @Size(max = 30, message = BaseConstants.ERR_USER_USERNAME_LENGTH)
  private String assignTo;

  @NotNull(message = BaseConstants.ERR_ASSIGNMENT_ASSIGNEDDATE_NULL)
  @Future(message = BaseConstants.ERR_ASSIGNMENT_ASSIGNEDDATE_FUTURE)
  private Date assignedDate;

  private String requestBy;
  private String acceptedBy;
  private Date returnedDate;

  @NotBlank(message = BaseConstants.ERR_ASSIGNMENT_NOTE_BLANK)
  @Size(max = 50, message = BaseConstants.ERR_ASSIGNMENT_NOTE_LENGTH)
  private String note;

  @NotBlank(message = BaseConstants.ERR_ASSIGNMENT_STATUS_BLANK)
  private String state;
}
