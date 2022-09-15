package com.classic.imteller;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class ImtellerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ImtellerApplication.class, args);
	}

}
