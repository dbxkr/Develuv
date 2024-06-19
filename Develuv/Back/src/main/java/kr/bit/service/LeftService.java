package kr.bit.service;

import kr.bit.mapper.LeftMapper;
import kr.bit.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
public class LeftService {
    @Autowired
    private LeftMapper leftMapper;

    public int getUserCoins(String user_id) {
        return leftMapper.getUserCoins(user_id);
    }

    @Transactional
    public void deductUserCoins(String user_id, int amount) {
        leftMapper.deductUserCoins(user_id, amount);
        leftMapper.insertCoinHistory(user_id, -amount);
    }

    public User recommendUser(String user_id) {
        return leftMapper.recommendUser(user_id);
    }

    public User recommendUserByNbti(String nbti1, String nbti2, String nbti3, String nbti4) {
        return leftMapper.recommendUserByNbti(nbti1, nbti2, nbti3, nbti4);
    }
}