package com.nt.rookies.asset.management.controller;

import com.nt.rookies.asset.management.dto.AssetDTO;
import com.nt.rookies.asset.management.service.AssetService;
import com.nt.rookies.asset.management.service.UserService;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
}
