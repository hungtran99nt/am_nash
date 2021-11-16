package com.nt.rookies.asset.management.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Setter @Getter @Entity @Table(name = "category") @ToString public class Category {
    @Id @Column(name = "id", nullable = false) private Integer id;

    @Column(name = "category_prefix", length = 3, unique = true, nullable = false) private String categoryPrefix;

    @Column(name = "category_name", length = 30, unique = true, nullable = false) private String categoryName;
}
