package com.revature.RevStay.Controllers;

import com.revature.RevStay.DTO.RoomDTO;
import com.revature.RevStay.Models.*;
import com.revature.RevStay.Services.*;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.revature.RevStay.DTO.LoginDTO;


import javax.sound.sampled.ReverbType;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/")
public class RevStayController {

    private final UserService userService;
    private final OwnerService ownerService;
    private final HotelService hotelService;
    private final BookingService bookingService;
    private final FavoriteService favoriteService;
    private final PasswordService passwordService;
    private final ReviewService reviewService;
    private final RoomService roomService;
    private final UnavailableService unavailableService;

    @Autowired
    public RevStayController(UserService userService, OwnerService ownerService, HotelService hotelService, BookingService bookingService, FavoriteService favoriteService, PasswordService passwordService, ReviewService reviewService, RoomService roomService, UnavailableService unavailableService) {
        this.userService = userService;
        this.ownerService = ownerService;
        this.hotelService = hotelService;
        this.bookingService = bookingService;
        this.favoriteService = favoriteService;
        this.passwordService = passwordService;
        this.reviewService = reviewService;
        this.roomService = roomService;
        this.unavailableService = unavailableService;
    }

    @PostMapping("/users/login")
    public ResponseEntity<User> userLogin(@RequestBody LoginDTO u){
        System.out.println(u);
        User out = userService.login(u);

        if(out == null){
            return ResponseEntity.status(401).body(null);
        }
        return ResponseEntity.ok(out);
    }

    @PostMapping("/owners/login")
    public ResponseEntity<Owner> ownerLogin(@RequestBody LoginDTO o){
        Owner out = ownerService.login(o);

        if(out == null){
            return ResponseEntity.status(401).body(null);
        }
        return ResponseEntity.ok(out);
    }
  @PostMapping(value = "/users/register")
    public User createNewAccount(@RequestBody User newUser) throws Exception{
        return userService.createUser(newUser);
    }

    @PostMapping(value = "/owners/register")
    public Owner createNewAccount(@RequestBody Owner newOwner) throws Exception{
        return ownerService.createOwner(newOwner);
    }

    @PostMapping(value = "/owners/register/hotel")
    public ResponseEntity<?> createNewHotel(@RequestBody Hotel hotel)
    {
        System.out.println(hotel);
        try
        {
            Hotel regHotel = hotelService.registerNewHotel(hotel);
            return ResponseEntity.status(201).body(regHotel);
        }
        catch (IllegalStateException e)
        {
            return ResponseEntity.status(400).body("Already Exists in DB");
        }
    }

    @GetMapping("/hotel")
    public ResponseEntity<?> getAllHotels(@RequestParam(required = false) String city,
                                          @RequestParam(required = false) Integer rating,
                                          @RequestParam(required = false) Double price) {
        try {
            List<Hotel> hotels = hotelService.getAllHotels(city, rating, price);
            return new ResponseEntity<>(hotels, HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/hotel/{hotelid}")
    public ResponseEntity<?> getHotelDetails(@PathVariable Integer hotelid) {
        try {
            Hotel hotel = hotelService.getHotelDetails(hotelid);
            return new ResponseEntity<>(hotel, HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

//    @GetMapping("/hotel/{hotelid}/rooms")
//    public ResponseEntity<?> getHotelRoomDetails(@PathVariable Integer hotelid) {
//        try {
//            List<Room> rooms = roomService.getRoomDetails(hotelid);
//            return new ResponseEntity<>(rooms, HttpStatus.OK);
//        } catch (IllegalStateException e) {
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//    }

    @GetMapping("/hotel/owner/{ownerId}")
    public ResponseEntity<?> getHotelsByOwner(@PathVariable Integer ownerId) {
        try {
            List<Hotel> hotels = hotelService.getHotelsByOwner(ownerId);
            return new ResponseEntity<>(hotels, HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/users/bookings/{userid}")
    public ResponseEntity<?> getAllBookings(@PathVariable Integer userid) {
        try {
            List<Booking> bookings = bookingService.getAllBookings(userid);
            return new ResponseEntity<>(bookings, HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/hotel/rating/{hotelid}")
    public ResponseEntity<?> getAvgRatingByHotelId(@PathVariable Integer hotelid){
        try {
            Integer rating = reviewService.getRatingByHotelId(hotelid);
            return new ResponseEntity<>(rating, HttpStatus.OK);
        }
        catch (IllegalStateException e)
        {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/owners/getAllForOwner")
    public ResponseEntity<List<Hotel>> getAllHotelsByOwner(@RequestParam String id){
        return ResponseEntity.ok(hotelService.getAllOwnerHotels(Integer.parseInt(id)));
    }

    @DeleteMapping("/users/bookings/{bookingid}")
    public ResponseEntity<?> deleteUserBooking(@PathVariable Integer bookingid) {
        try {
            bookingService.deleteBookingById(bookingid);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("owners/bookings/{ownerid}")
    public ResponseEntity<?> getOwnerBookings(@PathVariable Integer ownerid) {
        try {
            List<Booking> bookings = bookingService.getBookingByOwner(ownerid);
            return new ResponseEntity<>(bookings, HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("bookings/")
    public ResponseEntity<?> updateBooking(@RequestBody Booking updatedBooking) {
        try {
            Booking booking = bookingService.updateBooking(updatedBooking);
            return new ResponseEntity<>(booking, HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/hotel/reviews/{hotelid}")
    public ResponseEntity<?> getHotelReviews(@PathVariable Integer hotelid){
        try {
            List<Review> reviews = reviewService.getReviewsByHotelId(hotelid);
            return new ResponseEntity<>(reviews, HttpStatus.OK);
        }
        catch (IllegalStateException e)
        {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/owners/respond")
    public ResponseEntity<?> respondToReview(@RequestBody Review review){
        try
        {
            reviewService.respondToCustomerReview(review);
            return new ResponseEntity<>(HttpStatus.OK);

        }
        catch (IllegalStateException e)
        {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

    @PutMapping("/owners/updateHotel")
    public ResponseEntity<Hotel> updateHotel(@RequestBody Hotel hotel){
        Hotel out = hotelService.updateHotel(hotel);
        int status = out == null? 401: 203;
        return ResponseEntity.status(status).body(out);
    }

    @PostMapping("bookings/")
    public ResponseEntity<?> createBooking(@RequestBody Booking newBooking) {
        try {
            Booking booking = bookingService.createBooking(newBooking);
            return new ResponseEntity<>(booking, HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/hotel/price/{hotelid}")
    public ResponseEntity<?> getMinPriceByHotelId(@PathVariable Integer hotelid){
        try {
            Double price = roomService.getMinPrice(hotelid);
            return new ResponseEntity<>(price, HttpStatus.OK);
        }
        catch (IllegalStateException e)
        {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/users/review/")
    public ResponseEntity<?> createNewReview(@RequestBody Review review)
    {
        try
        {
            System.out.println(review);
            Review newReview = reviewService.addNewReview(review);
            return new ResponseEntity<>(newReview, HttpStatus.CREATED);
        }
        catch (IllegalStateException e)
        {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    @PostMapping("/owners/addRoom")
    public ResponseEntity<?> addRoom(@RequestBody RoomDTO room){
        Hotel h =  hotelService.getHotelDetails(room.getHotelId());
        Room newRoom = new Room(h, room.getRoomName(), room.getDescription(), room.getQuantity(), room.getPrice(), room.getImg());

        Room output = roomService.addRoom(newRoom);
        int status = output ==null? 400: 201;
        return ResponseEntity.status(status).body(output);
    }

    @PutMapping("/owners/updateRoom")
    public ResponseEntity<?>updateRoom(@RequestBody RoomDTO room){
        Hotel h =  hotelService.getHotelDetails(room.getHotelId());
        Room newRoom = new Room(room.getRoomId(), h, room.getRoomName(), room.getDescription(), room.getQuantity(), room.getPrice(), room.getImg());
        Room output = roomService.updateRoom(newRoom);
        int status = output ==null? 400: 201;
        return ResponseEntity.status(status).body(output);
    }

    @DeleteMapping("/owners/deleteRoom")
    public ResponseEntity<?> deleteRoom(@RequestParam String roomId){
        boolean success = roomService.deleteRoom(Integer.parseInt(roomId));
        return ResponseEntity.status(success? 200: 400).body(success);
    }

}
