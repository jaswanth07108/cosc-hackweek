from datetime import datetime
from logger import log

log("Searching Google")

log("Opening first result")

log("Summary created")

log("Task Completed")

def log(message):

    with open("logs/actions.log", "a", encoding="utf-8") as file:

        file.write(f"[{datetime.now()}] {message}\n")