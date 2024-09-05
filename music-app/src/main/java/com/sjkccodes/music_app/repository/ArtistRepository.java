package com.sjkccodes.music_app.repository;

import com.sjkccodes.music_app.entity.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArtistRepository extends JpaRepository <Artist, Integer>{

    List<Artist> findAllByDeletedAtIsNull();

    Optional<Artist> findByIdAndDeletedAtIsNull(Integer id);

    List <Artist> findByNameContainsAndDeletedAtIsNull(String name);


}
