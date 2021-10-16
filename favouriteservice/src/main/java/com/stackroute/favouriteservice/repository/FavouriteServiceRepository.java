package com.stackroute.favouriteservice.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.favouriteservice.model.UserFavourite;

@Repository
public interface FavouriteServiceRepository extends MongoRepository<UserFavourite, String>{

}
