package org.yigitcanyontem.ubs.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "lessons")
@Builder
public class Lesson {
    @Id
    @SequenceGenerator(
            name = "lesson_id_sequence",
            sequenceName = "lesson_id_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "lesson_id_sequence"
    )
    private Integer id;

    private String name;
    private String description;

}
