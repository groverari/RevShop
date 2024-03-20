export interface Booking {
    booking_id?: number,
    userId: number,
    hotelId: number,
    roomId: number,
    guests: number,
    numRooms: number;
    checkIn: Date;
    checkOut: Date;
    status: String;
    read: boolean;
}