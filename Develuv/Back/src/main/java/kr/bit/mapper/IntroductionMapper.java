package kr.bit.mapper;



import kr.bit.model.Introduction;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface IntroductionMapper {
    @Select("SELECT * FROM introductions")
    List<Introduction> findAll();

    @Select("SELECT * FROM introductions WHERE some_condition_for_more_introduction")
    Introduction findMoreIntroduction();

    @Select("SELECT * FROM introductions WHERE user_nbti = #{user_nbti}")
    Introduction findNBITIntroduction(String user_nbti);
}

