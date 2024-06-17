package kr.bit.service;
//비지니스 로직 처리
//데이터베이스 매퍼와 상호작용
// 데이터베이스에서 데이터 조회


import  kr.bit.mapper.IntroductionMapper;
import  kr.bit.model.Introduction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IntroductionService {
    @Autowired
    private IntroductionMapper introductionMapper;

    public List<Introduction> getIntroductions() {
        return introductionMapper.findAll();
    }

    public Introduction getMoreIntroduction() {
        // 토큰 결제 로직 추가
        // 추가 소개 로직
        return introductionMapper.findMoreIntroduction();
    }

    public Introduction getNBITIntroduction(String user_nbti) {
        // 토큰 결제 로직 추가
        // NBIT에 따른 소개 로직
        return introductionMapper.findNBITIntroduction(user_nbti);
    }
}

