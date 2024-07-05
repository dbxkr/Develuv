package kr.bit.mapper;

import kr.bit.dto.MatchingListDTO;
import kr.bit.dto.UserDto;
import kr.bit.dto.matching.LatLonDTO;
import org.apache.ibatis.annotations.*;

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
            "from users where user_address like concat('%',#{user_address},'%') order by user_fame limit 12 ")
    List<MatchingListDTO> findMatchingListByFame(String user_address);

    @Select("SELECT user_address from users where user_id=#{user_id}")
    String findAddressById(String user_id);



    // 주소들 긁어오기
    // 같은 도시내에 50명만 긁어오기
    @Select("select user_id " +
            "from users where user_address like concat('%',#{user_city},'%') and user_gender!=#{gender} limit 50")
    List<String> findUsers(@Param("user_city") String user_city, @Param("gender") String gender);

    @Select("select user_id " +
            "from users where user_address like concat('%',#{user_city},'%') and user_gender!=#{gender} order by RAND() limit 15")
    List<String> findUsersRandom(@Param("user_city") String user_city, @Param("gender") String gender);

    // 같은 도시 + 지정한 NBTI 유저 50명만 긁어오기
    @Select("select user_id " +
            "from users where user_address like concat('%',#{user_city},'%') and user_nbti=#{user_nbti} and user_gender!=#{gender} order by RAND() limit 50")
    List<String> findUserByNbti(@Param("user_city")String user_city, @Param("user_nbti")String user_nbti, @Param("gender") String gender);

    // 같은 도시내에 인기많은 사람 12명 긁어오기
    @Select("select user_id " +
            "from users where user_address like concat('%',#{user_city},'%') and user_gender!=#{gender} order by user_heart desc limit 20")
    List<String> findUserByFame(@Param("user_city") String user_city, @Param("gender") String gender);


    @Insert("insert into latlon (user_id, city, latitude, longitude) values (#{user_id},#{city},#{latitude},#{longitude})")
    void insertLatLon (LatLonDTO latlon);

    @Update("update latlon set city=#{city}, latitude=#{latitude}, longitude=#{longitude} where user_id=#{user_id}")
    void updateLatLon (LatLonDTO latlon);

    @Select("select * from latlon where user_id = #{user_id}")
    LatLonDTO findLatLonByUserId(String user_id);

    @Select("select * from latlon where city = #{city} and user_id != #{user_id} limit 50")
    List<LatLonDTO> findLatLonByCity(LatLonDTO latlon);

    @Select("select * from latlon where city = #{city} and user_id != #{user_id} ORDER BY rand() limit 100")
    List<LatLonDTO> findLatLonByRandom(LatLonDTO latlon);

    @Select("select * from users where user_id like 'user%'")
    List<UserDto> findUserAddress();

    @Select("select user_id, user_name, user_gender, user_nbti, user_address, user_profile, user_birth, user_heart " +
            "from users where user_id=#{user_id}")
    MatchingListDTO findMatchingUserById(String user_id);

    @Select("select user_gender from users where user_id=#{user_id}")
    String getGender(String user_id);
}
