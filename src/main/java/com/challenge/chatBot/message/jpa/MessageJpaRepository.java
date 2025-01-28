package com.challenge.chatBot.message.jpa;

import com.challenge.chatBot.message.Message;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public class MessageJpaRepository {
    @Autowired
    private EntityManager entityManager;

    public void insert(Message message) {
        entityManager.merge(message);
    }

    public Message retrieveEntityById(int id) {
        return entityManager.find(Message.class, id);
    }

    @SuppressWarnings("unchecked")
    public List<Message> retrieveAllEntities() {
        Query query = entityManager.createQuery("select m from Message m WHERE m.id>1"); //equal to SELECT * from MESSAGE because i have to prefill the db with a value which has id = 1
        return (List<Message>) query.getResultList();
    }
}
