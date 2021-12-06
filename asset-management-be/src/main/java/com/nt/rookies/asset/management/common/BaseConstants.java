package com.nt.rookies.asset.management.common;

public class BaseConstants {

  /*---------------------------------------------------------------------
   *                     Date format pattern
   *-------------------------------------------------------------------*/
  /** DATE FORMAT ORA YMDHMS */
  public static final String PATTERN_ORA_DATE_YMDHMS_FORMAT = "yyyy/mm/dd hh24:mi:ss";
  /** TIMESTAMP pattern for ORACLE */
  public static final String PATTERN_ORA_TIMESTAMP = "yy-MM-dd HH:mm:ss.SSS";

  public static final String PATTERN_ORA_TIMESTAMP_A_S = "yy/MM/dd HH:mm:ss.SSS";
  public static final String PATTERN_ORA_TIMESTAMP_B = "yy-MM-dd HH:mm:ss";
  public static final String PATTERN_ORA_TIMESTAMP_B_S = "yy/MM/dd HH:mm:ss";
  public static final String PATTERN_ORA_TIMESTAMP_C = "yy-MM-dd HH:mm";
  public static final String PATTERN_ORA_TIMESTAMP_C_S = "yy/MM/dd HH:mm";
  public static final String PATTERN_ORA_TIMESTAMP_D = "yy-MM-dd";
  public static final String PATTERN_ORA_TIMESTAMP_E = "yyyy-MM-dd HH:mm:ss";
  public static final String PATTERN_ORA_TIMESTAMP_E_S = "yyyy/MM/dd HH:mm:ss";

  public static final String PATTERN_TIMESTAMP_A = "yyyyMMdd HH:mm:ss.SSS";
  public static final String PATTERN_TIMESTAMP_A_HYPHEN = "yyyy-MM-dd HH:mm:ss.SSS";
  public static final String PATTERN_TIMESTAMP_A_SLASH = "yyyy/MM/dd HH:mm:ss.SSS";
  public static final String PATTERN_TIMESTAMP_B = "yyyyMMdd HH:mm:ss";
  public static final String PATTERN_TIMESTAMP_B_HYPHEN = "yyyy-MM-dd HH:mm:ss";
  public static final String PATTERN_TIMESTAMP_B_SLASH = "yyyy/MM/dd HH:mm:ss";
  public static final String PATTERN_TIMESTAMP_C = "yyyyMMdd HH:mm";
  public static final String PATTERN_TIMESTAMP_C_HYPHEN = "yyyy-MM-dd HH:mm";
  public static final String PATTERN_TIMESTAMP_C_SLASH = "yyyy/MM/dd HH:mm";
  public static final String PATTERN_TIMESTAMP_D = "yyyyMMdd";
  public static final String PATTERN_TIMESTAMP_D_HYPHEN = "yyyy-MM-dd";
  public static final String PATTERN_TIMESTAMP_D_SLASH = "yyyy/MM/dd";

  public static final String PATTERN_MONTH_DAY_YEAR = "MMM dd, yyyy";
  public static final String PATTERN_HMS = "HHmmss";
  public static final String PATTERN_TIMESTAMP_HM = "HH:mm";

  /*---------------------------------------------------------------------
   *                     USER STATUS
   *-------------------------------------------------------------------*/
  public static final int USER_STATUS_ACTIVE = 1;
  public static final int USER_STATUS_DISABLED = 0;
  public static final int USER_STATUS_NEW = -1;
  /*---------------------------------------------------------------------

   *                     ASSIGNMENT STATUS
   *-------------------------------------------------------------------*/
  public static final String ASSIGNMENT_STATUS_ACCEPTED = "Accepted";
  public static final String ASSIGNMENT_STATUS_DECLINED = "Declined";
  public static final String ASSIGNMENT_STATUS_RETURNING = "Waiting for returning";
  public static final String ASSIGNMENT_STATUS_ACCEPTING = "Waiting for acceptance";
  public static final String ASSIGNMENT_STATUS_COMPLETED = "Completed";

  /*---------------------------------------------------------------------
   *                     ASSET STATUS
   *-------------------------------------------------------------------*/
  public static final String ASSET_STATUS_AVAILABLE = "Available";
  public static final String ASSET_STATUS_UNAVAILABLE = "Not Available";
  public static final String ASSET_STATUS_ASSIGNED = "Assigned";
  public static final String ASSET_STATUS_RECYCLING = "Wait for recycling";
  public static final String ASSET_STATUS_RECYCLED = "Recycled";
   /*                     ERROR MESSAGE
   *-------------------------------------------------------------------*/
  public static final String ERR_CATEGORY_PREFIX_BLANK = "Category prefix cannot be blank";
  public static final String ERR_CATEGORY_PREFIX_LENGTH =
      "Category prefix cannot more than 3 characters long";
  public static final String ERR_CATEGORY_NAME_BLANK = "Category name cannot be blank";
  public static final String ERR_CATEGORY_NAME_LENGTH =
      "Category name cannot be more than 30 characters";

  public static final String ERR_ASSET_NAME_BLANK = "Asset name cannot be blank";
  public static final String ERR_ASSET_NAME_LENGTH = "Asset name cannot be more than 50 characters";
  public static final String ERR_ASSET_SPECIFICATION_BLANK = "Specification cannot be blank";
  public static final String ERR_ASSET_SPECIFICATION_LENGTH =
      "Specification must be less than 300 characters";
  public static final String ERR_ASSET_INSTALLEDDATE_LENGTH = "Installation date is required";
  public static final String ERR_ASSET_STATE_BLANK = "Asset state cannot be blank";
  public static final String ERR_ASSET_STATE_LENGTH =
      "Asset state cannot be more than 30 characters";

  public static final String ERR_USER_USERNAME_BLANK = "Username cannot be blank";
  public static final String ERR_USER_USERNAME_LENGTH =
      "Username cannot be more than 30 characters";

  public static final String ERR_ASSIGNMENT_ASSIGNEDDATE_NULL = "Assigned date is required";
  public static final String ERR_ASSIGNMENT_ASSIGNEDDATE_FUTURE =
      "Assigned date must be future date";
  public static final String ERR_ASSIGNMENT_NOTE_BLANK = "Assignment note cannot be blank";
  public static final String ERR_ASSIGNMENT_NOTE_LENGTH =
      "Assignment note cannot be more than 300 characters";
  public static final String ERR_ASSIGNMENT_ASSET_CODE_BLANK =
          "Asset code cannot be blank";
  public static final String ERR_ASSIGNMENT_STATUS_BLANK =
          "Assignment status must be initialized";
  // ***** constructor *****
  // ***** public method *****
  // ***** protected method *****
  // ***** private method *****
  // ***** call back method *****
  // ***** getter and setter *****

}
