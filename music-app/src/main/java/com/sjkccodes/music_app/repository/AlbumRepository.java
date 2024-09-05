package com.sjkccodes.music_app.repository;

import com.sjkccodes.music_app.entity.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlbumRepository extends JpaRepository<Album,Integer> {

    List<Album> findAllByDeletedAtIsNull();

    Optional<Album> findByIdAndDeletedAtIsNull(Integer id);

    List<Album> findByTitleContainsAndDeletedAtIsNull( String title);


}
