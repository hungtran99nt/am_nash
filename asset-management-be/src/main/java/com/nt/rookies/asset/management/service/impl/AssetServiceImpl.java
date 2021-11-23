package com.nt.rookies.asset.management.service.impl;

import com.nt.rookies.asset.management.entity.Asset;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AssetServiceImpl {
  private static final Logger logger = LoggerFactory.getLogger(AssetServiceImpl.class);

  private String generateAssetCode(Asset asset) {
    StringBuilder staffCode = new StringBuilder(asset.getCategory().getCategoryPrefix());
    staffCode.append(StringUtils.leftPad(asset.getId().toString(), 4, "0"));
    logger.info("staffCode: {}", staffCode);
    return staffCode.toString();
  }
}
