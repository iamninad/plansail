package com.charge8.user;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class UserDataAccessService implements UserDao {
    private static final List<User> users;

    static {
        users = new ArrayList<>();
        User alex = new User(1,"Alex","sdwer@fdsm.com");
        users.add(alex);
    }


    @Override
    public List<User> selectAllUsers() {
        return users;
    }

    @Override
    public Optional<User> selectUserById(Integer userId) {
        return users.stream()
                .filter(u -> u.getUserId().equals(userId))
                .findFirst();
    }
}
