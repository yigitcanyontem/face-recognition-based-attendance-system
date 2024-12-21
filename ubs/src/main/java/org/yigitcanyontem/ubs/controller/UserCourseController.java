package org.yigitcanyontem.ubs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.yigitcanyontem.ubs.domain.Attendance;
import org.yigitcanyontem.ubs.domain.CourseRegistration;
import org.yigitcanyontem.ubs.domain.Lesson;
import org.yigitcanyontem.ubs.service.UserCourseService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/user-courses")
@CrossOrigin(origins = "http://localhost:5173")
public class UserCourseController {

    @Autowired
    private UserCourseService userCourseService;

    @GetMapping("/{userId}/attendances")
    public ResponseEntity<List<Lesson>> getCoursesAndAttendances(@PathVariable Integer userId) {
        return ResponseEntity.ok(userCourseService.getCoursesAndAttendances(userId));
    }

    @GetMapping("/students/{lessonId}")
    public ResponseEntity<List<CourseRegistration>> getStudentsInCourse(@PathVariable Integer lessonId) {
        List<CourseRegistration> courseRegistrations = userCourseService.getAllStudentsByLesson(lessonId);
        return ResponseEntity.ok(courseRegistrations);
    }

}
