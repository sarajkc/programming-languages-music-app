package com.sjkccodes.music_app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity(name="artist")
@NoArgsConstructor
@Getter
@Setter

public class Artist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "artist_id")
    private Integer id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable=false)
    private int birthYear;

    @Column(nullable=false)
    private String nationality;

    @Column (nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt;

    @JsonIgnore
    private LocalDateTime deletedAt;


}
