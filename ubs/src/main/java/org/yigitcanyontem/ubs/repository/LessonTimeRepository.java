package org.yigitcanyontem.ubs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.yigitcanyontem.ubs.domain.Attendance;
import org.yigitcanyontem.ubs.domain.LessonTime;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface LessonTimeRepository extends JpaRepository<LessonTime, Integer> {
    List<LessonTime> findByTeacherId(Integer teacherId);

    LessonTime findByLessonIdAndDate(Integer lesson_id, Date date);
    @Query("SELECT lt FROM LessonTime lt " +
            "WHERE lt.lesson.id = :lessonId " +
            "AND lt.date = :date " +
            "AND lt.startTime = :startTime " +
            "AND lt.endTime = :endTime")
    LessonTime findByLessonIdAndDateAndTime(
            Integer lessonId,
            LocalDate date,
            LocalDateTime startTime,
            LocalDateTime endTime);

    List<LessonTime> findByLessonId(Integer lessonId);

}
