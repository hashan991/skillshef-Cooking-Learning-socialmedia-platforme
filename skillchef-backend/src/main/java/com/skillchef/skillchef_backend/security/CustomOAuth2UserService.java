package com.skillchef.skillchef_backend.security;

import com.skillchef.skillchef_backend.model.hashan.User;
import com.skillchef.skillchef_backend.repository.hashan.UserRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String picture = oAuth2User.getAttribute("picture");

        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isEmpty()) {
            // ✅ New Google user → register in MongoDB
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setUsername(name);
            newUser.setProfilePic(picture);
            newUser.setBio("New Google user");
            newUser.setLocation("Unknown");

            // ✅ Correct timestamp field
            newUser.setCreatedAt(LocalDateTime.now());

            // ✅ Social fields
            newUser.setFollowers(new HashSet<>());
            newUser.setFollowing(new HashSet<>());
            newUser.setSavedPostIds(new HashSet<>());

            userRepository.save(newUser);
        }

        return oAuth2User;
    }
}
