package com.nt.rookies.asset.management.dto;

import com.nt.rookies.asset.management.common.BaseConstants;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Data;

@Data
public class CategoryDTO {
  private Integer id;

  @NotNull(message = BaseConstants.ERR_CATEGORY_PREFIX_REQUIRED)
  @NotBlank(message = BaseConstants.ERR_CATEGORY_PREFIX_BLANK)
  @Size(max = 3, message = BaseConstants.ERR_CATEGORY_PREFIX_LENGTH)
  private String categoryPrefix;

  @NotNull(message = BaseConstants.ERR_CATEGORY_NAME_REQUIRED)
  @NotBlank(message = BaseConstants.ERR_CATEGORY_NAME_BLANK)
  @Size(max = 30, message = BaseConstants.ERR_CATEGORY_NAME_LENGTH)
  private String categoryName;
}
