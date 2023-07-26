package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/users/")
public class AdminController {

    @GetMapping("/access-error")
    public String accessError() {
        return "access-error";
    }

    @GetMapping("/admin")
    public String list() {
        return "users/list";
    }
}
