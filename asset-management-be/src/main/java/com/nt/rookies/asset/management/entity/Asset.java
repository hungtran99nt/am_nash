package com.nt.rookies.asset.management.entity;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "asset")
public class Asset {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id", nullable = false)
  private Integer id;

  @Column(name = "asset_code", unique = true, length = 9)
  private String assetCode;

  @Column(name = "asset_name", length = 50, nullable = false)
  private String assetName;

  @Column(name = "specification", length = 300, nullable = false)
  private String specification;

  @Column(name = "installed_date", nullable = false)
  private Date installedDate;

  @Column(name = "state", length = 30, nullable = false)
  private String state;

  @ManyToOne
  @JoinColumn(name = "location_id", nullable = false)
  private Location location;

  @ManyToOne
  @JoinColumn(name = "category_id", nullable = false)
  private Category category;
}
