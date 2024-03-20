package com.revature.RevStay.Services;

import com.revature.RevStay.Models.Booking;
import com.revature.RevStay.Models.Hotel;
import com.revature.RevStay.Repositories.BookingRepository;
import com.revature.RevStay.Repositories.HotelRepository;
import com.revature.RevStay.Repositories.OwnerRepository;
import com.revature.RevStay.Repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService {


    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final HotelRepository hotelRepository;
    private final OwnerRepository ownerRepository;

    public BookingService(BookingRepository bookingRepository, UserRepository userRepository, HotelRepository hotelRepository, OwnerRepository ownerRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.hotelRepository = hotelRepository;
        this.ownerRepository = ownerRepository;
    }

    public List<Booking> getAllBookings(Integer userId) {
        if(userId == null) {
            throw new IllegalStateException("user Id is required!");
        }
        if(userRepository.findById(userId).isEmpty())
        {
            throw new IllegalStateException("User with: "+ userId + " id does not exist!");
        }

        return bookingRepository.findAllByUserId(userId);
    }

    public List<Booking> getBookingsByHotel(Integer hotelId) {
        if(hotelId == null) {
            throw new IllegalStateException("hotel Id is required!");
        }
        if(hotelRepository.findById(hotelId).isEmpty())
        {
            throw new IllegalStateException("Hotel with: "+ hotelId + " id does not exist!");
        }

        return bookingRepository.findByHotelId(hotelId);
    }

    public List<Booking> getBookingByOwner(Integer ownerId){
        if(ownerId == null) {
            throw new IllegalStateException("owner Id is required!");
        }
        if(ownerRepository.findById(ownerId).isEmpty())
        {
            throw new IllegalStateException("Owner with: "+ ownerId + " id does not exist!");
        }
        List<Hotel> hotels = hotelRepository.findByBusinessId(ownerId);
        List<Booking> bookings = new ArrayList<Booking>();
        for(int i=0; i<hotels.size(); i++){
            bookings.addAll(bookingRepository.findByHotelId(hotels.get(i).getHotelId()));
        }
        return bookings;
    }

    public void deleteBookingById(Integer bookingId) {
        if(bookingId == null) {
            throw new IllegalStateException("booking Id is required!");
        }
        if(bookingRepository.findById(bookingId).isEmpty())
        {
            throw new IllegalStateException("Booking with: "+ bookingId + " id does not exist!");
        }

        bookingRepository.deleteById(bookingId);
    }

    public Booking updateBooking(Booking updatedBooking) {
        if(updatedBooking == null){
            throw new IllegalStateException("A booking is required!");
        }
        if(bookingRepository.findById(updatedBooking.getBooking_id()).isEmpty()){
            throw new IllegalStateException("Booking with: "+ updatedBooking.getBooking_id() + " id does not exist!");
        }

        return bookingRepository.save(updatedBooking);
    }

    public Booking createBooking(Booking newBooking) {
        if(newBooking == null){
            throw new IllegalStateException("booking Id is required!");
        }
        return bookingRepository.save(newBooking);
    }
}
