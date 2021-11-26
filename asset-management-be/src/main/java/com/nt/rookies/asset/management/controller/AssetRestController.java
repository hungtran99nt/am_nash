package com.nt.rookies.asset.management.controller;

import com.nt.rookies.asset.management.dto.AssetDTO;
import com.nt.rookies.asset.management.exception.ResourceDeleteException;
import com.nt.rookies.asset.management.service.AssetService;
import com.nt.rookies.asset.management.service.UserService;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/** REST controller for asset. */
@RestController
@RequestMapping("/api/v1.0/assets")
public class AssetRestController {
  public final AssetService assetService;
  public static final Logger log = LoggerFactory.getLogger(AssetRestController.class);

  @Autowired
  public AssetRestController(AssetService assetService, UserService userService) {
    this.assetService = assetService;
  }

  @GetMapping()
  @ApiOperation("Get all assets follow location of admin")
  public List<AssetDTO> getAllAssets() {
    return assetService.findAllByLocation();
  }

  @GetMapping("/{id}/valid")
  @ApiOperation(value = "Check an asset id is valid to delete", response = Boolean.class)
  public boolean isValidToDelete(@PathVariable(name = "id") Integer id) {
    log.info("Check an asset id {} is valid to delete", id);
    return assetService.isValidToDelete(id);
  }

  @DeleteMapping("/{id}")
  @ApiOperation(value = "Delete asset by id", response = String.class)
  public ResponseEntity<?> deleteAsset(@PathVariable(name = "id") Integer id) {
    if (isValidToDelete(id)){
      assetService.deleteAsset(id);
      log.info("Delete post with id {}", id);
      return ResponseEntity.ok("Post deleted");
    } else {
      throw new ResourceDeleteException("Cannot delete this asset");
    }
  }
}
