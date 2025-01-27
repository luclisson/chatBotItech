package com.challenge.chatBot.message;

import com.challenge.chatBot.message.jpa.MessageJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MessageJpaCommandLineRunner implements CommandLineRunner {
    @Autowired
    private MessageJpaRepository jpaRepository;

    @Override
    public void run(String... args)  {
        jpaRepository.insert(new Message("this is a placeholder", "system", "required"));

    }
}
