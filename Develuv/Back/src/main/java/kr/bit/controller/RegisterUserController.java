package kr.bit.controller;

import kr.bit.dto.AdditionalDto;
import kr.bit.dto.NbtiDto;
import kr.bit.mapper.RegisterUserMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
public class RegisterUserController {

    @Autowired
    private RegisterUserMapper registerUserMapper;

    @PostMapping("/register/nbti")
    public void registerNbti(@RequestBody NbtiDto nbtiDto) {
        //1. 배열형태로 되어있는 nbti를 문자열로 변환한다.
        String nbti = "";
        for (String string : nbtiDto.getNbti()) {
            nbti += string;
        }
        nbtiDto.setUser_nbti(nbti);

        //2. update 쿼리 실행 위해 매퍼 호출.
        int result = registerUserMapper.updateNbti(nbtiDto);
        log.info("nbti update 결과 = {}", result);
    }

    @PostMapping("/register/additional")
    public void registerAdditionalInfo(@RequestBody AdditionalDto additionalDto) {
        //users 테이블 update
        int resultA = registerUserMapper.updateAdditionalA(additionalDto);
        //userdating 테이블 update
        int resultB = registerUserMapper.updateAdditionalB(additionalDto);
        log.info("additional info update 결과 = {}{}", resultA, resultB);
    }

}