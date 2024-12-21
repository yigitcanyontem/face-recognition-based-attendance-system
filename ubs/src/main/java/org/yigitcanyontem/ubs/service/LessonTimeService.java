package org.yigitcanyontem.ubs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.yigitcanyontem.ubs.domain.Lesson;
import org.yigitcanyontem.ubs.domain.LessonTime;
import org.yigitcanyontem.ubs.domain.Users;
import org.yigitcanyontem.ubs.repository.LessonRepository;
import org.yigitcanyontem.ubs.repository.LessonTimeRepository;
import org.yigitcanyontem.ubs.repository.UsersRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class LessonTimeService {

    @Autowired
    private LessonTimeRepository lessonTimeRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private UsersRepository usersRepository;

    public LessonTime createLessonTime(Integer lessonId, Integer teacherId, LocalDateTime startTime, LocalDateTime endTime) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new IllegalArgumentException("Lesson not found with id: " + lessonId));
        Users teacher = usersRepository.findById(teacherId)
                .orElseThrow(() -> new IllegalArgumentException("Teacher not found with id: " + teacherId));

        boolean overlapping = lessonTimeRepository.findByTeacherId(teacherId).stream()
                .anyMatch(lt -> lt.getStartTime().isBefore(endTime) && lt.getEndTime().isAfter(startTime));
        if (overlapping) {
            throw new IllegalArgumentException("The teacher has overlapping lesson times.");
        }

        LessonTime lessonTime = LessonTime.builder()
                .lesson(lesson)
                .teacher(teacher)
                .startTime(startTime)
                .endTime(endTime)
                .build();

        return lessonTimeRepository.save(lessonTime);
    }

    public LessonTime getLessonTime(Integer lessonId) {
        return lessonTimeRepository.findById(lessonId).orElse(null);
    }

    public List<LessonTime> getAllLessonTimesByLessonId(Integer lessonId) {
        return lessonTimeRepository.findByLessonId(lessonId);
    }

    public List<LessonTime> getTeacherLessons(Integer id) {
        return lessonTimeRepository.findByTeacherId(id);
    }
}
