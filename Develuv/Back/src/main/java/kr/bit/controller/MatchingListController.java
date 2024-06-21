package kr.bit.controller;


import kr.bit.dto.MatchingListDTO;
import kr.bit.mapper.MatchingListMapper;
import kr.bit.service.MatchingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
public class MatchingListController {

    @Autowired
    MatchingListMapper matchingListMapper;

    @Autowired
    MatchingService matchingService;

    @RequestMapping("/matchingList")
    public List<MatchingListDTO> matchingList(@RequestParam("searchAdr") String searchAdr){
        List<MatchingListDTO> list = new ArrayList<>();
        System.out.println("address : " + searchAdr);
        list= matchingListMapper.findMatchingList(searchAdr);

        System.out.println(list);

        return list;
    }

    @RequestMapping("/matchingList/fame")
    public List<MatchingListDTO> fameMatchingList(@RequestParam("searchAdr") String searchAdr){

        List<MatchingListDTO> list = new ArrayList<>();

        list = matchingListMapper.findMatchingListByFame(searchAdr);

        return list;
    }

    @RequestMapping("/matchingList/getUserAdr")
    public String getUserAdr(@RequestParam("user_id") String user_id){
        String reAddress = matchingListMapper.findAddressById(user_id);
        if(reAddress != null){
            return reAddress;
        }
        return null;
    }


    @RequestMapping("/matching/geopoint")
    public Float geoPoint(@RequestParam("saddress") String saddress){
        System.out.println(saddress);
        Float[] res = matchingService.getCoodr(saddress);
        Float[] res2 = matchingService.getCoodr("서울시강남구도곡로143");

        log.info("거리는 : " + matchingService.getDistance(res, res2)*1000 +"m");

        return res[0];
    }


}
