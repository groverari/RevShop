package com.revature.RevStay.Services;


import com.revature.RevStay.DTO.LoginDTO;
import com.revature.RevStay.Models.Owner;
import com.revature.RevStay.Repositories.OwnerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OwnerService {

    OwnerRepository ownerRepository;
    PasswordService passwordService;

    @Autowired
    public OwnerService(OwnerRepository o, PasswordService p){
        this.ownerRepository = o;
        this.passwordService = p;
    }    

  public Owner createOwner(Owner newOwner) throws Exception {
      boolean accountExists = ownerRepository.existsByEmail(newOwner.getEmail());
      if (accountExists) {
          throw new Exception("An owner with that username already exists");
      } else {
          newOwner.setPassword(passwordService.hashPassword(newOwner.getPassword()));
          return ownerRepository.save(newOwner);
      }
  }

    /*
    Login method for Owners. Checks username and password against database
    @param LoginDTO that will have username and password
    @returns null or Owner object
     */
    public Owner login(LoginDTO login){
        //checking if owner exists
        if(!ownerRepository.existsByEmail(login.getEmail())){
            return null;
        }
        //Get owner info from the database
        Owner owner = ownerRepository.findByEmail(login.getEmail());

        //check passwords
        if(!passwordService.matchPassword(login.getPassword(), owner.getPassword())){
            return null;
        }
        //It checks out so return owner
        return owner;
    }
}