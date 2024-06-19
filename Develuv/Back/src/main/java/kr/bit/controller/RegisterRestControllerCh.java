package kr.bit.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.bit.dto.Regi3DTO;
import kr.bit.mapper.Regi3Mapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Slf4j
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



    private String uploadPath="/src/main/resources/imgs/";

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestPart(value = "file") MultipartFile file) {
        if(file==null){
            System.out.println("File is empty22");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File is empty");
        }
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("업로드할 파일을 선택해주세요.");
        }

        try {
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path path = Paths.get(uploadPath + File.separator + fileName);
            Files.write(path, file.getBytes());

            String imageUrl = "/api/images/" + fileName;
            return ResponseEntity.ok().body(imageUrl);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
