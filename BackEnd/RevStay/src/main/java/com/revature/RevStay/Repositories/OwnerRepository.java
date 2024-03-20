package com.revature.RevStay.Repositories;

import com.revature.RevStay.Models.Owner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OwnerRepository extends JpaRepository<Owner, Integer> {

    public boolean existsByEmail(String username);

    public Owner findByEmail(String username);

}
