package com.revature.RevStay.Services;

import com.revature.RevStay.DTO.LoginDTO;
import com.revature.RevStay.Models.User;
import com.revature.RevStay.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    UserRepository userRepository;
    PasswordService passwordService;

    @Autowired
    public UserService(UserRepository u, PasswordService p){

        this.userRepository = u;
        this.passwordService = p;

    }

    public User login(LoginDTO u){
        //First Check if the email is in the database
        if(!userRepository.existsByEmail(u.getEmail())){
            return  null;
        }
        //Get the user from the database
        User user = userRepository.findByEmail(u.getEmail());
        //Check if the password matches the hash
        if(!passwordService.matchPassword(u.getPassword(), user.getPassword())) {
            return null;
        }
        //return the user because they checked out
        return user;
    }

    public User createUser(User newUser) throws Exception {
        boolean accountExists = userRepository.existsByEmail(newUser.getEmail());
        if(accountExists){
            throw new Exception("A user with that email already exists");
        }
        else{
            newUser.setPassword(passwordService.hashPassword(newUser.getPassword()));
            return userRepository.save(newUser);
        }
    }
}
