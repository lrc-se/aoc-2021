using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;

namespace Aoc2021
{
    public abstract class AocPuzzle<TInput, TResult>
    {
        private readonly string _mode;
        private readonly bool _isTimed;

        protected readonly bool _isTest;
        protected readonly TInput _input;

        protected virtual IDictionary<string, TResult> TestAnswers { get; }

        public AocPuzzle()
        {
            _mode = Environment.GetEnvironmentVariable("mode");
            _isTest = (_mode == "test" || _mode == "test-timed");
            _isTimed = (_mode == "timed" || _mode == "test-timed");
            var lines = LoadInput();
            if (_isTimed)
            {
                Console.WriteLine("Parsing input...");
                _input = RunTimed(() => ParseInput(lines));
                Console.WriteLine();
            }
            else
            {
                _input = ParseInput(lines);
            }
        }

        public void Run(string part = null)
        {
            TResult result;
            switch (part)
            {
                case "part1":
                    Console.WriteLine("PART 1");
                    Console.WriteLine("======");
                    result = (_isTimed ? RunTimed(RunPart1) : RunPart1());
                    break;
                case "part2":
                    Console.WriteLine("PART 2");
                    Console.WriteLine("======");
                    result = (_isTimed ? RunTimed(RunPart2) : RunPart2());
                    break;
                default:
                    Run("part1");
                    Console.WriteLine();
                    Run("part2");
                    return;
            }

            Console.WriteLine($"Result: {result}");
            if (_isTest)
            {
                if (TestAnswers == null || !TestAnswers.ContainsKey(part))
                {
                    Console.WriteLine("Test answer not provided!");
                }
                else if (!result.Equals(TestAnswers[part]))
                {
                    Console.WriteLine($"Test failed! Expected result: {TestAnswers[part]}");
                }
            }
        }

        protected abstract TInput ParseInput(string[] lines);

        protected virtual TResult RunPart1() => default;

        protected virtual TResult RunPart2() => default;

        private string[] LoadInput()
        {
            return File.ReadLines(_isTest ? "input-test.txt" : "input.txt").ToArray();
        }

        private static T RunTimed<T>(Func<T> func)
        {
            var stopwatch = new Stopwatch();
            stopwatch.Start();
            var result = func();
            stopwatch.Stop();
            Console.WriteLine($"Execution time (ms): {stopwatch.Elapsed.TotalMilliseconds}");
            return result;
        }
    }
}