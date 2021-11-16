package com.nt.rookies.asset.management.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Setter @Getter @Entity @Table(name = "location") @ToString public class Location {
    @Id @Column(name = "id", nullable = false) private Integer id;

    @Column(name = "location_name", length = 20, nullable = false) private String locationName;
}
