package com.sjkccodes.music_app.repository;

import com.sjkccodes.music_app.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SongRepository extends JpaRepository<Song,Integer> {

    List<Song> findAllByDeletedAtIsNull();
    Optional<Song> findByIdAndDeletedAtIsNull(Integer id);
    List<Song> findBySongTitleContainsAndDeletedAtIsNull(String songTitle);

}
