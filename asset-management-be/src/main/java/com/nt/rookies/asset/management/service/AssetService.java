package com.nt.rookies.asset.management.service;

import com.nt.rookies.asset.management.dto.AssetDTO;
import com.nt.rookies.asset.management.exception.ResourceNotFoundException;
import java.util.List;

/** Service interface for Asset. */
public interface AssetService {

  /**
   * Check an asset is valid to delete
   *
   * @param id asset id
   * @return boolean value
   */
  boolean isValidToDelete(Integer id);

  /**
   * Delete an asset by id
   *
   * @param id asset id *
   */
  void deleteAsset(Integer id);

  /**
   * Get all assets by admin location.
   *
   * @return {@link List<AssetDTO>}
   */
  List<AssetDTO> findAllByLocation();

  /**
   * Get asset by id.
   *
   * @param id asset id
   * @return {@link AssetDTO} object if found
   * @exception ResourceNotFoundException if asset not found
   */
  AssetDTO getAssetById(Integer id);

  /**
   * Create new asset.
   *
   * @param assetDTO new asset
   * @return created {@link AssetDTO} object
   */
  AssetDTO createAsset(AssetDTO assetDTO);


}
