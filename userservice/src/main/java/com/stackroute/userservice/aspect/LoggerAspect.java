package com.stackroute.userservice.aspect;

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
	
	@Before("userLoginService()")
	public void showLoginData()
	{
		logger.warn("User is being logged in");
	}
	
	@AfterReturning("userLoginService()")
	public void afterLoginReturnExecution()
	{
		logger.info("User is logged in!!");
	}
	
	
	@AfterThrowing(pointcut="userLoginService()",throwing="exceptobj")
	public void addexceptionhandlerforlogin(Exception exceptobj)
	{
		logger.warn("Exception raised while login" + exceptobj);
	}

	
	@Pointcut("execution(* com.stackroute.userservice.controller.UserServiceController.loginUser(..))")
	public void userLoginService()
	{
		
	}
	
	@Before("userRegisterService()")
	public void showRegisterData()
	{
		logger.warn("User is being getting register");
	}
	
	@AfterReturning("userRegisterService()")
	public void afterRegisterReturnExecution()
	{
		logger.info("User is registered !!");
	}
	
	
	@AfterThrowing(pointcut="userRegisterService()",throwing="exceptobj")
	public void addexceptionhandlerforregister(Exception exceptobj)
	{
		logger.warn("Exception raised while registering" + exceptobj);
	}

	
	@Pointcut("execution(* com.stackroute.userservice.controller.UserServiceController.registerUser(..))")
	public void userRegisterService()
	{
		
	}

	
}
