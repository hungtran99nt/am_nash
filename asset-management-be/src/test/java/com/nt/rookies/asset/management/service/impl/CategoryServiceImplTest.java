package com.nt.rookies.asset.management.service.impl;

import static org.junit.jupiter.api.Assertions.assertThrows;

import com.nt.rookies.asset.management.dto.CategoryDTO;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class CategoryServiceImplTest {
  @Autowired CategoryServiceImpl categoryServiceImpl;

  @Test
  void getAllCategories() {}

  @Test
  void createCategory() {
    CategoryDTO categoryDTO = null;
//    try {
//      categoryServiceImpl.createCategory(categoryDTO);
//    } catch (NullPointerException e) {
//      e.getMessage();
//      e.printStackTrace();
//    }
//    assertThrows(
//        IllegalArgumentException.class,
//        () -> categoryServiceImpl.createCategory(null),
//        "Category is null");
  }
}
