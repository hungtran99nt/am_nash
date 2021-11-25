package com.nt.rookies.asset.management.service;

import com.nt.rookies.asset.management.dto.CategoryDTO;
import java.util.List;

/** Service interface for Category. */
public interface CategoryService {

  /**
   * Get all categories.
   *
   * @return category list in DTO
   */
  List<CategoryDTO> getAllCategories();
}
