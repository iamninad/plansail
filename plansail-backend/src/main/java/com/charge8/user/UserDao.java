package com.charge8.user;

import java.util.List;
import java.util.Optional;

public interface UserDao {
    List<User> selectAllUsers();
    Optional<User> selectUserById(Integer id);
}
