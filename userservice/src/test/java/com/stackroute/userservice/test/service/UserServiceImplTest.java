package com.stackroute.userservice.test.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.Optional;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.stackroute.userservice.model.UserModel;
import com.stackroute.userservice.repository.UserServiceRepository;
import com.stackroute.userservice.service.UserServiceImpl;
import com.stackroute.userservice.util.exception.UserAlreadyExistsException;
import com.stackroute.userservice.util.exception.UserNotFoundException;

public class UserServiceImplTest {

	@Mock
	private UserServiceRepository userRepo;
	
	private UserModel user;
	
	@InjectMocks
	private UserServiceImpl userServiceImpl;
	
	Optional<UserModel> optional;

	@BeforeEach
	public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
        user = new UserModel();
        user.setUserId("cmeher196");
        user.setPassword("helloworld");
        
        optional = Optional.of(user);
    }
	
	 @Test
	    public void testSaveUserSuccess() throws UserAlreadyExistsException {

	        Mockito.when(userRepo.save(user)).thenReturn(user);
	        boolean flag = userServiceImpl.saveUser(user);
	        assertEquals(true, flag);

	    }
	 
	 


	    @Test
	    public void testSaveUserFailure() {

	        Mockito.when(userRepo.findById("cmeher196")).thenReturn(optional);
	        Mockito.when(userRepo.save(user)).thenReturn(user);
	        assertThrows(
	        		UserAlreadyExistsException.class,
	                    () -> { userServiceImpl.saveUser(user); });

	    }
	    
	    @Test
	    public void testFindByUserIdAndPasswordSuccess() throws UserNotFoundException {
	        Mockito.when(userRepo.findByUserIdAndPassword("cmeher196", "helloworld")).thenReturn(user);
	        UserModel fetchedUser = userServiceImpl.findByUserIdAndPassword("cmeher196", "helloworld");
	        assertEquals("cmeher196", fetchedUser.getUserId());
	    }
	    
	    @Test
	    public void testFindByUserIdAndPasswordFailure() throws UserNotFoundException{
	        Mockito.when(userRepo.findByUserIdAndPassword("cmeher196", "helloworld")).thenReturn(null);
	        assertThrows(
	        		UserNotFoundException.class,
	        		() -> {userServiceImpl.findByUserIdAndPassword("cmeher196", "helloworld");});
			 
		 }
}
