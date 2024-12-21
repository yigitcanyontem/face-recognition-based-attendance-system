package org.yigitcanyontem.ubs.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.yigitcanyontem.ubs.enums.AttendanceStatus;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "attendance")
@Builder
public class Attendance {
    @Id
    @SequenceGenerator(
            name = "attendance_id_sequence",
            sequenceName = "attendance_id_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "attendance_id_sequence"
    )
    private Integer id;

    @ManyToOne
    @JoinColumn(
            name = "user_id",
            referencedColumnName = "id",
            foreignKey = @ForeignKey(name = "attendance_user_fk")
    )
    private Users user;

    @ManyToOne
    @JoinColumn(
            name = "lesson_time_id",
            referencedColumnName = "id",
            foreignKey = @ForeignKey(name = "attendance_lesson_fk")
    )
    @JsonBackReference
    private LessonTime lesson;

    @Enumerated(EnumType.STRING)
    private AttendanceStatus status;

    private Date recordedAt;
}
