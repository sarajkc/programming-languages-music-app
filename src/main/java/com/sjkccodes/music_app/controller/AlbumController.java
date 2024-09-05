package com.sjkccodes.music_app.controller;

import com.sjkccodes.music_app.entity.Album;
import com.sjkccodes.music_app.model.AlbumModel;
import com.sjkccodes.music_app.service.AlbumService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/album")
@RequiredArgsConstructor
@CrossOrigin
public class AlbumController {

    private final AlbumService service;

    @GetMapping
    public List<Album> getAllAlbums(){
        return service.getAllAlbums();
    }

    @GetMapping(path = "/id/{id}")
        public ResponseEntity<Album> getAlbumById(@PathVariable Integer id){
            return ResponseEntity.of(service.getAlbumById(id));
        }

    @GetMapping(path = "/title/{title}")
    public List<Album> getAlbumByTitle(@PathVariable String title){
        return service.getAlbumByTitle(title);
    }

    @PostMapping
    public Album createAlbum(@RequestBody AlbumModel album) {
        return service.createAlbum(album);
    }

    @PutMapping(path = "/id/{id}")
    public Album updaAlbum(@PathVariable Integer id, @RequestBody AlbumModel album){
        return service.updateAlbum(id,album);
    }

    @DeleteMapping(path = "/id/{id}")
    @ResponseStatus (code = HttpStatus.NO_CONTENT)
    public void deleteAlbum(@PathVariable Integer id){
        service.deleteAlbum(id);
    }

}
