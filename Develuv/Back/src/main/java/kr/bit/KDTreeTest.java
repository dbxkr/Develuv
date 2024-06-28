package kr.bit;


import kr.bit.service.MatchingService;

public class KDTreeTest {


    public static void main(String[] args) {
        MatchingService matchingService = new MatchingService();

        matchingService.findMatchingListByCity("user02");
    }
}
