package org.yigitcanyontem.ubs.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "lesson_times")
@Builder
public class LessonTime {
    @Id
    @SequenceGenerator(
            name = "lesson_time_id_sequence",
            sequenceName = "lesson_time_id_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "lesson_time_id_sequence"
    )
    private Integer id;

    @ManyToOne
    @JoinColumn(
            name = "lesson_id",
            referencedColumnName = "id",
            foreignKey = @ForeignKey(name = "lesson_time_lesson_fk")
    )
    private Lesson lesson;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private Date date;

    @ManyToOne
    @JoinColumn(
            name = "teacher_id",
            referencedColumnName = "id",
            foreignKey = @ForeignKey(name = "lesson_time_teacher_fk")
    )
    private Users teacher;

    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference  // Prevent cyclic references
    private List<Attendance> attendances;

}
