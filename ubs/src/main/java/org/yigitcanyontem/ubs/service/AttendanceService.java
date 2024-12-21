package org.yigitcanyontem.ubs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.yigitcanyontem.ubs.domain.Attendance;
import org.yigitcanyontem.ubs.domain.Lesson;
import org.yigitcanyontem.ubs.domain.LessonTime;
import org.yigitcanyontem.ubs.domain.Users;
import org.yigitcanyontem.ubs.enums.AttendanceStatus;
import org.yigitcanyontem.ubs.repository.AttendanceRepository;
import org.yigitcanyontem.ubs.repository.LessonRepository;
import org.yigitcanyontem.ubs.repository.LessonTimeRepository;
import org.yigitcanyontem.ubs.repository.UsersRepository;

import java.util.Date;
import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private LessonTimeRepository lessonTimeRepository;

    @Autowired
    private UsersRepository usersRepository;

    public List<Attendance> getAttendanceByLessonAndDate(Integer lessonId, Date date) {
        return lessonTimeRepository.findByLessonIdAndDate(lessonId, date).getAttendances();
    }

    public Attendance saveAttendance(String username, Integer lessonTimeId,AttendanceStatus status) {
        Users user = usersRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found with username: " + username));
        LessonTime lesson = lessonTimeRepository.findById(lessonTimeId)
                .orElseThrow(() -> new IllegalArgumentException("Lesson not found with id: " + lessonTimeId));

        Attendance attendance = Attendance.builder()
                .user(user)
                .lesson(lesson)
                .status(status)
                .recordedAt(new Date())
                .build();

        return attendanceRepository.saveAndFlush(attendance);
    }
}
