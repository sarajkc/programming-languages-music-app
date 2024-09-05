package com.sjkccodes.music_app.controller;

import com.sjkccodes.music_app.model.ArtistModel;
import com.sjkccodes.music_app.service.ArtistService;
import com.sjkccodes.music_app.entity.Artist;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/artist")
@RequiredArgsConstructor
@CrossOrigin
public class ArtistController {

    private final ArtistService service;

    @GetMapping
    public List<Artist> getAllArtists(){

        return service.getAllArtists();
    }

    @GetMapping(path="/id/{id}")
    public ResponseEntity<Artist> getArtistById(@PathVariable Integer id) {
        return ResponseEntity.of(service.getArtistById(id));
    }

    @GetMapping(path="/name/{name}")
    public List<Artist> getArtistByName(@PathVariable String name) {

        return service.getArtistByName(name);
    }

    @PostMapping
    public Artist createArtist(@RequestBody ArtistModel artist) {

        return service.createArtist(artist);
    }

    @PutMapping(path = "/id/{id}")
    public Artist updateArtist (@PathVariable Integer id, @RequestBody ArtistModel artist) {
        System.out.println(artist);
        return service.updateArtist(id, artist);
    }

    @DeleteMapping(path = "/id/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deletedArtist(@PathVariable Integer id) {
        service.deletedArtist(id);

    }

}
