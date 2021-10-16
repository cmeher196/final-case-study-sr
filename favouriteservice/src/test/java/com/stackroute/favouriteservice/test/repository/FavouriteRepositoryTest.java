//package com.stackroute.favouriteservice.test.repository;
//
//
//import static org.hamcrest.MatcherAssert.assertThat;
//import static org.hamcrest.Matchers.is;
//
//import java.util.ArrayList;
//import java.util.Date;
//import java.util.List;
//
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//
//import com.stackroute.favouriteservice.model.Favourite;
//import com.stackroute.favouriteservice.model.UserFavourite;
//import com.stackroute.favouriteservice.repository.FavouriteServiceRepository;
//
//@ExtendWith(SpringExtension.class)
////@DataMongoTest
//public class FavouriteRepositoryTest {
//
//	@Autowired
//	private FavouriteServiceRepository fRepo;
//	
//	private Favourite favourite;
//	private UserFavourite user = new UserFavourite(null, null);
//	
//	private List<Favourite> favList = null;
//	
//	@BeforeEach
//	public void setUp() throws Exception{
//		favourite = new Favourite();
//		
//		favourite.setCreatedAt(new Date());
//		favourite.setCreatedBy("cmeher196");
//		favourite.setFirstTeam("England");
//		favourite.setFirstTeamScoreOne("289/10");
//		favourite.setFirstTeamScoreTwo("300/8");
//		favourite.setGameCategory("cricket");
//		favourite.setGameId("1234");
//		favourite.setGameInfo("Test series");
//		favourite.setGameTitle("Eng vs India Test Series");
//		favourite.setResult("Indiaa won");
//		favourite.setSecondTeam("India");
//		favourite.setSecondTeamScoreOne("299/10");
//		favourite.setSecondTeamScoreTwo("300/2");
//		
//		favList = new ArrayList<Favourite>();
//		favList.add(favourite);
//		user.setUserId("cmeher196");
//		user.setFavouriteList(favList);
//		
//	}
//	
//	 @AfterEach
//	 public void tearDown() throws Exception {
//	    fRepo.deleteAll();
//	 }
//	 
//	 @Test
//	    public void AddFavouriteTest() {
//	    	fRepo.save(user);
//	        List<Favourite> newFavList = fRepo.findById("cmeher196").get().getFavouriteList();
//	        assertThat(favList.get(0).getGameId(), is(newFavList.get(0).getGameId()));
//	    }
//	
//	
//}
