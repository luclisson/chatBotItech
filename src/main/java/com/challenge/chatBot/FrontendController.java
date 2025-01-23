package com.challenge.chatBot;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FrontendController {
    @GetMapping(path = "/test")
    public TestObj receiveInput(){
        return new TestObj("this is a problem");
    }
}
