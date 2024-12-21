package org.yigitcanyontem.ubs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.yigitcanyontem.ubs.domain.CourseRegistration;
import org.yigitcanyontem.ubs.domain.Lesson;
import org.yigitcanyontem.ubs.domain.Users;
import org.yigitcanyontem.ubs.repository.CourseRegistrationRepository;
import org.yigitcanyontem.ubs.repository.LessonRepository;
import org.yigitcanyontem.ubs.repository.UsersRepository;

import java.util.List;

@Service
public class LessonService {

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private CourseRegistrationRepository courseRegistrationRepository;

    @Autowired
    private UsersRepository usersRepository;


    public Lesson createLesson(String name, String description) {
        Lesson lesson = Lesson.builder()
                .name(name)
                .description(description)
                .build();
        return lessonRepository.save(lesson);
    }

    public CourseRegistration registerUserToLesson(Integer userId, Integer lessonId) {
        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new IllegalArgumentException("Lesson not found with id: " + lessonId));

        CourseRegistration courseRegistration = CourseRegistration.builder()
                .user(user)
                .lesson(lesson)
                .build();

        return courseRegistrationRepository.save(courseRegistration);
    }


}
