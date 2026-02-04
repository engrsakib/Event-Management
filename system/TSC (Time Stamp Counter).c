#include <stdio.h>
#include <time.h>
#include <stdint.h>
#include <x86intrin.h> // Intel/AMD এর জন্য এই হেডার লাগবে

static inline uint64_t get_cycles(void) {
    return __rdtsc(); // x86 প্রসেসরে সাইকেল গুনার কমান্ড
}

int main() {
    struct timespec start_time, end_time;
    uint64_t start_cycles, end_cycles;
    double sum = 0.0;

    clock_gettime(CLOCK_MONOTONIC, &start_time);
    start_cycles = get_cycles();

    for (int i = 0; i < 1000000; i++) {
        sum += i * 1.0 / (i + 1);
    }

    end_cycles = get_cycles();
    clock_gettime(CLOCK_MONOTONIC, &end_time);

    double elapsed_time = (end_time.tv_sec - start_time.tv_sec) +
                          (end_time.tv_nsec - start_time.tv_nsec) / 1e9;

    uint64_t elapsed_cycles = end_cycles - start_cycles;
    double freq_mhz = (elapsed_cycles / elapsed_time) / 1e6;

    printf("Time: %f seconds\n", elapsed_time);
    printf("Cycles: %lu\n", elapsed_cycles);
    printf("Estimated Frequency: %.2f MHz\n", freq_mhz);
    printf("Cycles per iteration: %.2f\n",
           (double)elapsed_cycles / 1000000);

    return 0;
}