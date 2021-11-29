package com.nt.rookies.asset.management.repository;

import com.nt.rookies.asset.management.entity.Asset;
import com.nt.rookies.asset.management.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Integer> {

    /**
    * Get asset by location
    *
    * @return {@link List<Asset>}
    * */
    List<Asset> findAllByLocation(Location location);

    /**
     * Delete asset by id
     *
     * @param id the id of an asset, Integer value
     *  */
    void deleteById(Integer id);

    Asset findAssetByAssetCode(String assetCode);
}
