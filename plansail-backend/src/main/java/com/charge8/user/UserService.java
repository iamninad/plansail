package com.charge8.user;

import com.charge8.exception.ResourceNotFound;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private UserDao userDao;

    public UserService(UserDao userDao) {
        this.userDao = userDao;
    }

    public List<User> getAllUsers() {
        return userDao.selectAllUsers();
    }

    public User getUserById(Integer id) {
        return userDao.selectUserById(id).
                orElseThrow(()->new ResourceNotFound("User with  id[%s] not found".formatted(id)));
    }
}
