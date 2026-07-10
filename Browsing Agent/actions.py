from browser_agent import BrowserAgent


def google_search(agent,query):
    agent.search_google(query)

def open_website(agent,url):
    agent.open_website(url)

def page_title(agent):
    return agent.get_title()

def screenshot(agent):
    agent.take_screenshot("screenshots/result.png")

def close_browser(agent):
    agent.close()
def extract_results(agent):
    return agent.extract_google_results()
def open_first_result(agent):
    agent.open_first_result()

def page_text(agent):
    return agent.get_page_text()