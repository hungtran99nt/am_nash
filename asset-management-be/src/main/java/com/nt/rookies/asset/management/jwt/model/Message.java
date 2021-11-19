package com.nt.rookies.asset.management.jwt.model;

import java.io.Serializable;

public class Message implements Serializable {
    private static final long serialVersionUID = 1L;

    public Message(String message) {
        this.message = message;
    }

    private String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
