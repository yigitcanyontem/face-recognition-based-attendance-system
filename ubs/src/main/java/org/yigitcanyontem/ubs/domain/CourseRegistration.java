package org.yigitcanyontem.ubs.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "course_registrations", uniqueConstraints = {
        @UniqueConstraint(name = "user_lesson_unique", columnNames = {"user_id", "lesson_id"})
})
@Builder
public class CourseRegistration {
    @Id
    @SequenceGenerator(
            name = "course_registration_id_sequence",
            sequenceName = "course_registration_id_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "course_registration_id_sequence"
    )
    private Integer id;

    @ManyToOne
    @JoinColumn(
            name = "user_id",
            referencedColumnName = "id",
            foreignKey = @ForeignKey(name = "course_registration_user_fk")
    )
    private Users user;

    @ManyToOne
    @JoinColumn(
            name = "lesson_id",
            referencedColumnName = "id",
            foreignKey = @ForeignKey(name = "course_registration_lesson_fk")
    )
    private Lesson lesson;

    private Date registeredAt;
}
