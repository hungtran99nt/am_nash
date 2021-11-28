package com.nt.rookies.asset.management.service;

import com.nt.rookies.asset.management.repository.CategoryRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.mock.mockito.MockBean;

class CategoryServiceTest {
  @MockBean CategoryService categoryService;
  @Mock CategoryRepository categoryRepository;

  @BeforeEach
  void setUp() {}

  @AfterEach
  void tearDown() {}

  @Test
  void getAllCategories() {}
}
