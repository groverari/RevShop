package com.revature.RevStay.Services;

import com.revature.RevStay.Models.Owner;
import com.revature.RevStay.Models.User;
import com.revature.RevStay.Repositories.OwnerRepository;
import com.revature.RevStay.Repositories.UserRepository;
import com.revature.RevStay.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//@Service commented so it stops trying to create this
public class JWTService {
    /*
    THIS IS A WORK IN PROGRESS. CAN BE IMPLEMENTED BUT CURRENTLY DOESNT WORK
    IT STOPS THE PROGRAM FROM WORKING BECAUSE IT CANNOT CREATE the UTIL class
    GOOD LUCK if you try to fix it.
     */
    private final JwtUtil jwtUtil = new JwtUtil();
    private final UserRepository userRepository;
    private final OwnerRepository ownerRepository;

    @Autowired
    public JWTService(UserRepository u, OwnerRepository o){
        this.userRepository = u;
        this.ownerRepository= o;
    }
    public String buildUser(User user){
        return jwtUtil.generateToken(user.getUserId());
    }
    public String buildOwner(Owner owner){
        return jwtUtil.generateToken(owner.getBusinessId());
    }

    public Integer getIdFromToken(String token){
        return jwtUtil.getIdFromToken(token);
    }

    public User getUserFromToken(String token){
        int id = jwtUtil.getIdFromToken(token);
        return userRepository.findById(id).orElse(null);
    }

    public Owner getOwnerFromToken(String token){
        int id = jwtUtil.getIdFromToken(token);
        return ownerRepository.findById(id).orElse(null);
    }

}
