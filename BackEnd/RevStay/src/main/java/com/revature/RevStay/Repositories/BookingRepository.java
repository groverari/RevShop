package com.revature.RevStay.Repositories;

import com.revature.RevStay.Models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    List<Booking> findAllByUserId(Integer userId);
    List<Booking> findByHotelId(Integer ownerId);
    void deleteById(Integer bookingId);
}
