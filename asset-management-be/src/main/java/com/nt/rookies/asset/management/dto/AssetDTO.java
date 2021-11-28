package com.nt.rookies.asset.management.dto;

import com.nt.rookies.asset.management.common.BaseConstants;
import java.util.Date;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Data;

@Data
public class AssetDTO {
  private Integer id;
  private String assetCode;

  @NotNull(message = BaseConstants.ERR_ASSET_NAME_REQUIRED)
  @NotBlank(message = BaseConstants.ERR_ASSET_NAME_BLANK)
  @Size(max = 50, message = BaseConstants.ERR_ASSET_NAME_LENGTH)
  private String assetName;

  @NotNull(message = BaseConstants.ERR_ASSET_SPECIFICATION_REQUIRED)
  @NotBlank(message = BaseConstants.ERR_ASSET_SPECIFICATION_BLANK)
  @Size(max = 300, message = BaseConstants.ERR_ASSET_SPECIFICATION_LENGTH)
  private String specification;

  @NotNull(message = BaseConstants.ERR_ASSET_INSTALLEDDATE_LENGTH)
  private Date installedDate;

  @NotNull(message = BaseConstants.ERR_ASSET_STATE_REQUIRED)
  @NotBlank(message = BaseConstants.ERR_ASSET_STATE_BLANK)
  @Size(max = 30, message = BaseConstants.ERR_ASSET_STATE_LENGTH)
  private String state;

  private String location;

  @NotNull(message = BaseConstants.ERR_CATEGORY_NAME_REQUIRED)
  @NotBlank(message = BaseConstants.ERR_CATEGORY_NAME_BLANK)
  @Size(max = 30, message = BaseConstants.ERR_CATEGORY_NAME_LENGTH)
  private String categoryName;
}
