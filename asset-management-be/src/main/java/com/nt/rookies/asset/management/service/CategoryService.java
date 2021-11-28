package com.nt.rookies.asset.management.service;

import com.nt.rookies.asset.management.dto.CategoryDTO;
import com.nt.rookies.asset.management.exception.ResourceAlreadyExistsException;
import java.util.List;

/** Service interface for Category. */
public interface CategoryService {

  /**
   * Get all categories.
   *
   * @return category list in DTO
   */
  List<CategoryDTO> getAllCategories();

  /**
   * Create new category.
   *
   * @param category new category
   * @return created category in DTO
   * @exception ResourceAlreadyExistsException when duplicate name or prefix
   */
  CategoryDTO createCategory(CategoryDTO category);
}
