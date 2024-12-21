package org.yigitcanyontem.ubs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.yigitcanyontem.ubs.domain.CourseRegistration;
import org.yigitcanyontem.ubs.domain.Lesson;
import org.yigitcanyontem.ubs.service.LessonService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/lessons")
@CrossOrigin(origins = "http://localhost:5173")
public class LessonController {

    @Autowired
    private LessonService lessonService;

    @PostMapping("/create")
    public ResponseEntity<Lesson> createLesson(
            @RequestParam String name,
            @RequestParam String description) {
        Lesson lesson = lessonService.createLesson(name, description);
        return ResponseEntity.ok(lesson);
    }

    @PostMapping("/{lessonId}/register/{userId}")
    public ResponseEntity<CourseRegistration> registerUserToLesson(
            @PathVariable Integer userId,
            @PathVariable Integer lessonId) {
        CourseRegistration courseRegistration = lessonService.registerUserToLesson(userId, lessonId);
        return ResponseEntity.ok(courseRegistration);
    }


}
