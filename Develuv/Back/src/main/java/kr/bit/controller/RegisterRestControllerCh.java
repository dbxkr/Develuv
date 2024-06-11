package kr.bit.controller;

import kr.bit.dto.Regi3DTO;
import kr.bit.mapper.Regi3Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegisterRestControllerCh {
    @Autowired
    private Regi3Mapper regi3Mapper;

    @RequestMapping("/regi3submit")
    public String regi3submit(@RequestParam String id,
                              @RequestParam String name,
                              @RequestParam String gender,
                              @RequestParam String job,
                              @RequestParam String addr) {
        System.out.println(id + " " + name + " " + gender + " " + job + " " + addr);

        Regi3DTO regi3DTO = new Regi3DTO(id, name, gender, job, addr);

        regi3Mapper.updateRegi3(regi3DTO);

        return id + "," + name + "," + gender + "," + job + "," + addr;
    }

}
