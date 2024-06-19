package kr.bit.mapper;

import kr.bit.dto.AdditionalDto;
import kr.bit.dto.NbtiDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface RegisterUserMapper {

    @Update("update users set user_nbti = #{user_nbti} where user_id = #{user_id}")
    public int updateNbti(NbtiDto nbtiDto);

    @Update("update users " +
            "set user_pro_lang = #{user_pro_lang}, user_drink = #{user_drink}, user_smoke = #{user_smoke}," +
            "user_religion = #{user_religion}, user_edu = #{user_edu}" +
            "where user_id = #{user_id}")
    public int updateAdditionalA(AdditionalDto additionalDto);

    @Update("update userdating set dating_style = #{dating_style} where user_id = #{user_id}")
    public int updateAdditionalB(AdditionalDto additionalDto);
}
