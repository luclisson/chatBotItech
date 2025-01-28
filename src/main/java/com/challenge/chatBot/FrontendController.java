package com.challenge.chatBot;
import com.challenge.chatBot.message.Message;
import com.challenge.chatBot.message.jpa.MessageJpaRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.servlet.view.RedirectView;
import java.net.URI;


@RestController
public class FrontendController {
    @Autowired
    MessageJpaRepository messageJpaRepository;

    @PostMapping(path = "/createMessage/")
    //return json of created message + remove ResponseEntity
    public ResponseEntity<Message> createMessage(@RequestBody Message message) {
        messageJpaRepository.insert(message);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(message.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

    @GetMapping(path = "/redirectToMessenger")
    public RedirectView redirectToMessager() {
        return new RedirectView("/messenger.html");
    }

    @GetMapping(path = "/messages/{id}")
    public Message getMessages2(@PathVariable("id") int id) {
        return messageJpaRepository.retrieveEntityById(id);
    }
    @GetMapping(path = "/messages")
    public List<Message> getMessages2() {
        return messageJpaRepository.retrieveAllEntities();
    }
}