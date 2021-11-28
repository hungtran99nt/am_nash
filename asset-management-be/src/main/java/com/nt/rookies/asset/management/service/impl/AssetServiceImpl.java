package com.nt.rookies.asset.management.service.impl;

import com.nt.rookies.asset.management.dto.AssetDTO;
import com.nt.rookies.asset.management.entity.Asset;
import com.nt.rookies.asset.management.entity.Category;
import com.nt.rookies.asset.management.entity.Location;
import com.nt.rookies.asset.management.exception.ResourceDeleteException;
import com.nt.rookies.asset.management.exception.ResourceNotFoundException;
import com.nt.rookies.asset.management.repository.AssetRepository;
import com.nt.rookies.asset.management.repository.AssignmentRepository;
import com.nt.rookies.asset.management.repository.CategoryRepository;
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
public class AssetServiceImpl implements AssetService {
  private static final Logger logger = LoggerFactory.getLogger(AssetServiceImpl.class);

  private final UserService userService;
  private final AssetRepository assetRepository;
  private final CategoryRepository categoryRepository;
  private final ModelMapper modelMapper;
  private final AssignmentRepository assignmentRepository;

  @Autowired
  public AssetServiceImpl(
      UserService userService,
      AssetRepository assetRepository,
      CategoryRepository categoryRepository,
      ModelMapper modelMapper,
      AssignmentRepository assignmentRepository
  ) {
    this.userService = userService;
    this.assetRepository = assetRepository;
    this.categoryRepository = categoryRepository;
    this.modelMapper = modelMapper;
    this.assignmentRepository = assignmentRepository;
  }

  @Override
  public List<AssetDTO> findAllByLocation() {
    Location currentLocation = userService.getUserLocation();
    List<Asset> assets = assetRepository.findAllByLocation(currentLocation);
    return assets.stream()
        .map(asset -> modelMapper.map(asset, AssetDTO.class))
        .collect(Collectors.toList());
  }

  @Override
  public AssetDTO getAssetById(Integer id) {
    logger.info("Inside getAssetById({})", id);
    // TODO: validate id
    Asset asset =
        assetRepository
            .findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Asset not found."));
    logger.info("Asset with id={}: {}", id, asset);
    return modelMapper.map(asset, AssetDTO.class);
  }

  @Override
  public AssetDTO createAsset(AssetDTO assetDTO) {
    logger.info("Inside createAsset({})", assetDTO);
    // TODO: validate asset

    Asset asset = modelMapper.map(assetDTO, Asset.class);
    Category category = categoryRepository.findByCategoryName(assetDTO.getCategoryName());
    asset.setCategory(category);
    asset.setLocation(userService.getUserLocation());
    logger.info("New asset: {}", asset);

    Asset createdAsset = assetRepository.save(asset);
    String assetCode = generateAssetCode(createdAsset.getId(), category);
    createdAsset.setAssetCode(assetCode);
    createdAsset = assetRepository.save(createdAsset); // update asset code
    logger.info("Asset created: {}", createdAsset);
    return modelMapper.map(createdAsset, AssetDTO.class);
  }

  private String generateAssetCode(Integer assetId, Category category) {
    StringBuilder staffCode = new StringBuilder(category.getCategoryPrefix());
    staffCode.append(StringUtils.leftPad(assetId.toString(), 4, "0"));
    logger.info("staffCode: {}", staffCode);
    return staffCode.toString();
  }

  @Override
  public boolean isValidToDelete(Integer assetId){
    if (assetId == null) throw new IllegalArgumentException("Id is invalid");
    return assignmentRepository.getTotalHistoricalAssigmentOfAnAsset(assetId) <= 0;
  }

  @Override
  public void deleteAsset(Integer id) {
    if (isValidToDelete(id)) {
      Asset asset = assetRepository.findById(id)
              .orElseThrow(() -> new ResourceNotFoundException("Asset not found"));
      assetRepository.delete(asset);
    } else {
      throw new ResourceDeleteException("Cannot delete this asset, it belong one or more historical assignment");
    }
  }
}
