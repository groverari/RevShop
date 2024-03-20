package com.revature.RevStay.Models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data @NoArgsConstructor
public class Unavailable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer roomId;
    @Temporal(TemporalType.DATE)
    private Date startDate;
    @Temporal(TemporalType.DATE)
    private Date endDate;
    private Integer quantity;

    public Unavailable(Integer roomId, Date startDate, Date endDate, Integer quantity) {
        this.roomId = roomId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.quantity = quantity;
    }
}
