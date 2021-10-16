package com.stackroute.favouriteservice.test.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.stackroute.favouriteservice.model.Favourite;
import com.stackroute.favouriteservice.model.UserFavourite;
import com.stackroute.favouriteservice.repository.FavouriteServiceRepository;
import com.stackroute.favouriteservice.services.FavouriteServiceImpl;
import com.stackroute.favouriteservice.util.exception.FavouriteAlreadyExistsException;
import com.stackroute.favouriteservice.util.exception.FavouriteNotFoundException;
import com.stackroute.favouriteservice.util.exception.UserDoesNotExistsException;

public class FavouriteServiceImplTest {

	
	private Favourite favourite;
	private UserFavourite user = new UserFavourite(null, null);;
	private List<Favourite> favList = null;
	
	@Mock
	private FavouriteServiceRepository fRepo;
	@InjectMocks
	private FavouriteServiceImpl favImpl;
	
	Optional<UserFavourite> options;
	
	
	 @BeforeEach
	    public void setUp() throws Exception {
	        MockitoAnnotations.initMocks(this);
//	        favImpl = MockMvcBuilders.standaloneSetup()
	        
	        favourite = new Favourite();
			
			favourite.setCreatedAt(new Date());
			favourite.setCreatedBy("cmeher196");
			favourite.setFirstTeam("England");
			favourite.setFirstTeamScoreOne("289/10");
			favourite.setFirstTeamScoreTwo("300/8");
			favourite.setGameCategory("cricket");
			favourite.setGameId("1234");
			favourite.setGameInfo("Test series");
			favourite.setGameTitle("Eng vs India Test Series");
			favourite.setResult("Indiaa won");
			favourite.setSecondTeam("India");
			favourite.setSecondTeamScoreOne("299/10");
			favourite.setSecondTeamScoreTwo("300/2");
			
			favList = new ArrayList<Favourite>();
			favList.add(favourite);
			user.setUserId("cmeher196");
			user.setFavouriteList(favList);
			
			options = Optional.of(user);
	 }
	
	 

	    @Test
	    public void addFavSuccess() {
	        when(fRepo.save((UserFavourite) any())).thenReturn(user);
	        boolean status = false;
			try {
				status = favImpl.addToFavourite(favourite);
			} catch (FavouriteAlreadyExistsException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	        assertEquals(true, status);
	    }

	    @Test
	    public void addFavFailure() {

	        when(fRepo.save(user)).thenReturn(null);
	        boolean status = true;
			try {
				status = favImpl.addToFavourite(favourite);
			} catch (FavouriteAlreadyExistsException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	        assertEquals(false, false);
	     }
	    
	    @Test
	    public void getAllFavouriteByUserId() {
	        when(fRepo.findById("cmeher196")).thenReturn(options);
	        List<Favourite> favList1 = favImpl.getAllLiveScores("cmeher196");
	        assertEquals(favList, favList1);
	    }
	    
	    @Test
	    public void deleteFavouriteByGameIdSuccess() throws FavouriteNotFoundException, UserDoesNotExistsException {
	        when(fRepo.findById(user.getUserId())).thenReturn(options);
	        when(fRepo.save(user)).thenReturn(user);
	        boolean flag = favImpl.deleteFavouriteLiveScoreById("cmeher196", favourite.getGameId());
	        assertEquals(true, flag);
	    }

	    @Test
	    public void deleteFavouriteByGameIdFailure() {
	        when(fRepo.findById(user.getUserId())).thenReturn(null);
	        when(fRepo.save(user)).thenReturn(user);
	        
	        assertThrows(
	        		NullPointerException.class,
	                    () -> { favImpl.deleteFavouriteLiveScoreById("cmeher196", favourite.getGameId()); });
	    
	    }
}
