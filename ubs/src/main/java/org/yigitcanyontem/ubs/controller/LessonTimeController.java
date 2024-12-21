package org.yigitcanyontem.ubs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.yigitcanyontem.ubs.domain.Lesson;
import org.yigitcanyontem.ubs.domain.LessonTime;
import org.yigitcanyontem.ubs.service.LessonTimeService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/lesson-times")
@CrossOrigin(origins = "http://localhost:5173")
public class LessonTimeController {

    @Autowired
    private LessonTimeService lessonTimeService;

    @PostMapping("/create")
    public ResponseEntity<LessonTime> createLessonTime(
            @RequestParam Integer lessonId,
            @RequestParam Integer teacherId,
            @RequestParam LocalDateTime startTime,
            @RequestParam LocalDateTime endTime) {
        LessonTime lessonTime = lessonTimeService.createLessonTime(lessonId, teacherId, startTime, endTime);
        return ResponseEntity.ok(lessonTime);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LessonTime> getLessonTime(
            @PathVariable("id") Integer id) {

        LessonTime lessonTime = lessonTimeService.getLessonTime(id);

        return lessonTime != null ? ResponseEntity.ok(lessonTime) : ResponseEntity.notFound().build();
    }

    @GetMapping("/lesson/{lessonId}")
    public ResponseEntity<List<LessonTime>> getLessonTimesByLessonId(@PathVariable Integer lessonId) {
        List<LessonTime> lessonTimes = lessonTimeService.getAllLessonTimesByLessonId(lessonId);
        return ResponseEntity.ok(lessonTimes);
    }
    @GetMapping("/teacher/{id}")
    public ResponseEntity<List<LessonTime>> getTeacherLessons(@PathVariable Integer id) {
        List<LessonTime> lessons = lessonTimeService.getTeacherLessons(id);
        return ResponseEntity.ok(lessons);
    }

}
