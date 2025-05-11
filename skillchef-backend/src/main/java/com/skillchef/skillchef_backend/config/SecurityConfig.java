package com.skillchef.skillchef_backend.config;

import com.skillchef.skillchef_backend.security.CustomOAuth2UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.http.HttpMethod;
import org.springframework.beans.factory.annotation.Autowired;

@Configuration
public class SecurityConfig {

    @Autowired
    private CustomOAuth2UserService customOAuth2UserService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors().and() // ✅ Add this
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers("/api/users/**").permitAll()
                .requestMatchers("/api/posts/**").permitAll()
                .requestMatchers("/api/comments/**").permitAll()
                .requestMatchers("/uploads/**").permitAll()
                .requestMatchers("/api/progress/**").permitAll()
                .requestMatchers("/api/plans/**").permitAll()
                .requestMatchers("/api/bookmarks/**").permitAll()
                .requestMatchers("/api/notifications/**").authenticated()
                .anyRequest().authenticated()
            )
            .oauth2Login(oauth2 -> oauth2
                .defaultSuccessUrl("http://localhost:3000/oauth2-success", true)
                .userInfoEndpoint(userInfo -> userInfo
                    .userService(customOAuth2UserService)
                )
            );
    
        return http.build();
    }
    
}
