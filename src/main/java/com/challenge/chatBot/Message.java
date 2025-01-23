package com.challenge.chatBot;

public class Message {
    Integer id;
    String message;
    String author;

    public Message(String message, String author, Integer id) {
        this.message = message;
        this.id = id;
        this.author = author;
    }


    public Integer getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public String getAuthor() {
        return author;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}
