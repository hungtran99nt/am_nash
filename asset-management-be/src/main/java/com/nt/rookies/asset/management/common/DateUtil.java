package com.nt.rookies.asset.management.common;

import org.apache.commons.lang3.StringUtils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.regex.Pattern;

import static com.nt.rookies.asset.management.common.BaseConstants.*;

public class DateUtil {

    private static final int NOON = 12;
    private static final Pattern PATTERN_TIMESTAMP = Pattern.compile("^\\d{4}[/|\\-]?\\d{1,2}[/|\\-]?\\d{1,2}(| \\d{1,2}:\\d{1,2}(|:\\d{1,2}(|\\.\\d{1,3})))$");

    private static final int FIRST_HOUR = 0;
    private static final int FIRST_MINUTE = 0;
    private static final int FIRST_SECOND = 0;
    private static final int FIRST_MILLISECOND = 0;


    public static boolean isValidYearMonth(String date) {
        try {
            new SimpleDateFormat(PATTERN_TIMESTAMP_D_SLASH).parse(date);
            return true;
        } catch (ParseException e) {
            return false;
        }
    }

    public static boolean isValidDate(String date) {

        if (date == null) {
            return false;
        }

        String[] ymd = date.split("/", -1);
        if (ymd.length != 3) {
            return false;
        }

        int year;
        int month;
        int day;
        try {
            year = Integer.parseInt(ymd[0]);
            month = Integer.parseInt(ymd[1]);
            day = Integer.parseInt(ymd[2]);
        } catch (NumberFormatException e) {
            return false;
        }

        return isValidDate(year, month, day);
    }

    public static boolean isValidDate(int year, int month, int day) {

        Calendar calendar = new GregorianCalendar(year, month - 1, day);

        return calendar.get(Calendar.YEAR) == year && calendar.get(Calendar.MONTH) == (month - 1) && calendar.get(Calendar.DAY_OF_MONTH) == day;
    }

    public static boolean isValidTimestamp(String date, String hour, String minute, String second, String millisec) {
        try {
            convertToDate(concat(date, hour, minute, second, millisec));
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

    public static Date convertToDate(String str) {

        if (StringUtils.isEmpty(str)) {
            throw new IllegalArgumentException("field must be TIMESTAMP or DATE format.");
        }

        if (!PATTERN_TIMESTAMP.matcher(str).matches()) {
            throw new IllegalArgumentException("field must be TIMESTAMP or DATE format.");
        }

        Date _result;

        // TIMESTAMP format. (yyyymmdd hh:mm:ss.sss)
        _result = convertDateSub(str, PATTERN_TIMESTAMP_A);
        if (null != _result) {
            return _result;
        }

        // TIMESTAMP format. (yyyymmdd hh:mm:ss)
        _result = convertDateSub(str, PATTERN_TIMESTAMP_B);
        if (null != _result) {
            return _result;
        }

        // TIMESTAMP format. (yyyymmdd hh:mm)
        _result = convertDateSub(str, PATTERN_TIMESTAMP_C);
        if (null != _result) {
            return _result;
        }

        // TIMESTAMP format. (yyyymmdd)
        _result = convertDateSub(str, PATTERN_TIMESTAMP_D);
        if (null != _result) {
            return _result;
        }

        // TIMESTAMP format. (yy-mm-dd hh:mm:ss.sss)
        _result = convertDateSub(str, PATTERN_TIMESTAMP_A_HYPHEN);
        if (null != _result) {
            return _result;
        }

        // TIMESTAMP format. (yy-mm-dd hh:mm:ss)
        _result = convertDateSub(str, PATTERN_TIMESTAMP_B_HYPHEN);
        if (null != _result) {
            return _result;
        }

        // TIMESTAMP format. (yy-mm-dd hh:mm)
        _result = convertDateSub(str, PATTERN_TIMESTAMP_C_HYPHEN);
        if (null != _result) {
            return _result;
        }

        // TIMESTAMP format. (yy-mm-dd)
        _result = convertDateSub(str, PATTERN_TIMESTAMP_D_HYPHEN);
        if (null != _result) {
            return _result;
        }

        // TIMESTAMP format. (yy/mm/dd hh:mm:ss.sss)
        _result = convertDateSub(str, PATTERN_TIMESTAMP_A_SLASH);
        if (null != _result) {
            return _result;
        }

        // TIMESTAMP format. (yy/mm/dd hh:mm:ss)
        _result = convertDateSub(str, PATTERN_TIMESTAMP_B_SLASH);
        if (null != _result) {
            return _result;
        }

        // TIMESTAMP format. (yy/mm/dd hh:mm)
        _result = convertDateSub(str, PATTERN_TIMESTAMP_C_SLASH);
        if (null != _result) {
            return _result;
        }

        // DATE format. (yy/mm/dd)
        _result = convertDateSub(str, PATTERN_TIMESTAMP_D_SLASH);
        if (null != _result) {
            return _result;
        }

        throw new IllegalArgumentException("field must be TIMESTAMP or DATE format.");

    }

    public static String concat(String date, String hour, String minute, String second, String millisec) {
        return new StringBuilder(date).append(" ").append(hour).append(":").append(minute).append(":").append(second).append(".").append(millisec).toString();
    }

    public static String format(Date date, String pattern) {
        return format(date, new SimpleDateFormat(pattern));
    }

    public static String format(Date date, DateFormat format) {
        if (date == null) {
            return "";
        }
        return format.format(date);
    }

    /**
     * return the first time of specified day.<br>
     * ex:
     * <pre>
     *  // 2004/1/2 12:11:10.000
     *  getDayFirstTime(new Date(2004, 0, 2, 12, 11, 10)
     *      == Date(2004, 0, 2, 0, 0 ,0)    //2004/1/2 0:0:0.000
     * </pre>
     *
     * @param date Date
     * @return Date the first time of specified day.
     */
    public static Date getDayFirstTime(Date date) {

        if (null == date) {
            return null;
        } else {
            //set original date
            Calendar _orgCalendar = Calendar.getInstance();
            _orgCalendar.setTime(date);

            //set changed date
            Calendar _newCalendar = Calendar.getInstance();
            _newCalendar.set(_orgCalendar.get(Calendar.YEAR), _orgCalendar.get(Calendar.MONTH), _orgCalendar.get(Calendar.DAY_OF_MONTH), FIRST_HOUR, FIRST_MINUTE, FIRST_SECOND);
            _newCalendar.set(Calendar.MILLISECOND, FIRST_MILLISECOND);

            return _newCalendar.getTime();
        }
    }

    /**
     * return the last time of specified day.<br>
     * ex:
     * <pre>
     *  // 2004/1/2 12:11:10
     *  getDayFirstTime(new Date(2004, 0, 2, 12, 11, 10)
     *      == Date(2004, 0, 2, 23, 59 ,59.999) //2004/1/2 23:59:59.999
     * </pre>
     *
     * @param date Date
     * @return Date the last time of the specified day.
     */
    public static Date getDayLastTime(Date date) {

        if (null == date) {
            return null;
        } else {
            //set original date
            Calendar _orgCalendar = Calendar.getInstance();
            _orgCalendar.setTime(date);

            //set changed date
            Calendar _newCalendar = Calendar.getInstance();
            _newCalendar.set(_orgCalendar.get(Calendar.YEAR), _orgCalendar.get(Calendar.MONTH), _orgCalendar.get(Calendar.DAY_OF_MONTH) + 1, FIRST_HOUR, FIRST_MINUTE, FIRST_SECOND);
            _newCalendar.set(Calendar.MILLISECOND, FIRST_MILLISECOND);
            _newCalendar.setTimeInMillis(_newCalendar.getTimeInMillis() - 1);

            return _newCalendar.getTime();
        }
    }

    public static Date addDaysTo(Date date, int addDays) {

        Calendar _c = new GregorianCalendar();
        _c.setTime(date);
        _c.add(Calendar.DATE, addDays);
        return _c.getTime();
    }

    // ***** protected method *****
    // ***** private method *****
    private static Date convertDateSub(Object obj, String pattern) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat(pattern);
            sdf.setLenient(false);
            return sdf.parse((String) obj);
        } catch (ParseException e) {
            return null;
        }
    }

    public static Date getDayNoonTime(Date date) {

        Calendar _cal = Calendar.getInstance();
        _cal.setTime(date);
        _cal.set(Calendar.HOUR_OF_DAY, NOON);
        _cal.set(Calendar.MINUTE, 0);
        _cal.set(Calendar.SECOND, 0);
        _cal.set(Calendar.MILLISECOND, 0);

        return _cal.getTime();
    }

    public static Date getDayNoonTime(String date) {
        Date _date = convertToDate(date);
        return getDayNoonTime(_date);
    }

}
