package com.challenge.chatBot;

import com.google.gson.Gson;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;

@RestController
public class FrontendController {
    DaoService daoService = new DaoService();

    @GetMapping(path = "/messages")
    public String getMessages() {
        ArrayList<Message> messageList = daoService.getMessages();
        String jsonString = new Gson().toJson(messageList);
        return jsonString;
    }

    @PostMapping(path = "/createMessage/{id}")
    public ResponseEntity<Message> createMessage(@RequestBody Message message, @PathVariable Integer id) {
        message.setId(id);
        //potential error with same ids there has to be a counter in the frontend
        daoService.saveMessage(message);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(message.getId()).toUri();
        return ResponseEntity.created(location).build();
    }
}
