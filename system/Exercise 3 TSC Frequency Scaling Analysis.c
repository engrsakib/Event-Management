#include <stdio.h>
#include <time.h>
#include <stdint.h>
#include <unistd.h>     // sleep() এর জন্য
#include <x86intrin.h>  // Intel প্রসেসরে সাইকেল গুনার জন্য এই হেডার জরুরি

// Intel-compatible cycle counter using RDTSC
static inline uint64_t get_cycles(void) {
    return __rdtsc();
}

void measure_frequency() {
    struct timespec start, end;
    uint64_t start_cycles, end_cycles;

    // Start measurement
    clock_gettime(CLOCK_MONOTONIC, &start);
    start_cycles = get_cycles();

    // Sleep for exactly 1 second (CPU Idle simulation)
    sleep(1);

    // End measurement
    end_cycles = get_cycles();
    clock_gettime(CLOCK_MONOTONIC, &end);

    double elapsed = (end.tv_sec - start.tv_sec) + (end.tv_nsec - start.tv_nsec) / 1e9;
    uint64_t cycles = end_cycles - start_cycles;

    printf("Sleep time: %.6f seconds\n", elapsed);
    printf("Cycles during sleep: %llu\n", (unsigned long long)cycles);
    printf("Frequency during sleep: %.2f MHz\n", cycles / elapsed / 1e6);
}

void measure_computation() {
    struct timespec start, end;
    uint64_t start_cycles, end_cycles;

    clock_gettime(CLOCK_MONOTONIC, &start);
    start_cycles = get_cycles();

    // Intensive computation (Active State)
    volatile double sum = 0.0;
    for (int i = 0; i < 50000000; i++) {
        sum += i * 1.0 / (i + 1);
    }

    end_cycles = get_cycles();
    clock_gettime(CLOCK_MONOTONIC, &end);

    // calculation and print
    double elapsed = (end.tv_sec - start.tv_sec) + (end.tv_nsec - start.tv_nsec) / 1e9;
    uint64_t cycles = end_cycles - start_cycles;
    
    printf("Frequency during computation: %.2f MHz\n", cycles / elapsed / 1e6);
}

int main() {
    printf("=== Exercise 3: Frequency Scaling Analysis (Intel) ===\n");
    measure_frequency();
    measure_computation();
    return 0;
}