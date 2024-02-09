package dev.grover.RevShop.entity;

import jakarta.persistence.*;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer ID;
    private String first_name;
    private String last_name;
    private String email;
    private String password;

    //No Arg Constuctor
    public User() {

    }

    //If no ID is created yet. FOr
    public User(String fname, String lname, String email, String pass) {
        this.first_name = fname;
        this.last_name = lname;
        this.email = email;
        this.password = pass;
    }

    public User(Integer user_id, String fname, String lname, String email, String pass) {
        this.ID = user_id;
        this.first_name = fname;
        this.last_name = lname;
        this.email = email;
        this.password = pass;
    }


    public Integer getID() {
        return ID;
    }

    public void setID(Integer ID) {
        this.ID = ID;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String FirstName) {
        this.first_name = FirstName;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String LastName) {
        this.last_name = LastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String Email) {
        this.email = Email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassWord(String Password) {
        this.password = Password;
    }


    /**
     * Can override equals() method if Assert.assertEqual() or List.contains() method is needed
     * currently I do not see a use for this method, so I will skip it until it is needed
     */


    //Overriding toString in case of debugging needs
    @Override
    public String toString() {
        return "USER: " + ID + " " + first_name + " " + last_name;
    }

}
