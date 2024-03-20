package com.revature.RevStay.Repositories;

import com.revature.RevStay.Models.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface HotelRepository extends JpaRepository<Hotel, Integer> {
    boolean existsByStreet(String street);
    boolean existsByCity(String street);
    boolean existsByState(String street);
    boolean existsByZip(String street);


    List<Hotel> findAllByBusinessId(int businessId);
    List<Hotel> findByBusinessId(Integer businessId);
//    @Query("SELECT h FROM Hotel h LEFT JOIN h.")

//    @Query("FROM Hotel h " +
//            "JOIN FETCH Room r " +
//            "ON h.hotelId = r.hotelId " +
//            "JOIN FETCH Review rv " +
//            "ON h.hotelId = rv.hotel.hotelId " +
//            "WHERE (:price IS NULL OR r.price <= :price) " +
//            "AND (:rating IS NULL OR rv.rating >= :rating) " +
//            "AND (:city IS NULL OR h.city = :city)")
//    List<Hotel> findByFilter(String city, Integer rating, Double price);
//
//    @Query("FROM Hotel h " +
//            "JOIN FETCH Room r " +
//            "ON h.hotelId = r.hotelId " +
//            "WHERE (:price IS NULL OR r.price <= :price) " +
//            "AND (:city IS NULL OR h.city = :city)")
//    List<Hotel> findByFilter(String city, Double price);

    List<Hotel> findAllByCity(String city);

}
