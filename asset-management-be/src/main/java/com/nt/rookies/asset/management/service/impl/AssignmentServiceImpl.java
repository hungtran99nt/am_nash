package com.nt.rookies.asset.management.service.impl;

import com.nt.rookies.asset.management.common.BaseConstants;
import com.nt.rookies.asset.management.dto.AssignmentDTO;
import com.nt.rookies.asset.management.entity.Asset;
import com.nt.rookies.asset.management.entity.Assignment;
import com.nt.rookies.asset.management.entity.Location;
import com.nt.rookies.asset.management.entity.User;
import com.nt.rookies.asset.management.exception.*;
import com.nt.rookies.asset.management.repository.AssetRepository;
import com.nt.rookies.asset.management.repository.AssignmentRepository;
import com.nt.rookies.asset.management.repository.UserRepository;
import com.nt.rookies.asset.management.service.AssignmentService;
import com.nt.rookies.asset.management.service.UserService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AssignmentServiceImpl implements AssignmentService {
  private static final Logger logger = LoggerFactory.getLogger(AssetServiceImpl.class);

  private final UserService userService;
  private final UserRepository userRepository;
  private final AssetRepository assetRepository;
  private final ModelMapper modelMapper;
  private final AssignmentRepository assignmentRepository;

  public AssignmentServiceImpl(
      UserService userService,
      UserRepository userRepository,
      AssetRepository assetRepository,
      ModelMapper modelMapper,
      AssignmentRepository assignmentRepository) {
    this.userService = userService;
    this.userRepository = userRepository;
    this.assetRepository = assetRepository;
    this.modelMapper = modelMapper;
    this.assignmentRepository = assignmentRepository;
  }

  @Override
  @Transactional
  public AssignmentDTO createAssignment(AssignmentDTO assignmentDTO) {

    Assignment newAssignment = modelMapper.map(assignmentDTO, Assignment.class);
    Assignment createdAssignment = new Assignment();
    User assignBy = userRepository.findByUsername(assignmentDTO.getAssignBy());
    User assignTo = userRepository.findByUsername(assignmentDTO.getAssignTo());
    Asset asset =
        assetRepository
            .findAssetByAssetCode(assignmentDTO.getAssetCode())
            .orElseThrow(() -> new ResourceNotFoundException("Asset not found."));

    if (asset.getState().equals(BaseConstants.ASSET_STATUS_AVAILABLE)
        && assignBy.getLocation().getId().equals(assignTo.getLocation().getId())
        && assignBy.getLocation().getId().equals(asset.getLocation().getId())
        && assignBy.getStatus() != BaseConstants.USER_STATUS_DISABLED
        && assignTo.getStatus() != BaseConstants.USER_STATUS_DISABLED) {

      // Create assignment
      newAssignment.setAssignBy(assignBy);
      newAssignment.setAssignTo(assignTo);
      newAssignment.setAsset(asset);
      newAssignment.setAssignedDate(assignmentDTO.getAssignedDate());
      newAssignment.setNote(assignmentDTO.getNote());
      newAssignment.setState(BaseConstants.ASSIGNMENT_STATUS_ACCEPTING);
      logger.info(
          "Expect; ({}) assigns ({}) to ({}) with note: {}",
          newAssignment.getAssignBy().getUsername(),
          newAssignment.getAsset().getAssetCode(),
          newAssignment.getAssignTo().getUsername(),
          newAssignment.getNote());

      // Save assignment to DB
      createdAssignment = assignmentRepository.save(newAssignment);
      logger.info(
          "Result; ({}) assigns ({}) to ({}) with note: {}",
          createdAssignment.getAssignBy().getUsername(),
          createdAssignment.getAsset().getAssetCode(),
          createdAssignment.getAssignTo().getUsername(),
          createdAssignment.getNote());

      // Change assigned asset to 'Assigned'
      asset.setState(BaseConstants.ASSET_STATUS_ASSIGNED);
      Asset updatedAsset = assetRepository.save(asset);
      logger.info(
          "Set asset ({}) status to {}", updatedAsset.getAssetCode(), updatedAsset.getState());

    } else if (!asset.getState().equals(BaseConstants.ASSET_STATUS_AVAILABLE)) {
      // Asset not available to be assigned
      //      logger.error(
      //          "Asset ({}) status: {} (must be Available)", asset.getAssetCode(),
      // asset.getState());
      throw new AssignmentCreateException("Asset not available");
    } else if (!assignBy.getLocation().getId().equals(assignTo.getLocation().getId())
        || !assignBy.getLocation().getId().equals(asset.getLocation().getId())) {
      // Asset, who creates assign and be assigned must have the same location
      //            logger.error("assignedBy_location: {}, assignedBy_location: {}, asset_location:
      // {} (must be equal)",
      //                    assignBy.getLocation().getId(), assignTo.getLocation().getId(),
      // asset.getLocation().getId());
      throw new AssignmentCreateException(
          "Asset, who assigned and was assigned must has the same location");
    } else if (assignBy.getStatus() == BaseConstants.USER_STATUS_DISABLED
        || assignTo.getStatus() == BaseConstants.USER_STATUS_DISABLED) {
      // who creates assign and be assigned must have active account
      //            logger.error("assignBy_state: {} and assignTo_state: {} (must be -1 or 1)",
      //                    assignBy.getStatus(), assignTo.getStatus());
      throw new AssignmentCreateException("User who has disable account can not be assigned asset");
    }
    return modelMapper.map(createdAssignment, AssignmentDTO.class);
  }

  @Override
  public AssignmentDTO updateAssignment(Integer id, AssignmentDTO assignmentDTO) {
    logger.info("Inside updateAsset({}, {})", id, assignmentDTO);
    Assignment assignment =
        assignmentRepository
            .findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Edit assignment not found."));
    logger.info("Assignment found: {}", assignment);
    assignment.setAssignTo(userRepository.findByUsername(assignmentDTO.getAssignTo()));
    assignment.setAsset(
        assetRepository
            .findAssetByAssetCode(assignmentDTO.getAssetCode())
            .orElseThrow(() -> new ResourceNotFoundException("Asset not found")));
    assignment.setAssignedDate(assignmentDTO.getAssignedDate());
    assignment.setNote(assignmentDTO.getNote());
    logger.info("Assignment edited: {}", assignment);
    Assignment updatedAssignment = assignmentRepository.save(assignment);
    logger.info("Asset updated: {}", updatedAssignment);
    return modelMapper.map(updatedAssignment, AssignmentDTO.class);
  }

  @Override
  public List<AssignmentDTO> getAllAssignmentsByLocation() {
    Location currentAdminLocation = userService.getUserLocation();
    logger.info("Get all in-progress assignments in location: {}", currentAdminLocation);
    List<Assignment> assignments =
        assignmentRepository.findAllByAssetLocation(currentAdminLocation);
    return assignments.stream()
        .filter(
            assignment ->
                assignment.getState().equals(BaseConstants.ASSIGNMENT_STATUS_ACCEPTED)
                    || assignment.getState().equals(BaseConstants.ASSIGNMENT_STATUS_ACCEPTING))
        .map(assignment -> modelMapper.map(assignment, AssignmentDTO.class))
        .collect(Collectors.toList());
  }

  @Override
  public AssignmentDTO getAssignmentById(Integer id) {
    logger.info("Inside getAssignmentById() method");
    Assignment assignment =
        assignmentRepository
            .findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Assignment not found"));
    return modelMapper.map(assignment, AssignmentDTO.class);
  }

  @Override
  public List<AssignmentDTO> getRecentAssignmentsByUser() {
    logger.info("Inside getRecentAssignmentsByUser() method");
    UserDetails userDetails =
        (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    String username = userDetails.getUsername();
    logger.info("Current user: {}", username);
    List<Assignment> assignments = assignmentRepository.findRecentAssignmentsByUser(username);
    return assignments.stream()
        .filter(
            assignment -> !assignment.getState().equals(BaseConstants.ASSIGNMENT_STATUS_DECLINED))
        .map(assignment -> modelMapper.map(assignment, AssignmentDTO.class))
        .collect(Collectors.toList());
  }

  @Override
  public boolean isAssignmentValidToDelete(Integer id) {
    Assignment assignment =
        assignmentRepository
            .getStateById(id)
            .orElseThrow(() -> new AssignmentNotFound("Assignment not found"));
    return !(assignment.getState().equalsIgnoreCase(BaseConstants.ASSIGNMENT_STATUS_ACCEPTED)
        || assignment.getState().equalsIgnoreCase(BaseConstants.ASSIGNMENT_STATUS_RETURNING));
  }

  @Override
  public void deleteAssignment(Integer id) {
    if (isAssignmentValidToDelete(id)) {
      Assignment assignment =
          assignmentRepository
              .findById(id)
              .orElseThrow(() -> new ResourceNotFoundException("Assignment not found"));
      assignmentRepository.delete(assignment);
    } else {
      throw new ResourceDeleteException("Cannot delete this assignment");
    }
  }

  @Override
  public AssignmentDTO acceptAssignment(Integer assignmentID) {
    Assignment assignment =
        assignmentRepository
            .findById(assignmentID)
            .orElseThrow(() -> new ResourceNotFoundException("Assignment not found"));
    // Get user logged in
    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    User acceptedBy = userRepository.findByUsername(username);

    if (acceptedBy == null) throw new ResourceNotFoundException("User not found: " + username);
    if (acceptedBy != assignment.getAssignTo()) throw new BusinessException("Invalid request");
    if (!assignment.getState().equals(BaseConstants.ASSIGNMENT_STATUS_ACCEPTING)) {
      throw new BusinessException("Can not modify assignment with id: " + assignmentID);
    }

    logger.info("Assignment's current state: {}", assignment.getState());

    // Change state assignment to Accepted
    assignment.setState(BaseConstants.ASSIGNMENT_STATUS_ACCEPTED);
    // Set who accepted assignment
    assignment.setAcceptedBy(acceptedBy);

    // Save to DB
    Assignment updatedAssignment = assignmentRepository.save(assignment);

    logger.info("Cur username: {}", username);
    logger.info(
        "Cur user: {} ; {} ; {}",
        acceptedBy.getUsername(),
        acceptedBy.getStatus(),
        acceptedBy.getLocation().getLocationName());
    logger.info("Assignment's state changed to: {}", updatedAssignment.getState());
    logger.info(
        "Assignment {}({}) has accepted by {}",
        updatedAssignment.getId(),
        assignmentID,
        updatedAssignment.getAcceptedBy());
    return modelMapper.map(updatedAssignment, AssignmentDTO.class);
  }

  @Override
  public void declineAssignment(Integer assignmentID) {
    Assignment assignment =
        assignmentRepository
            .findById(assignmentID)
            .orElseThrow(() -> new ResourceNotFoundException("Assignment not found"));

    if (!assignment.getState().equals(BaseConstants.ASSIGNMENT_STATUS_ACCEPTING)) {
      throw new BusinessException("Can not modify assignment with id: " + assignmentID);
    }

    Asset asset = assignment.getAsset();
    logger.info("Assignment's current state: {}", assignment.getState());
    logger.info("Asset's current state: {}", asset.getState());

    // Change state to Declined
    assignment.setState(BaseConstants.ASSIGNMENT_STATUS_DECLINED);
    // Change asset's state to Available
    asset.setState(BaseConstants.ASSET_STATUS_AVAILABLE);

    // Save to DB
    assignmentRepository.save(assignment);
    assetRepository.save(asset);
  }
}
