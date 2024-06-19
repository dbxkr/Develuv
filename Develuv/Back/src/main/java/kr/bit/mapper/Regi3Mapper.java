package kr.bit.mapper;

import kr.bit.dto.Regi3DTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface Regi3Mapper {
    //http://localhost:8080/regi3submit?id=user01&name=%EC%84%9C%EC%B0%BD%ED%98%B8&gender=male&job=computer&addr=%EC%84%9C%EC%9A%B8%EC%8B%9C%EA%B0%95%EB%82%A8%EA%B5%AC
    @Update("update users set user_name=#{user_name}, user_gender=#{user_gender}, user_job=#{user_job}, user_address=#{user_address}" +
            " where user_id=#{user_id}")
    void updateRegi3(Regi3DTO regi3DTO);
}
