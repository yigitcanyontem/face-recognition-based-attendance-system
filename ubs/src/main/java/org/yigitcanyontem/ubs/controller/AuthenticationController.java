package org.yigitcanyontem.ubs.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.yigitcanyontem.ubs.dto.AuthenticationRequest;
import org.yigitcanyontem.ubs.dto.AuthenticationResponse;
import org.yigitcanyontem.ubs.service.AuthenticationService;


import javax.security.auth.login.LoginException;

@Slf4j
@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) throws LoginException {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

}
