package kr.bit.service.matching;

import kr.bit.dto.matching.LatLonDTO;
import org.jscience.mathematics.number.Float64;
import org.jscience.mathematics.vector.Float64Vector;
import org.jscience.mathematics.vector.Vector;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.PriorityQueue;

public class KDTree {

    // 두 지점 간의 거리를 계산하는 함수
    public Double degToRad(Double deg) {
        return deg * (Math.PI / 180.0);
    }

    public Double radToDeg(Double rad) {
        return rad * 180.0 / Math.PI;
    }

    public Double getDistance(Vector<Float64> point1, Vector<Float64> point2) {
        double lat1 = point1.get(0).doubleValue();
        double lon1 = point1.get(1).doubleValue();
        double lat2 = point2.get(0).doubleValue();
        double lon2 = point2.get(1).doubleValue();

        double theta = lon1 - lon2;
        double dist = Math.sin(degToRad(lat1)) * Math.sin(degToRad(lat2))
                + Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.cos(degToRad(theta));
        dist = Math.acos(dist);
        dist = radToDeg(dist);
        dist = dist * 60 * 1.1515 * 1609.344;
        return dist; // 단위 meter
    }

    KDNode root;
    int k;

    public KDTree(int k) {
        this.k = k;
    }

    public void insert(LatLonDTO latLon) {
        root = insertRec(root, latLon, 0);
    }

    public KDNode insertRec(KDNode root, LatLonDTO latLon, int depth) {
        double[] vec = new double[2];
        vec[0] = latLon.getLatitude();
        vec[1] = latLon.getLongitude();
        Vector<Float64> point = Float64Vector.valueOf(vec);

        if (root == null) {
            return new KDNode(latLon, depth % k);
        }
        int axis = root.axis;


        if (point.get(axis).compareTo(root.getVetor().get(axis)) < 0) {
            root.left = insertRec(root.left, latLon, depth + 1);
        } else {
            root.right = insertRec(root.right, latLon, depth + 1);
        }
        return root;
    }

    public List<LatLonDTO> nearestNeighbors(Vector<Float64> target, int n) {
        PriorityQueue<KDNodeDistance> pq = new PriorityQueue<>(Comparator.comparingDouble(KDNodeDistance::distance).reversed());
        nearestNeighborsRec(root, target, n, pq);

        List<LatLonDTO> neighbors = new ArrayList<>();
        while (!pq.isEmpty()) {
            neighbors.add(pq.poll().node.latLon);
        }
        return neighbors;
    }

    public void nearestNeighborsRec(KDNode root, Vector<Float64> target, int n, PriorityQueue<KDNodeDistance> pq) {
        if (root == null) {
            return;
        }

        double distance = getDistance(root.getVetor(), target);
        if (pq.size() < n) {
            pq.add(new KDNodeDistance(root, distance));
        } else if (distance < pq.peek().distance) {
            pq.poll();
            pq.add(new KDNodeDistance(root, distance));
        }

        KDNode nextBest = root.left;
        KDNode otherSide = root.right;
        if (target.get(root.axis).compareTo(root.getVetor().get(root.axis)) >= 0) {
            nextBest = root.right;
            otherSide = root.left;

        }

        nearestNeighborsRec(nextBest, target, n, pq);
        if (Math.abs(target.get(root.axis).doubleValue() - root.getVetor().get(root.axis).doubleValue()) < pq.peek().distance || pq.size() < n) {
            nearestNeighborsRec(otherSide, target, n, pq);
        }
    }
}
