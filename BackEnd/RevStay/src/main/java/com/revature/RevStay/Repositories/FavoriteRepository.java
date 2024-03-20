package com.revature.RevStay.Repositories;

import com.revature.RevStay.Models.Favorite;
import com.revature.RevStay.Models.idClasses.FavoriteId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, FavoriteId> {
}
