package com.revature.RevStay.Repositories;

import com.revature.RevStay.Models.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {
    @Query("FROM Room WHERE (hotel.hotelId = :hotelid) ")
    List<Room> findAllByHotelId(@Param("hotelid")Integer hotelId);

    List<Room> findAllByPriceLessThanEqual(Double price);

    @Query("SELECT MIN(price) FROM Room WHERE (hotel.hotelId = :hotelid) ")
    Double findMinPriceByHotelId(@Param("hotelid")Integer hotelid);
}
