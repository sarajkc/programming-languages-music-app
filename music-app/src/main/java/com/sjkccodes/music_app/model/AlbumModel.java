package com.sjkccodes.music_app.model;

import com.sjkccodes.music_app.entity.Artist;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter

public class AlbumModel {

    private String title;
    private Integer releaseYear;
    private String genre;
    private Integer totalTracks;
    private Artist artist;

}
