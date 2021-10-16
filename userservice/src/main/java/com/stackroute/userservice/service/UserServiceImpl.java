package com.stackroute.userservice.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.userservice.model.UserModel;
import com.stackroute.userservice.repository.UserServiceRepository;
import com.stackroute.userservice.util.exception.UserAlreadyExistsException;
import com.stackroute.userservice.util.exception.UserNotFoundException;

@Service
public class UserServiceImpl implements UserService{
	
	public UserServiceRepository userRepo;
	
	@Autowired
	public UserServiceImpl(UserServiceRepository userRepo)
	{
		this.userRepo = userRepo;
	}

	@Override
	public UserModel findByUserIdAndPassword(String userId, String password) throws UserNotFoundException {
		// TODO Auto-generated method stub
		UserModel user = null;
		UserModel validUser = userRepo.findByUserIdAndPassword(userId, password);
		if(validUser == null)
		{
			throw new UserNotFoundException("User doesnt exists!!");
		}
		else {
			user = validUser;
		}
		return user;
	}

	@Override
	public boolean saveUser(UserModel user) throws UserAlreadyExistsException {

		boolean isUserCreated = false;
		Optional<UserModel> existinguser  = userRepo.findById(user.getUserId());
		
		if(existinguser.isPresent())
		{
			throw new UserAlreadyExistsException("User exists!!");
		}
		else {
			userRepo.save(user);
			isUserCreated = true;
		}
		return isUserCreated;
	}



	

}
