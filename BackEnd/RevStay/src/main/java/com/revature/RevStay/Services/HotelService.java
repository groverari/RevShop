package com.revature.RevStay.Services;

import com.revature.RevStay.Models.Hotel;
import com.revature.RevStay.Models.Review;
import com.revature.RevStay.Models.Room;
import com.revature.RevStay.Repositories.HotelRepository;
import com.revature.RevStay.Repositories.ReviewRepository;
import com.revature.RevStay.Repositories.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HotelService {
    private final HotelRepository hotelRepository;
    private final RoomRepository roomRepository;
    private final ReviewRepository reviewRepository;

    public HotelService(HotelRepository hotelRepository, RoomRepository roomRepository, ReviewRepository reviewRepository) {
        this.hotelRepository = hotelRepository;
        this.roomRepository = roomRepository;
        this.reviewRepository = reviewRepository;
    }


    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }


    public Hotel registerNewHotel(Hotel hotel) {

        if(hotel.getName().isEmpty() ||
                hotel.getDescription().isEmpty() ||
                hotel.getStreet().isEmpty() ||
                hotel.getCity().isEmpty() ||
                hotel.getState().isEmpty() ||
                hotel.getZip().isEmpty() ||
                hotel.getImg().isEmpty())
        {
            throw new IllegalStateException("Hotel fields cannot be empty!");
        }

        if(hotelRepository.existsByStreet(hotel.getStreet()) &&
                hotelRepository.existsByCity(hotel.getCity()) &&
                hotelRepository.existsByState(hotel.getState()) &&
                hotelRepository.existsByZip(hotel.getZip()))
        {
            throw new IllegalStateException("A Hotel with the same address Already Exists!");
        }

        return hotelRepository.save(hotel);
    }

    public List<Hotel> getAllHotels(String city, Integer rating, Double price) {

        List<Hotel> hotels = hotelRepository.findAll();

        if(city != null)
        {
            hotels = hotels.stream()
                    .filter(hotel -> hotel.getCity().equals(city))
                    .collect(Collectors.toList());
        }

        if (rating != null) {
            hotels = hotels.stream()
                    .filter(hotel -> hotel.getReviewList().stream()
                            .mapToInt(Review::getRating)
                            .average()
                            .orElse(0) >= rating)
                    .collect(Collectors.toList());
        }

        if (price != null) {
            hotels = hotels.stream()
                    .filter(hotel -> hotel.getRoomList().stream()
                            .mapToDouble(Room::getPrice)
                            .min()
                            .orElse(Double.MAX_VALUE) <= price)
                    .collect(Collectors.toList());
        }

        return hotels;
    }

    public Hotel getHotelDetails(Integer hotelid) {
        if(hotelid == null)
        {
            throw new IllegalStateException("hotel Id is required!");
        }

        Optional<Hotel> hotel = hotelRepository.findById(hotelid);

        if(hotel.isEmpty())
        {
            throw new IllegalStateException("Hotel with: "+ hotelid + " id does not exist!");
        }

        return hotel.get();
    }
    public List<Hotel> getAllOwnerHotels(int id){
        return hotelRepository.findAllByBusinessId(id);
    }

    public Hotel updateHotel(Hotel hotel){
        return hotelRepository.save(hotel);
    }


    public List<Hotel> getHotelsByOwner(Integer ownerId) {
        if(ownerId == null)
        {
            throw new IllegalStateException("Owner Id is required!");
        }

        List<Hotel> hotels = hotelRepository.findByBusinessId(ownerId);

        return hotels;
    }

}
