package com.stackroute.favouriteservice.model;

import java.util.Date;

public class Favourite {
	public String createdBy;
	public String gameId;
	public String gameCategory;
	public String gameTitle;
	public String gameInfo;
	public String firstTeam;
	public String secondTeam;
	public String firstTeamScoreOne;
	public String secondTeamScoreOne;
	public String firstTeamScoreTwo;
	public String secondTeamScoreTwo;
	public String result;
	public Date createdAt;
	
	public Favourite() {
		this.createdAt = new Date();
	}
	
	public String getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}
	public String getGameId() {
		return gameId;
	}
	public void setGameId(String gameId) {
		this.gameId = gameId;
	}
	public String getGameCategory() {
		return gameCategory;
	}
	public void setGameCategory(String gameCategory) {
		this.gameCategory = gameCategory;
	}
	public String getGameTitle() {
		return gameTitle;
	}
	public void setGameTitle(String gameTitle) {
		this.gameTitle = gameTitle;
	}
	public String getFirstTeam() {
		return firstTeam;
	}
	public void setFirstTeam(String firstTeam) {
		this.firstTeam = firstTeam;
	}
	public String getSecondTeam() {
		return secondTeam;
	}
	public void setSecondTeam(String secondTeam) {
		this.secondTeam = secondTeam;
	}
	public String getFirstTeamScoreOne() {
		return firstTeamScoreOne;
	}
	public void setFirstTeamScoreOne(String firstTeamScoreOne) {
		this.firstTeamScoreOne = firstTeamScoreOne;
	}
	public String getSecondTeamScoreOne() {
		return secondTeamScoreOne;
	}
	public void setSecondTeamScoreOne(String secondTeamScoreOne) {
		this.secondTeamScoreOne = secondTeamScoreOne;
	}
	public String getFirstTeamScoreTwo() {
		return firstTeamScoreTwo;
	}
	public void setFirstTeamScoreTwo(String firstTeamScoreTwo) {
		this.firstTeamScoreTwo = firstTeamScoreTwo;
	}
	public String getSecondTeamScoreTwo() {
		return secondTeamScoreTwo;
	}
	public void setSecondTeamScoreTwo(String secondTeamScoreTwo) {
		this.secondTeamScoreTwo = secondTeamScoreTwo;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public Date getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public String getGameInfo() {
		return gameInfo;
	}

	public void setGameInfo(String gameInfo) {
		this.gameInfo = gameInfo;
	}
	
	
}
