package com.sjkccodes.music_app.controller;


import com.sjkccodes.music_app.entity.Artist;
import com.sjkccodes.music_app.entity.Song;
import com.sjkccodes.music_app.model.ArtistModel;
import com.sjkccodes.music_app.model.SongModel;
import com.sjkccodes.music_app.service.ArtistService;
import com.sjkccodes.music_app.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/song")
@RequiredArgsConstructor
@CrossOrigin
public class SongController {

    private final SongService service;

    @GetMapping
    public List<Song> getAllSongs(){
        return service.getAllSongs();
    }

    @GetMapping(path="/id/{id}")
    public ResponseEntity<Song> getSongById(@PathVariable Integer id) {
        return ResponseEntity.of(service.getSongById(id));
    }

    @GetMapping(path="/songTitle/{songTitle}")
    public List<Song> getSongBySongTitle(@PathVariable String songTitle) {
        return service.getSongBySongTitle(songTitle);
    }

    @PostMapping
    public Song createSong(@RequestBody SongModel song) {
        return service.createSong(song);
    }

    @PutMapping(path = "/id/{id}")
    public Song updateSong (@PathVariable Integer id, @RequestBody SongModel song) {
        System.out.println(song);
        return service.updateSong(id, song);
    }

    @DeleteMapping(path = "/id/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deletedSong(@PathVariable Integer id) {
        service.deletedSong(id);
    }



}
