package kr.bit.mapper;

import kr.bit.dto.MatchingListDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface MatchingListMapper {

    @Select("select user_id, user_name, user_gender, user_nbti, user_address, user_profile " +
            "from users where user_address like concat('%',#{user_address},'%') limit 12")
    List<MatchingListDTO> findMatchingList(String user_address);


    @Select("select user_id, user_name, user_gender, user_nbti, user_address, user_profile " +
            "from users where user_address like concat('%',#{user_address},'%') and user_nbti=#{user_nbti} " +
            "limit 12 ")
    List<MatchingListDTO> findMatchingListByNbti(String user_nbti, String user_address);

    @Select("select user_id, user_name, user_gender, user_nbti, user_address, user_profile " +
            "from users where user_address like concat('%',#{user_address},'%') order by user_heart limit 12 ")
    List<MatchingListDTO> findMatchingListByFame(String user_address);
}
