from browser_agent import BrowserAgent
from actions import *
from extractor import save_results
from summarizer import summarize
from csv_export import save_csv

def execute_task(command):

    agent = BrowserAgent()

    command = command.lower()

    if "github" in command:

        open_website(agent, "https://github.com")

    elif "youtube" in command:

        open_website(agent, "https://www.youtube.com")

    else:

        # Google Search
        google_search(agent, command)

        # Extract Results
        results = extract_results(agent)

        save_csv(results)
        save_results(results)

        print("\nTop Results\n")

        for i, item in enumerate(results, 1):
            print(f"{i}. {item['title']}")

        try:
            # Open First Result
            open_first_result(agent)

            # Read Page
            text = page_text(agent)

            # Summarize
            summary = summarize(text)

            print("\nSummary\n")
            print(summary)

        except Exception as e:
            print("Error:", e)
            input("Press Enter to close...")
            close_browser(agent)
            return

    print("\nPage Title:", page_title(agent))

    screenshot(agent)

    input("\nPress Enter to close the browser...")

    close_browser(agent)