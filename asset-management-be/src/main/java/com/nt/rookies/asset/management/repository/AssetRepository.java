package com.nt.rookies.asset.management.repository;

import com.nt.rookies.asset.management.entity.Asset;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssetRepository extends JpaRepository<Asset, Integer> {

}
