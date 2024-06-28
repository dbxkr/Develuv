package kr.bit.service.matching;

public class KDNodeDistance {
    KDNode node;
    double distance;

    KDNodeDistance(KDNode node, double distance) {
        this.node = node;
        this.distance = distance;
    }

    double distance() {
        return distance;
    }
}
