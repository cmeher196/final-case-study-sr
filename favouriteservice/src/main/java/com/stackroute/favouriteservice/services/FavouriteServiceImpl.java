package com.stackroute.favouriteservice.services;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.favouriteservice.model.Favourite;
import com.stackroute.favouriteservice.model.UserFavourite;
import com.stackroute.favouriteservice.repository.FavouriteServiceRepository;
import com.stackroute.favouriteservice.util.exception.FavouriteAlreadyExistsException;
import com.stackroute.favouriteservice.util.exception.FavouriteNotFoundException;
import com.stackroute.favouriteservice.util.exception.UserDoesNotExistsException;




@Service
public class FavouriteServiceImpl implements FavouriteService{

	FavouriteServiceRepository frepo;
	
	@Autowired
	 public FavouriteServiceImpl(FavouriteServiceRepository frepo) {
		 this.frepo = frepo;
	 }
	
	@Override
	public boolean addToFavourite(Favourite favouriteData) throws FavouriteAlreadyExistsException {
		
		boolean result=false;
        try 
        {
         Optional<UserFavourite> userexist= frepo.findById(favouriteData.getCreatedBy());
         if(userexist.isPresent()) {
        	 UserFavourite userFavouriteExist = userexist.get();
             List<Favourite> gameexist=userFavouriteExist.getFavouriteList();
             if(gameexist.isEmpty()) {
            	 gameexist.add(favouriteData);
            	 userFavouriteExist.setFavouriteList(gameexist);
                 frepo.save(userFavouriteExist);
                 result = true;
             }
             else {
            	 
               Iterator<Favourite> iterator = gameexist.iterator();
                while(iterator.hasNext()) 
                 {
                     Favourite data = iterator.next();
                     if(favouriteData.getGameId().equals(data.getGameId())) {
//                        iterator.remove();
                     	throw new FavouriteAlreadyExistsException("Favourite already exist with id :"+favouriteData.getGameId());
                     }
                     else 
                     {
                         result=true;
                     }
                     
                 } 
                if(result) 
                {
                	 gameexist.add(favouriteData);
                	 userFavouriteExist.setFavouriteList(gameexist);
                     frepo.save(userFavouriteExist);
                }
               
             }
        }
        else 
        {        
            List<Favourite> favouritelist = new ArrayList<>();
            favouritelist.add(favouriteData);
            UserFavourite userFavourite = new UserFavourite(favouriteData.getCreatedBy(),favouritelist);
            frepo.save(userFavourite);
            result = true; 
//            if(frepo.insert(userFavourite) != null)
//            {
//            	return true;
//            }
//            else
//            {
//            	return false;
//            }
        }
        }
         catch (Exception e) {
			// TODO: handle exception
        	 return false;
		}
		return result;
		
	}

	@Override
	public boolean deleteAllLiveScores(String userId) throws UserDoesNotExistsException{		
		boolean result = false;
		try {
			Optional<UserFavourite> userDetails = frepo.findById(userId);
			if(userDetails.isPresent())
			{
				UserFavourite user = userDetails.get();
				List<Favourite> getAllFavourite = user.getFavouriteList();
				Iterator<Favourite> iterator = getAllFavourite.iterator();
				while(iterator.hasNext())
				{
					Favourite data = iterator.next();
					if(data.getGameId() != "" || data.getGameId() != null)
					{
						iterator.remove();
					}
				}
				user.setFavouriteList(getAllFavourite);
				frepo.save(user);
				result = true;
			}
			else {
				throw new UserDoesNotExistsException("No Favourite list found");
				
			}
		}
		catch (Exception e) {
			// TODO: handle exception
			throw new UserDoesNotExistsException("No Favourite list found");
		}
		return result;
	}

	@Override
	public boolean deleteFavouriteLiveScoreById(String userId, String favouriteId) throws FavouriteNotFoundException,UserDoesNotExistsException {
		boolean result = false;
		Optional<UserFavourite> getuser = frepo.findById(userId);
		if(getuser.isPresent())
		{
			UserFavourite user = getuser.get();
			List<Favourite> listOfFavourites = getuser.get().getFavouriteList();
			Iterator<Favourite> getFavList = listOfFavourites.iterator();
			while(getFavList.hasNext())
			{
				Favourite data = getFavList.next();
				if(data.getGameId().equals(favouriteId))
				{
					getFavList.remove();
					user.setFavouriteList(listOfFavourites);
					frepo.save(user);
					result = true;
				}
			}
			if(!result) {
				throw new FavouriteNotFoundException("No favourites found for id :"+favouriteId);
			}
		}
		else {
			throw new UserDoesNotExistsException("No User found for user id: "+userId);
		}
		return result;
	}


	@Override
	public Favourite getLiveScoreById(String userId, String favouriteId) throws FavouriteNotFoundException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Favourite> getAllLiveScores(String userId) {
		// TODO Auto-generated method stub
		
		List<Favourite> getAllFav = null;
		Optional<UserFavourite> getUser = frepo.findById(userId);
		if(getUser.isPresent())
		{
			getAllFav = getUser.get().getFavouriteList();
			return getAllFav;
		}
		else {
			return getAllFav;
		}
	}

}
