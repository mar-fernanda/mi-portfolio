package com.portfolio.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:4200")
public class ProfileController {

    @GetMapping
    public Map<String, Object> getProfile() {

        Map<String, Object> data = new HashMap<>();

        data.put("name", "MARÍA FERNANDA DÍAZ");

        data.put("role",
                "Desarrolladora Full Stack Junior (Java | Python | Node.js | React)");

        data.put("location", "Chile");

        data.put("profile",
                "Desarrolladora Full Stack Junior con enfoque en desarrollo backend con Java y arquitectura de microservicios. "
                + "Experiencia en desarrollo frontend y backend utilizando Java, Node.js y React. "
                + "Implementación de APIs REST, operaciones CRUD, autenticación y autorización con Spring Security, "
                + "manejo de bases de datos relacionales e integración con APIs externas. "
                + "Experiencia en automatización de procesos digitales, integración de servicios cloud "
                + "y desarrollo de soluciones basadas en APIs y herramientas no-code/low-code."
        );

        data.put("skills", List.of(
                "Java",
                "JavaScript",
                "TypeScript",
                "Node.js",
                "Angular",
                "Webhooks",
                "SQL",
                "Python",
                "HTML",
                "CSS",
                "JSON",
                "React",
                "HTML5",
                "CSS3",
                "Consumo de APIs REST",
                "Spring Boot",
                "Spring Security",
                "Arquitectura de Microservicios",
                "Node.js",
                "Express",
                "JPA / Hibernate",
                "MySQL",
                "PostgreSQL",
                "Google Sheets",
                "Google Cloud",
                "Excel",
                "Power BI",
                "n8n",
                "Zapier",
                "APIs de Google",
                "APIs de Facebook",
                "Diseño de Chatbots",
                "Git",
                "GitHub",
                "Postman",
                "Docker",
                "Jira"
        ));

        data.put("education", List.of(
                "Desarrollo de Aplicaciones Full Stack en Java – Skillnest (SENCE) | 2025",
                "Transformación Digital con IA y Automatización – Desafío Latam | 2025",
                "Análisis de Datos – Desafío Latam | 2026",
                "Introducción a Ciencia de Datos – IO University | 2026",
                "Herramientas IA para Desarrolladores – Skillnest | 2026",
                "Herramientas Colaborativas – Skillnest | 2026"
        ));

        data.put("languages", List.of(
                "Español Nativo",
                "Inglés B1"
        ));

        return data;
}
}
