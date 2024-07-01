package kr.bit.util;

import org.mindrot.jbcrypt.BCrypt;

public class PasswordUtils {

    // 사용자가 제출한 비밀번호와 저장된 해시된 비밀번호를 비교하는 메서드
    public static boolean checkPassword(String plainPassword, String hashedPassword) {
        return BCrypt.checkpw(plainPassword, hashedPassword);
    }

}
