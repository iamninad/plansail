package com.charge8.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("api/v1/users")
    private List<User> getUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("api/v1/users/{userId}")
    private User getUser(@PathVariable("userId") Integer userId) {
        return userService.getUserById(userId);
    }
}
