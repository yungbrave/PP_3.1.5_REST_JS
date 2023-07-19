package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class DbInitialData {

    private final UserService userService;

    @Autowired
    public DbInitialData(UserService userService) {
        this.userService = userService;
    }

    @PostConstruct
    public void setData() {
        userService.setInitData();
    }
}
