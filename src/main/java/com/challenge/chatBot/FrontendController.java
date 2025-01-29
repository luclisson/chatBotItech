package com.challenge.chatBot;
import com.challenge.chatBot.message.Message;
import com.challenge.chatBot.message.jpa.MessageJpaRepository;

import java.util.Arrays;
import java.util.List;

import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.openai.OpenAiChatModel;
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
    @Autowired
    OpenAiChatModel openAiChatModel;
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
    @GetMapping(path = "/genResponse/{userMessage}")
    public String genResponse(@PathVariable("userMessage") String userMessage) {
        List<Message> pastMessages = messageJpaRepository.retrieveAllEntities();
        String context = """
				you are a chatbot assistant of the company bugland. output in normal text form without using markdown syntax.
				you will answer and help the customers and only help them with product related problems. our products are:
						1. **CleanBug** – An autonomous cleaning robot that removes dust and dirt from floors but has issues with stairs.
						2. **WindowFly** – A window-cleaning robot that suctions onto glass surfaces but can sometimes be difficult to remove.
						3. **GardenBeetle** – A lawn-mowing and weed-removal robot that trims grass and maintains garden beds.
						4. **AirMite** – A small air-purifying robot that filters pollen and dust from indoor air.
						5. **BugGuard** – A security robot with motion sensors that detects intruders and triggers an alarm.
						6. **FridgeAnt** – A smart fridge assistant that monitors food inventory and tracks expiration dates.
						context of the past messages is:
				""";
        context = context + pastMessages + userMessage;
        System.out.println(context);
        Prompt  prompt = new Prompt(context);
        ChatResponse response = openAiChatModel.call(prompt);
        return response.getResult().getOutput().getContent();
    }
    @GetMapping(path = "/getSummary")
    public String getSummary() {
        List<Message> allMessages = messageJpaRepository.retrieveAllEntities();
        String request = """
                write a summary for a future employee in the following format:
                Bot: "bot"\s
                Serial number: "serial number"\s
                Problem: "summarize both the messages and what provided solutions didn't work 
                (you will find material for the summary below in json like format)"
                """;

        Prompt  prompt = new Prompt(request + allMessages);
        ChatResponse response = openAiChatModel.call(prompt);
        return response.getResult().getOutput().getContent();
    }
}