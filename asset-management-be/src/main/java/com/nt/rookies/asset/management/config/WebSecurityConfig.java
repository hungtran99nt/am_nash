package com.nt.rookies.asset.management.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
  @Autowired private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

  @Autowired private UserDetailsService jwtUserDetailsService;

  @Autowired private JwtRequestFilter jwtRequestFilter;

  @Autowired
  public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
    // Configure AuthenticationManager so that it knows from where to load user for matching
    // credentials
    // Use BCryptPasswordEncoder
    auth.userDetailsService(jwtUserDetailsService).passwordEncoder(passwordEncoder());
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }

  @Override
  protected void configure(HttpSecurity httpSecurity) throws Exception {
    httpSecurity
        .csrf()
        .disable() // We don't need CSRF for this example
        .authorizeRequests()
        .antMatchers("/authenticate")
        .permitAll() // Don't authenticate this particular request
        .antMatchers(
            "/**/user/assignment",
            "/**/user/assignment/",
            "/**/user/assignments**",
            "/**/user/assignments/**", // user can access only their own assignments
            "/**/account/**",
            "/**/account/",
            "/**/account**",
            "/**/account/")
        .authenticated() // user can access their own assignments
        .antMatchers(
            "/**/users**", // get all, create
            "/**/users/**", // get by id, update, delete, disable
            "/**/categories**", // get all, create
            "/**/categories/**",
            "/**/assets**", // get all, create
            "/**/assets/**", // get by id, update
            "/**/admin/assignments**", // create assignment
            "/**/admin/assignments/**" // get by id, complete/ cancel request of return
            )
        .hasAuthority("Admin") // only allow admins to access these endpoints
        .anyRequest()
        .authenticated()
        .and() // All other requests need to be authenticated
        .exceptionHandling()
        .authenticationEntryPoint(jwtAuthenticationEntryPoint)
        .and()
        .sessionManagement()
        .sessionCreationPolicy(
            SessionCreationPolicy
                .STATELESS); // Make sure we use stateless session; session won't be used to store
    // user's state.
    httpSecurity.cors();
    // Add a filter to validate the tokens with every request
    httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
  }
}
