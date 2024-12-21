package org.yigitcanyontem.ubs.domain;

import jakarta.persistence.*;
import lombok.*;
import org.yigitcanyontem.ubs.enums.Role;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(
        name = "users",
        uniqueConstraints = {
        @UniqueConstraint(
                name = "user_email_unique",
                columnNames = "email"
        ),
        @UniqueConstraint(
                name = "user_username_unique",
                columnNames = "username"
        )
    }
)
@Builder
public class Users {
    @Id
    @SequenceGenerator(
            name = "users_id_sequence",
            sequenceName = "users_id_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "users_id_sequence"
    )
    private Integer id;
    private String username;
    private String password;
    private String email;
    @Enumerated(EnumType.STRING)
    private Role role;
    private Date createdAt;
}
