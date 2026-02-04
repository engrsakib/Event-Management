#include <stdio.h>
#include <time.h>

int main() {
    struct timespec start, end;

    // Start timing
    clock_gettime(CLOCK_MONOTONIC, &start);

    // Workload: Mathematical computation
    double sum = 0.0;
    for (int i = 0; i < 1000000; i++) {
        sum += i * 1.0 / (i + 1);
    }

    // End timing
    clock_gettime(CLOCK_MONOTONIC, &end);

    // Calculate elapsed time
    double elapsed_time = (end.tv_sec - start.tv_sec) +
                          (end.tv_nsec - start.tv_nsec) / 1e9;
    
    printf("Execution time: %f seconds\n", elapsed_time);
    return 0;
}
