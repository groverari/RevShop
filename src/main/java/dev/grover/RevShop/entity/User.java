package dev.grover.RevShop.entity;

import jakarta.persistence.*;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer ID;
    private String FirstName;
    private String LastName;
    private String Email;
    private String Password;


    public User(String fname, String lname, String email, String pass){
        this.FirstName =fname;
        this.LastName = lname;
        this.Email = email;
        this.Password  = pass;
    }

    public User(Integer user_id, String fname, String lname, String email, String pass){
        this.ID = user_id;
        this.FirstName =fname;
        this.LastName = lname;
        this.Email = email;
        this.Password  = pass;
    }

    public Integer getID(){return ID;}
    public void setID(Integer ID){this.ID = ID;}

    public String getFirstName(){return FirstName;}
    public void setFirstName(String FirstName){this.FirstName = FirstName;}

    public String getLastName(){return LastName;}
    public void setLastName(String LastName){this.LastName = LastName;}

    public String getEmail(){return Email;}
    public void setEmail(String Email){this.Email = Email;}

    public String getPassword(){return Password;}
    public void setPassWord(String Password){this.Password = Password;}



    /**
     * Can override equals() method if Assert.assertEqual() or List.contains() method is needed
     * currently I do not see a use for this method, so I will skip it until it is needed
     */


    //Overriding toString in case of debugging needs
    @Override
    public String toString(){
        return  "USER: "+ ID + " " + FirstName + " " + LastName;
    }

}
