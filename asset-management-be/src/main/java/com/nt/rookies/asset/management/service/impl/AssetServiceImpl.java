package com.nt.rookies.asset.management.service.impl;

import com.nt.rookies.asset.management.dto.AssetDTO;
import com.nt.rookies.asset.management.entity.Asset;
import com.nt.rookies.asset.management.entity.Location;
import com.nt.rookies.asset.management.exception.ResourceNotFoundException;
import com.nt.rookies.asset.management.repository.AssetRepository;
import com.nt.rookies.asset.management.service.AssetService;
import com.nt.rookies.asset.management.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AssetServiceImpl  implements AssetService {
  private static final Logger logger = LoggerFactory.getLogger(AssetServiceImpl.class);

  private final UserService userService;
  private final AssetRepository assetRepository;
  private final ModelMapper modelMapper;

  @Autowired
  public AssetServiceImpl(UserService userService, AssetRepository assetRepository, ModelMapper modelMapper) {
    this.userService = userService;
    this.assetRepository = assetRepository;
    this.modelMapper = modelMapper;
  }

  private String generateAssetCode(Asset asset) {
    StringBuilder staffCode = new StringBuilder(asset.getCategory().getCategoryPrefix());
    staffCode.append(StringUtils.leftPad(asset.getId().toString(), 4, "0"));
    logger.info("staffCode: {}", staffCode);
    return staffCode.toString();
  }

  @Override
  public List<AssetDTO> findAllByLocation() {
    Location currentLocation = userService.getUserLocation();
    List<Asset> assets =  assetRepository.findAllByLocation(currentLocation);
    return assets.stream()
            .map(asset -> modelMapper.map(asset, AssetDTO.class))
            .collect(Collectors.toList());
  }

  @Override
  public AssetDTO getAssetById(Integer id) {
    logger.info("Inside getAssetById({})", id);
    Asset asset = assetRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Asset not found."));
    logger.info("Asset with id={}: {}", id, asset);
    return modelMapper.map(asset, AssetDTO.class);
  }
}
