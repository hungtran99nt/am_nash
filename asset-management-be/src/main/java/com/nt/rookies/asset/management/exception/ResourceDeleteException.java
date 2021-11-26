package com.nt.rookies.asset.management.exception;

public class ResourceDeleteException extends BusinessException{

    public ResourceDeleteException() {
    }

    public ResourceDeleteException(String msg) {
        super(msg);
    }

    public ResourceDeleteException(String msg, Throwable e) {
        super(msg, e);
    }

    public ResourceDeleteException(String errorCode, String msg) {
        super(errorCode, msg);
    }

    public ResourceDeleteException(String errorCode, String msg, Throwable e) {
        super(errorCode, msg, e);
    }
}
