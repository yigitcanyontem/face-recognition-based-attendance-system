package org.yigitcanyontem.ubs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.yigitcanyontem.ubs.domain.CourseRegistration;
import org.yigitcanyontem.ubs.service.CourseRegistrationService;

@RestController
@RequestMapping("/api/v1/course-registration")
@CrossOrigin(origins = "http://localhost:5173")
public class CourseRegistrationController {

    @Autowired
    private CourseRegistrationService courseRegistrationService;

    @PostMapping("/register")
    public ResponseEntity<CourseRegistration> registerUserToLesson(
            @RequestParam Integer userId,
            @RequestParam Integer lessonId) {
        CourseRegistration registration = courseRegistrationService.registerUserToLesson(userId, lessonId);
        return ResponseEntity.ok(registration);
    }
}
