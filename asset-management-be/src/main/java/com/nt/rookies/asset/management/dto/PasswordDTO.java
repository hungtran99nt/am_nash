package com.nt.rookies.asset.management.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class PasswordDTO {

  @NotBlank private String newPassword;
  @NotBlank private String oldPassword;
}
