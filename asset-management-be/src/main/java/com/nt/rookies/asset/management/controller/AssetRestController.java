package com.nt.rookies.asset.management.controller;

import com.nt.rookies.asset.management.dto.AssetDTO;
import com.nt.rookies.asset.management.dto.UserDTO;
import com.nt.rookies.asset.management.service.AssetService;
import com.nt.rookies.asset.management.service.UserService;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** REST controller for asset. */
@RestController
@RequestMapping("/api/v1.0/assets")
public class AssetRestController {
  public final AssetService assetService;

  @Autowired
  public AssetRestController(AssetService assetService, UserService userService) {
    this.assetService = assetService;
  }

  @GetMapping()
  @ApiOperation("Get all assets follow location of admin")
  public List<AssetDTO> getAllAssets() {
    return assetService.findAllByLocation();
  }

  /**
   * @param id asset id
   * @return {@link AssetDTO} found by id
   */
  @GetMapping("/{id}")
  public AssetDTO getAssetById(@PathVariable(name = "id") Integer id) {
    return assetService.getAssetById(id);
  }
}
