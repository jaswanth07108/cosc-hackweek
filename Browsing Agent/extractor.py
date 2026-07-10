import json

def save_results(results):
    with open("outputs/results.json", "w", encoding="utf-8") as f:
        json.dump(results, f, indent=4, ensure_ascii=False)

    print("Results saved to outputs/results.json")