package org.yigitcanyontem.ubs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.yigitcanyontem.ubs.domain.Attendance;
import org.yigitcanyontem.ubs.domain.CourseRegistration;
import org.yigitcanyontem.ubs.domain.Lesson;
import org.yigitcanyontem.ubs.domain.LessonTime;
import org.yigitcanyontem.ubs.repository.AttendanceRepository;
import org.yigitcanyontem.ubs.repository.CourseRegistrationRepository;
import org.yigitcanyontem.ubs.repository.LessonTimeRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserCourseService {

    @Autowired
    private CourseRegistrationRepository courseRegistrationRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private LessonTimeRepository lessonTimeRepository;

    public List<Lesson> getCoursesAndAttendances(Integer userId) {
        List<Lesson> lessons = courseRegistrationRepository.findLessonsByUserId(userId);
        return lessons;
    }

    public List<CourseRegistration> getAllStudentsByLesson(Integer lessonId) {
        Optional<LessonTime> lessonTime = lessonTimeRepository.findById(lessonId);
        return courseRegistrationRepository.findByLesson_Id(lessonTime.get().getLesson().getId());
    }


}
