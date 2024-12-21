package org.yigitcanyontem.ubs.dto;

import lombok.*;
import org.yigitcanyontem.ubs.enums.Role;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class UsersDto {
    private Integer id;
    private String username;
    private String email;
    private String password;
    private Role role;
    private Date createdAt;
}
