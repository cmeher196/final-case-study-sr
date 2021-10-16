package com.stackroute.favouriteservice.services;

import java.util.List;

import com.stackroute.favouriteservice.model.Favourite;
import com.stackroute.favouriteservice.util.exception.FavouriteAlreadyExistsException;
import com.stackroute.favouriteservice.util.exception.FavouriteNotFoundException;
import com.stackroute.favouriteservice.util.exception.UserDoesNotExistsException;

public interface FavouriteService {

	boolean addToFavourite(Favourite favouriteData) throws FavouriteAlreadyExistsException;
	boolean deleteAllLiveScores(String userId) throws UserDoesNotExistsException;
	boolean deleteFavouriteLiveScoreById(String userId, String favouriteId ) throws FavouriteNotFoundException,UserDoesNotExistsException;
	Favourite getLiveScoreById(String userId, String favouriteId) throws FavouriteNotFoundException;
	List<Favourite> getAllLiveScores(String userId);
	
}
