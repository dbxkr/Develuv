package kr.bit.service.matching;

import kr.bit.dto.matching.LatLonDTO;
import org.jscience.mathematics.number.Float64;
import org.jscience.mathematics.vector.Float64Vector;
import org.jscience.mathematics.vector.Vector;

public class KDNode {
    LatLonDTO latLon;
    int axis;
    KDNode left, right;

    KDNode(LatLonDTO latLon, int axis) {
        this.latLon = latLon;
        this.axis = axis;
        this.left = this.right = null;
    }

    public Vector<Float64> getVetor() {
        double[] vec = new double[2];
        vec[0] = latLon.getLatitude();
        vec[1] = latLon.getLongitude();
        return Float64Vector.valueOf(vec);
    }
}
