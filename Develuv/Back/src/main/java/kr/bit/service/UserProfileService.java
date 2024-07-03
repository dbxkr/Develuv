package kr.bit.service;

import kr.bit.dto.UserDto;
import kr.bit.mapper.UserMapper;
import kr.bit.dto.UserProfileDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class UserProfileService {

    @Autowired
    private UserMapper userMapper;

    public void updateUserProfile(UserProfileDto userProfileDto) {
        UserDto userDto = new UserDto();
        userDto.setUser_id(userProfileDto.getUser_id());
        userDto.setUser_pw(userProfileDto.getUser_pw()); // 비밀번호만 업데이트
        userDto.setUser_phone(userProfileDto.getUser_phone());
        userDto.setUser_job(userProfileDto.getUser_job());
        userDto.setUser_address(userProfileDto.getUser_address());
        userDto.setUser_profile(userProfileDto.getUser_profile());
        userDto.setUser_code(userProfileDto.getUser_code()); // 추가된 코드 업데이트
        userMapper.updateUserProfile(userDto);
    }

    public void updateUserCode(String userId, String userCode) {
        userMapper.updateUserCode(userId, userCode);
    }

    public UserProfileDto getUserProfile(String userId) {
        UserDto userDto = userMapper.findUserById(userId);
        if (userDto == null) {
            return null;
        }

        UserProfileDto userProfileDto = new UserProfileDto();
        userProfileDto.setUser_id(userDto.getUser_id());
        userProfileDto.setUser_pw(userDto.getUser_pw());
        userProfileDto.setUser_phone(userDto.getUser_phone());
        userProfileDto.setUser_job(userDto.getUser_job());
        userProfileDto.setUser_address(userDto.getUser_address());
        userProfileDto.setUser_profile(userDto.getUser_profile());
        userProfileDto.setUser_code(userDto.getUser_code()); // 코드 설정

        return userProfileDto;
    }

    public String uploadProfileImage(String userId, MultipartFile profileImage) throws IOException {
        if (profileImage.isEmpty()) {
            throw new IllegalArgumentException("프로필 이미지가 없습니다.");
        }

        // 파일 저장 경로 설정 (예시: 임시 디렉토리)
        String uploadDir = "./uploads/profile-images/";
        Path uploadPath = Paths.get(uploadDir);

        // 디렉토리가 존재하지 않으면 생성
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // 파일 이름을 UUID로 생성하여 충돌을 방지하고 저장
        String fileName = UUID.randomUUID().toString() + "_" + profileImage.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);

        // 파일을 실제 경로에 저장
        Files.copy(profileImage.getInputStream(), filePath);

        // 저장된 파일의 URL을 반환 (예시: 실제로는 서버에서 접근 가능한 URL로 반환)
        return uploadDir + fileName;
    }
}