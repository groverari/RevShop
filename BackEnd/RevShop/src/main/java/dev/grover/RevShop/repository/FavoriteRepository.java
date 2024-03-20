package dev.grover.RevShop.repository;

import dev.grover.RevShop.entity.Favorite;
import dev.grover.RevShop.entity.idClasses.FavoriteId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteRepository extends JpaRepository<Favorite, FavoriteId> {

}
