package com.stackroute.userservice.service;

import com.stackroute.userservice.model.UserModel;
import com.stackroute.userservice.util.exception.UserAlreadyExistsException;
import com.stackroute.userservice.util.exception.UserNotFoundException;

public interface UserService {

	public UserModel findByUserIdAndPassword(String userId, String password) throws UserNotFoundException;

    boolean saveUser(UserModel user) throws UserAlreadyExistsException;
	
}
