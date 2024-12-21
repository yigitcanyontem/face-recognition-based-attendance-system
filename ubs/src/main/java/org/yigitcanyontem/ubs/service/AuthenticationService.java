package org.yigitcanyontem.ubs.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.yigitcanyontem.ubs.repository.UsersRepository;
import org.yigitcanyontem.ubs.domain.Users;
import org.yigitcanyontem.ubs.dto.AuthenticationRequest;
import org.yigitcanyontem.ubs.dto.AuthenticationResponse;

import javax.security.auth.login.LoginException;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private static final Logger log = LoggerFactory.getLogger(AuthenticationService.class);
    private final UsersRepository usersRepository;

    public AuthenticationResponse authenticate(AuthenticationRequest request) throws LoginException {
        Users user = usersRepository.findByEmail(request.getUsername());
        if (user == null) {
            throw new LoginException("User not found");
        }
        if (!user.getPassword().equals(request.getPassword())) {
            throw new LoginException("Invalid password");
        }
        return AuthenticationResponse.builder()
                .role(user.getRole())
                .userId(user.getId())
                .email(user.getEmail())
                .build();
    }

}
