package com.sjkccodes.music_app.service;

import com.sjkccodes.music_app.entity.Artist;
import com.sjkccodes.music_app.entity.Song;
import com.sjkccodes.music_app.model.ArtistModel;
import com.sjkccodes.music_app.model.SongModel;
import com.sjkccodes.music_app.repository.ArtistRepository;
import com.sjkccodes.music_app.repository.SongRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SongService {

    private final SongRepository repository;

    public List<Song> getAllSongs(){
        return repository.findAllByDeletedAtIsNull();
    }

    public Optional<Song> getSongById(Integer id) {
        return repository.findByIdAndDeletedAtIsNull(id);
    }

    public List<Song> getSongBySongTitle(String songTitle) {
        return repository.findBySongTitleContainsAndDeletedAtIsNull(songTitle);
    }
    public Song createSong (SongModel model) {
        Song song = new Song();
        song.setSongTitle(model.getSongTitle());
        song.setDuration(model.getDuration());
        song.setAlbum(model.getAlbum());
        song.setArtist(model.getArtist());
        song.setCreatedAt(LocalDateTime.now());
        return repository.save(song);
    }

    public Song updateSong (Integer id, SongModel model) {
        Song song = repository.findByIdAndDeletedAtIsNull(id).orElseThrow();
        song.setSongTitle(model.getSongTitle());
        song.setDuration(model.getDuration());
        song.setAlbum(model.getAlbum());
        song.setArtist(model.getArtist());
        song.setUpdatedAt(LocalDateTime.now());
        return repository.save(song);
    }

    public void deletedSong(Integer id){
        Song song = repository.findByIdAndDeletedAtIsNull(id).orElseThrow();
        song.setDeletedAt(LocalDateTime.now());
        repository.save(song);

    }

}


