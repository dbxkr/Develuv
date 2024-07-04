package kr.bit.mapper;

import kr.bit.dto.*;
import kr.bit.model.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper {

    @Select("select user_id, user_provider_id from users where user_email = #{user_email}")
    UserFindIdDTO findId(UserFindIdDTO userFindIdDTO);

    @Select("SELECT user_id, user_name, user_birth, user_gender, user_profile, user_job, user_address, user_nbti, user_pro_lang, user_drink, user_smoke, user_religion, user_edu FROM users WHERE user_id = #{user_id}")
    UserDto getUserById(@Param("user_id") String user_id);

    @Select("SELECT user_id FROM users WHERE user_id = #{user_id}")
    String findById(String user_id);

    @Insert("INSERT INTO Users(user_id, user_pw, user_name, user_email, user_birth, user_phone, user_gender, user_profile, user_provider_id, user_heart, user_code, user_job, user_address, user_nbti, user_pro_lang, user_drink, user_smoke, user_religion, user_edu) VALUES(#{user_id}, #{user_pw}, #{user_name}, #{user_email}, #{user_birth}, #{user_phone}, #{user_gender}, #{user_profile}, #{user_provider_id}, #{user_heart}, #{user_code}, #{user_job}, #{user_address}, #{user_nbti}, #{user_pro_lang}, #{user_drink}, #{user_smoke}, #{user_religion}, #{user_edu})")
    void save(UserDto user);

    @Select("select user_pw from users where user_email = #{user_email} and user_id = #{user_id}")
    String findPw(UserFindPwDTO userFindPwDTO);

    @Select("SELECT COUNT(*) > 0 FROM Users WHERE user_id = #{userId}")
    boolean existsById(@Param("userId") String userId);

    @Select("select * from users where user_id=#{user_id}")
    UserLoginDTO login(@Param("user_id") String user_id);

    @Select("SELECT COUNT(*) > 0 FROM Users WHERE user_email = #{email}")
    boolean existsByEmail(@Param("email") String email);

    @Select("SELECT * from users where user_id=#{user_id}")
    UserDto findUserById(@Param("user_id") String user_id);

    @Select("SELECT * " +
            "from users " +
            "left join (select oppo_id, blur, quiz from opponent where user_id = #{my_id}) o " +
            "on o.oppo_id = user_id " +
            "where user_id=#{user_id}")
    UserDto findOtherUserById(@Param("user_id") String user_id, @Param("my_id") String my_id);

    @Select("select user_name from users where user_id=#{user_id}")
    String findUserNameById(@Param("user_id") String user_id);

    @Update("UPDATE users SET user_pw = #{user_pw}, user_phone = #{user_phone}, user_job = #{user_job}, user_address = #{user_address}, user_profile=#{user_profile} WHERE user_id = #{user_id}")
    void updateUserProfile(UserDto userDto);

    @Update("UPDATE users SET user_profile = #{user_profile} WHERE user_id = #{user_id}")
    void updateUserProfileImage(@Param("user_id") String userId, @Param("user_profile") String userProfile);

    @Update("UPDATE users set user_git = #{value} where user_id = #{user_id}")
    void updateProfileGit(UserProfileUpdate userProfileUpdate);

    @Update("UPDATE users set user_instagram = #{value} where user_id = #{user_id}")
    void updateProfileInstagram(UserProfileUpdate userProfileUpdate);

    @Update("UPDATE users set user_memo = #{value} where user_id = #{user_id}")
    void updateProfileMemo(UserProfileUpdate userProfileUpdate);

    @Select("SELECT * FROM users WHERE user_id NOT IN (#{excludedUserIds}) LIMIT 12")
    List<User> findUsers(@Param("userId") String userId, @Param("excludedUserIds") String excludedUserIds);

    @Select("SELECT * FROM users WHERE user_nbti = #{nbti} AND user_id NOT IN(#{excludedUserIds}) LIMIT 12")
    List<User> findUsersByNbti(@Param("nbti") String nbti, @Param("excludedUserIds") String excludedUserIds);

    @Update("update users set user_heart = user_heart+1 where user_id = #{oppoId}")
    void increaseHeart(UnblurDTO unblurDTO);

    @Select("SELECT * FROM users WHERE user_id NOT IN (#{excludedUserIds}) ORDER BY user_heart DESC LIMIT 12")
    List<User> findFamousUsers(@Param("excludedUserIds") String excludedUserIds);


    @Update("UPDATE users set user_nbti = #{value} where user_id = #{user_id}")
    void updateProfileNbti(UserProfileUpdate userProfileUpdate);

    @Update("UPDATE users set user_pro_lang = #{value} where user_id = #{user_id}")
    void updateProfileProLang(UserProfileUpdate userProfileUpdate);

    @Update("UPDATE users set user_drink = #{value} where user_id = #{user_id}")
    void updateProfileDrink(UserProfileUpdate userProfileUpdate);

    @Update("UPDATE users set user_smoke = #{value} where user_id = #{user_id}")
    void updateProfileSmoke(UserProfileUpdate userProfileUpdate);

    @Update("UPDATE users set user_religion = #{value} where user_id = #{user_id}")
    void updateProfileReligion(UserProfileUpdate userProfileUpdate);

    @Update("UPDATE users set user_edu = #{value} where user_id = #{user_id}")
    void updateProfileEdu(UserProfileUpdate userProfileUpdate);

    @Update("UPDATE users set user_profile = #{value} where user_id = #{user_id}")
    void updateProfileProfile(UserProfileUpdate userProfileUpdate);

    @Update("UPDATE users set user_address = #{value} where user_id = #{user_id}")
    void updateProfileAddress(UserProfileUpdate userProfileUpdate);

    @Select("select * from users")
    List<UserDto> getAll();

    @Update("UPDATE users SET user_code = #{user_code} WHERE user_id = #{user_id}")
    void updateUserCode(@Param("user_id") String user_id, @Param("user_code") String user_code);
    @Select("SELECT user_pw FROM users WHERE user_id = #{user_id}")
    String findPasswordByUserId(@Param("user_id") String user_id);

    @Update("update users set user_pw = #{new_password} where user_id = #{user_id} and user_email = #{user_email}")
    int sendPwToEmail(UserFindPwDTO userFindPwDTO);


}
