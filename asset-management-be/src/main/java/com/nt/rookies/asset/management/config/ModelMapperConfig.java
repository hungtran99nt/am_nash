package com.nt.rookies.asset.management.config;

import com.nt.rookies.asset.management.dto.AssignmentDTO;
import com.nt.rookies.asset.management.entity.Assignment;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {
  @Bean
  public ModelMapper modelMapper() {
    ModelMapper modelMapper = new ModelMapper();
    // all fields name must in order
    modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD);

    /* custom mapping from Assignment to AssignmentDTO */
    modelMapper
        .typeMap(Assignment.class, AssignmentDTO.class)
        .addMappings(
            mapper -> {
              mapper.map(src -> src.getAssignBy().getUsername(), AssignmentDTO::setAssignBy);
              mapper.map(src -> src.getAssignTo().getUsername(), AssignmentDTO::setAssignTo);
              mapper.map(src -> src.getRequestBy().getUsername(), AssignmentDTO::setRequestBy);
              mapper.map(src -> src.getAcceptedBy().getUsername(), AssignmentDTO::setAcceptedBy);
            });
    return modelMapper;
  }
}
