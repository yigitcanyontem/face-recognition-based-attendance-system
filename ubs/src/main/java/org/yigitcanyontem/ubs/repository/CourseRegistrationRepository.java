package org.yigitcanyontem.ubs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.yigitcanyontem.ubs.domain.CourseRegistration;
import org.yigitcanyontem.ubs.domain.Lesson;

import java.util.List;

public interface CourseRegistrationRepository extends JpaRepository<CourseRegistration, Integer> {
    boolean existsByUserIdAndLessonId(Integer userId, Integer lessonId);
    @Query("SELECT cr.lesson FROM CourseRegistration cr WHERE cr.user.id = :userId")
    List<Lesson> findLessonsByUserId(@Param("userId") Integer userId);
    List<CourseRegistration> findByLesson_Id(Integer lessonId);

}
