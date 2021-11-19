package com.nt.rookies.asset.management.jwt.model;

import java.io.Serializable;

public class JwtResponse implements Serializable {
    private static final long serialVersionUID = 1L;

    private String jwttoken;

    public JwtResponse(String jwttoken) {
        setJwttoken(jwttoken);
    }

    public String getJwttoken() {
        return jwttoken;
    }

    public void setJwttoken(String jwttoken) {
        this.jwttoken = jwttoken;
    }

}
