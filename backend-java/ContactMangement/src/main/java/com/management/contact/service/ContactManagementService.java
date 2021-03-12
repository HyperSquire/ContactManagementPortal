package com.management.contact.service;

import com.management.contact.dto.ResponseDTO;
import com.management.contact.model.Contact;
import com.management.contact.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactManagementService {

    @Autowired
    ContactRepository contactRepository;

    public List<Contact> getContacts() {
        return contactRepository.findAll();
    }

    public ResponseDTO addUpdateContact(Contact contact) {
        contactRepository.save(contact);
        return new ResponseDTO("Success");
    }

    public ResponseDTO deleteContact(Integer id) {
        if(contactRepository.existsById(id)) {
            Optional<Contact> contact = contactRepository.findById(id);
            if(contact.isPresent()) {
                Contact existingContact = contact.get();
                existingContact.setActive(false);
                contactRepository.save(existingContact);
            }
            return new ResponseDTO("Success");
        } else {
            return new ResponseDTO("Failure");
        }
    }
}
