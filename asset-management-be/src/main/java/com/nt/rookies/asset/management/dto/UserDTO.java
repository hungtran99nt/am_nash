package com.nt.rookies.asset.management.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
public class UserDTO {
  private Integer id;
  private String staffCode;
  private String firstName;
  private String lastName;
  private String username;
  private Date joinedDate;
  private String gender;
  private Date birthDate;
  private String type;
  private boolean disable;
  private String location;
}
