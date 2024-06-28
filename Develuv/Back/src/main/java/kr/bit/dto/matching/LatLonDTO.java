package kr.bit.dto.matching;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LatLonDTO {
    private String user_id;
    private String city;
    private double latitude;
    private double longitude;
}
