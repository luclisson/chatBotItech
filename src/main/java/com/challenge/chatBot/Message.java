package com.challenge.chatBot;

public class Message {
    Integer id;
    String message;
    String author;
    String type;
    public Message(String message, String author, Integer id, String type) {
        this.message = message;
        this.id = id;
        this.author = author;
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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
