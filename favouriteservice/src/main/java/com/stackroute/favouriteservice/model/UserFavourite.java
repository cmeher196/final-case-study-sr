package com.stackroute.favouriteservice.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class UserFavourite {

	@Id
	public String userId;
	public List favouriteList;
	
	public UserFavourite(String userId, List<Favourite> favouriteList)
	{
		this.userId = userId;
		this.favouriteList = favouriteList;
	}
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public List<Favourite> getFavouriteList() {
		return favouriteList;
	}
	public void setFavouriteList(List<Favourite> favouriteList) {
		this.favouriteList = favouriteList;
	}
	
}
