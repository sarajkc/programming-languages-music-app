package com.sjkccodes.music_app.model;

import com.sjkccodes.music_app.entity.Album;
import com.sjkccodes.music_app.entity.Artist;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class SongModel {

    private String songTitle;
    private String duration;
    private Album album;
    private Artist artist;

}
