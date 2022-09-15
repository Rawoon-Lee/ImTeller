package com.classic.imteller.api.repository;

import lombok.*;
import javax.persistence.*;

@Entity
@Table(name = "effect")
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class EffectEntity extends BaseEntity {

    @Column(nullable = false, length=20)
    private String grade;

    @Column(nullable = false)
    private String effect;

    @Column(nullable = false, length=256)
    private String description;

    @Column
    private int detail;

}
