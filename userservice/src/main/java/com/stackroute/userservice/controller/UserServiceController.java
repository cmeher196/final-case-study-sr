package com.stackroute.userservice.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.userservice.model.UserModel;
import com.stackroute.userservice.service.UserService;
import com.stackroute.userservice.util.exception.UserAlreadyExistsException;
import com.stackroute.userservice.util.exception.UserNotFoundException;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/user")
public class UserServiceController {

	public UserService userService;
	
	@Autowired
	public UserServiceController(UserService userService)
	{
		this.userService = userService;
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody UserModel user)
	{
		try {
		   boolean isUserCreated = userService.saveUser(user);
		   return new ResponseEntity<Boolean>(isUserCreated, HttpStatus.CREATED);
		} catch (UserAlreadyExistsException e) {
			// TODO Auto-generated catch block
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
		}
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody UserModel user)
	{
		try {
			UserModel validUser = userService.findByUserIdAndPassword(user.getUserId(), user.getPassword());
			
			if(validUser == null)
			{
				return new ResponseEntity<String>("Invalid credentials!!", HttpStatus.UNAUTHORIZED);
			}
			else {
				String token = getToken(validUser);
				List<String> response = new ArrayList<String>();
				response.add(validUser.getUserId());
				response.add(token);
				return new ResponseEntity<List>(response, HttpStatus.OK);
			}
		} catch (UserNotFoundException e) {
			// TODO Auto-generated catch block
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
}
	}
	
	public String getToken(UserModel user)
	{
		long expiryTime = 10_000_000;
		return Jwts.builder().setSubject(user.getUserId())
								.setIssuedAt(new Date(System.currentTimeMillis()))
								.setExpiration(new Date(System.currentTimeMillis()+expiryTime))
								.signWith(SignatureAlgorithm.HS256, "ibmfsd")
								.compact();
	}
}
