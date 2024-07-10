package kr.bit.controller;


import kr.bit.dto.MatchingListDTO;
import kr.bit.dto.UserDto;
import kr.bit.dto.matching.LatLonDTO;
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
    public List<MatchingListDTO> matchingList(@RequestParam("searchAdr") String searchAdr) {
        List<MatchingListDTO> list = new ArrayList<>();
        System.out.println("address : " + searchAdr);
        list = matchingListMapper.findMatchingList(searchAdr);

        System.out.println(list);

        return list;
    }

    @RequestMapping("/matchingList/fame")
    public List<MatchingListDTO> fameMatchingList(@RequestParam("searchAdr") String searchAdr) {

        List<MatchingListDTO> list = new ArrayList<>();

        list = matchingListMapper.findMatchingListByFame(searchAdr);

        return list;
    }

//    @RequestMapping("/matchingList/getUserAdr")
//    public Map<String, String > getUserAdr(@RequestParam("user_id") String user_id){
//        String reAddress = matchingListMapper.findAddressById(user_id);
//        System.out.println("어디야 여긴!!");
//        Double distance = matchingService.getDistance(reAddress,"서울시강남구도곡로143");
//        System.out.println("거리는 : " + distance + "km");
//
//        if(reAddress != null){
//            Map<String, String> data = new HashMap<>();
//            data.put("returnAddress", reAddress);
//            return data;
//        }
//        return null;
//    }


//    @RequestMapping("/matching/geopoint")
//    public Double geoPoint(@RequestParam("saddress") String saddress){
//        System.out.println(saddress);
//
//        Double distance = matchingService.getDistance(saddress, "서울강남구도산대로176");
//        log.info("거리는 : " + distance +"m");
//
//        return distance;
//    }

    @RequestMapping("/matching/insert/latlon")
    public String insertLatlonTest() {

//        List<String> addrs = new ArrayList<>();
        String[] addrs = {
                "서울서초구사임당로64", "서울서초구서초중앙로12길38", "서울서초구효령로403", "서울강남구역삼로3길20-4",
                "서울강남구강남대로84길23", "서울강남구테헤란로2길27", "서울강남구테헤란로146", "서울강남구강남대로110길50",
                "서울강남구선릉로89길16", "서울강남구봉은사로48길32", "서울강남구삼성로57길35", "서울서초구고무래로6-16",
                "서울서초구나루터로4길61", "서울강남구강남대로136길7", "서울강남구강남대로132길48", "서울강남구도산대로26길23",
                "서울강남구논현로150길41", "서울강남구언주로153길11 ", "서울강남구언주로152길17", "서울성동구성덕정11길20-1",
                "서울서초구사임당로64", "서울서초구서초중앙로12길38", "서울서초구효령로403", "서울강남구역삼로3길20-4",
                "서울강남구강남대로84길23", "서울강남구테헤란로2길27", "서울강남구테헤란로146", "서울강남구강남대로110길50",
                "서울강남구선릉로89길16", "서울강남구봉은사로48길32", "서울강남구삼성로57길35", "서울서초구고무래로6-16",
                "서울서초구나루터로4길61", "서울강남구강남대로136길7", "서울강남구강남대로132길48", "서울강남구도산대로26길23",
                "서울강남구논현로150길41", "서울강남구언주로153길11 ", "서울강남구언주로152길17", "서울성동구성덕정11길20-1",
                "서울서초구사임당로64", "서울서초구서초중앙로12길38", "서울서초구효령로403", "서울강남구역삼로3길20-4",
                "서울강남구강남대로84길23", "서울강남구테헤란로2길27", "서울강남구테헤란로146", "서울강남구강남대로110길50",
                "서울강남구선릉로89길16", "서울강남구봉은사로48길32", "서울강남구삼성로57길35", "서울서초구고무래로6-16",
                "서울서초구나루터로4길61", "서울강남구강남대로136길7", "서울강남구강남대로132길48", "서울강남구도산대로26길23",
                "서울강남구논현로150길41", "서울강남구언주로153길11 ", "서울강남구언주로152길17", "서울성동구성덕정11길20-1",
                "서울서초구사임당로64", "서울서초구서초중앙로12길38", "서울서초구효령로403", "서울강남구역삼로3길20-4",
                "서울강남구강남대로84길23", "서울강남구테헤란로2길27", "서울강남구테헤란로146", "서울강남구강남대로110길50",
                "서울강남구선릉로89길16", "서울강남구봉은사로48길32", "서울강남구삼성로57길35", "서울서초구고무래로6-16",
                "서울서초구나루터로4길61", "서울강남구강남대로136길7", "서울강남구강남대로132길48", "서울강남구도산대로26길23",
                "서울강남구논현로150길41", "서울강남구언주로153길11 ", "서울강남구언주로152길17", "서울성동구성덕정11길20-1",
                "서울서초구사임당로64", "서울서초구서초중앙로12길38", "서울서초구효령로403", "서울강남구역삼로3길20-4",
                "서울강남구강남대로84길23", "서울강남구테헤란로2길27", "서울강남구테헤란로146", "서울강남구강남대로110길50",
                "서울강남구선릉로89길16", "서울강남구봉은사로48길32", "서울강남구삼성로57길35", "서울서초구고무래로6-16",
                "서울서초구나루터로4길61", "서울강남구강남대로136길7", "서울강남구강남대로132길48", "서울강남구도산대로26길23",
                "서울강남구논현로150길41", "서울강남구언주로153길11 ", "서울강남구언주로152길17", "서울성동구성덕정11길20-1",
        };

        List<UserDto> users = matchingListMapper.findUserAddress();
        for (int i = 0; i < 100; i++) {
            System.out.println(users.get(i).getUser_id());
            matchingService.insertCoodr(addrs[i], "서울특별시", users.get(i).getUser_id());
        }

        return "success insert latlon";
    }

    @RequestMapping("/matching/kdtreetest")
    public List<MatchingListDTO> kdtreetest(@RequestParam("city") String city,
                                            @RequestParam("user_id") String user_id) {

        List<MatchingListDTO> result = new ArrayList<>();
        result = matchingService.findMatchingListByCity(user_id);

        return result;
    }

    @RequestMapping("/matching/kdtree")
    public List<MatchingListDTO> kdtreeMatching(@RequestParam("user_id") String user_id) {
        List<MatchingListDTO> result = null;
        result = matchingService.findMatchingListByCity(user_id);
        return result;
    }

    @RequestMapping("/matching/kdtree/random")
    public List<MatchingListDTO> kdtreeRandom(@RequestParam("user_id") String user_id) {
        List<MatchingListDTO> result = null;
        result = matchingService.findMatchingListByRandom(user_id);
        return result;
    }

    @RequestMapping("/matching/kdtree/famous")
    public List<MatchingListDTO> kdtreeFamous(@RequestParam("user_id") String user_id) {
        List<MatchingListDTO> result = new ArrayList<>();
        result = matchingService.findMatchingListByFame(user_id);
        System.out.println(result);

        return result;
    }

    @RequestMapping("/matching/kdtree/nbti")
    public List<MatchingListDTO> kdtreeNbti(@RequestParam("user_id") String user_id,
                                            @RequestParam("nbti") String nbti) {
        List<MatchingListDTO> result = new ArrayList<>();
        result = matchingService.findMatchingListByNbti(user_id, nbti);

        return result;
    }
}
