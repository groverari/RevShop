package com.revature.RevStay.Services;

import com.revature.RevStay.Models.Hotel;
import com.revature.RevStay.Models.Room;
import com.revature.RevStay.Repositories.HotelRepository;
import com.revature.RevStay.Repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final HotelRepository hotelRepository;

    @Autowired
    public RoomService(RoomRepository roomRepository, HotelRepository hotelRepository) {
        this.roomRepository = roomRepository;
        this.hotelRepository = hotelRepository;
    }

    public List<Room> getRoomDetails(Integer hotelid) {
        if(hotelid == null) {
            throw new IllegalStateException("hotel Id is required!");
        }
        if(hotelRepository.findById(hotelid).isEmpty())
        {
            throw new IllegalStateException("Hotel with: "+ hotelid + " id does not exist!");
        }

        return roomRepository.findAllByHotelId(hotelid);
    }

    public Double getMinPrice(Integer hotelid) {
        if(hotelid == null)
        {
            throw new IllegalStateException("hotel id is required!");
        }
        if(hotelRepository.findById(hotelid).isEmpty())
        {
            throw new IllegalStateException("Hotel with: "+ hotelid + " id does not exist!");
        }

        return roomRepository.findMinPriceByHotelId(hotelid);
    }

    public Room addRoom(Room room){
        return roomRepository.save(room);
    }

    public Room updateRoom(Room room){
        System.out.println(room);
        Optional<Room> oldRoom = roomRepository.findById(room.getRoomId());
        if(oldRoom.isEmpty()){
            return null;
        }
        Room temp = oldRoom.get();
        temp.setRoomName(room.getRoomName());
        temp.setDescription(room.getDescription());
        temp.setPrice(room.getPrice());
        temp.setQuantity(room.getQuantity());
        temp.setImg(room.getImg());
        return roomRepository.save(temp);
    }

    public boolean deleteRoom(Integer roomId){
        if(roomRepository.existsById(roomId)){
            roomRepository.deleteById(roomId);
            return true;
        }
        return false;

    }
}
