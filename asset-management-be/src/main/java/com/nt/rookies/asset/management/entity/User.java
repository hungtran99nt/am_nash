package com.nt.rookies.asset.management.entity;

import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "user")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id", nullable = false)
  private Integer id;

  @Column(name = "staff_code", unique = true, length = 6)
  private String staffCode;

  @Column(name = "first_name", length = 50, nullable = false)
  private String firstName;

  @Column(name = "last_name", length = 50, nullable = false)
  private String lastName;

  @Column(name = "username", unique = true, length = 30)
  private String username;

  @Column(name = "password", length = 30, nullable = false)
  private String password;

  @Column(name = "joined_date", nullable = false)
  private Date joinedDate;

  @Column(name = "gender", length = 10, nullable = false)
  private String gender;

  @Column(name = "birth_date", nullable = false)
  private Date birthDate;

  @Column(name = "type", length = 10, nullable = false)
  private String type;

  @Column(name = "disable", nullable = false)
  private boolean disable;

  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "location_id", nullable = false)
  private Location location;

  @OneToMany(mappedBy = "assignTo", cascade = CascadeType.ALL)
  @ToString.Exclude
  private List<Assignment> assignTo;

  @OneToMany(mappedBy = "assignBy", cascade = CascadeType.ALL)
  @ToString.Exclude
  private List<Assignment> assignBy;

  @OneToMany(mappedBy = "requestBy", cascade = CascadeType.ALL)
  @ToString.Exclude
  private List<Assignment> requestBy;

  @OneToMany(mappedBy = "acceptedBy", cascade = CascadeType.ALL)
  @ToString.Exclude
  private List<Assignment> acceptedBy;
}
