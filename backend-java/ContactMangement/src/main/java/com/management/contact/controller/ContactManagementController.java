package com.management.contact.controller;

import com.management.contact.dto.ResponseDTO;
import com.management.contact.model.Contact;
import com.management.contact.service.ContactManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("contact")
public class ContactManagementController {

    @Autowired
    ContactManagementService contactManagementService;

    @GetMapping("/getContacts")
    public ResponseEntity<List<Contact>> getContacts(){
        return ResponseEntity.ok().body(contactManagementService.getContacts());
    }

    @PostMapping("/addUpdate")
    public ResponseEntity<ResponseDTO> addUpdateContact(@RequestBody Contact contact){
        return ResponseEntity.ok().body(contactManagementService.addUpdateContact(contact));
    }

    @PostMapping("/delete")
    public ResponseEntity<ResponseDTO> deleteContact(@RequestBody Integer id){
        return ResponseEntity.ok().body(contactManagementService.deleteContact(id));
    }
}
