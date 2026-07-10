from playwright.sync_api import sync_playwright

class BrowserAgent:
    def __init__(self):
        self.playwright = sync_playwright().start()
        self.browser = self.playwright.chromium.launch(headless=False)
        self.page = self.browser.new_page()

    def open_website(self, url):
        self.page.goto(url)

    def search_google(self, query):
        self.page.goto("https://www.google.com",timeout=60000)
        self.page.fill("textarea[name='q']", query)
        self.page.keyboard.press("Enter")
        self.page.wait_for_load_state("networkidle")

    def get_title(self):
        return self.page.title()

    def take_screenshot(self, filename):
        self.page.screenshot(path=filename)

    def close(self):
        self.browser.close()
        self.playwright.stop()

    def extract_google_results(self):
        self.page.wait_for_selector("h3")

        headings = self.page.locator("h3")

        results = []

        count = min(headings.count(), 5)

        for i in range(count):
            title = headings.nth(i).inner_text()

            results.append({
                "title": title
            })

        return results

    def open_first_result(self):
        self.page.wait_for_selector("a h3")

        first_result = self.page.locator("a h3").first
        first_result.click()

        self.page.wait_for_load_state("domcontentloaded")
        self.page.wait_for_timeout(3000)


        print("Current URL:", self.page.url)

    def get_page_text(self):
        self.page.wait_for_selector("body", timeout=10000)
        return self.page.locator("body").inner_text(timeout=10000)