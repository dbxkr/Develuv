package kr.bit.controller;

import kr.bit.dto.MatchingListDTO;
import kr.bit.mapper.MatchingListMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class MatchingListController {

    @Autowired
    MatchingListMapper matchingListMapper;

    @RequestMapping("/matchingList")
    public List<MatchingListDTO> matchingList(@RequestParam("searchAdr") String searchAdr){
        List<MatchingListDTO> list = new ArrayList<>();
        list= matchingListMapper.findMatchingList(searchAdr);

        return list;
    }

    @RequestMapping("/matchingList/fame")
    public List<MatchingListDTO> fameMatchingList(@RequestParam("searchAdr") String searchAdr){

        List<MatchingListDTO> list = new ArrayList<>();

        list = matchingListMapper.findMatchingListByFame(searchAdr);

        return list;
    }
}
