package com.nt.rookies.asset.management.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Data;

@Data
public class CategoryDTO {
  private Integer id;

  @NotNull(message = "Category prefix is required")
  @NotBlank(message = "Category prefix cannot be blank")
  @Size(max = 3, message = "Category prefix cannot more than 3 characters long")
  private String categoryPrefix;

  @NotNull(message = "Category name is required")
  @NotBlank(message = "Category name cannot be blank")
  @Size(max = 30, message = "Category name cannot be more than 30 characters")
  private String categoryName;
}
