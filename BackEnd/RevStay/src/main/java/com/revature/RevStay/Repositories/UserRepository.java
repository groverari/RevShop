package com.revature.RevStay.Repositories;

import com.revature.RevStay.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    public Boolean existsByEmail(String Email);

    public User findByEmail(String Email);
}
