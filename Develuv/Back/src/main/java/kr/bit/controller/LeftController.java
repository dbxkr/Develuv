package kr.bit.controller;

import kr.bit.model.User;
import kr.bit.service.LeftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/left")
public class LeftController {
    @Autowired
    private LeftService leftService;

    @GetMapping("/coins")
    public Map<String, Integer> getUserCoins(@RequestParam("user_id") String user_id) {
        int coins = leftService.getUserCoins(user_id);
        Map<String, Integer> response = new HashMap<>();
        response.put("coins", coins);
        return response;
    }

    @PostMapping("/coin/use")
    public Map<String, Object> useCoins(@RequestBody Map<String, Object> request) {
        String user_id = (String) request.get("user_id");
        int amount = (int) request.get("amount");

        leftService.deductUserCoins(user_id, amount);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("remainingCoins", leftService.getUserCoins(user_id));
        return response;
    }

    @GetMapping("/recommend")
    public User recommendUser(@RequestParam("user_id") String user_id) {
        return leftService.recommendUser(user_id);
    }

    @GetMapping("/recommend/nbti")
    public User recommendUserByNbti(@RequestParam("nbti1") String nbti1,
                                    @RequestParam("nbti2") String nbti2,
                                    @RequestParam("nbti3") String nbti3,
                                    @RequestParam("nbti4") String nbti4) {
        return leftService.recommendUserByNbti(nbti1, nbti2, nbti3, nbti4);
    }
}
