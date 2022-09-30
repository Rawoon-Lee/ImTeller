package com.classic.imteller.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    boolean existsByArtIdAndIsVoting(long artId, boolean isVoting);

    Optional<Vote> findByArtIdAndIsVoting(long artId, boolean isVoting);
}