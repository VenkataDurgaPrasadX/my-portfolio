import java.util.Arrays;

public class SuffixArray {

    // Structure to store suffix and its index
    static class Suffix implements Comparable<Suffix> {
        String text;
        int index;

        Suffix(String text, int index) {
            this.text = text;
            this.index = index;
        }

        // @Override
        public int compareTo(Suffix other) {
            return this.text.compareTo(other.text);
        }
    }

    // Method to build and return the suffix array
    public static int[] buildSuffixArray(String s) {
        int n = s.length();
        Suffix[] suffixes = new Suffix[n];

        // Generate all suffixes with their original indices
        for (int i = 0; i < n; i++) {
            suffixes[i] = new Suffix(s.substring(i), i);
        }

        // Sort the suffixes lexicographically
        Arrays.sort(suffixes);

        // Extract and return the array of indices
        int[] suffixArray = new int[n];
        for (int i = 0; i < n; i++) {
            suffixArray[i] = suffixes[i].index;
        }

        return suffixArray;
    }

    // Driver method
    public static void main(String[] args) {
        String text = "banana";
        int[] suffixArray = buildSuffixArray(text);

        System.out.println("Suffix Array:");
        for (int i : suffixArray) {
            System.out.print(i + " ");
        }
    }
}
