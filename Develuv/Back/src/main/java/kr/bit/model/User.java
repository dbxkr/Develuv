package kr.bit.model;

public class User {
    private String user_id;
    private String user_pw;
    private String user_name;
    private String user_email;
    private String user_birth;
    private String user_phone;
    private String user_gender = ""; // 기본값 설정
    private String user_profile = ""; // 기본값 설정
    private String user_provider_id = ""; // 기본값 설정
    private int user_heart = 0; // 기본값 설정
    private String user_code = ""; // 기본값 설정
    private String user_job = ""; // 기본값 설정
    private String user_address = ""; // 기본값 설정
    private String user_nbti = ""; // 기본값 설정

    // 각 필드에 대한 getter와 setter 메서드
    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getUser_pw() {
        return user_pw;
    }

    public void setUser_pw(String user_pw) {
        this.user_pw = user_pw;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getUser_email() {
        return user_email;
    }

    public void setUser_email(String user_email) {
        this.user_email = user_email;
    }

    public String getUser_birth() {
        return user_birth;
    }

    public void setUser_birth(String user_birth) {
        this.user_birth = user_birth;
    }

    public String getUser_phone() {
        return user_phone;
    }

    public void setUser_phone(String user_phone) {
        this.user_phone = user_phone;
    }

    public String getUser_gender() {
        return user_gender;
    }

    public void setUser_gender(String user_gender) {
        this.user_gender = user_gender;
    }

    public String getUser_profile() {
        return user_profile;
    }

    public void setUser_profile(String user_profile) {
        this.user_profile = user_profile;
    }

    public String getUser_provider_id() {
        return user_provider_id;
    }

    public void setUser_provider_id(String user_provider_id) {
        this.user_provider_id = user_provider_id;
    }

    public int getUser_heart() {
        return user_heart;
    }

    public void setUser_heart(int user_heart) {
        this.user_heart = user_heart;
    }

    public String getUser_code() {
        return user_code;
    }

    public void setUser_code(String user_code) {
        this.user_code = user_code;
    }

    public String getUser_job() {
        return user_job;
    }

    public void setUser_job(String user_job) {
        this.user_job = user_job;
    }

    public String getUser_address() {
        return user_address;
    }

    public void setUser_address(String user_address) {
        this.user_address = user_address;
    }

    public String getUser_nbti() {
        return user_nbti;
    }

    public void setUser_nbti(String user_nbti) {
        this.user_nbti = user_nbti;
    }
}
