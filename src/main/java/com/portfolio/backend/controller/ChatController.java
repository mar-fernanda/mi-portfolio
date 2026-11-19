package com.portfolio.backend.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:4200")
public class ChatController {

    @PostMapping
public ResponseEntity<Object> handleChat(@RequestBody Map<String, Object> payload) {
    String n8nWebhookUrl = "http://localhost:5678/webhook-test/portfolio-chat";
    
    RestTemplate restTemplate = new RestTemplate();
    try {
        // Reenvía el mapa completo (incluyendo el sessionId) a n8n
        Object response = restTemplate.postForObject(n8nWebhookUrl, payload, Object.class);
        return ResponseEntity.ok(response);
    } catch (Exception e) {
        return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
    }
}
}
