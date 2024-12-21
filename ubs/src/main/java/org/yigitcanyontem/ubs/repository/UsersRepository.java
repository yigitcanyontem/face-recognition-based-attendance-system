package org.yigitcanyontem.ubs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.yigitcanyontem.ubs.domain.Users;

import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<Users, Integer> {
    Users findByEmail(String username);

    Optional<Users> findByUsername(String username);
}
