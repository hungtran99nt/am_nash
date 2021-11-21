package com.nt.rookies.asset.management.repository;

import com.nt.rookies.asset.management.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Integer> {}
