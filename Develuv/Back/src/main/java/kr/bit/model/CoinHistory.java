package kr.bit.model;

import java.sql.Timestamp;

public class CoinHistory {
    private Long history_id;
    private String user_id;
    private int amount;
    private Timestamp timestamp;

    // getters and setters
    public Long getHistory_id() {
        return history_id;
    }

    public void setHistory_id(Long history_id) {
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
