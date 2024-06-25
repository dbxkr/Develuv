package kr.bit.controller;

import kr.bit.dto.UserProfileDto;
import kr.bit.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/edit-profile")
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;

    @GetMapping("/{userId}")
    public ResponseEntity<UserProfileDto> getUserProfile(@PathVariable String userId) {
        UserProfileDto userProfileDto = userProfileService.getUserProfile(userId);
        if (userProfileDto == null) {
            return ResponseEntity.notFound().build(); // 사용자가 존재하지 않는 경우 404 응답
        }
        return ResponseEntity.ok(userProfileDto);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<Void> updateUserProfile(@PathVariable String userId, @RequestBody UserProfileDto userProfileDto) {
        userProfileDto.setUser_id(userId); // 경로 매개변수에서 받은 userId 설정
        userProfileService.updateUserProfile(userProfileDto);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/upload-profile-image/{userId}")
    public ResponseEntity<String> uploadProfileImage(@PathVariable String userId, @RequestParam("profileImage") MultipartFile profileImage) {
        try {
            // 프로필 이미지 저장 로직
            String imageUrl = userProfileService.uploadProfileImage(userId, profileImage);
            return ResponseEntity.ok(imageUrl);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload profile image: " + e.getMessage());
        }
    }


}
