package com.stackroute.userservice.test.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.userservice.controller.UserServiceController;
import com.stackroute.userservice.model.UserModel;
import com.stackroute.userservice.service.UserService;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
public class UserServiceControllerTest {

	@Autowired
	private MockMvc mockMVC;
	
	@MockBean
	private UserService uService;
	
	private UserModel user;
	
	@InjectMocks
	private UserServiceController userController;
	
	@BeforeEach
    public void setUp() throws Exception {

        MockitoAnnotations.initMocks(this);
        mockMVC = MockMvcBuilders.standaloneSetup(userController).build();

        user = new UserModel();
        user.setUserId("cmeher196");
        user.setPassword("helloworld");
        
    }
	
	@Test
    public void testUserRegistrationSucess() throws Exception {

        Mockito.when(uService.saveUser(user)).thenReturn(true);
        mockMVC.perform(MockMvcRequestBuilders.post("/api/v1/user/register").contentType(MediaType.APPLICATION_JSON)
        		.content(jsonToString(user)))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andDo(MockMvcResultHandlers.print());
    }
	
//	@Test
//    public void testUserRegistrationFailure() throws Exception {
//
//        Mockito.when(uService.saveUser(user)).thenReturn(false);
//        mockMVC.perform(MockMvcRequestBuilders.post("/api/v1/user/register").contentType(MediaType.APPLICATION_JSON)
//        		.content(jsonToString(user)))
//                .andExpect(MockMvcResultMatchers.status().isConflict())
//                .andDo(MockMvcResultHandlers.print());
//    }
	
	
	
	 @Test
	    public void testUserLoginSuccess() throws Exception {
	        String userId = "cmeher196";
	        String password = "helloworld";
	        Mockito.when(uService.saveUser(user)).thenReturn(true);
	        Mockito.when(uService.findByUserIdAndPassword(userId, password)).thenReturn(user);
	        mockMVC.perform(MockMvcRequestBuilders.post("/api/v1/user/login").contentType(MediaType.APPLICATION_JSON).content(jsonToString(user)))
	                .andExpect(MockMvcResultMatchers.status().isOk()).andDo(MockMvcResultHandlers.print());
	    }
	
	  private static String jsonToString(final Object obj) throws JsonProcessingException {
	        String result;
	        try {
	            final ObjectMapper mapper = new ObjectMapper();
	            final String jsonContent = mapper.writeValueAsString(obj);
	            result = jsonContent;
	        } catch (JsonProcessingException e) {
	            result = "Json processing error";
	        }
	        return result;
	    }
}
