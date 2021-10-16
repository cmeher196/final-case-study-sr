package com.stackroute.favouriteservice.aspect;

import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;


@Aspect
@Component
public class LoggerAspect {
    Logger logger = LoggerFactory.getLogger(LoggerAspect.class);
	
	@Before("userFavouriteService()")
	public void showData()
	{
		logger.warn("getting favourite live scores");
	}
	
	@AfterReturning("userFavouriteService()")
	public void afterReturnExecution()
	{
		logger.info("Favourites live score fetched!!");
	}
	
	
	@AfterThrowing(pointcut="userFavouriteService()",throwing="exceptobj")
	public void addexceptionhandler(Exception exceptobj)
	{
		logger.warn("Exception raised while access favourite" + exceptobj);
	}

	
	@Pointcut("execution(* com.stackroute.favouriteservice.controller.FavouriteServiceController.getallFavourites(..))")
	public void userFavouriteService()
	{
		
	}
	

	
}
