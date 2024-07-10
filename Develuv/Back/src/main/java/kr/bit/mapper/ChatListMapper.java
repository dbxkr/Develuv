package kr.bit.mapper;

import kr.bit.dto.ChatListDTO;
import kr.bit.dto.ChatStatusDTO;
import kr.bit.dto.UserDto;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ChatListMapper {

    @Select("SELECT cl.user_id AS userId, cl.room_id AS roomId, cr.room_name AS roomName, cr.room_create_time AS roomCreateTime " +
            "FROM chatlists cl " +
            "JOIN chatroom cr ON cl.room_id = cr.room_id " +
            "WHERE cl.user_id = #{userId}")
    List<ChatListDTO> getChatListsByUserId(@Param("userId") String userId);

    @Select("SELECT ucl.user_id AS user_id, ucl.user_name AS user_name, ucl.user_profile as user_profile, o.blur as blur " +
            "FROM (select cl.room_id, u.user_id, u.user_name, u.user_profile " +
            "from chatlists cl " +
            "JOIN users u ON cl.user_id = u.user_id) ucl " +
            "JOin (select oppo_id, blur from opponent where user_id = #{myId}) o " +
            "on ucl.user_id = o.oppo_id "+
            "WHERE ucl.room_id = #{roomId}")
    UserDto getParticipantsByRoomId(@Param("roomId") String roomId, @Param("myId") String myId);

    @Select("SELECT u.user_id AS userId, u.user_name AS userName " +
            "FROM users u " +
            "WHERE u.room_id = #{roomId}")
    List<UserDto> getUsersByRoomId(@Param("roomId") String roomId);

    @Select("SELECT room_id " +
            "FROM chatlists " +
            "WHERE user_id IN (#{myId}, #{oppoId}) " +
            "GROUP BY room_id " +
            "HAVING COUNT(DISTINCT user_id) = 2;")
    String getRoomIdByUserId(@Param("myId") String myId, @Param("oppoId") String oppoId);

    @Select("SELECT room_id " +
            "From chatlists " +
            "where room_id = #{roomId}")
    String getRoomIdByRoomId(@Param("roomId") String roomId);

    @Insert("INSERT into chatroom (room_id, room_name, room_create_time) values (#{roomId}, #{roomName}, NOW())")
    void createNewChatroom(@Param("roomId") String roomId, @Param("roomName") String roomName);

    @Insert("INSERT into chatlists (room_id, user_id) values (#{roomId}, #{userId})")
    void insertIntoChatlists(@Param("roomId") String roomId, @Param("userId") String userId);

    @Select("select message_content, message_time " +
            "from chatmessage " +
            "where room_id = #{room_id} " +
            "order by message_time desc limit 1")
    ChatStatusDTO getRecentMsg(ChatStatusDTO dto);

    @Select("select count(message_read) " +
            "from chatmessage " +
            "where room_id = #{room_id} and user_id not in (#{user_id}) and message_read = 0")
    Integer getUnreadCnt(ChatStatusDTO dto);

    @Update("update chatmessage " +
            "set message_read = 1 " +
            "where room_id = #{room_id} and user_id not in (#{user_id})")
    void updateReadMessage(ChatStatusDTO chatStatusDTO);

    @Delete("delete from chatlists where room_id = #{room_id}")
    void exitChatlist(ChatStatusDTO chatStatusDTO);

    @Delete("delete from chatmessage where room_id = #{room_id}")
    void exitChatmessage(ChatStatusDTO chatStatusDTO);

    @Delete("delete from chatroom where room_id = #{room_id}")
    void exitChatroom(ChatStatusDTO chatStatusDTO);

    @Insert("Insert into opponent (user_id, oppo_id, blur, quiz) values (#{myId}, #{oppoId}, 0, 0)")
    void setOppo(@Param("myId") String myId,@Param("oppoId") String oppoId);
}
