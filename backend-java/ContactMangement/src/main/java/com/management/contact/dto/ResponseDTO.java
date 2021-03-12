package com.management.contact.dto;

public class ResponseDTO {
    private String message;

    public String getMessage() {
        return message;
    }

    public ResponseDTO(String message) {
        this.message = message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
