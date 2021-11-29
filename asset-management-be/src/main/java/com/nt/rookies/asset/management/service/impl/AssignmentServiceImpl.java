package com.nt.rookies.asset.management.service.impl;

import com.nt.rookies.asset.management.common.BaseConstants;
import com.nt.rookies.asset.management.dto.AssetDTO;
import com.nt.rookies.asset.management.dto.AssignmentDTO;
import com.nt.rookies.asset.management.dto.UserDTO;
import com.nt.rookies.asset.management.entity.Asset;
import com.nt.rookies.asset.management.entity.Assignment;
import com.nt.rookies.asset.management.entity.User;
import com.nt.rookies.asset.management.repository.AssetRepository;
import com.nt.rookies.asset.management.repository.AssignmentRepository;
import com.nt.rookies.asset.management.repository.UserRepository;
import com.nt.rookies.asset.management.service.AssignmentService;
import com.nt.rookies.asset.management.service.UserService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssignmentServiceImpl implements AssignmentService {
    private static final Logger logger = LoggerFactory.getLogger(AssetServiceImpl.class);

    private final UserService userService;
    private final UserRepository userRepository;
    private final AssetRepository assetRepository;
    private final ModelMapper modelMapper;
    private final AssignmentRepository assignmentRepository;

    public AssignmentServiceImpl(UserService userService,
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

    // TODO validate user active and asset available
    @Override
    public AssignmentDTO createAssignment(AssignmentDTO assignmentDTO) {
        Assignment newAssignment = modelMapper.map(assignmentDTO, Assignment.class);
        User assignBy = userRepository.findByUsername(assignmentDTO.getAssignBy());
        User assignTo = userRepository.findByUsername(assignmentDTO.getAssignTo());
        Asset asset = assetRepository.findAssetByAssetCode(assignmentDTO.getAssetCode());

        newAssignment.setAssignBy(assignBy);
        newAssignment.setAssignTo(assignTo);
        newAssignment.setAsset(asset);
        newAssignment.setAssignedDate(assignmentDTO.getAssignedDate());
        newAssignment.setNote(assignmentDTO.getNote());
        newAssignment.setState(BaseConstants.ASSIGNMENT_STATUS_ACCEPTING);
        logger.info("New assignment: {}", newAssignment);
        Assignment createdAssignment = assignmentRepository.save(newAssignment);
        logger.info("Assignment created: {}", createdAssignment);
        return modelMapper.map(createdAssignment, AssignmentDTO.class);
    }
    //TODO change asset status to not available after create assignment
    @Override
    public boolean isValidToCreate(String assignToUsername, String assetCode) {
        return false;
    }

    @Override
    public List<AssignmentDTO> findAllByUsername() {
        return null;
    }
}
