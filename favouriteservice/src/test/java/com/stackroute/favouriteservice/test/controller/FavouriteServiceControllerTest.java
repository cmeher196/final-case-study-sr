package com.stackroute.favouriteservice.test.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.favouriteservice.controller.FavouriteServiceController;
import com.stackroute.favouriteservice.model.Favourite;
import com.stackroute.favouriteservice.model.UserFavourite;
import com.stackroute.favouriteservice.services.FavouriteService;

//@ExtendWith(SpringExtension.class)
@SpringBootTest
//@AutoConfigureMockMvc
public class FavouriteServiceControllerTest {

	 private MockMvc mockMvc;
	 
//	 @MockBean
	 Favourite favourite;
	 @MockBean
	 private FavouriteService fservice;
	 
	 @InjectMocks
	 private FavouriteServiceController fscontroller;
	 
	 private List<Favourite> favList;
	 
	 @BeforeEach
	    public void setUp() throws Exception {
	        MockitoAnnotations.initMocks(this);
	        mockMvc = MockMvcBuilders.standaloneSetup(fscontroller).build();
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

			
	 }
	 
	  @Test
	    public void addFavSuccess() throws Exception {
	        when(fservice.addToFavourite(any())).thenReturn(true);
	        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/favourite").contentType(MediaType.APPLICATION_JSON)
	                .content(asJsonString(favourite)))
	                .andExpect(MockMvcResultMatchers.status().isCreated())
	                .andDo(MockMvcResultHandlers.print());

	    }


	    @Test
	    public void addFavouriteFailure() throws Exception {
	        when(fservice.addToFavourite(any())).thenReturn(false);
	        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/favourite").contentType(MediaType.APPLICATION_JSON)
	                .content(asJsonString(favourite)))
	                .andExpect(MockMvcResultMatchers.status().isConflict())
	                .andDo(MockMvcResultHandlers.print());

	    }
	    
	    @Test
	    public void deleteFavouriteSuccess() throws Exception {

	        when(fservice.deleteFavouriteLiveScoreById("cmeher196", "1")).thenReturn(true);
	        mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/deletefavouritebyid/cmeher196/1")
	                .contentType(MediaType.APPLICATION_JSON))
	                .andExpect(MockMvcResultMatchers.status().isOk())
	                .andDo(MockMvcResultHandlers.print());
	    }


	    @Test
	    public void deleteFavouriteFailure() throws Exception {

	        when(fservice.deleteFavouriteLiveScoreById("cmeher196", favourite.getGameId())).thenReturn(false);
	        mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/deletefavouritebyid/cmeher196/1")
	                .contentType(MediaType.APPLICATION_JSON))
	                .andExpect(MockMvcResultMatchers.status().isNotFound())
	                .andDo(MockMvcResultHandlers.print());
	    }
	    
	    @Test
	    public void getAllFavouritesByUserIdSuccess() throws Exception {
	        when(fservice.getAllLiveScores("cmeher196")).thenReturn(favList);
	        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/getfavourites/cmeher196")
	                .contentType(MediaType.APPLICATION_JSON))
	                .andExpect(MockMvcResultMatchers.status().isOk())
	                .andDo(MockMvcResultHandlers.print());
	    }

	    @Test
	    public void getAllFavouritesByUserIdFailure() throws Exception {
	        when(fservice.getAllLiveScores("cmeher196")).thenReturn(null);
	        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/getfavourites/cmeher196")
	                .contentType(MediaType.APPLICATION_JSON))
	                .andExpect(MockMvcResultMatchers.status().isNotFound())
	                .andDo(MockMvcResultHandlers.print());
	    }
	
	    private static String asJsonString(final Object obj) {
	        try {
	            return new ObjectMapper().writeValueAsString(obj);
	        } catch (Exception e) {
	            throw new RuntimeException(e);
	        }
	    }
}
