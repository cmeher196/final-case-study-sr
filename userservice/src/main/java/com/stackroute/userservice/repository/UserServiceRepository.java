package com.stackroute.userservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.userservice.model.UserModel;


@Repository
public interface UserServiceRepository extends JpaRepository<UserModel, String>{
	public UserModel findByUserIdAndPassword(String userId, String Password);
}
