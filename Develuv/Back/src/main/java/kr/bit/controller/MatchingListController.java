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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public Map<String, String > getUserAdr(@RequestParam("user_id") String user_id){
        String reAddress = matchingListMapper.findAddressById(user_id);
        System.out.println("어디야 여긴!!");
        Double distance = matchingService.getDistance(reAddress,"서울시강남구도곡로143");
        System.out.println("거리는 : " + distance + "km");

        if(reAddress != null){
            Map<String, String> data = new HashMap<>();
            data.put("returnAddress", reAddress);
            return data;
        }
        return null;
    }


    @RequestMapping("/matching/geopoint")
    public Double geoPoint(@RequestParam("saddress") String saddress){
        System.out.println(saddress);

        Double distance = matchingService.getDistance(saddress, "서울강남구도산대로176");
        log.info("거리는 : " + distance +"m");

        return distance;
    }
}
