/*  

Question: Print K level down


*/


public class PrintKLevelDown {

    static class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;
        TreeNode(int val) { this.val = val; }
    }


    public void printKLevelDown(TreeNode root, int k) {

        if(root == null || k < 0){
            return;
        }

        if(k == 0){
            System.out.println(root.val);
            return;
        }

        printKLevelDown(root.left, k - 1);
        printKLevelDown(root.right, k - 1);
    }
    
}
