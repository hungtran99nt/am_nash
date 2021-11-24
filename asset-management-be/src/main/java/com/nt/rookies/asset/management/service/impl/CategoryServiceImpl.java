package com.nt.rookies.asset.management.service.impl;

import com.nt.rookies.asset.management.dto.CategoryDTO;
import com.nt.rookies.asset.management.entity.Category;
import com.nt.rookies.asset.management.exception.ResourceAlreadyExistsException;
import com.nt.rookies.asset.management.repository.CategoryRepository;
import com.nt.rookies.asset.management.service.CategoryService;
import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/** Implementation of <code>CategoryService</code>. */
@Service
public class CategoryServiceImpl implements CategoryService {
  private static final Logger logger = LoggerFactory.getLogger(CategoryServiceImpl.class);
  private final CategoryRepository repository;
  private final ModelMapper modelMapper;

  @Autowired
  public CategoryServiceImpl(CategoryRepository categoryRepository, ModelMapper modelMapper) {
    this.repository = categoryRepository;
    this.modelMapper = modelMapper;
  }

  @Override
  public List<CategoryDTO> getAllCategories() {
    logger.info("Inside getAllCategories() method");
    return repository.findAll().stream()
        .map(category -> modelMapper.map(category, CategoryDTO.class))
        .collect(Collectors.toList());
  }

  @Override
  public CategoryDTO createCategory(CategoryDTO category) {
    logger.info("Inside createCategory() method");
    //    assert category != null : "Category is null";
    //    assert category.getCategoryName() != null && category.getCategoryPrefix() != null : "";
    //    assert category.getCategoryName().length() <= 30 && !category.getCategoryName().isEmpty()
    //        : "Category name should not be empty and should not exceed 30 characters";
    //    assert category.getCategoryPrefix().length() <= 3 &&
    // !category.getCategoryPrefix().isEmpty()
    //        : "Category prefix should not be empty and should not exceed 3 characters";

    Category categoryEntity = modelMapper.map(category, Category.class);
    logger.info("New category: {}", categoryEntity);
    try {
      Category createdCategory = repository.save(categoryEntity);
      logger.info("Created category: {}", createdCategory);
      return modelMapper.map(createdCategory, CategoryDTO.class);
    } catch (Exception e) {
      logger.error("Exception occurred while creating category: {}", e.getMessage());
      throw new ResourceAlreadyExistsException("Category name or prefix is already exists");
    }
  }
}
