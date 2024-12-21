package org.yigitcanyontem.ubs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.yigitcanyontem.ubs.domain.Lesson;

import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson, Integer> {
}
