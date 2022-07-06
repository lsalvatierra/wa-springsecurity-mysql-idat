package pe.edu.idat.service;

import org.springframework.stereotype.Service;

import pe.edu.idat.model.bd.User;
import pe.edu.idat.model.bd.Rol;
import pe.edu.idat.repository.RolRepository;
import pe.edu.idat.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.Arrays;
import java.util.HashSet;

@Service
public class UserService {


	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RolRepository roleRepository;
	private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

	// @Autowired
	/*
	 * public UserService(UserRepository userRepository, RolRepository
	 * roleRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
	 * this.userRepository = userRepository; this.roleRepository = roleRepository;
	 * this.bCryptPasswordEncoder = bCryptPasswordEncoder; }
	 */

	public User findUserByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	public User findUserByUserName(String userName) {
		return userRepository.findByUsername(userName);
	}

	public User saveUser(User user) {
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		user.setActive(true);
		Rol userRole = roleRepository.findByRolname("ADMIN");
		user.setRoles(new HashSet<Rol>(Arrays.asList(userRole)));
		return userRepository.save(user);
	}

}
