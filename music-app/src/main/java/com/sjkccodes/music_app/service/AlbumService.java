package com.sjkccodes.music_app.service;

import com.sjkccodes.music_app.entity.Album;
import com.sjkccodes.music_app.model.AlbumModel;
import com.sjkccodes.music_app.repository.AlbumRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AlbumService {

    private final AlbumRepository repository;

    public List<Album> getAllAlbums(){
        return repository.findAllByDeletedAtIsNull();
    }

    public Optional<Album> getAlbumById(Integer id){
        return repository.findByIdAndDeletedAtIsNull(id);
    }

    public List<Album> getAlbumByTitle(String title){
        return repository.findByTitleContainsAndDeletedAtIsNull(title);
    }


    public Album createAlbum(AlbumModel model){
        Album album = new Album();
        album.setTitle(model.getTitle());
        album.setReleaseYear(model.getReleaseYear());
        album.setGenre(model.getGenre());
        album.setTotalTracks(model.getTotalTracks());
        album.setArtist(model.getArtist());
        return repository.save(album);
    }

    public Album updateAlbum(Integer id, AlbumModel model){
        Album album = repository.findById(id).orElse(null);
        album.setTitle(model.getTitle());
        album.setReleaseYear(model.getReleaseYear());
        album.setGenre(model.getGenre());
        album.setTotalTracks(model.getTotalTracks());
        album.setArtist(model.getArtist());
        album.setUpdatedAt(LocalDateTime.now());
        return repository.save(album);
    }

    public void deleteAlbum(Integer id){
        Album album = repository.findByIdAndDeletedAtIsNull(id).orElseThrow();
        album.setDeletedAt(LocalDateTime.now());
        repository.save(album);
    }




}
