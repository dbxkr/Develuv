package kr.bit.service;

import kr.bit.dto.CoinHistoryDTO;
import kr.bit.dto.TokenDTO;
import kr.bit.dto.UserDto;
import kr.bit.mapper.TokenMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.time.LocalDate;


@Service
public class TokenService {

    @Autowired
    private TokenMapper tokenMapper;

    // 사용자 토큰 정보를 가져옵니다. 없으면 새로 생성합니다.
    public TokenDTO getToken(String user_id) {
        TokenDTO token = tokenMapper.findTokenByUserId(user_id);
        if (token == null) {
            // 사용자가 처음 로그인하는 경우 초기 토큰 값 설정
            token = new TokenDTO(user_id, 0, 0, 0, "", LocalDate.now());
            tokenMapper.insertToken(token);
        } else {
            // 하루에 한 번 2000포인트를 지급합니다.
            checkAndAddDailyReward(token);
        }
        return token;
    }

    // 코인 사용 이력을 추가합니다.
    public void addCoinHistory(String user_id, int amount) {
        CoinHistoryDTO coinHistory = new CoinHistoryDTO(user_id, amount);
        tokenMapper.insertCoinHistory(coinHistory);
    }

    // 사용자 토큰 정보를 업데이트합니다.
    public void updateToken(TokenDTO token) {
        tokenMapper.updateToken(token);
    }

    // 사용자 코인을 차감합니다.
    public void deductTokens(String user_id, int amount) {
        TokenDTO token = tokenMapper.findTokenByUserId(user_id);
        if (token != null && token.getToken() >= amount) {
            token.setToken(token.getToken() - amount);
            tokenMapper.updateToken(token);
            addCoinHistory(user_id, -amount);
            // 결제 완료 메시지 출력(매핑 리스트 오류로 임시 확인용)
            System.out.println("결제 완료: user_id=" + user_id + ", amount=" + amount);
        } else {
            throw new RuntimeException("Insufficient tokens");
        }
    }

    // 사용자 코인을 추가합니다.
    public void addTokens(String user_id, int amount) {
        TokenDTO token = tokenMapper.findTokenByUserId(user_id);
        if (token != null) {
            token.setToken(token.getToken() + amount);
            tokenMapper.updateToken(token);
            addCoinHistory(user_id, amount);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    // 매일 한 번 2000포인트를 지급하는 로직입니다.
    private void checkAndAddDailyReward(TokenDTO token) {
        LocalDate today = LocalDate.now();
        System.out.println("Last login date: " + token.getLast_login_date() + ", Today: " + today);
        // 마지막 로그인 날짜가 오늘과 다르면 2000포인트를 지급합니다.
        if (token.getLast_login_date() == null || !token.getLast_login_date().equals(today)) {
            token.setToken(token.getToken() + 2000);
            token.setLast_login_date(today);
            tokenMapper.updateToken(token);
            addCoinHistory(token.getUser_id(), 2000);
            System.out.println("2000 points added to user: " + token.getUser_id());
        }

    }
    }