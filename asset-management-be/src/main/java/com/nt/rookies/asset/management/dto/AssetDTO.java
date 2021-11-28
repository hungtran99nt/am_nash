package com.nt.rookies.asset.management.dto;

import java.util.Date;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Data;

@Data
public class AssetDTO {
  private Integer id;
  private String assetCode;

  @NotNull(message = "Asset name is required")
  @NotBlank(message = "Asset name cannot be blank")
  @Size(max = 50, message = "Asset name must be less than 50 characters")
  private String assetName;

  @NotNull(message = "Specification is required")
  @NotBlank(message = "Specification cannot be blank")
  @Size(max = 300, message = "Specification must be less than 300 characters")
  private String specification;

  @NotNull(message = "Installation date is required")
  private Date installedDate;

  @NotNull(message = "State is required")
  @NotBlank(message = "State cannot be blank")
  @Size(max = 30, message = "State must be less than 30 characters")
  private String state;

  private String location;

  @NotNull(message = "Category name is required")
  @NotBlank(message = "Category name cannot be blank")
  @Size(max = 30, message = "Category name must be less than 30 characters")
  private String categoryName;
}
