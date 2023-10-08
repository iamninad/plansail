package com.charge8.boards;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {
    List<Board> findByOwnerId(Long userId);
    List<Board> findByTeamId(Long teamId);
}