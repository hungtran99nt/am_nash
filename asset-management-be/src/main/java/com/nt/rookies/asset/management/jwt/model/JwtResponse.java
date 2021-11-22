package com.nt.rookies.asset.management.jwt.model;

import java.io.Serializable;

public class JwtResponse implements Serializable {
    private static final long serialVersionUID = 1L;

    private String jwttoken;
    private String username;
    private String authority;

    public JwtResponse(String jwttoken, String username, String authority) {
        this.jwttoken = jwttoken;
        this.username = username;
        this.authority = authority;
    }

    public JwtResponse(String jwttoken) {
        setJwttoken(jwttoken);
    }

    public String getJwttoken() {
        return jwttoken;
    }

    public void setJwttoken(String jwttoken) {
        this.jwttoken = jwttoken;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }
}
