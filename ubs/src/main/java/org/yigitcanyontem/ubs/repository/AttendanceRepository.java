package org.yigitcanyontem.ubs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.yigitcanyontem.ubs.domain.Attendance;

import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {
    @Query("SELECT a FROM Attendance a WHERE a.user.id = :userId AND a.lesson.id = :lessonId")
    List<Attendance> findByUserIdAndLessonId(@Param("userId") Integer userId, @Param("lessonId") Integer lessonId);

}
