package com.nt.rookies.asset.management.repository;

import com.nt.rookies.asset.management.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
  /**
   * Get category by its name
   *
   * @param name category name
   * @return {@link Category} founded category
   */
  Category findByCategoryName(String name);
}
