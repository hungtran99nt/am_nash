package com.nt.rookies.asset.management.controller;

import com.nt.rookies.asset.management.dto.CategoryDTO;
import com.nt.rookies.asset.management.service.CategoryService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** REST controller for Category. */
@RestController
@RequestMapping("/api/v1.0/categories")
public class CategoryRestController {
  private final CategoryService categoryService;

  @Autowired
  public CategoryRestController(CategoryService categoryService) {
    this.categoryService = categoryService;
  }

  @GetMapping()
  public List<CategoryDTO> getAllCategories() {
    return categoryService.getAllCategories();
  }
}
