package com.nt.rookies.asset.management;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

import com.nt.rookies.asset.management.dto.AccountDTO;
import com.nt.rookies.asset.management.dto.AssetDTO;
import com.nt.rookies.asset.management.dto.AssignmentDTO;
import com.nt.rookies.asset.management.dto.CategoryDTO;
import com.nt.rookies.asset.management.dto.UserDTO;
import com.nt.rookies.asset.management.entity.Asset;
import com.nt.rookies.asset.management.entity.Assignment;
import com.nt.rookies.asset.management.entity.Category;
import com.nt.rookies.asset.management.entity.User;
import com.nt.rookies.asset.management.repository.AssetRepository;
import com.nt.rookies.asset.management.repository.AssignmentRepository;
import com.nt.rookies.asset.management.repository.CategoryRepository;
import com.nt.rookies.asset.management.repository.UserRepository;
import com.nt.rookies.asset.management.service.UserService;
import java.util.Calendar;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class DTOModelMapperTests {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());
  @Autowired private UserRepository userRepository;
  @Autowired private AssetRepository assetRepository;
  @Autowired private CategoryRepository categoryRepository;
  @Autowired private AssignmentRepository assignmentRepository;
  @Autowired private ModelMapper modelMapper;
  @Autowired private UserService userService;

  @Test
  void testUserMapper_EntityToDTO() {
    User user = userRepository.findById(3).get();
    logger.info("User: {}", user);
    UserDTO userDTO = modelMapper.map(user, UserDTO.class);
    logger.info("UserDTO: {}", userDTO);

    assertAll(
        () -> assertEquals(user.getId(), userDTO.getId()),
        () -> assertEquals(user.getStaffCode(), userDTO.getStaffCode()),
        () -> assertEquals(user.getFirstName(), userDTO.getFirstName()),
        () -> assertEquals(user.getLastName(), userDTO.getLastName()),
        () -> assertEquals(user.getUsername(), userDTO.getUsername()),
        () -> assertEquals(user.getJoinedDate(), userDTO.getJoinedDate()),
        () -> assertEquals(user.getGender(), userDTO.getGender()),
        () -> assertEquals(user.getBirthDate(), userDTO.getBirthDate()),
        () -> assertEquals(user.getType(), userDTO.getType()),
        () -> assertEquals(user.getStatus(), userDTO.getStatus()),
        // important
        () -> assertEquals(user.getLocation().getLocationName(), userDTO.getLocation()));
  }

  @Test
  void testUserMapper_DTOToEntity() {
    UserDTO userDTO = new UserDTO();
    userDTO.setFirstName("Phuong");
    userDTO.setLastName("Ngo Van");
    userDTO.setBirthDate(Calendar.getInstance().getTime());
    userDTO.setGender("Male");
    userDTO.setJoinedDate(Calendar.getInstance().getTime());
    userDTO.setType("Admin");
    logger.info("UserDTO: {}", userDTO);
    User user = modelMapper.map(userDTO, User.class);
    logger.info("User: {}", user);

    assertAll(
        () -> assertEquals(user.getId(), userDTO.getId()),
        () -> assertEquals(user.getStaffCode(), userDTO.getStaffCode()),
        () -> assertEquals(user.getFirstName(), userDTO.getFirstName()),
        () -> assertEquals(user.getLastName(), userDTO.getLastName()),
        () -> assertEquals(user.getUsername(), userDTO.getUsername()),
        () -> assertEquals(user.getJoinedDate(), userDTO.getJoinedDate()),
        () -> assertEquals(user.getGender(), userDTO.getGender()),
        () -> assertEquals(user.getBirthDate(), userDTO.getBirthDate()),
        () -> assertEquals(user.getType(), userDTO.getType()),
        () -> assertEquals(user.getStatus(), userDTO.getStatus())
    );
  }

  @Test
  void testAssetMapper_EntityToDTO() {
    Asset asset = assetRepository.findById(2).get();
    logger.info("Asset: {}", asset);
    AssetDTO assetDTO = modelMapper.map(asset, AssetDTO.class);
    logger.info("AssetDTO: {}", assetDTO);

    assertAll(
        () -> assertEquals(asset.getId(), assetDTO.getId()),
        () -> assertEquals(asset.getAssetCode(), assetDTO.getAssetCode()),
        () -> assertEquals(asset.getAssetName(), assetDTO.getAssetName()),
        () -> assertEquals(asset.getSpecification(), assetDTO.getSpecification()),
        () -> assertEquals(asset.getInstalledDate(), assetDTO.getInstalledDate()),
        () -> assertEquals(asset.getState(), assetDTO.getState()),
        // important
        () -> assertEquals(asset.getLocation().getLocationName(), assetDTO.getLocation()),
        () -> assertEquals(asset.getCategory().getCategoryName(), assetDTO.getCategoryName()));
  }

  @Test
  void testCategoryMapper_EntityToDTO() {
    Category category = categoryRepository.findById(2).get();
    logger.info("Category: {}", category);
    CategoryDTO categoryDTO = modelMapper.map(category, CategoryDTO.class);
    logger.info("CategoryDTO: {}", categoryDTO);
    assertAll(
        () -> assertEquals(category.getId(), categoryDTO.getId()),
        () -> assertEquals(category.getCategoryPrefix(), categoryDTO.getCategoryPrefix()),
        () -> assertEquals(category.getCategoryName(), categoryDTO.getCategoryName()));
  }

  @Test
  void testCategoryMapper_DTOtoEntity() {
    CategoryDTO categoryDTO = new CategoryDTO();
    categoryDTO.setCategoryName("Laptop");
    categoryDTO.setCategoryPrefix("LA");
    logger.info("CategoryDTO: {}", categoryDTO);
    Category category = modelMapper.map(categoryDTO, Category.class);
    logger.info("Category: {}", category);

    assertAll(
        () -> assertEquals(category.getId(), categoryDTO.getId()),
        () -> assertEquals(category.getCategoryPrefix(), categoryDTO.getCategoryPrefix()),
        () -> assertEquals(category.getCategoryName(), categoryDTO.getCategoryName()));
  }

  @Test
  void testAssignmentMapper() {
    Assignment assignment = assignmentRepository.findById(1).get();
    logger.info("Assignment: {}", assignment);
    AssignmentDTO assignmentDTO = modelMapper.map(assignment, AssignmentDTO.class);
    logger.info("AssignmentDTO: {}", assignmentDTO);

    assertAll(
        () -> assertEquals(assignment.getId(), assignmentDTO.getId()),
        () -> assertEquals(assignment.getAsset().getAssetCode(), assignmentDTO.getAssetCode()),
        () -> assertEquals(assignment.getAsset().getAssetName(), assignmentDTO.getAssetName()),
        () -> assertEquals(assignment.getAssignedDate(), assignmentDTO.getAssignedDate()),
        () -> assertEquals(assignment.getReturnedDate(), assignmentDTO.getReturnedDate()),
        () -> assertEquals(assignment.getNote(), assignmentDTO.getNote()),
        () -> assertEquals(assignment.getState(), assignmentDTO.getState()),
        // important
        () -> assertEquals(assignment.getAssignBy().getUsername(), assignmentDTO.getAssignBy()),
        () -> assertEquals(assignment.getAssignTo().getUsername(), assignmentDTO.getAssignTo())
        //        () -> assertEquals(assignment.getRequestBy().getUsername(),
        // assignmentDTO.getRequestBy()),
        //        () -> assertEquals(assignment.getAcceptedBy().getUsername(),
        // assignmentDTO.getAcceptedBy())
        );
  }

  @Test
  void testAccountMapper() {
    User user = userRepository.findByUsername("phuongnv");
    logger.info("User: {}", user);
    AccountDTO account = userService.findActiveByUsername("phuongnv").get();
    logger.info("AccountDTO: {}", account);

    assertAll(
        () -> assertEquals(user.getUsername(), account.getUsername()),
        () -> assertEquals(user.getPassword(), account.getPassword()),
        () -> assertEquals(user.getType(), account.getType()));
  }
}
