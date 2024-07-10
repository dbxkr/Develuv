package kr.bit.dto;

import java.time.LocalDate;

public class TokenDTO {
    private String user_id;
    private int token;
    private int daily_reward_ad;
    private int daily_reward_quiz;
    private String payment;
    private LocalDate last_login_date;


    // 생성자, getter, setter

    public TokenDTO(String user_id, int token, int daily_reward_ad, int daily_reward_quiz, String payment, LocalDate now) {
        this.user_id = user_id;
        this.token = token;
        this.daily_reward_ad = daily_reward_ad;
        this.daily_reward_quiz = daily_reward_quiz;
        this.payment = payment;
        this.last_login_date = last_login_date;

    }


    // getters and setters
    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public int getToken() {
        return token;
    }

    public void setToken(int token) {
        this.token = token;
    }

    public int getDaily_reward_ad() {
        return daily_reward_ad;
    }

    public void setDaily_reward_ad(int daily_reward_ad) {
        this.daily_reward_ad = daily_reward_ad;
    }

    public int getDaily_reward_quiz() {
        return daily_reward_quiz;
    }

    public void setDaily_reward_quiz(int daily_reward_quiz) {
        this.daily_reward_quiz = daily_reward_quiz;
    }

    public String getPayment() {
        return payment;
    }

    public void setPayment(String payment) {
        this.payment = payment;
    }

    public LocalDate getLast_login_date() {
        return last_login_date;
    }

    public void setLast_login_date(LocalDate last_login_date) {
        this.last_login_date = last_login_date;
    }
}

