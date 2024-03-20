package com.revature.RevStay.Models;

public enum status {
  pending("pending"),
  accepted("accepted"),
  rejected("rejected");

  String value;

  status(String value){
      this.value = value;
  }
}
