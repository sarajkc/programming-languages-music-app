package com.sjkccodes.music_app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity(name="album")
@NoArgsConstructor
@Getter
@Setter
public class Album {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "album_id")
    private Integer id;

    @Column(nullable = false)
    private String title;

    @Column(nullable=false)
    private int releaseYear;

    @Column(nullable=false)
    private String genre;

    @Column(nullable = false)
    private Integer totalTracks;

    @ManyToOne(optional = false)
    @JoinColumn(name = "artist_id", nullable = false)
    private Artist artist;

    @Column (nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt;

    @JsonIgnore
    private LocalDateTime deletedAt;


    }

