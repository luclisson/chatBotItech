package com.challenge.chatBot;

import java.util.ArrayList;

public class DaoService {

    private static ArrayList<Message> MessageList = new ArrayList<>();
    //restart should delete all the messages i could read a json here to
    //sync the message list and clear it after solving a problem
    static {
        MessageList.add(0, new Message("this is a message", "me", 1));
        MessageList.add(1, new Message("this is a message", "you", 2));
    }

    public void saveMessage(Message message) {
        MessageList.add(message);
    }
    public ArrayList<Message> getMessages() {
        return MessageList;
    }
    public void deleteMessage(Message message, int id) {
        MessageList.remove(id -1); //id starts at 1 and index at 0
    }

    @Override
    public String toString() {
        StringBuilder output = new StringBuilder("");
        for (Message message : MessageList) {
            output.append(message.author + " " + message.message + " " + " " + message.id);
        }
        return output.toString();
    }
}
