package com.nt.rookies.asset.management.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter @Getter public class AssetDTO {
    private Integer id;
    private String assetCode;
    private String assetName;
    private String specification;
    private Date installedDate;
    private String state;
    private String location;
    private String category;
}
