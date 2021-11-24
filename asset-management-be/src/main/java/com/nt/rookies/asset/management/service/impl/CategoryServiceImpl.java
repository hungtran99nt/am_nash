package com.nt.rookies.asset.management.service.impl;

import com.nt.rookies.asset.management.dto.CategoryDTO;
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
}
