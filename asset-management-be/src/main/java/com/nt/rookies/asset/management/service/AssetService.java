package com.nt.rookies.asset.management.service;

import com.nt.rookies.asset.management.dto.AssetDTO;

import java.util.List;

/** Service interface for Asset. */
public interface AssetService {

    /**
     * Get all assets by admin location.
     *
     * @return {@link List<AssetDTO>}
     */
    List<AssetDTO> findAllByLocation();

    /**
    * Check an asset is valid to delete
    *
    * @param id asset id
    * @return boolean value
    * */
    boolean isValidToDelete(Integer id);

    /**
     * Delete an asset by id
     *
     * @param id asset id
     * **/
    void deleteAsset(Integer id);
}
