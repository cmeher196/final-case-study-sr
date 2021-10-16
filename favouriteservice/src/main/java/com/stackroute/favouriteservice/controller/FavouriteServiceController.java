package com.stackroute.favouriteservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.favouriteservice.model.Favourite;
import com.stackroute.favouriteservice.services.FavouriteService;
import com.stackroute.favouriteservice.util.exception.FavouriteAlreadyExistsException;
import com.stackroute.favouriteservice.util.exception.FavouriteNotFoundException;
import com.stackroute.favouriteservice.util.exception.UserDoesNotExistsException;




@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class FavouriteServiceController {

	FavouriteService fservice;
	
	
	@Autowired
	public FavouriteServiceController(FavouriteService fservice) {
		this.fservice = fservice;
	}
	
	
	@PostMapping("/favourite")
	public ResponseEntity<?> addToFavourite(@RequestBody Favourite data)
	{
		try {
			boolean response = fservice.addToFavourite(data);
			if(response)
			{
				return new ResponseEntity<String>("Favourite added!!", HttpStatus.CREATED);
			}
			else {
				return new ResponseEntity<String>("Favourite already exists!!", HttpStatus.CONFLICT);

			}
		} catch (FavouriteAlreadyExistsException e) {
			// TODO Auto-generated catch block
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
		}
	}
	
	@DeleteMapping("/deleteAllFavourite/{userId}")
	public ResponseEntity<?> deteleAllFavourites(@PathVariable("userId") String userId)
	{
		try {
			boolean response =  fservice.deleteAllLiveScores(userId);
			return new ResponseEntity<String>("All the favourites deleted for user id"+userId,HttpStatus.OK);
		} catch ( UserDoesNotExistsException e) {
			// TODO Auto-generated catch block
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/deletefavouritebyid/{userId}/{favouriteId}")
	public ResponseEntity<?> deleteFavouriteById(@PathVariable("userId") String userId, @PathVariable("favouriteId") String favouriteId)
	{
		try {
				boolean response = fservice.deleteFavouriteLiveScoreById(userId, favouriteId);
				if(response)
				{
					return new ResponseEntity<String>("Favourite deleted!!", HttpStatus.OK);
				}
				else {
					return new ResponseEntity<String>("Conflict in deleting", HttpStatus.NOT_FOUND);
				}

		} catch (FavouriteNotFoundException | UserDoesNotExistsException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);

		}
	}
	
	@GetMapping("/getfavourites/{userid}")
	public ResponseEntity<?> getallFavourites(@PathVariable("userid") String userId)
	{
		List<Favourite> response = fservice.getAllLiveScores(userId);
		if(response != null)
		{
			return new ResponseEntity<List<Favourite>>(response,HttpStatus.OK);
		}
		else {
			return new ResponseEntity<List<Favourite>>(response,HttpStatus.NOT_FOUND);

		}
	}
}
