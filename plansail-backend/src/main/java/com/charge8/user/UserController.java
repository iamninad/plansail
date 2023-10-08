package com.charge8.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private static final String SECRET_KEY = "samplekey";
    private static final long EXPIRATION_TIME = 10; // 10 minutes
    @Autowired
    private PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // GET all users
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // GET user by ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // POST create a new user
    @PostMapping
    public User createUser(@RequestBody User user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword_hash());
        user.setPassword_hash(encodedPassword);
        return userRepository.save(user);
    }

    // POST login a user
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            System.out.println(loginRequest.toString());
            User user = userRepository.findByEmail(loginRequest.getEmail());

            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
            }

            // Check if password is correct
            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword_hash())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
            }

            String authToken = generateAuthToken(user);

            return ResponseEntity.ok(authToken);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    private String generateAuthToken(User user) {
        try {
            String token = Jwts.builder()
                    .setSubject(user.getUsername())
                    .claim("username", user.getUsername())
                    .setExpiration(new Date(System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(EXPIRATION_TIME)))
                    .signWith(SignatureAlgorithm.HS512, SECRET_KEY).compact();
            return token;
        } catch (Exception e) {
            return e.getMessage().toString();
        }
    }
}
