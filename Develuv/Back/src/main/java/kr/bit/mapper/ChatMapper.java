package kr.bit.mapper;

import kr.bit.dto.ChatDTO;
import kr.bit.dto.UnblurDTO;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

public interface ChatMapper {

    //채팅기록을 모두 가져온다.
    @Select("select * from chatmessage where room_id = #{room_id}")
    public List<ChatDTO> getAllChatMessages(String room_id);

    //message_id 가져옴
    @Select("select message_id from chatmessage order by message_id desc limit 1")
    public int getMessageId();

    //유저의 채팅을 디비에 저장
    @Insert("insert into chatmessage " +
            "values (#{message_id}, #{room_id}, #{user_id}, #{message_content}, current_time(), 0);")
    public int saveChat(ChatDTO chatDTO);

    @Update("update opponent set blur = blur + 1 where user_id=#{myId} and oppo_id=#{oppoId}")
    public void unblur(UnblurDTO unblurDTO);

    @Update("update opponent set blur = blur - 1 where user_id=#{myId} and oppo_id=#{oppoId}")
    public void blur(UnblurDTO unblurDTO);
}
