package com.hospital.defaultData;

import com.hospital.entity.UserCredential;
import com.hospital.repository.UserCredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DefaultDataSeeDer implements CommandLineRunner {

    @Autowired
    private UserCredentialRepository userCredentialRepository;
    @Override
    public void run(String... args) throws Exception {
        System.out.print("Runner Start");
        UserCredential userCredential = new UserCredential();
        userCredential.setEmail("admin1@gmail.com");
        userCredential.setName("admin1@gmail.com");
        //password- admin1
        userCredential.setPassword("$2y$10$lA4CENNOSnDULlXokien7eYywV/BHhM/d304QPpgC8fjf5lv8uhK.");
        userCredential.setRoles("Admin");
        userCredentialRepository.save(userCredential);

        UserCredential userCredential1 = new UserCredential();
        userCredential1.setEmail("admin2@gmail.com");
        userCredential1.setName("admin2@gmail.com");
        //password- admin2
        userCredential1.setPassword("$2y$10$4.XvYOvb4N6H6VbtHclsSui.xceQ9gfk.NuJsWLCVZ/R18Kggwcve");
        userCredential1.setRoles("Admin");
        userCredentialRepository.save(userCredential1);
        System.out.print("Runner Finish");

    }
}
