import csv

def save_csv(results):

    with open("outputs/results.csv", "w", newline="", encoding="utf-8") as file:

        writer = csv.writer(file)

        writer.writerow(["Title"])

        for item in results:
            writer.writerow([item["title"]])

    print("CSV file saved.")