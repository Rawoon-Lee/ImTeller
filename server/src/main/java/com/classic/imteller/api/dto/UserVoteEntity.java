package com.classic.imteller.api.dto;

import lombok.*;
import org.hibernate.annotations.*;
import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_vote")
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserVoteEntity {

    @Id
    private int userVoteId;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private UserEntity userEntity;

    @ManyToOne
    @JoinColumn(name="vote_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private VoteEntity voteEntity;

    @Column(nullable = false)
    private LocalDateTime createdDT;

    @Column
    private LocalDateTime updatedDT;
}
