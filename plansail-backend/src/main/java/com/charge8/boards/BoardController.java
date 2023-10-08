package com.charge8.boards;

import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/boards")
public class BoardController {
    private final BoardRepository boardRepository;

    public BoardController(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    @GetMapping("/user/{userId}")
    public List<Board> getUserBoards(@PathVariable Long userId) {
        return boardRepository.findByOwnerId(userId);
    }

    @GetMapping("/team/{teamId}")
    public List<Board> getTeamBoards(@PathVariable Long teamId) {
        return boardRepository.findByTeamId(teamId);
    }
}
