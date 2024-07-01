package kr.bit.controller;

import kr.bit.dto.LatLonRegisterDTO;
import kr.bit.dto.UserDto;
import kr.bit.service.MatchingService;
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
    MatchingService matchingService;

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

    @RequestMapping("/api/register/latlon")
    public String registerLatLon(@RequestBody LatLonRegisterDTO latlon) {
        matchingService.insertCoodr(latlon.getUser_address(), latlon.getCity(), latlon.getUser_id());

        return "register latlon success";
    }
}
