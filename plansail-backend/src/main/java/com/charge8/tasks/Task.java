package com.charge8.tasks;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int task_id;
    private String title;
    private String description;
    private int board_id;
    private int user_id;
    private String status;
    private String priority;
    private LocalDate due_date;

    public int getTaskID() {
        return task_id;
    }

    public void setTaskID(int taskID) {
        task_id = taskID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String Title) {
        title = Title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getBoardID() {
        return board_id;
    }

    public void setBoardID(int boardID) {
        board_id = boardID;
    }

    public int getUserID() {
        return user_id;
    }

    public void setUserID(int userID) {
        user_id = userID;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String Status) {
        status = Status;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String Priority) {
        priority = Priority;
    }

    public LocalDate getDueDate() {
        return due_date;
    }

    public void setDueDate(LocalDate DueDate) {
        due_date = DueDate;
    }

    @Override
    public String toString() {
        return "{" +
            " task_id='" + getTaskID() + "'" +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", board_id='" + getBoardID() + "'" +
            ", user_id='" + getUserID() + "'" +
            ", status='" + getStatus() + "'" +
            ", priority='" + getPriority() + "'" +
            ", due_date='" + getDueDate() + "'" +
            "}";
    }

}