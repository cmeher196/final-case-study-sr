//package com.stackroute.userservice.test.repository;
//
//import static org.hamcrest.MatcherAssert.assertThat;
//import static org.hamcrest.Matchers.is;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.MockitoAnnotations;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//import com.stackroute.userservice.model.UserModel;
//import com.stackroute.userservice.repository.UserServiceRepository;
//
//@ExtendWith(SpringExtension.class)
//@DataJpaTest
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
//public class UserServiceRepositoryTest {
//	
//	@Autowired
//	private UserServiceRepository urepo;
//	
//	private UserModel user;
//	
//	 @BeforeEach
//	    public void setUp() {
//	        MockitoAnnotations.initMocks(this);
//	        user = new UserModel();
//	        user.setUserId("meher96");
//	        user.setPassword("hello1234");
//	    }
//	 
//	 @AfterEach
//	    public void tearDown() throws Exception {
//	    	urepo.deleteAll();
//	    }
//	 
//	 @Test
//	    public void testRegisterUserSuccess() {
//	    	urepo.save(user);
//	        UserModel fetchUser = urepo.findById(user.getUserId()).get();
//	        assertThat(user.getUserId(), is(fetchUser.getUserId()));
//	    }
//
//	    @Test
//	    public void testLoginUserSuccess() {
//	    	urepo.save(user);
//	        UserModel fetchUser = urepo.findById(user.getUserId()).get();
//	        assertThat(user.getUserId(), is(fetchUser.getUserId()));
//	    }
//
//}
