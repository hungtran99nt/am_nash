import moment from "moment";

export const HOST_URL = 'http://localhost:8080';

export const API_URL = 'http://localhost:8080/api/v1.0';

export const DATE_FORMAT = {
    FROM: 'YYYY-MM-DDTHH:mm:ss[Z]',
    TO: "DD/MM/YYYY"
}

export const FILTER_USER_OPTIONS = {
    NONE: '',
    STAFF: 'Staff',
    ADMIN: 'Admin',
}

export const USER_STATUS = {
    NEW: -1,
    DISABLED: 0,
    ACTIVE: 1
}

export const LOGIN_MESSAGE = {
    REQUIRED: "Please login first!",
    FAILED: "Username or password is incorrect. Please try again!"
}

export const FILTER_STATE_OPTIONS = {
    AVAILABLE: 'Available',
    NOT_AVAILABLE: 'Not available',
    ASSIGNED: 'Assigned',
    WAITING_FOR_RECYCLING: 'Waiting for recycling',
    RECYCLED: 'Recycled'
}

export const FILTER_ASM_STATE_OPTIONS = {
    ACCEPTED: 'Accepted',
    WAITING_FOR_ACCEPTANCE: 'Waiting for acceptance',
}

export const FILTER_ASM_STATE_DELETE = {
	ACCEPTED: 'Accepted',
	WAITING_FOR_RETURNING: 'Waiting for returning',
}

export const SORT_ORDERS = {
    ASC: 'asc',
    DESC: 'desc'
}

export const AGE_LIMIT = 567648000000; // 18 years in milliseconds

export const ISO_WEEKEND = [6, 7];

export const TODAY =
    moment(Date.now())
        .set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        })