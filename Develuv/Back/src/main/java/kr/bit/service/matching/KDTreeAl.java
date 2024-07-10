package kr.bit.service.matching;

import org.jscience.mathematics.number.Float64;
import org.jscience.mathematics.vector.Float64Vector;
import org.jscience.mathematics.vector.Vector;

import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;
import java.util.Comparator;

public class KDTreeAl {

    // 두 지점 간의 거리를 계산하는 함수
    public static Double degToRad(Double deg) {
        return deg * (Math.PI / 180.0);
    }

    public static Double radToDeg(Double rad) {
        return rad * 180.0 / Math.PI;
    }

    public static Double getDistance(Vector<Float64> point1, Vector<Float64> point2) {
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

    // KD 트리 노드 클래스
    static class KDNode {
        Vector<Float64> point;
        int axis;
        KDNode left, right;

        KDNode(Vector<Float64> point, int axis) {
            this.point = point;
            this.axis = axis;
            this.left = this.right = null;
        }
    }

    // KD 트리 클래스
    static class KDTree {
        KDNode root;
        int k;

        KDTree(int k) {
            this.k = k;
        }

        void insert(Vector<Float64> point) {
            root = insertRec(root, point, 0);
        }

        private KDNode insertRec(KDNode root, Vector<Float64> point, int depth) {
            if (root == null) {
                return new KDNode(point, depth % k);
            }
            int axis = root.axis;
            if (point.get(axis).compareTo(root.point.get(axis)) < 0) {
                root.left = insertRec(root.left, point, depth + 1);
            } else {
                root.right = insertRec(root.right, point, depth + 1);
            }
            return root;
        }

        List<Vector<Float64>> nearestNeighbors(Vector<Float64> target, int n) {
            PriorityQueue<KDNodeDistance> pq = new PriorityQueue<>(Comparator.comparingDouble(KDNodeDistance::distance).reversed());
            nearestNeighborsRec(root, target, n, pq);

            List<Vector<Float64>> neighbors = new ArrayList<>();
            while (!pq.isEmpty()) {
                neighbors.add(pq.poll().node.point);
            }
            return neighbors;
        }

        private void nearestNeighborsRec(KDNode root, Vector<Float64> target, int n, PriorityQueue<KDNodeDistance> pq) {
            if (root == null) {
                return;
            }

            double distance = getDistance(root.point, target);
            if (pq.size() < n) {
                pq.add(new KDNodeDistance(root, distance));
            } else if (distance < pq.peek().distance) {
                pq.poll();
                pq.add(new KDNodeDistance(root, distance));
            }

            KDNode nextBest = root.left;
            KDNode otherSide = root.right;
            if (target.get(root.axis).compareTo(root.point.get(root.axis)) >= 0) {
                nextBest = root.right;
                otherSide = root.left;

            }

            nearestNeighborsRec(nextBest, target, n, pq);
            if (Math.abs(target.get(root.axis).doubleValue() - root.point.get(root.axis).doubleValue()) < pq.peek().distance || pq.size() < n) {
                nearestNeighborsRec(otherSide, target, n, pq);
            }
        }
    }

    // KDNode와 거리 정보를 저장하는 클래스
    static class KDNodeDistance {
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

    public static void main(String[] args) {
        KDTree tree = new KDTree(2);

        // 50개의 예제 위도/경도 좌표 (Latitude, Longitude)
        double[][] latLonCoordinates = {
                {37.5665, 126.9780}, {35.1796, 129.0756}, {37.4563, 126.7052}, {35.9078, 127.7669},
                {35.1595, 126.8526}, {35.8722, 128.6025}, {37.7618, 128.8723}, {34.8106, 126.3922},
                {36.0182, 129.3435}, {36.6293, 127.4567}, {37.4784, 126.6160}, {35.5412, 129.2562},
                {37.5665, 127.0000}, {35.1796, 129.0500}, {37.4563, 126.7000}, {35.9078, 127.7500},
                {35.1595, 126.8500}, {35.8722, 128.6000}, {37.7618, 128.8700}, {34.8106, 126.3900},
                {36.0182, 129.3400}, {36.6293, 127.4500}, {37.4784, 126.6100}, {35.5412, 129.2500},
                {37.5665, 126.9800}, {35.1796, 129.0760}, {37.4563, 126.7060}, {35.9078, 127.7670},
                {35.1595, 126.8530}, {35.8722, 128.6030}, {37.7618, 128.8730}, {34.8106, 126.3930},
                {36.0182, 129.3440}, {36.6293, 127.4570}, {37.4784, 126.6170}, {35.5412, 129.2570},
                {37.5666, 126.9790}, {35.1797, 129.0770}, {37.4564, 126.7070}, {35.9079, 127.7680},
                {35.1596, 126.8540}, {35.8723, 128.6040}, {37.7619, 128.8740}, {34.8107, 126.3940},
                {36.0183, 129.3450}, {36.6294, 127.4580}, {37.4785, 126.6180}, {35.5413, 129.2580}
        };

        // KD 트리에 좌표 추가
        for (double[] coord : latLonCoordinates) {
            tree.insert(Float64Vector.valueOf(coord));
        }

        // 검색할 좌표 (위도, 경도)
        Vector<Float64> target = Float64Vector.valueOf(37.494980, 127.028668);

        // 12개의 최근접 이웃 찾기
        List<Vector<Float64>> neighbors = tree.nearestNeighbors(target, 12);

        // 결과 출력
        System.out.printf("Target: (%.6f, %.6f)%n", target.get(0).doubleValue(), target.get(1).doubleValue());
        System.out.println("12 Nearest Neighbors:");
        for (Vector<Float64> neighbor : neighbors) {
            System.out.printf("(%.6f, %.6f)%n", neighbor.get(0).doubleValue(), neighbor.get(1).doubleValue());
        }
    }
}



