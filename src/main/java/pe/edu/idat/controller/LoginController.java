package pe.edu.idat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import pe.edu.idat.model.bd.User;
import pe.edu.idat.service.UserService;

@Controller
public class LoginController {

    
    //private UserService userService = new UserService();
	@Autowired
	private UserService userService;

    //@RequestMapping(value={"/", "/login"}, method = RequestMethod.GET)
    @GetMapping(value={"/", "/login"})
    public String login(){
        //ModelAndView modelAndView = new ModelAndView();
        //modelAndView.setViewName("login");
        return "login";
    }


    //@RequestMapping(value="/registration", method = RequestMethod.GET)
    @GetMapping("/registration")
    public String registration(Model model){
        //ModelAndView modelAndView = new ModelAndView();
        User user = new User();
        //modelAndView.addObject("user", user);
        //modelAndView.setViewName("registration");
        model.addAttribute("user", user);
        return "registration";
    }

    //@RequestMapping(value = "/registration", method = RequestMethod.POST)
    @PostMapping("/registration")
    public ModelAndView createNewUser(User user, BindingResult bindingResult) {
        ModelAndView modelAndView = new ModelAndView();
        User userExists = userService.findUserByUserName(user.getUsername());
        if (userExists != null) {
            bindingResult
                    .rejectValue("username", "error.user",
                            "There is already a user registered with the user name provided");
        }
        if (bindingResult.hasErrors()) {
            modelAndView.setViewName("registration");
        } else {
            userService.saveUser(user);
            modelAndView.addObject("successMessage", "User has been registered successfully");
            modelAndView.addObject("user", new User());
            modelAndView.setViewName("registration");
          
        }
        return modelAndView;
    }

    //@RequestMapping(value="/admin/home", method = RequestMethod.GET)
    @GetMapping("/admin/home")
    //public ModelAndView home(){
    public String home(Model model){
    	//ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByUserName(auth.getName());
        model.addAttribute("userName", "Welcome " + user.getUsername() + "/" + user.getName() + " " + user.getLastname() + " (" + user.getEmail() + ")");
        model.addAttribute("adminMessage","Content Available Only for Users with Admin Role");
        //modelAndView.addObject("username", "Welcome " + user.getUsername() + "/" + user.getName() + " " + user.getLastname() + " (" + user.getEmail() + ")");
        //modelAndView.addObject("adminMessage","Content Available Only for Users with Admin Role");
        //modelAndView.setViewName("admin/home");
        return "admin/home";
    }
	
}
