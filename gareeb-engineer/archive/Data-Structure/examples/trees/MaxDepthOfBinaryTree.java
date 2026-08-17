/**
 * LeetCode 104 - Maximum Depth of Binary Tree
 * Difficulty: Easy
 */
public class MaxDepthOfBinaryTree {

    static class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;
        TreeNode(int val) { this.val = val; }
    }

    public int maxDepth(TreeNode root) {
        // TODO: Implement solution
        return 0;
    }

    public static void main(String[] args) {
        MaxDepthOfBinaryTree sol = new MaxDepthOfBinaryTree();

            //   3
            //  / \
            // 9   20
            //    /  \
            //   15   7
        TreeNode root = new TreeNode(3);
        root.left = new TreeNode(9);
        root.right = new TreeNode(20);
        root.right.left = new TreeNode(15);
        root.right.right = new TreeNode(7);

        System.out.println("Max Depth: " + sol.maxDepth(root)); // Expected: 3
    }
}