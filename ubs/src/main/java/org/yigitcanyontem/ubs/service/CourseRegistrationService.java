package org.yigitcanyontem.ubs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.yigitcanyontem.ubs.domain.CourseRegistration;
import org.yigitcanyontem.ubs.domain.Lesson;
import org.yigitcanyontem.ubs.domain.Users;
import org.yigitcanyontem.ubs.repository.CourseRegistrationRepository;
import org.yigitcanyontem.ubs.repository.LessonRepository;
import org.yigitcanyontem.ubs.repository.UsersRepository;

import java.util.Date;

@Service
public class CourseRegistrationService {

    @Autowired
    private CourseRegistrationRepository courseRegistrationRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private UsersRepository usersRepository;

    public CourseRegistration registerUserToLesson(Integer userId, Integer lessonId) {
        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new IllegalArgumentException("Lesson not found with id: " + lessonId));

        if (courseRegistrationRepository.existsByUserIdAndLessonId(userId, lessonId)) {
            throw new IllegalStateException("User is already registered for this lesson.");
        }

        CourseRegistration registration = CourseRegistration.builder()
                .user(user)
                .lesson(lesson)
                .registeredAt(new Date())
                .build();

        return courseRegistrationRepository.save(registration);
    }
}
