package com.challenge.chatBot;

import com.challenge.chatBot.message.Message;

import java.io.IOException;
import java.util.ArrayList;

import static org.hibernate.query.results.Builders.fetch;

public class DaoService {

    private static ArrayList<Message> MessageList = new ArrayList<>();


    //restart should delete all the messages i could read a json here to
    //sync the message list and clear it after solving a problem

    
    static {
        MessageList.add(0, new Message("placeholder", "system", "placeholder"));
    }
    


    //sync message list with json

    public void saveMessage(Message message) {
        MessageList.add(message);
    }
    public ArrayList<Message> getMessages() throws IOException {
        return MessageList;
    }

    public Message getMessage(int id) {

        return MessageList.get(id); 
    }
    public void deleteMessage(Message message, int id) {
        MessageList.remove(id -1); //id starts at 1 and index at 0
    }

    @Override
    public String toString() {
        StringBuilder output = new StringBuilder("");
        for (Message message : MessageList) {
            output.append(message.getAuthor() + " " + message.getMessage() + " " + message.getType());
        }
        return output.toString();
    }
}
