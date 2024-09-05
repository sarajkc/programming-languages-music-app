package com.sjkccodes.music_app.service;

import com.sjkccodes.music_app.entity.Artist;
import com.sjkccodes.music_app.model.ArtistModel;
import com.sjkccodes.music_app.repository.ArtistRepository;
import lombok.RequiredArgsConstructor;
import org.hibernate.boot.beanvalidation.IntegrationException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ArtistService {

private final ArtistRepository repository;

public List<Artist> getAllArtists(){
    return repository.findAllByDeletedAtIsNull();
}

public Optional<Artist> getArtistById(Integer id) {
    return repository.findByIdAndDeletedAtIsNull(id);
}

public List<Artist> getArtistByName(String name) {
        return repository.findByNameContainsAndDeletedAtIsNull(name);
    }
    public Artist createArtist (ArtistModel model) {
        Artist artist = new Artist();
        artist.setName(model.getName());
        artist.setBirthYear(model.getBirthYear());
        artist.setNationality(model.getNationality());
        artist.setCreatedAt(LocalDateTime.now());
        return repository.save(artist);
    }

    public Artist updateArtist (Integer id, ArtistModel model) {
    Artist artist = repository.findById(id).orElse(null);
    artist.setName(model.getName());
    artist.setBirthYear(model.getBirthYear());
    artist.setNationality(model.getNationality());
    artist.setUpdatedAt(LocalDateTime.now());
    return repository.save(artist);
    }

    public void deletedArtist (Integer id){
    Artist artist = repository.findByIdAndDeletedAtIsNull(id).orElseThrow();
    artist.setDeletedAt(LocalDateTime.now());
    repository.save(artist);

    }

}
