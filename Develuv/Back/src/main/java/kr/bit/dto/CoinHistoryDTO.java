package kr.bit.dto;

import java.sql.Timestamp;

public class CoinHistoryDTO {
    private int history_id;
    private String user_id;
    private int amount;
    private Timestamp timestamp;

    // 생성자, getter, setter
    public CoinHistoryDTO(String user_id, int amount) {
        this.user_id = user_id;
        this.amount = amount;
    }

    public int getHistory_id() {
        return history_id;
    }

    public void setHistory_id(int history_id) {
        this.history_id = history_id;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }
}
