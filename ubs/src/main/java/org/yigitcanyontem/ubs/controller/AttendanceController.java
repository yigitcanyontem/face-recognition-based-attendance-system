package org.yigitcanyontem.ubs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.yigitcanyontem.ubs.domain.Attendance;
import org.yigitcanyontem.ubs.enums.AttendanceStatus;
import org.yigitcanyontem.ubs.service.AttendanceService;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/v1/attendance")
@CrossOrigin(origins = "http://localhost:5173")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping("/save")
    public ResponseEntity<Attendance> saveAttendance(
            @RequestParam String username,
            @RequestParam Integer lessonTimeId,
            @RequestParam AttendanceStatus status) {
        Attendance attendance = attendanceService.saveAttendance(username, lessonTimeId, status);
        return ResponseEntity.ok(attendance);
    }

    @GetMapping("/lesson")
    public ResponseEntity<List<Attendance>> getAttendanceByLessonAndDate(
            @RequestParam Integer lessonId,
            @RequestParam Date date) {
        List<Attendance> attendance = attendanceService.getAttendanceByLessonAndDate(lessonId, date);
        return ResponseEntity.ok(attendance);
    }

}
